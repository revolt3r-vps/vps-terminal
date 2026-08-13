'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const zlib = require('node:zlib');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');
const gzipAsync = promisify(zlib.gzip);
const pty = require('node-pty');
const { WebSocketServer } = require('ws');
const {
  appendBoundedClientDebugEntries
} = require('./diagnostics');
const {
  normalizeRelativePath,
  resolveJailedPath,
  parentRelativePath,
  createJailedDirectory,
  renameJailedEntry,
  toDisplayPath,
  assertInsideRoot
} = require('./fs-jail');
const {
  PreferencesStore,
  preferencesIdentity
} = require('./preferences-store');

const execFileAsync = promisify(execFile);
const socketPath = process.env.VPS_TERMINAL_SOCKET || null;
// Local test env: no reverse-proxy auth, bind private address only.
// Refuse to combine with production Unix-socket mode.
const localDevMode = process.env.VPS_TERMINAL_LOCAL_DEV === '1';
if (localDevMode && socketPath) {
  throw new Error(
    'VPS_TERMINAL_LOCAL_DEV=1 cannot be used with VPS_TERMINAL_SOCKET (production mode)'
  );
}

function resolveListenHostAndPort() {
  if (localDevMode) {
    return {
      host: process.env.VPS_TERMINAL_HOST || '127.0.0.1',
      port: Number(process.env.VPS_TERMINAL_PORT || 3099)
    };
  }
  if (socketPath) {
    // Host/port unused for listen; keep sane values for any diagnostic code.
    return {
      host: process.env.VPS_TERMINAL_HOST || '127.0.0.1',
      port: Number(process.env.VPS_TERMINAL_PORT || 3001)
    };
  }
  if (!process.env.VPS_TERMINAL_HOST) {
    throw new Error(
      'Set VPS_TERMINAL_SOCKET (recommended) or VPS_TERMINAL_HOST for TCP bind. ' +
        'Never expose an unauthenticated TCP port publicly.'
    );
  }
  return {
    host: process.env.VPS_TERMINAL_HOST,
    port: Number(process.env.VPS_TERMINAL_PORT || 3001)
  };
}

const { host, port } = resolveListenHostAndPort();
const appDisplayName =
  (process.env.VPS_TERMINAL_APP_NAME || 'VPS Terminal').trim().slice(0, 64) ||
  'VPS Terminal';
const publicOrigin = (() => {
  if (process.env.VPS_TERMINAL_ORIGIN) {
    return process.env.VPS_TERMINAL_ORIGIN;
  }
  if (localDevMode) {
    return `http://${host === '0.0.0.0' ? '127.0.0.1' : host}:${port}`;
  }
  throw new Error(
    'VPS_TERMINAL_ORIGIN is required outside LOCAL_DEV ' +
      '(exact public URL used for Origin checks, e.g. https://terminal.example.com)'
  );
})();
const localDevEmail =
  process.env.VPS_TERMINAL_DEV_EMAIL || 'dev@localhost.test';
const homeDirectory = process.env.HOME || os.homedir();
// Defaults under $HOME unless overridden.
const projectRoot =
  process.env.VPS_TERMINAL_PROJECT_ROOT ||
  path.join(homeDirectory, 'projects');
const publicRoot = path.join(__dirname, 'public');
const attachSessionPath = path.join(__dirname, 'attach-session');
// Runtime state — preferences, snippets, pasted images, the client debug log —
// is kept apart from the installed application when VPS_TERMINAL_STATE_DIR is
// set, so reinstalling or clearing the app directory cannot delete user data.
// Unset keeps the single-directory default, which is what a fresh install of
// the public package expects.
const stateRoot = process.env.VPS_TERMINAL_STATE_DIR
  ? path.resolve(process.env.VPS_TERMINAL_STATE_DIR)
  : path.join(homeDirectory, '.local/share/vps-terminal');
const clientDebugLogPath = path.join(stateRoot, 'client-debug.log');
const snippetsStorePath = path.join(stateRoot, 'snippets.json');
const preferencesStore = new PreferencesStore(stateRoot);
const clientDebugEnabled =
  process.env.VPS_TERMINAL_CLIENT_DEBUG === '1';
// Short path so AI prompts stay readable: ~/paste/a1b2c3d4.png
const pasteImageRoot =
  process.env.VPS_TERMINAL_PASTE_ROOT || path.join(homeDirectory, 'paste');
const maximumBodyBytes = 4096;
const maximumSnippetsBodyBytes = 64 * 1024;
// The client permits 12 profiles with 24 custom keys and 50 snippet
// selections each; a valid maximum-size snapshot is about 125 KiB.
const maximumPreferencesBodyBytes = 256 * 1024;
const maximumSnippetCount = 50;
const maximumSnippetLabelLength = 32;
const maximumSnippetBodyLength = 4000;
// run: true  = insert + Enter (fire-and-forget status checks)
// run: false = insert only (tweak path/filter before Enter)
const defaultSnippetPresets = [
  {
    id: 'uptime',
    label: 'uptime',
    body: 'uptime',
    run: true
  },
  {
    id: 'disk',
    label: 'df',
    body: 'df -h',
    run: true
  },
  {
    id: 'mem',
    label: 'mem',
    body: 'free -h 2>/dev/null || vm_stat 2>/dev/null || true',
    run: true
  },
  {
    id: 'cpu',
    label: 'top CPU',
    body: 'ps aux --sort=-%cpu 2>/dev/null | head -15',
    run: true
  },
  {
    id: 'tmux-ls',
    label: 'tmux ls',
    body: 'tmux ls',
    run: true
  },
  {
    id: 'git-st',
    label: 'git st',
    body: 'git status -sb',
    run: false
  },
  {
    id: 'pastes',
    label: 'pastes',
    body: 'ls -lt ~/paste 2>/dev/null | head',
    run: true
  }
];
const maximumPasteImageBytes = 5 * 1024 * 1024;
const maximumPasteImageFiles = 40;
/**
 * Files roots for the mobile file browser.
 * Defaults: home ($HOME), projects, paste — all under the process user.
 *
 * Env (package-friendly):
 * - VPS_TERMINAL_FS_HOME=0          disable home root
 * - VPS_TERMINAL_PROJECT_ROOT=path  projects root (default $HOME/projects)
 * - VPS_TERMINAL_PASTE_ROOT=path    paste root (default $HOME/paste)
 * - VPS_TERMINAL_FS_EXTRA=id:label:path[:ro][,id2:...]
 *     extra roots; append :ro for read-only
 */
function buildFsRootCatalog() {
  const catalog = Object.create(null);
  const homeEnabled = process.env.VPS_TERMINAL_FS_HOME !== '0';

  if (homeEnabled && homeDirectory) {
    catalog.home = {
      id: 'home',
      label: 'home',
      rootPath: path.resolve(homeDirectory),
      displayPrefix: '~',
      writable: true
    };
  }

  catalog.projects = {
    id: 'projects',
    label: 'projects',
    rootPath: path.resolve(projectRoot),
    displayPrefix: displayPrefixForPath(path.resolve(projectRoot), 'projects'),
    writable: true
  };

  catalog.paste = {
    id: 'paste',
    label: 'paste',
    rootPath: path.resolve(pasteImageRoot),
    displayPrefix: displayPrefixForPath(path.resolve(pasteImageRoot), 'paste'),
    writable: true
  };

  const extra = process.env.VPS_TERMINAL_FS_EXTRA || '';
  if (extra.trim()) {
    for (const chunk of extra.split(',')) {
      const parts = chunk
        .trim()
        .split(':')
        .map((part) => part.trim())
        .filter(Boolean);
      if (parts.length < 3) {
        continue;
      }
      const [id, label, rootPath, mode] = parts;
      if (!/^[a-z][a-z0-9_-]{0,31}$/.test(id)) {
        continue;
      }
      if (Object.hasOwn(catalog, id)) {
        continue;
      }
      const absolute = path.resolve(rootPath);
      catalog[id] = {
        id,
        label: label.slice(0, 24),
        rootPath: absolute,
        displayPrefix: displayPrefixForPath(absolute, id),
        writable: mode !== 'ro'
      };
    }
  }
  return catalog;
}

function displayPrefixForPath(absolutePath, fallbackId) {
  const home = path.resolve(homeDirectory);
  if (absolutePath === home) {
    return '~';
  }
  if (absolutePath.startsWith(`${home}${path.sep}`)) {
    const rel = absolutePath.slice(home.length + 1).split(path.sep).join('/');
    return `~/${rel}`;
  }
  return absolutePath;
}

const fsRootCatalog = buildFsRootCatalog();
const maximumFsListEntries = 500;
const maximumFsPreviewBytes = 512 * 1024;
const maximumFsUploadBytes = 20 * 1024 * 1024;
const maximumFsFileNameLength = 180;
// A path arriving from terminal output. Generous enough for a deep repo path,
// short enough that a runaway line cannot be replayed as a filesystem probe.
const maximumFsTerminalPathLength = 4096;
const safeUploadFileNamePattern =
  /^[A-Za-z0-9][A-Za-z0-9._+-]{0,179}$/;
// Files must live until the AI CLI reads them on send (usually seconds).
// 30 minutes covers draft/edit without leaving clutter forever.
const pasteImageTtlMs = 30 * 60 * 1000;
const pasteImagePruneIntervalMs = 10 * 60 * 1000;
const maximumClientDebugEntries = 20;
const maximumClientDebugLogBytes = 256 * 1024;
const maximumConnections = 10;
const maximumInputLength = 32768;
const maximumSessionNameLength = 32;
const websocketLifetimeMs = 60 * 60 * 1000;
const sessionNamePattern = /^[A-Za-z0-9][A-Za-z0-9._-]{0,31}$/;
const sessionLauncherCommands = Object.freeze({
  terminal: null,
  codex: 'codex',
  grok: 'grok',
  claude: 'claude'
});
const authenticatedEmailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const connections = new Set();
let pendingConnections = 0;

function authenticatedEmail(request) {
  // Local test mode: skip Google/Caddy identity header (never on with SOCKET).
  if (localDevMode) {
    return localDevEmail;
  }
  const value = request.headers['x-vps-authenticated-email'];
  if (typeof value !== 'string' || !authenticatedEmailPattern.test(value)) {
    return null;
  }
  return value.toLowerCase();
}

function requestOriginIsValid(request) {
  if (localDevMode) {
    const origin = request.headers.origin;
    if (!origin) {
      return true;
    }
    try {
      const { hostname } = new URL(origin);
      if (
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname === host ||
        hostname.startsWith('172.29.') ||
        hostname.startsWith('172.18.')
      ) {
        return true;
      }
    } catch {
      return false;
    }
    return origin === publicOrigin;
  }
  return request.headers.origin === publicOrigin;
}

function setSecurityHeaders(response) {
  response.setHeader('Cache-Control', 'no-store');
  // Local dev allows ws: (http) and slightly looser connect for tooling.
  const connectSrc = localDevMode
    ? "connect-src 'self' ws: wss: http: https:"
    : "connect-src 'self' wss:";
  response.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; base-uri 'none'; " +
      `${connectSrc}; ` +
      "font-src 'self'; form-action 'none'; frame-ancestors 'none'; " +
      "img-src 'self' data:; object-src 'none'; script-src 'self'; " +
      "style-src 'self' 'unsafe-inline'"
  );
  response.setHeader(
    'Permissions-Policy',
    'camera=(), geolocation=(), microphone=(), ' +
      'clipboard-read=(self), clipboard-write=(self)'
  );
  response.setHeader('Referrer-Policy', 'no-referrer');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Frame-Options', 'DENY');
  response.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
}

function sendJson(response, status, value) {
  setSecurityHeaders(response);
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.end(JSON.stringify(value));
}

function sendError(response, status, message) {
  sendJson(response, status, { error: message });
}

async function readBody(request, limit = maximumBodyBytes) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > limit) {
      throw new Error('request body is too large');
    }
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

async function readBinaryBody(request, limit = maximumBodyBytes) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > limit) {
      const error = new Error('request body is too large');
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

function detectImageKind(buffer) {
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { extension: 'png', mimeType: 'image/png' };
  }
  if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return { extension: 'jpg', mimeType: 'image/jpeg' };
  }
  if (
    buffer.length >= 12 &&
    buffer.toString('ascii', 0, 4) === 'RIFF' &&
    buffer.toString('ascii', 8, 12) === 'WEBP'
  ) {
    return { extension: 'webp', mimeType: 'image/webp' };
  }
  if (
    buffer.length >= 6 &&
    (buffer.toString('ascii', 0, 6) === 'GIF87a' ||
      buffer.toString('ascii', 0, 6) === 'GIF89a')
  ) {
    return { extension: 'gif', mimeType: 'image/gif' };
  }
  return null;
}

async function prunePasteImages() {
  let entries;
  try {
    entries = await fs.promises.readdir(pasteImageRoot, {
      withFileTypes: true
    });
  } catch (error) {
    if (error.code === 'ENOENT') {
      return { deleted: 0, kept: 0 };
    }
    throw error;
  }
  const now = Date.now();
  const files = [];
  let deleted = 0;
  for (const entry of entries) {
    if (!entry.isFile()) {
      continue;
    }
    const filePath = path.join(pasteImageRoot, entry.name);
    try {
      const stats = await fs.promises.stat(filePath);
      // Age-based cleanup first (TTL).
      if (now - stats.mtimeMs >= pasteImageTtlMs) {
        await fs.promises.unlink(filePath);
        deleted += 1;
        continue;
      }
      files.push({ filePath, mtimeMs: stats.mtimeMs });
    } catch {
      // Skip unreadable entries.
    }
  }
  // Cap total retained files (newest wins).
  files.sort((a, b) => b.mtimeMs - a.mtimeMs);
  for (const file of files.slice(maximumPasteImageFiles)) {
    try {
      await fs.promises.unlink(file.filePath);
      deleted += 1;
    } catch {
      // Best-effort cleanup.
    }
  }
  return {
    deleted,
    kept: Math.min(files.length, maximumPasteImageFiles)
  };
}

function schedulePasteImagePrune() {
  const run = () => {
    prunePasteImages().catch(() => {
      // Ignore background prune failures.
    });
  };
  run();
  setInterval(run, pasteImagePruneIntervalMs).unref?.();
}

async function savePasteImage(buffer) {
  const kind = detectImageKind(buffer);
  if (!kind) {
    const error = new Error('unsupported image type');
    error.statusCode = 400;
    throw error;
  }
  if (buffer.length > maximumPasteImageBytes) {
    const error = new Error('image is too large');
    error.statusCode = 413;
    throw error;
  }
  await fs.promises.mkdir(pasteImageRoot, { recursive: true, mode: 0o700 });
  // Short random names keep the terminal prompt readable.
  let filePath = null;
  let fileName = null;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const token = crypto.randomBytes(4).toString('hex');
    fileName = `${token}.${kind.extension}`;
    const candidate = path.join(pasteImageRoot, fileName);
    if (
      !candidate.startsWith(`${pasteImageRoot}${path.sep}`) ||
      fileName.includes('..') ||
      fileName.includes('/') ||
      fileName.includes('\\')
    ) {
      const error = new Error('invalid paste path');
      error.statusCode = 500;
      throw error;
    }
    try {
      await fs.promises.writeFile(candidate, buffer, {
        mode: 0o600,
        flag: 'wx'
      });
      filePath = candidate;
      break;
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }
  }
  if (!filePath) {
    const error = new Error('could not allocate paste filename');
    error.statusCode = 500;
    throw error;
  }
  await prunePasteImages();
  const tildePath = `~/paste/${fileName}`;
  return {
    path: filePath,
    // Prefer tilde form in the terminal when the home directory is known.
    pasteText: filePath.startsWith(`${homeDirectory}${path.sep}`)
      ? tildePath
      : filePath,
    displayPath: tildePath,
    bytes: buffer.length,
    mimeType: kind.mimeType
  };
}

async function appendClientDebugEntries(entries) {
  return appendBoundedClientDebugEntries(
    clientDebugLogPath,
    entries,
    { maximumBytes: maximumClientDebugLogBytes }
  );
}

function validatedSessionName(value) {
  if (
    typeof value !== 'string' ||
    value.length > maximumSessionNameLength ||
    !sessionNamePattern.test(value)
  ) {
    return null;
  }
  return value;
}

function defaultSnippetsDocument() {
  return {
    version: 1,
    snippets: defaultSnippetPresets.map((entry) => ({
      id: entry.id,
      label: entry.label,
      body: entry.body,
      // Run = append Enter so the shell executes; off = insert only.
      run: entry.run !== false,
      source: 'preset'
    }))
  };
}

function sanitizeSnippetEntry(entry) {
  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
    return null;
  }
  const id =
    typeof entry.id === 'string' ? entry.id.trim().slice(0, 64) : '';
  const label =
    typeof entry.label === 'string'
      ? entry.label.trim().slice(0, maximumSnippetLabelLength)
      : '';
  let body =
    typeof entry.body === 'string'
      ? entry.body.slice(0, maximumSnippetBodyLength)
      : '';
  if (!id || !label || !body) {
    return null;
  }
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/.test(id)) {
    return null;
  }
  // Normalize newlines; reject NULs.
  if (body.includes('\u0000')) {
    return null;
  }
  body = body.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const source = entry.source === 'preset' ? 'preset' : 'custom';
  const run = entry.run !== false;
  return { id, label, body, run, source };
}

function sanitizeSnippetsDocument(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return defaultSnippetsDocument();
  }
  const rawList = Array.isArray(value.snippets) ? value.snippets : [];
  const seen = new Set();
  const snippets = [];
  for (const entry of rawList) {
    if (snippets.length >= maximumSnippetCount) {
      break;
    }
    const clean = sanitizeSnippetEntry(entry);
    if (!clean || seen.has(clean.id)) {
      continue;
    }
    seen.add(clean.id);
    snippets.push(clean);
  }
  if (snippets.length === 0) {
    return defaultSnippetsDocument();
  }
  return { version: 1, snippets };
}

async function readSnippetsDocument() {
  try {
    const raw = await fs.promises.readFile(snippetsStorePath, 'utf8');
    return sanitizeSnippetsDocument(JSON.parse(raw));
  } catch (error) {
    if (error.code === 'ENOENT') {
      return defaultSnippetsDocument();
    }
    if (error instanceof SyntaxError) {
      return defaultSnippetsDocument();
    }
    throw error;
  }
}

async function writeSnippetsDocument(document) {
  const clean = sanitizeSnippetsDocument(document);
  await fs.promises.mkdir(stateRoot, { recursive: true, mode: 0o700 });
  const payload = `${JSON.stringify(clean, null, 2)}\n`;
  const tempPath = `${snippetsStorePath}.${process.pid}.tmp`;
  await fs.promises.writeFile(tempPath, payload, { mode: 0o600 });
  await fs.promises.rename(tempPath, snippetsStorePath);
  return clean;
}

function fsRootFromQuery(rootId) {
  if (typeof rootId !== 'string' || !Object.hasOwn(fsRootCatalog, rootId)) {
    const error = new Error(
      `unknown root (allowed: ${Object.keys(fsRootCatalog).join(', ')})`
    );
    error.statusCode = 400;
    throw error;
  }
  return fsRootCatalog[rootId];
}

function rootDisplayPrefix(root) {
  return root.displayPrefix || `~/${root.id}`;
}

/**
 * Map an absolute path back to the root that contains it.
 *
 * This is the inverse of the usual root+relative addressing, and it exists so a
 * path printed in the terminal can be opened in the file browser. The client is
 * never told where a root lives on disk, so this mapping has to happen here.
 *
 * Every failure is the same 404. A path outside every root and a path that does
 * not exist must be indistinguishable, or this becomes an oracle for probing the
 * filesystem outside the jail.
 */
async function resolveFsAbsolutePath(candidateAbsolute) {
  const notFound = () => {
    const error = new Error('not found');
    error.statusCode = 404;
    return error;
  };
  let candidateReal;
  try {
    // realpath first: containment has to be judged on the real path, or a
    // symlink inside a root could point anywhere.
    candidateReal = await fs.promises.realpath(candidateAbsolute);
  } catch {
    throw notFound();
  }

  // Roots may nest (home contains projects). The most specific one wins, so the
  // location shown matches where the user would expect to find the file.
  let best = null;
  for (const root of Object.values(fsRootCatalog)) {
    let rootReal;
    try {
      rootReal = await fs.promises.realpath(root.rootPath);
    } catch {
      continue;
    }
    try {
      assertInsideRoot(rootReal, candidateReal);
    } catch {
      continue;
    }
    if (!best || rootReal.length > best.rootReal.length) {
      best = { root, rootReal };
    }
  }
  if (!best) {
    throw notFound();
  }

  const relativePath = path
    .relative(best.rootReal, candidateReal)
    .split(path.sep)
    .join('/');
  // Re-enter through the jail rather than trusting the mapping above, so
  // fs-jail stays the single authority on what may be reached.
  const resolved = await resolveJailedPath(best.root.rootPath, relativePath, {
    mustExist: true
  });
  return {
    rootId: best.root.id,
    relativePath: resolved.relativePath,
    type: resolved.stats.isDirectory() ? 'dir' : 'file',
    displayPath: toDisplayPath(
      rootDisplayPrefix(best.root),
      resolved.relativePath
    )
  };
}

/**
 * The working directory of a session's active pane. Treated as untrusted input
 * like any other path, and never logged.
 */
async function sessionCurrentDirectory(name) {
  const session = validatedSessionName(name);
  if (!session) {
    return null;
  }
  try {
    // list-panes rather than display-message: `display-message -t '=name'`
    // targets the session but expands no pane variables, so it returns an empty
    // string. Listing the current window's panes and taking the active one is
    // explicit and does not depend on that quirk. '|' as the separator for the
    // same reason as listSessions — tmux 3.3.x rewrites tabs in -F output.
    const { stdout } = await execFileAsync(
      'tmux',
      [
        'list-panes',
        '-t',
        `=${session}`,
        '-F',
        '#{pane_active}|#{pane_current_path}'
      ],
      { timeout: 3000, maxBuffer: 16 * 1024 }
    );
    for (const line of stdout.split('\n')) {
      const separator = line.indexOf('|');
      if (separator < 0) {
        continue;
      }
      if (line.slice(0, separator) !== '1') {
        continue;
      }
      const value = line.slice(separator + 1).trim();
      if (path.isAbsolute(value)) {
        return value;
      }
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Resolve a path as printed in the terminal. Absolute and `~` forms need no
 * session; a relative one is resolved against that session's current directory,
 * read now rather than cached, because the shell's cwd moves.
 */
async function resolveFsTerminalPath(sessionName, rawPath) {
  if (
    typeof rawPath !== 'string' ||
    rawPath.length === 0 ||
    rawPath.length > maximumFsTerminalPathLength ||
    rawPath.includes('\0')
  ) {
    const error = new Error('invalid path');
    error.statusCode = 400;
    throw error;
  }
  let candidate;
  if (rawPath.startsWith('/')) {
    candidate = rawPath;
  } else if (rawPath === '~' || rawPath.startsWith('~/')) {
    if (!homeDirectory) {
      const error = new Error('not found');
      error.statusCode = 404;
      throw error;
    }
    candidate = path.join(homeDirectory, rawPath.slice(1));
  } else {
    const cwd = await sessionCurrentDirectory(sessionName);
    if (!cwd) {
      const error = new Error('not found');
      error.statusCode = 404;
      throw error;
    }
    // Lexical only. `..` is normalized here and then re-judged against the real
    // path by resolveFsAbsolutePath, which is what actually enforces the jail.
    candidate = path.resolve(cwd, rawPath);
  }
  return resolveFsAbsolutePath(candidate);
}

function safeUploadFileName(name) {
  if (typeof name !== 'string') {
    return null;
  }
  const base = path.basename(name.trim());
  if (!base || base.length > maximumFsFileNameLength) {
    return null;
  }
  if (!safeUploadFileNamePattern.test(base)) {
    return null;
  }
  return base;
}

function isProbablyTextBuffer(buffer) {
  const sample = buffer.subarray(0, Math.min(buffer.length, 8192));
  if (sample.includes(0)) {
    return false;
  }
  // Reject high ratio of non-text control bytes.
  let weird = 0;
  for (let i = 0; i < sample.length; i += 1) {
    const b = sample[i];
    if (b === 9 || b === 10 || b === 13) {
      continue;
    }
    if (b < 32 || b === 127) {
      weird += 1;
    }
  }
  return weird / Math.max(sample.length, 1) < 0.05;
}

async function listFsDirectory(rootId, relativePath) {
  const root = fsRootFromQuery(rootId);
  const resolved = await resolveJailedPath(root.rootPath, relativePath, {
    mustExist: true
  });
  if (!resolved.stats.isDirectory()) {
    const error = new Error('not a directory');
    error.statusCode = 400;
    throw error;
  }
  let dirents;
  try {
    dirents = await fs.promises.readdir(resolved.absolutePath, {
      withFileTypes: true
    });
  } catch (error) {
    if (error.code === 'EACCES') {
      const denied = new Error('permission denied');
      denied.statusCode = 403;
      throw denied;
    }
    throw error;
  }
  const entries = [];
  for (const dirent of dirents) {
    if (entries.length >= maximumFsListEntries) {
      break;
    }
    const name = dirent.name;
    if (name === '.' || name === '..') {
      continue;
    }
    // Skip hidden names that are pure navigation noise; still allow .env etc.
    const childRel = resolved.relativePath
      ? `${resolved.relativePath}/${name}`
      : name;
    let child;
    try {
      child = await resolveJailedPath(root.rootPath, childRel, {
        mustExist: true
      });
    } catch {
      // Broken symlink or escape — skip.
      continue;
    }
    const isDir = child.stats.isDirectory();
    const isFile = child.stats.isFile();
    if (!isDir && !isFile) {
      continue;
    }
    entries.push({
      name,
      type: isDir ? 'dir' : 'file',
      size: isFile ? child.stats.size : 0,
      mtime: child.stats.mtimeMs
    });
  }
  entries.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === 'dir' ? -1 : 1;
    }
    return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
  });
  return {
    root: root.id,
    path: resolved.relativePath,
    displayPath: toDisplayPath(
      rootDisplayPrefix(root),
      resolved.relativePath
    ),
    displayPrefix: rootDisplayPrefix(root),
    parent: parentRelativePath(resolved.relativePath),
    writable: root.writable !== false,
    truncated: dirents.length > maximumFsListEntries,
    entries
  };
}

async function readFsPreview(rootId, relativePath) {
  const root = fsRootFromQuery(rootId);
  const resolved = await resolveJailedPath(root.rootPath, relativePath, {
    mustExist: true
  });
  if (!resolved.stats.isFile()) {
    const error = new Error('not a file');
    error.statusCode = 400;
    throw error;
  }
  if (resolved.stats.size > maximumFsPreviewBytes) {
    const error = new Error(
      `file too large to preview (max ${Math.floor(maximumFsPreviewBytes / 1024)} KB)`
    );
    error.statusCode = 413;
    throw error;
  }
  const buffer = await fs.promises.readFile(resolved.absolutePath);
  if (!isProbablyTextBuffer(buffer)) {
    const error = new Error('binary file — use Download');
    error.statusCode = 415;
    throw error;
  }
  return {
    root: root.id,
    path: resolved.relativePath,
    displayPath: toDisplayPath(
      rootDisplayPrefix(root),
      resolved.relativePath
    ),
    size: resolved.stats.size,
    text: buffer.toString('utf8')
  };
}

async function openFsDownload(rootId, relativePath) {
  const root = fsRootFromQuery(rootId);
  const resolved = await resolveJailedPath(root.rootPath, relativePath, {
    mustExist: true
  });
  if (!resolved.stats.isFile()) {
    const error = new Error('not a file');
    error.statusCode = 400;
    throw error;
  }
  const fileName = path.basename(resolved.absolutePath);
  return {
    absolutePath: resolved.absolutePath,
    fileName,
    size: resolved.stats.size,
    displayPath: toDisplayPath(
      rootDisplayPrefix(root),
      resolved.relativePath
    )
  };
}

async function writeFsUpload(rootId, relativeDir, fileName, buffer) {
  const root = fsRootFromQuery(rootId);
  if (!root.writable) {
    const error = new Error('root is read-only');
    error.statusCode = 403;
    throw error;
  }
  const safeName = safeUploadFileName(fileName);
  if (!safeName) {
    const error = new Error(
      'filename must be 1-180 chars: letters, numbers, . _ + -'
    );
    error.statusCode = 400;
    throw error;
  }
  const dirRel = normalizeRelativePath(relativeDir);
  const targetRel = dirRel ? `${dirRel}/${safeName}` : safeName;
  const resolved = await resolveJailedPath(root.rootPath, targetRel, {
    mustExist: false
  });
  if (resolved.exists) {
    if (resolved.stats.isDirectory()) {
      const error = new Error('path is a directory');
      error.statusCode = 409;
      throw error;
    }
  }
  await fs.promises.writeFile(resolved.absolutePath, buffer, {
    mode: 0o600,
    flag: 'w'
  });
  return {
    root: root.id,
    path: targetRel,
    displayPath: toDisplayPath(rootDisplayPrefix(root), targetRel),
    size: buffer.length
  };
}

/**
 * How much is inside a folder, for the confirmation to quote.
 *
 * "Delete this and everything in it?" is not a question anyone can answer. "and
 * the 412 items inside it" is — a count is what stops you when you have tapped
 * the wrong folder, which is the whole reason recursive delete is guarded rather
 * than just offered.
 *
 * Capped, and says when it stopped: walking a huge tree to produce a number is
 * the wrong trade when "more than 5000" carries the same warning.
 */
const maximumCountedEntries = 5000;

async function countFsEntries(rootId, relativePath) {
  const root = fsRootFromQuery(rootId);
  const rel = normalizeRelativePath(relativePath);
  if (!rel) {
    const error = new Error('cannot count root');
    error.statusCode = 400;
    throw error;
  }
  const resolved = await resolveJailedPath(root.rootPath, rel, {
    mustExist: true
  });
  if (!resolved.stats.isDirectory()) {
    return { total: 0, truncated: false };
  }
  let total = 0;
  let truncated = false;
  const walk = async (absolutePath) => {
    if (truncated) {
      return;
    }
    let children;
    try {
      children = await fs.promises.readdir(absolutePath, {
        withFileTypes: true
      });
    } catch {
      // A directory that cannot be read still counts as something inside.
      return;
    }
    for (const child of children) {
      total += 1;
      if (total >= maximumCountedEntries) {
        truncated = true;
        return;
      }
      // Symlinks are counted, never followed: a link out of the jail must not
      // make this walk leave it either.
      if (child.isDirectory()) {
        await walk(path.join(absolutePath, child.name));
      }
    }
  };
  await walk(resolved.absolutePath);
  return { total, truncated };
}

async function deleteFsEntry(rootId, relativePath, options = {}) {
  const root = fsRootFromQuery(rootId);
  if (!root.writable) {
    const error = new Error('root is read-only');
    error.statusCode = 403;
    throw error;
  }
  const rel = normalizeRelativePath(relativePath);
  if (!rel) {
    const error = new Error('cannot delete root');
    error.statusCode = 400;
    throw error;
  }
  const resolved = await resolveJailedPath(root.rootPath, rel, {
    mustExist: true
  });
  if (resolved.stats.isDirectory()) {
    // Recursive only when the caller asks in so many words. A plain DELETE still
    // takes empty directories only, so nothing that predates this — or reaches
    // it by accident — can remove a tree.
    if (options.recursive === true) {
      await fs.promises.rm(resolved.absolutePath, {
        recursive: true,
        force: false
      });
    } else {
      try {
        await fs.promises.rmdir(resolved.absolutePath);
      } catch (error) {
        // A folder with something in it is a refusal, not a server fault. It
        // arrived here as an unhandled 500 logged as "request failed", which is
        // both the wrong status and noise in the journal — and bulk delete hits
        // it deliberately for every folder it declines.
        if (error.code === 'ENOTEMPTY' || error.code === 'EEXIST') {
          const refusal = new Error('directory is not empty');
          refusal.statusCode = 409;
          throw refusal;
        }
        throw error;
      }
    }
  } else if (resolved.stats.isFile()) {
    await fs.promises.unlink(resolved.absolutePath);
  } else {
    const error = new Error('unsupported entry type');
    error.statusCode = 400;
    throw error;
  }
  return {
    root: root.id,
    path: rel,
    displayPath: toDisplayPath(rootDisplayPrefix(root), rel),
    deleted: true
  };
}

async function createFsDirectory(rootId, relativeParent, name) {
  const root = fsRootFromQuery(rootId);
  if (!root.writable) {
    const error = new Error('root is read-only');
    error.statusCode = 403;
    throw error;
  }
  const relativePath = await createJailedDirectory(
    root.rootPath,
    relativeParent,
    name
  );
  return {
    root: root.id,
    path: relativePath,
    displayPath: toDisplayPath(rootDisplayPrefix(root), relativePath),
    created: true
  };
}

async function renameFsEntry(rootId, relativePath, nextName) {
  const root = fsRootFromQuery(rootId);
  if (!root.writable) {
    const error = new Error('root is read-only');
    error.statusCode = 403;
    throw error;
  }
  const renamedPath = await renameJailedEntry(
    root.rootPath,
    relativePath,
    nextName
  );
  return {
    root: root.id,
    path: renamedPath,
    displayPath: toDisplayPath(rootDisplayPrefix(root), renamedPath),
    name: path.posix.basename(renamedPath),
    renamed: true
  };
}

/**
 * The foreground command of a session's active pane, as the footer rail keys its
 * chip set on. A process can name itself almost anything, so this reaches the
 * client as a short lowercase basename or null — never as a path, and never long
 * enough to matter if it is echoed anywhere.
 */
function sanitizedPaneCommand(value) {
  if (typeof value !== 'string') {
    return null;
  }
  const base = value.trim().split('/').pop() || '';
  if (base.length === 0 || base.length > 32) {
    return null;
  }
  return /^[A-Za-z0-9._-]+$/.test(base) ? base.toLowerCase() : null;
}

async function listSessions() {
  try {
    // Use '|' not tab: tmux 3.3.x can rewrite \t to '_' in -F output, which
    // corrupted names like "vps-codex" into "vps-codex_1_0".
    const { stdout } = await execFileAsync(
      'tmux',
      [
        'list-sessions',
        '-F',
        // pane_current_command resolves against the session's active pane, so the
        // footer rail gets the foreground command without a second tmux call.
        '#{session_name}|#{session_windows}|#{session_attached}|#{pane_current_command}'
      ],
      { timeout: 3000, maxBuffer: 64 * 1024 }
    );
    return stdout
      .trim()
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const [name, windows, attached, command] = line.split('|');
        return {
          name,
          windows: Number(windows),
          attached: Number(attached),
          command: sanitizedPaneCommand(command)
        };
      })
      .filter((session) => validatedSessionName(session.name));
  } catch (error) {
    if (error.code === 1) {
      return [];
    }
    throw error;
  }
}

async function sessionExists(name) {
  try {
    await execFileAsync('tmux', ['has-session', '-t', `=${name}`], {
      timeout: 3000
    });
    return true;
  } catch (error) {
    if (error.code === 1) {
      return false;
    }
    throw error;
  }
}

async function ensureTmuxCapabilities() {
  const { stdout } = await execFileAsync(
    'tmux',
    ['show-options', '-gv', 'terminal-features'],
    { timeout: 3000, maxBuffer: 16 * 1024 }
  );
  const hasRgb = stdout
    .trim()
    .split('\n')
    .flatMap((line) => line.split(','))
    .some((line) => /^xterm.*(?:^|:)RGB(?:$|:)/.test(line));
  if (!hasRgb) {
    await execFileAsync(
      'tmux',
      ['set-option', '-ag', 'terminal-features', 'xterm*:RGB'],
      { timeout: 3000 }
    );
  }
  await execFileAsync(
    'tmux',
    ['set-environment', '-g', 'COLORTERM', 'truecolor'],
    { timeout: 3000 }
  );
  await execFileAsync(
    'tmux',
    ['set-option', '-g', 'mouse', 'on'],
    { timeout: 3000 }
  );
}

function validatedSessionLauncher(value) {
  const launcher = value === undefined ? 'terminal' : value;
  return typeof launcher === 'string' &&
    Object.hasOwn(sessionLauncherCommands, launcher)
    ? launcher
    : null;
}

async function resolvedSessionLauncherCommand(launcher) {
  const command = sessionLauncherCommands[launcher];
  if (!command) {
    return null;
  }
  const searchDirectories = String(process.env.PATH || '')
    .split(path.delimiter)
    .filter((entry) => path.isAbsolute(entry));
  for (const directory of searchDirectories) {
    const candidate = path.join(directory, command);
    try {
      const stats = await fs.promises.stat(candidate);
      if (!stats.isFile()) {
        continue;
      }
      await fs.promises.access(candidate, fs.constants.X_OK);
      return await fs.promises.realpath(candidate);
    } catch {
      // Keep searching. Missing launchers become a safe 503 below.
    }
  }
  const error = new Error(`${launcher} launcher is unavailable`);
  error.statusCode = 503;
  throw error;
}

async function sessionWorkingDirectory(rootId, relativePath) {
  if (rootId === undefined && relativePath === undefined) {
    await fs.promises.access(projectRoot, fs.constants.R_OK | fs.constants.X_OK);
    return projectRoot;
  }
  const root = fsRootFromQuery(rootId);
  const resolved = await resolveJailedPath(root.rootPath, relativePath || '', {
    mustExist: true
  });
  if (!resolved.stats.isDirectory()) {
    const error = new Error('session path must be a directory');
    error.statusCode = 400;
    throw error;
  }
  await fs.promises.access(
    resolved.absolutePath,
    fs.constants.R_OK | fs.constants.X_OK
  );
  return resolved.absolutePath;
}

async function createSession(name, options = {}) {
  const launcher = validatedSessionLauncher(options.launcher);
  if (!launcher) {
    const error = new Error(
      'launcher must be terminal, codex, grok or claude'
    );
    error.statusCode = 400;
    throw error;
  }
  if (await sessionExists(name)) {
    const error = new Error('session already exists');
    error.statusCode = 409;
    throw error;
  }
  const workingDirectory = await sessionWorkingDirectory(
    options.root,
    options.path
  );
  const args = ['new-session', '-d', '-s', name, '-c', workingDirectory];
  const command = await resolvedSessionLauncherCommand(launcher);
  if (command) {
    args.push(command);
  }
  await execFileAsync(
    'tmux',
    args,
    { timeout: 5000 }
  );
  return launcher;
}

async function killSession(name) {
  if (!(await sessionExists(name))) {
    const error = new Error('session does not exist');
    error.statusCode = 404;
    throw error;
  }
  await execFileAsync('tmux', ['kill-session', '-t', `=${name}`], {
    timeout: 5000
  });
}

async function renameSession(name, nextName) {
  if (!(await sessionExists(name))) {
    const error = new Error('session does not exist');
    error.statusCode = 404;
    throw error;
  }
  if (name === nextName) {
    return nextName;
  }
  if (await sessionExists(nextName)) {
    const error = new Error('session already exists');
    error.statusCode = 409;
    throw error;
  }
  await execFileAsync(
    'tmux',
    ['rename-session', '-t', `=${name}`, nextName],
    { timeout: 5000 }
  );
  return nextName;
}

const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/manifest+json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.webmanifest', 'application/manifest+json; charset=utf-8'],
  ['.woff2', 'font/woff2']
]);
const preferencesSubjectPlaceholder = '__VPS_PREFERENCES_SUBJECT__';
const buildIdPlaceholder = '__VPS_BUILD_ID__';
/**
 * The same build id, but safe in a query string.
 *
 * buildId is `version+base36(mtime)`, and a raw `+` in a query string decodes to
 * a space — so an asset URL carrying it would never match buildId on the way
 * back in, and every asset would silently stay no-store. The URLs carry the
 * encoded form; this placeholder is what puts it there.
 */
const buildTagPlaceholder = '__VPS_BUILD_TAG__';
/**
 * The vendored bundle's own version, so a deploy that changed only app code does
 * not throw it away.
 *
 * Every asset used to share buildId, and buildId is the newest mtime across
 * app.js, app.css and index.html — so any app change rotated the vendor URLs too
 * and 619 KB of xterm, its addons and the two woff2 faces came down again for
 * nothing. Measured: about 189 KB gzipped per deploy, on files that had not
 * changed since the dependency was last bumped.
 *
 * Content, not mtime. `scripts/install-vps-terminal` re-vendors from
 * node_modules with `install -m 600`, which stamps a fresh mtime on every deploy
 * whether or not the bytes differ — so an mtime-based tag would rotate exactly as
 * often as buildId and buy nothing. This is what "a hashed URL" meant.
 */
const vendorTagPlaceholder = '__VPS_VENDOR_TAG__';

/**
 * Extensions worth compressing. woff2 is already compressed and svg is small
 * enough here that the round trip costs more than it saves.
 */
const compressibleExtensions = new Set(['.css', '.js', '.json', '.webmanifest']);

/**
 * Types the Files preview will render inline instead of handing over as a
 * download. Kept to a fixed list rather than sniffing: an inline Content-Type is
 * an instruction to the browser to render, so it has to be one this server is
 * willing to be responsible for. Nothing scriptable is in it — no SVG, which
 * renders as a document and can carry script.
 */
const inlineImageTypes = new Map([
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.gif', 'image/gif'],
  ['.webp', 'image/webp'],
  ['.avif', 'image/avif'],
  ['.bmp', 'image/bmp'],
  ['.ico', 'image/x-icon']
]);

/**
 * Below this, a gzip frame is a rounding error against one TCP round trip.
 */
const minimumCompressibleBytes = 1024;

/**
 * Gzipped bodies, keyed by file identity so a redeploy invalidates them.
 *
 * The whole public tree is 1.19 MB raw and 305 KB gzipped, so holding the
 * compressed copies costs less memory than one session's scrollback. Without
 * this, every open would re-compress half a megabyte of app.js.
 */
const compressedStaticCache = new Map();

async function gzipStaticBody(filePath, stats, body) {
  const key = `${filePath}:${stats.mtimeMs}:${stats.size}`;
  const cached = compressedStaticCache.get(key);
  if (cached) {
    return cached;
  }
  const compressed = await gzipAsync(body);
  // A file that does not shrink is served as-is rather than padded.
  if (compressed.length >= body.length) {
    return null;
  }
  compressedStaticCache.set(key, compressed);
  return compressed;
}

function acceptsGzip(request) {
  const header = request.headers['accept-encoding'];
  return typeof header === 'string' && /\bgzip\b/i.test(header);
}

/**
 * A short identifier for the running build, shown in Settings.
 *
 * Derived from the package version plus the newest modification time across the
 * client's own files, so it changes on every install without needing a build step
 * or a git checkout — the public package has neither. Computed once at boot: a
 * reinstall restarts the service, so a stale value cannot outlive the files it
 * describes.
 *
 * This exists because "is the deploy live, or is my page stale?" is otherwise
 * unanswerable from the client, and guessing wrong costs a debugging session.
 *
 * app.css is in the list because it used to not be. A stylesheet-only deploy left
 * the marker identical, so the one check meant to catch a stale client reported
 * success without looking at the file that had changed.
 */
const buildId = (() => {
  let version = '0.0.0';
  try {
    version = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8')
    ).version || version;
  } catch {
    // An unreadable package.json should not stop the server booting.
  }
  let newest = 0;
  for (const name of ['app.js', 'app.css', 'index.html']) {
    try {
      newest = Math.max(newest, fs.statSync(path.join(publicRoot, name)).mtimeMs);
    } catch {
      // A missing client file is a bigger problem, reported elsewhere.
    }
  }
  const stamp = Math.floor(newest / 1000).toString(36);
  return `${version}+${stamp}`;
})();

/** Everything under public/vendor/, which is the whole vendored bundle. */
const vendorRoot = path.join(publicRoot, 'vendor');

// ---- Start of the pure asset-tag block. ----
/**
 * A hash of the vendored bytes. Changes when a dependency is re-vendored and at
 * no other time, which is the whole point — see vendorTagPlaceholder.
 *
 * Names go into the hash alongside the contents, so renaming a file is a change
 * even when the bytes are identical. Sorted, or readdir order would decide the
 * tag. One pass over 619 KB at boot.
 *
 * Returns null when the directory cannot be read, so the caller decides what a
 * broken install should serve.
 */
function hashVendorAssets(directory, io = fs) {
  try {
    const hash = crypto.createHash('sha256');
    for (const name of io.readdirSync(directory).sort()) {
      hash.update(name);
      hash.update(io.readFileSync(path.join(directory, name)));
    }
    return hash.digest('hex').slice(0, 12);
  } catch {
    return null;
  }
}

/**
 * The version an asset's URL has to carry to be cacheable.
 *
 * Two namespaces: the vendored bundle answers to its content hash, everything
 * else to the deploy's buildId. A URL carrying the wrong one is served no-store,
 * which is the same answer a hand-typed URL gets.
 */
function assetTagForPath(normalizedPath, tags) {
  return normalizedPath.startsWith('/vendor/') ? tags.vendor : tags.build;
}
// ---- End of the pure asset-tag block. ----

// No `+`, so unlike buildId this needs no separate encoded form. A missing vendor
// directory is a broken install, reported elsewhere; falling back to buildId keeps
// the URLs valid and merely caches them less well.
const vendorTag = hashVendorAssets(vendorRoot) || buildId;

function expectedAssetTag(normalizedPath) {
  return assetTagForPath(normalizedPath, { vendor: vendorTag, build: buildId });
}


async function serveStatic(request, response) {
  const url = new URL(request.url, publicOrigin);
  const requestedPath = url.pathname === '/' ? '/index.html' : url.pathname;
  const normalizedPath = path.posix.normalize(requestedPath);
  if (normalizedPath.includes('..')) {
    sendError(response, 404, 'not found');
    return;
  }
  const filePath = path.join(publicRoot, normalizedPath);
  if (!filePath.startsWith(`${publicRoot}${path.sep}`)) {
    sendError(response, 404, 'not found');
    return;
  }
  try {
    let body = await fs.promises.readFile(filePath);
    // index.html is the only response carrying a per-user value, and that is the
    // distinction the two flags below draw. Both files are templated; only one
    // has an identity in it, and only that one stays uncompressed.
    const carriesIdentity = normalizedPath === '/index.html';
    if (carriesIdentity) {
      const email = authenticatedEmail(request);
      body = Buffer.from(
        body
          .toString('utf8')
          .replaceAll(
            preferencesSubjectPlaceholder,
            email ? preferencesIdentity(email) : ''
          )
          .replaceAll(buildIdPlaceholder, buildId)
          .replaceAll(buildTagPlaceholder, encodeURIComponent(buildId))
          .replaceAll(vendorTagPlaceholder, vendorTag),
        'utf8'
      );
    } else if (path.extname(filePath) === '.css') {
      // app.css carries the font URLs, and those are the only asset references
      // outside index.html. Substituting here is what lets them be versioned and
      // therefore cached, rather than being the one thing refetched every open.
      body = Buffer.from(
        body
          .toString('utf8')
          .replaceAll(buildTagPlaceholder, encodeURIComponent(buildId))
          .replaceAll(vendorTagPlaceholder, vendorTag),
        'utf8'
      );
    }
    setSecurityHeaders(response);
    // A request that names its version can be cached forever, because the name
    // changes when the file does — index.html is served no-store and rewrites
    // every ?v= on each deploy, so a client can never keep an old asset without
    // also keeping the old page that asked for it.
    //
    // The vendored bundle answers to its content hash rather than to buildId, so a
    // deploy that only changed app code leaves it cached. Everything else answers
    // to buildId.
    //
    // Without a version, or with the wrong one, the answer stays no-store — which
    // keeps a hand-typed URL and any old cached page honest.
    if (url.searchParams.get('v') === expectedAssetTag(normalizedPath)) {
      response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    response.statusCode = 200;
    response.setHeader(
      'Content-Type',
      mimeTypes.get(path.extname(filePath)) || 'application/octet-stream'
    );
    // Compress the bundle, which is what a phone on a bad connection is actually
    // waiting for: measured, the critical set is 1.19 MB raw and 305 KB gzipped,
    // and app.js alone is 496K against 136K. Nothing else about the wait moves
    // that much for this little.
    //
    // index.html is deliberately excluded even though it would compress. It is
    // the one response with a per-user value substituted into it, and keeping
    // every response that carries an identity uncompressed means this cannot
    // become a BREACH-shaped question later. It is 31 KB of the 1.19 MB, so the
    // exclusion costs almost nothing.
    //
    // Vary matters even with no cache in front today: without it, anything that
    // caches later would hand a gzipped body to a client that never asked.
    response.setHeader('Vary', 'Accept-Encoding');
    if (
      !carriesIdentity &&
      acceptsGzip(request) &&
      compressibleExtensions.has(path.extname(filePath)) &&
      body.length >= minimumCompressibleBytes
    ) {
      const stats = await fs.promises.stat(filePath);
      const compressed = await gzipStaticBody(filePath, stats, body);
      if (compressed) {
        response.setHeader('Content-Encoding', 'gzip');
        response.end(compressed);
        return;
      }
    }
    response.end(body);
  } catch (error) {
    if (error.code === 'ENOENT') {
      sendError(response, 404, 'not found');
      return;
    }
    throw error;
  }
}

const server = http.createServer(async (request, response) => {
  try {
    const requestEmail = authenticatedEmail(request);
    if (!requestEmail) {
      sendError(response, 401, 'authentication required');
      return;
    }

    const url = new URL(request.url, publicOrigin);
    if (request.method === 'GET' && url.pathname === '/api/config') {
      sendJson(response, 200, {
        appName: appDisplayName,
        localDev: localDevMode,
        clientDebug: clientDebugEnabled
      });
      return;
    }

    if (request.method === 'GET' && url.pathname === '/api/sessions') {
      sendJson(response, 200, { sessions: await listSessions() });
      return;
    }

    if (request.method === 'GET' && url.pathname === '/api/snippets') {
      sendJson(response, 200, await readSnippetsDocument());
      return;
    }

    if (request.method === 'GET' && url.pathname === '/api/preferences') {
      sendJson(response, 200, await preferencesStore.read(requestEmail));
      return;
    }

    if (request.method === 'PUT' && url.pathname === '/api/preferences') {
      if (
        !requestOriginIsValid(request) ||
        request.headers['content-type'] !== 'application/json'
      ) {
        sendError(response, 403, 'request rejected');
        return;
      }
      let value;
      try {
        value = JSON.parse(
          await readBody(request, maximumPreferencesBodyBytes)
        );
      } catch (error) {
        if (/too large/i.test(error.message)) {
          sendError(response, 413, 'preferences document is too large');
          return;
        }
        sendError(response, 400, 'invalid JSON body');
        return;
      }
      if (value?.expectedSubject !== preferencesIdentity(requestEmail)) {
        sendError(response, 412, 'authentication context changed; reload setup');
        return;
      }
      const saved = await preferencesStore.write(
        requestEmail,
        value?.expectedRevision,
        value?.preferences
      );
      sendJson(response, 200, saved);
      return;
    }

    if (request.method === 'PUT' && url.pathname === '/api/snippets') {
      if (
        !requestOriginIsValid(request) ||
        request.headers['content-type'] !== 'application/json'
      ) {
        sendError(response, 403, 'request rejected');
        return;
      }
      let value;
      try {
        value = JSON.parse(await readBody(request, maximumSnippetsBodyBytes));
      } catch (error) {
        if (/too large/i.test(error.message)) {
          sendError(response, 413, 'snippets document is too large');
          return;
        }
        sendError(response, 400, 'invalid JSON body');
        return;
      }
      const saved = await writeSnippetsDocument(value);
      sendJson(response, 200, saved);
      return;
    }

    if (request.method === 'POST' && url.pathname === '/api/client-debug') {
      if (!clientDebugEnabled) {
        sendError(response, 404, 'not found');
        return;
      }
      if (
        !requestOriginIsValid(request) ||
        request.headers['content-type'] !== 'application/json'
      ) {
        sendError(response, 403, 'request rejected');
        return;
      }
      let value;
      try {
        value = JSON.parse(await readBody(request, 16 * 1024));
      } catch {
        sendError(response, 400, 'invalid JSON body');
        return;
      }
      const entries = Array.isArray(value.entries) ? value.entries : [];
      const written = await appendClientDebugEntries(
        entries.slice(0, maximumClientDebugEntries)
      );
      sendJson(response, 200, { written });
      return;
    }

    if (request.method === 'POST' && url.pathname === '/api/paste-image') {
      if (!requestOriginIsValid(request)) {
        sendError(response, 403, 'request rejected');
        return;
      }
      const contentType = String(request.headers['content-type'] || '')
        .split(';')[0]
        .trim()
        .toLowerCase();
      if (!contentType.startsWith('image/')) {
        sendError(response, 415, 'content type must be an image');
        return;
      }
      let buffer;
      try {
        buffer = await readBinaryBody(request, maximumPasteImageBytes);
      } catch (error) {
        if (error.statusCode === 413 || /too large/i.test(error.message)) {
          sendError(response, 413, 'image is too large (max 5 MB)');
          return;
        }
        throw error;
      }
      if (buffer.length === 0) {
        sendError(response, 400, 'empty image body');
        return;
      }
      const saved = await savePasteImage(buffer);
      sendJson(response, 201, saved);
      return;
    }

    if (request.method === 'GET' && url.pathname === '/api/fs/roots') {
      sendJson(response, 200, {
        roots: Object.values(fsRootCatalog).map((entry) => ({
          id: entry.id,
          label: entry.label,
          displayPrefix: rootDisplayPrefix(entry),
          writable: entry.writable !== false
        }))
      });
      return;
    }

    if (request.method === 'GET' && url.pathname === '/api/fs/resolve') {
      const resolved = await resolveFsTerminalPath(
        url.searchParams.get('session'),
        url.searchParams.get('path') || ''
      );
      sendJson(response, 200, resolved);
      return;
    }

    if (request.method === 'GET' && url.pathname === '/api/fs/count') {
      sendJson(
        response,
        200,
        await countFsEntries(
          url.searchParams.get('root'),
          url.searchParams.get('path') || ''
        )
      );
      return;
    }

    if (request.method === 'GET' && url.pathname === '/api/fs/list') {
      const listing = await listFsDirectory(
        url.searchParams.get('root'),
        url.searchParams.get('path') || ''
      );
      sendJson(response, 200, listing);
      return;
    }

    if (request.method === 'GET' && url.pathname === '/api/fs/read') {
      const preview = await readFsPreview(
        url.searchParams.get('root'),
        url.searchParams.get('path') || ''
      );
      sendJson(response, 200, preview);
      return;
    }

    if (request.method === 'GET' && url.pathname === '/api/fs/download') {
      const file = await openFsDownload(
        url.searchParams.get('root'),
        url.searchParams.get('path') || ''
      );
      setSecurityHeaders(response);
      response.statusCode = 200;
      // Inline only for a known image type, and only when asked. Everything else
      // stays an octet-stream attachment, which is what makes a file the browser
      // does not understand a download rather than something it tries to render.
      const inlineType = inlineImageTypes.get(
        path.extname(file.fileName).toLowerCase()
      );
      const serveInline = url.searchParams.get('inline') === '1' && inlineType;
      response.setHeader(
        'Content-Type',
        serveInline ? inlineType : 'application/octet-stream'
      );
      response.setHeader(
        'Content-Disposition',
        serveInline
          ? 'inline'
          : `attachment; filename="${file.fileName.replace(/"/g, '')}"`
      );
      response.setHeader('Content-Length', String(file.size));
      const stream = fs.createReadStream(file.absolutePath);
      stream.on('error', () => {
        if (!response.headersSent) {
          sendError(response, 500, 'download failed');
        } else {
          response.destroy();
        }
      });
      stream.pipe(response);
      return;
    }

    if (request.method === 'POST' && url.pathname === '/api/fs/upload') {
      if (!requestOriginIsValid(request)) {
        sendError(response, 403, 'request rejected');
        return;
      }
      const fileName =
        url.searchParams.get('filename') ||
        request.headers['x-file-name'] ||
        '';
      let buffer;
      try {
        buffer = await readBinaryBody(request, maximumFsUploadBytes);
      } catch (error) {
        if (error.statusCode === 413 || /too large/i.test(error.message)) {
          sendError(response, 413, 'file is too large (max 20 MB)');
          return;
        }
        throw error;
      }
      if (buffer.length === 0) {
        sendError(response, 400, 'empty file body');
        return;
      }
      const saved = await writeFsUpload(
        url.searchParams.get('root'),
        url.searchParams.get('path') || '',
        fileName,
        buffer
      );
      sendJson(response, 201, saved);
      return;
    }

    if (request.method === 'DELETE' && url.pathname === '/api/fs/entry') {
      if (!requestOriginIsValid(request)) {
        sendError(response, 403, 'request rejected');
        return;
      }
      const result = await deleteFsEntry(
        url.searchParams.get('root'),
        url.searchParams.get('path') || '',
        { recursive: url.searchParams.get('recursive') === '1' }
      );
      sendJson(response, 200, result);
      return;
    }

    if (
      request.method === 'POST' &&
      url.pathname === '/api/fs/directory'
    ) {
      if (
        !requestOriginIsValid(request) ||
        request.headers['content-type'] !== 'application/json'
      ) {
        sendError(response, 403, 'request rejected');
        return;
      }
      let value;
      try {
        value = JSON.parse(await readBody(request));
      } catch {
        sendError(response, 400, 'invalid JSON body');
        return;
      }
      if (!value || typeof value !== 'object' || Array.isArray(value)) {
        sendError(response, 400, 'JSON body must be an object');
        return;
      }
      const result = await createFsDirectory(
        value.root,
        value.path || '',
        value.name
      );
      sendJson(response, 201, result);
      return;
    }

    if (
      request.method === 'PATCH' &&
      url.pathname === '/api/fs/entry'
    ) {
      if (
        !requestOriginIsValid(request) ||
        request.headers['content-type'] !== 'application/json'
      ) {
        sendError(response, 403, 'request rejected');
        return;
      }
      let value;
      try {
        value = JSON.parse(await readBody(request));
      } catch {
        sendError(response, 400, 'invalid JSON body');
        return;
      }
      if (!value || typeof value !== 'object' || Array.isArray(value)) {
        sendError(response, 400, 'JSON body must be an object');
        return;
      }
      const result = await renameFsEntry(
        value.root,
        value.path || '',
        value.name
      );
      sendJson(response, 200, result);
      return;
    }

    if (request.method === 'POST' && url.pathname === '/api/sessions') {
      if (
        !requestOriginIsValid(request) ||
        request.headers['content-type'] !== 'application/json'
      ) {
        sendError(response, 403, 'request rejected');
        return;
      }
      let value;
      try {
        value = JSON.parse(await readBody(request));
      } catch {
        sendError(response, 400, 'invalid JSON body');
        return;
      }
      if (!value || typeof value !== 'object' || Array.isArray(value)) {
        sendError(response, 400, 'JSON body must be an object');
        return;
      }
      const name = validatedSessionName(value.name);
      if (!name) {
        sendError(
          response,
          400,
          'name must be 1-32 characters using letters, numbers, dot, dash or underscore'
        );
        return;
      }
      const launcher = await createSession(name, {
        root: value.root,
        path: value.path,
        launcher: value.launcher
      });
      sendJson(response, 201, { name, launcher });
      return;
    }

    if (
      request.method === 'DELETE' &&
      url.pathname.startsWith('/api/sessions/')
    ) {
      if (!requestOriginIsValid(request)) {
        sendError(response, 403, 'request rejected');
        return;
      }
      const name = validatedSessionName(
        decodeURIComponent(url.pathname.slice('/api/sessions/'.length))
      );
      if (!name) {
        sendError(response, 400, 'invalid session name');
        return;
      }
      await killSession(name);
      sendJson(response, 200, { name });
      return;
    }

    if (
      request.method === 'PATCH' &&
      url.pathname.startsWith('/api/sessions/')
    ) {
      if (
        !requestOriginIsValid(request) ||
        request.headers['content-type'] !== 'application/json'
      ) {
        sendError(response, 403, 'request rejected');
        return;
      }
      const name = validatedSessionName(
        decodeURIComponent(url.pathname.slice('/api/sessions/'.length))
      );
      if (!name) {
        sendError(response, 400, 'invalid session name');
        return;
      }
      let value;
      try {
        value = JSON.parse(await readBody(request));
      } catch {
        sendError(response, 400, 'invalid JSON body');
        return;
      }
      const nextName = validatedSessionName(value.name);
      if (!nextName) {
        sendError(
          response,
          400,
          'name must be 1-32 characters using letters, numbers, dot, dash or underscore'
        );
        return;
      }
      const renamed = await renameSession(name, nextName);
      sendJson(response, 200, { name: renamed, previousName: name });
      return;
    }

    if (request.method === 'GET') {
      await serveStatic(request, response);
      return;
    }
    sendError(response, 405, 'method not allowed');
  } catch (error) {
    const status = error.statusCode || 500;
    if (status === 500) {
      console.error('request failed');
    }
    if (status === 409 && Number.isSafeInteger(error.revision)) {
      sendJson(response, status, {
        error: error.message,
        revision: error.revision
      });
      return;
    }
    sendError(response, status, status === 500 ? 'internal error' : error.message);
  }
});

const websocketServer = new WebSocketServer({ noServer: true, maxPayload: 65536 });

server.on('upgrade', async (request, socket, head) => {
  let reservedSlot = false;
  try {
    const url = new URL(request.url, publicOrigin);
    const name = validatedSessionName(url.searchParams.get('session'));
    // One opaque 403 for four different refusals made this impossible to diagnose
    // from the outside. The reason is a fixed string — never the session name, the
    // path, or the email — so it stays safe to log.
    const refusal =
      url.pathname !== '/ws'
        ? 'path'
        : !name
          ? 'session-name'
          : !authenticatedEmail(request)
            ? 'auth'
            : !requestOriginIsValid(request)
              ? 'origin'
              : connections.size + pendingConnections >= maximumConnections
                ? 'capacity'
                : null;
    if (refusal) {
      console.warn(
        `vps-terminal: refused websocket upgrade (${refusal}) ` +
          `connections=${connections.size} pending=${pendingConnections}`
      );
      socket.write('HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n');
      socket.destroy();
      return;
    }
    pendingConnections += 1;
    reservedSlot = true;
    if (!(await sessionExists(name))) {
      socket.write('HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n');
      socket.destroy();
      return;
    }
    await ensureTmuxCapabilities();
    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      // The slot is released by the `finally` below, which runs whether or not this
      // callback is synchronous. Releasing it here as well double-counted.
      websocketServer.emit('connection', websocket, request, name);
    });
  } catch {
    socket.destroy();
  } finally {
    if (reservedSlot) {
      pendingConnections -= 1;
    }
  }
});

websocketServer.on('connection', (websocket, request, name) => {
  let terminal;
  try {
    terminal = pty.spawn(
      attachSessionPath,
      [name],
      {
        name: 'xterm-256color',
        cols: 80,
        rows: 24,
        cwd: projectRoot,
        env: {
          ...process.env,
          COLORTERM: 'truecolor',
          TERM: 'xterm-256color'
        }
      }
    );
  } catch {
    websocket.close(1011, 'terminal unavailable');
    return;
  }
  connections.add(websocket);

  const lifetime = setTimeout(() => websocket.close(1000, 'session expired'), websocketLifetimeMs);
  // A page that navigates away or is killed often leaves the socket half-open: no
  // close frame arrives, so `connections` never shrinks. Pinging without checking
  // for the pong meant those entries lived until the lifetime timer, and with
  // maximumConnections at 10 roughly ten reloads locked the app out entirely —
  // sessions still listed, but every upgrade was refused for capacity.
  let awaitingPong = false;
  websocket.on('pong', () => {
    awaitingPong = false;
  });
  const ping = setInterval(() => {
    if (websocket.readyState !== websocket.OPEN) {
      return;
    }
    if (awaitingPong) {
      // Missed the previous round trip: the peer is gone.
      websocket.terminate();
      return;
    }
    awaitingPong = true;
    websocket.ping();
  }, 30000);

  terminal.onData((data) => {
    if (websocket.readyState === websocket.OPEN) {
      websocket.send(data);
    }
  });
  terminal.onExit(() => websocket.close(1000, 'terminal closed'));
  websocket.on('error', () => websocket.terminate());

  websocket.on('message', (buffer, isBinary) => {
    if (isBinary) {
      return;
    }
    try {
      const message = JSON.parse(buffer.toString('utf8'));
      if (message.type === 'input' && typeof message.data === 'string') {
        terminal.write(message.data.slice(0, maximumInputLength));
      } else if (
        message.type === 'resize' &&
        Number.isInteger(message.cols) &&
        Number.isInteger(message.rows) &&
        message.cols >= 10 &&
        message.cols <= 500 &&
        message.rows >= 3 &&
        message.rows <= 300
      ) {
        terminal.resize(message.cols, message.rows);
      }
    } catch {
      websocket.close(1003, 'invalid message');
    }
  });

  websocket.on('close', () => {
    clearTimeout(lifetime);
    clearInterval(ping);
    connections.delete(websocket);
    terminal.kill();
  });
});

function removeOwnedSocket() {
  if (!socketPath) {
    return;
  }
  try {
    const metadata = fs.lstatSync(socketPath);
    if (!metadata.isSocket()) {
      throw new Error('refusing to replace non-socket terminal path');
    }
    fs.unlinkSync(socketPath);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}

if (socketPath) {
  removeOwnedSocket();
  server.listen(socketPath, () => {
    fs.chmodSync(socketPath, 0o660);
    console.log('vps-terminal listening on private Unix socket');
    schedulePasteImagePrune();
  });
} else {
  server.listen(port, host, () => {
    if (localDevMode) {
      console.log(
        `vps-terminal LOCAL DEV (no OAuth) on http://${host}:${port} as ${localDevEmail}`
      );
    } else {
      console.log(`vps-terminal listening on ${host}:${port}`);
    }
    schedulePasteImagePrune();
  });
}

function shutdown() {
  for (const websocket of connections) {
    websocket.close(1001, 'service restarting');
  }
  server.close(() => {
    removeOwnedSocket();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 5000).unref();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
