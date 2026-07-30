'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');
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

async function deleteFsEntry(rootId, relativePath) {
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
    // Only empty directories — no recursive rm.
    await fs.promises.rmdir(resolved.absolutePath);
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

async function createSession(name) {
  if (await sessionExists(name)) {
    const error = new Error('session already exists');
    error.statusCode = 409;
    throw error;
  }
  await fs.promises.access(projectRoot, fs.constants.R_OK | fs.constants.X_OK);
  await execFileAsync(
    'tmux',
    ['new-session', '-d', '-s', name, '-c', projectRoot],
    { timeout: 5000 }
  );
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
 * A short identifier for the running build, shown in Settings.
 *
 * Derived from the package version plus the client bundle's modification time, so
 * it changes on every install without needing a build step or a git checkout — the
 * public package has neither. Computed once at boot: a reinstall restarts the
 * service, so a stale value cannot outlive the files it describes.
 *
 * This exists because "is the deploy live, or is my page stale?" is otherwise
 * unanswerable from the client, and guessing wrong costs a debugging session.
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
  let stamp = '0';
  try {
    stamp = Math.floor(
      fs.statSync(path.join(publicRoot, 'app.js')).mtimeMs / 1000
    ).toString(36);
  } catch {
    // Likewise: a missing bundle is a bigger problem, reported elsewhere.
  }
  return `${version}+${stamp}`;
})();

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
    if (normalizedPath === '/index.html') {
      const email = authenticatedEmail(request);
      body = Buffer.from(
        body
          .toString('utf8')
          .replaceAll(
            preferencesSubjectPlaceholder,
            email ? preferencesIdentity(email) : ''
          )
          .replaceAll(buildIdPlaceholder, buildId),
        'utf8'
      );
    }
    setSecurityHeaders(response);
    response.statusCode = 200;
    response.setHeader(
      'Content-Type',
      mimeTypes.get(path.extname(filePath)) || 'application/octet-stream'
    );
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
      response.setHeader('Content-Type', 'application/octet-stream');
      response.setHeader(
        'Content-Disposition',
        `attachment; filename="${file.fileName.replace(/"/g, '')}"`
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
        url.searchParams.get('path') || ''
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
      const name = validatedSessionName(value.name);
      if (!name) {
        sendError(
          response,
          400,
          'name must be 1-32 characters using letters, numbers, dot, dash or underscore'
        );
        return;
      }
      await createSession(name);
      sendJson(response, 201, { name });
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
