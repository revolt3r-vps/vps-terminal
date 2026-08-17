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
/**
 * The home screen caption, which is not the tab title.
 *
 * iOS truncates the label under an icon at about twelve characters, so a
 * deployment whose VPS_TERMINAL_APP_NAME is longer than that gets an
 * unreadable caption if it reuses appDisplayName. Kept separate and short by
 * default; a deployment that wants its full name on the home screen sets this
 * to it.
 *
 * 12, not 64: a value that cannot fit is a value that will be cut by the phone
 * instead, and silently.
 */
const appShortName =
  (process.env.VPS_TERMINAL_APP_SHORT_NAME || 'Terminal').trim().slice(0, 12) ||
  'Terminal';
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
// Games view — a per-user reading of the same server, for someone who plays a
// game and writes feedback instead of reading eight sessions. A game is a
// directory under this root; the directory name is the slug.
const gamesRoot = path.resolve(
  process.env.VPS_TERMINAL_GAMES_ROOT || path.join(projectRoot, 'games')
);
// Where a slug is published. Empty disables the Play link, which is the right
// default for an install that has no public host per game.
const gameUrlTemplate = (() => {
  const template = (process.env.VPS_TERMINAL_GAME_URL || '').trim();
  if (!template) {
    return '';
  }
  if (!template.includes('{slug}') || !template.startsWith('https://')) {
    throw new Error(
      'VPS_TERMINAL_GAME_URL must be an https URL containing {slug}, ' +
        'e.g. https://{slug}.play.example.com/'
    );
  }
  return template;
})();
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
const maximumPasteImageBytes = 10 * 1024 * 1024;
const maximumPasteImageFiles = 200;
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

  // Games view offers this root and nothing else, so it has to exist as a root
  // of its own even though it also sits inside `projects`. Registered only when
  // the directory is there at boot, the same way `home` is opt-out: an install
  // with no games should not show an empty root.
  if (fs.existsSync(gamesRoot)) {
    catalog.games = {
      id: 'games',
      label: 'games',
      rootPath: gamesRoot,
      displayPrefix: displayPrefixForPath(gamesRoot, 'games'),
      writable: true
    };
  }

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
  return annotateParentRoots(catalog);
}

/**
 * Which root each root sits inside, so Files can climb out of one.
 *
 * `games` is `~/projects/games` and `paste` is `~/paste`, so the top of either
 * was a dead end: `parent` is null there and the up button switched off. The
 * only way out was the Locations strip, which a person reads as "the folder
 * above this one is gone". Each root now carries the next place up — the root
 * that contains it, and the path of its own parent directory inside that root.
 *
 * Compared on resolved paths, not realpath: a root reached through a symlink
 * simply reports no parent, which is the behaviour there has always been.
 */
function annotateParentRoots(catalog) {
  const roots = Object.values(catalog);
  for (const entry of roots) {
    let container = null;
    for (const other of roots) {
      if (other === entry) {
        continue;
      }
      // A root at `/` is its own separator. Appending one gives `//`, which
      // matches nothing, so an install that offers the filesystem root would
      // have left every other root with no way up.
      const prefix =
        other.rootPath === path.sep
          ? other.rootPath
          : `${other.rootPath}${path.sep}`;
      if (!entry.rootPath.startsWith(prefix)) {
        continue;
      }
      // Roots nest, so the most specific container wins: `~/projects/games`
      // is inside both `projects` and `home`, and up means `projects`.
      if (!container || other.rootPath.length > container.rootPath.length) {
        container = other;
      }
    }
    if (!container) {
      entry.parentRoot = null;
      continue;
    }
    const relative = path
      .relative(container.rootPath, entry.rootPath)
      .split(path.sep);
    entry.parentRoot = {
      id: container.id,
      path: relative.slice(0, -1).join('/'),
      name: relative.at(-1) || ''
    };
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
// 24 hours covers a whole working session without leaving clutter forever.
const pasteImageTtlMs = 24 * 60 * 60 * 1000;
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
const sessionLoginShell = process.env.SHELL || '/bin/bash';
const sessionBrowserOpener = process.env.BROWSER || '';
const authenticatedEmailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
// The game studio: the directory the `new-game` skill lives in, and how the
// sessions the Settings button starts are named. Both have defaults, so an
// install that follows the documented layout sets neither. Declared here, after
// the session-name rule, so the names are held to that one rule and not a copy
// of it.
const gameStudioDirectory = path.resolve(
  process.env.VPS_TERMINAL_GAME_STUDIO_DIR || path.join(projectRoot, 'game-lab')
);
// A prefix, not a session name: each tap gets `lab-1`, `lab-2`, and so on. One
// shared session would need windows to hold two interviews, and the session rail
// is the only navigation this app has — it lists sessions, so a second window
// was a conversation nobody could reach.
//
// Deliberately not `game-`: `gameForSession` reads `game-<rest>` as a game when
// `rest` starts with a real slug, so `game-lab-2` would turn into a game the day
// somebody makes a game called `lab`.
const gameStudioSessionPrefix = (
  process.env.VPS_TERMINAL_GAME_STUDIO_SESSION || 'lab'
).trim();
// The one thing that button types, held here and never sent by the page.
// Anything typed at an agent runs, so this string cannot be assembled from a
// field, a session name, or anything a browser passed in.
const gameStudioPrompt = '/new-game';
const gameStudioLauncher = 'claude';
// Refuse to start rather than fail at the tap, the same way an unusable game
// URL template does. Checked against the names actually created, at both ends of
// the number range, because the prefix is never a session name on its own.
if (
  !validatedSessionName(`${gameStudioSessionPrefix}-1`) ||
  !validatedSessionName(`${gameStudioSessionPrefix}-999`)
) {
  throw new Error(
    'VPS_TERMINAL_GAME_STUDIO_SESSION must be a prefix that forms a valid tmux ' +
      'session name with `-<number>` appended'
  );
}
const studioSessionPattern = new RegExp(
  `^${gameStudioSessionPrefix.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&')}-\\d+$`
);
// A tmux user option, set on the interview's own session by the pane that ran
// the agent, once the agent is gone. This is what the sweep reads.
//
// Not the pane's command: `pane_current_command` reports the shell for anything
// that does not take over the foreground process group, so an agent that is a
// shell script reads exactly like a finished one, and the sweep would kill a
// conversation in progress. A mark set by the pane itself cannot be wrong about
// that.
const studioFinishedOption = '@vps-terminal-studio-finished';


const connections = new Set();
let pendingConnections = 0;
// The control channel: one socket per open tab, carrying messages from the
// server to the page. It is separate from the terminal socket on purpose. That
// one is a byte pipe running a PTY, and framing JSON into it would put the
// app's own messages in the same stream as whatever a program prints.
//
// Kept apart from `connections` for the cap as well. A control socket holds no
// PTY and no tmux client, so counting it against the terminal cap would halve
// the number of terminals a person can open.
const controlConnections = new Map();
const maximumControlConnections = 20;
const controlPath = '/control';

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

/**
 * Whether this request came from a local process rather than through the proxy.
 *
 * In production the server listens on a Unix socket and Caddy is the only thing
 * in front of it. Caddy deletes any client-supplied identity header and sets
 * `X-Vps-Authenticated-Email` from the verified login, so a request that
 * carries no identity header did not come from a browser: it came from
 * something on this host that can open the socket file, which is the same
 * privilege as running tmux directly.
 *
 * The forwarding headers are a second signal. Caddy sets them on everything it
 * proxies and a local caller sets none, so their presence means the request
 * came through the edge even if the identity header went missing.
 *
 * A TCP bind with no proxy in front is never trusted here. Local dev mode is,
 * because it binds a private address and has no login at all.
 */
function isLocalControlRequest(request) {
  if (localDevMode) {
    return true;
  }
  if (!socketPath) {
    return false;
  }
  if (typeof request.headers['x-vps-authenticated-email'] === 'string') {
    return false;
  }
  return !(
    request.headers['x-forwarded-for'] ||
    request.headers['x-forwarded-proto'] ||
    request.headers['x-forwarded-host']
  );
}

/**
 * Who a control message is for.
 *
 * `all` is the default and the honest one for this host: one person uses it.
 * The parameter exists so the day a second login shares the terminal, the
 * caller says whose tab to move rather than moving everybody's.
 */
function validatedControlTarget(value) {
  if (value === undefined || value === null || value === 'all') {
    return null;
  }
  if (typeof value !== 'string' || !authenticatedEmailPattern.test(value)) {
    return undefined;
  }
  return value.toLowerCase();
}

function broadcastControlMessage(message, target) {
  const payload = JSON.stringify(message);
  let delivered = 0;
  for (const [websocket, email] of controlConnections) {
    if (target && target !== email) {
      continue;
    }
    if (websocket.readyState !== websocket.OPEN) {
      continue;
    }
    websocket.send(payload);
    delivered += 1;
  }
  return delivered;
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

/**
 * Rewrite an uploaded name into the allowed set instead of refusing it.
 *
 * Phones hand over names with spaces, brackets, and accents. Refusing the
 * upload for that is a dead end: the file does not exist yet, so there is
 * nothing for the user to rename. Rewrite it, and let the caller report the
 * name that was actually written.
 */
function safeUploadFileName(name) {
  if (typeof name !== 'string') {
    return null;
  }
  const base = path.basename(name.trim());
  if (!base) {
    return null;
  }
  // Drop accents rather than replacing them, so "résumé" stays "resume"
  // instead of becoming "r-sum-".
  const flattened = base.normalize('NFD').replace(/\p{M}+/gu, '');
  // `dot > 0` keeps a leading-dot name whole, so ".bashrc" becomes "bashrc"
  // rather than an empty stem with a ".bashrc" extension.
  const dot = flattened.lastIndexOf('.');
  const hasExtension =
    dot > 0 && /^\.[A-Za-z0-9]{1,8}$/.test(flattened.slice(dot));
  const extension = hasExtension ? flattened.slice(dot).toLowerCase() : '';
  const stem = clampUploadStem(
    hasExtension ? flattened.slice(0, dot) : flattened,
    maximumFsFileNameLength - extension.length
  );
  const safe = `${stem}${extension}`;
  // The rewrite is only worth trusting if it lands inside the same rule the
  // old check enforced, so hold it to that rule rather than assuming.
  return safeUploadFileNamePattern.test(safe) ? safe : null;
}

function clampUploadStem(rawStem, room) {
  const stem = rawStem
    .replace(/[^A-Za-z0-9._+-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^[^A-Za-z0-9]+/, '')
    .replace(/[-._+]+$/, '')
    .slice(0, Math.max(room, 1))
    // Slicing can re-expose a separator that was in the middle before.
    .replace(/[-._+]+$/, '');
  return stem || 'upload';
}

/**
 * Insert `-2`, `-3`, ... before the extension, staying inside the length cap.
 */
function uploadNameWithSuffix(name, attempt) {
  const dot = name.lastIndexOf('.');
  const hasExtension = dot > 0;
  const extension = hasExtension ? name.slice(dot) : '';
  const suffix = `-${attempt}`;
  const stem = clampUploadStem(
    hasExtension ? name.slice(0, dot) : name,
    maximumFsFileNameLength - extension.length - suffix.length
  );
  return `${stem}${suffix}${extension}`;
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
    const error = new Error('filename is empty after removing unsafe characters');
    error.statusCode = 400;
    throw error;
  }
  const requested =
    typeof fileName === 'string' ? path.basename(fileName.trim()) : '';
  const renamed = safeName !== requested;
  const dirRel = normalizeRelativePath(relativeDir);
  const toRelative = (name) => (dirRel ? `${dirRel}/${name}` : name);

  // Overwriting a name the user typed is expected. Overwriting one this code
  // invented is not: two different uploads can rewrite to the same name, and
  // the user never sees the collision coming. Only step aside when renamed.
  let finalName = safeName;
  let resolved = await resolveJailedPath(root.rootPath, toRelative(finalName), {
    mustExist: false
  });
  for (let attempt = 2; renamed && resolved.exists && attempt <= 99; attempt += 1) {
    if (resolved.stats.isDirectory()) {
      // Fall through to the directory error below rather than picking a name
      // beside a folder the caller did not ask about.
      break;
    }
    finalName = uploadNameWithSuffix(safeName, attempt);
    resolved = await resolveJailedPath(root.rootPath, toRelative(finalName), {
      mustExist: false
    });
  }

  if (resolved.exists && resolved.stats.isDirectory()) {
    const error = new Error('path is a directory');
    error.statusCode = 409;
    throw error;
  }
  const targetRel = toRelative(finalName);
  await fs.promises.writeFile(resolved.absolutePath, buffer, {
    mode: 0o600,
    flag: 'w'
  });
  return {
    root: root.id,
    path: targetRel,
    name: finalName,
    renamed: finalName !== requested,
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

/**
 * Directory names under the games root, which are the slugs.
 *
 * Cached for a few seconds because the session list is polled and a new game
 * appears about once a week. A read that fails returns an empty list, so a
 * missing or unreadable root turns Games view off rather than erroring the
 * session list every poll.
 */
const gameSlugPattern = /^[a-z0-9][a-z0-9-]{0,62}$/;
const gameSlugCacheMs = 5000;
let gameSlugCache = { readAt: 0, slugs: [] };

async function readGameSlugs() {
  const now = Date.now();
  if (now - gameSlugCache.readAt < gameSlugCacheMs) {
    return gameSlugCache.slugs;
  }
  let slugs = [];
  try {
    const entries = await fs.promises.readdir(gamesRoot, {
      withFileTypes: true
    });
    slugs = entries
      .filter((entry) => entry.isDirectory() && gameSlugPattern.test(entry.name))
      .map((entry) => entry.name)
      // Longest first, so `night-shift-two` wins over `night-shift` for a
      // session named after the longer slug.
      .sort((first, second) => second.length - first.length);
  } catch {
    slugs = [];
  }
  gameSlugCache = { readAt: now, slugs };
  return slugs;
}

function slugForGamePath(candidatePath, slugs) {
  if (typeof candidatePath !== 'string' || !candidatePath.startsWith('/')) {
    return null;
  }
  const prefix = `${gamesRoot}/`;
  if (!candidatePath.startsWith(prefix)) {
    return null;
  }
  const first = candidatePath.slice(prefix.length).split('/')[0];
  return slugs.includes(first) ? first : null;
}

/**
 * The game a session belongs to, or null.
 *
 * The working directory decides it, because that is what the session is
 * actually doing: an interview runs in the studio directory, which sits outside
 * the games root, so it is not a game, and no name rule could tell that. Two
 * directories are checked — the session's own and the active pane's — because
 * `new-game` moves the tree after creating the session, which leaves
 * session_path pointing at the pre-move directory.
 *
 * The name is the fallback, for a session whose pane has been `cd`-ed
 * somewhere else. Without it a game would drop out of the list mid-play.
 */
function gameForSession(session, slugs) {
  const fromPath =
    slugForGamePath(session.sessionPath, slugs) ||
    slugForGamePath(session.panePath, slugs);
  const slug =
    fromPath ||
    (typeof session.name === 'string' && session.name.startsWith('game-')
      ? slugs.find((candidate) => {
          const rest = session.name.slice('game-'.length);
          return rest === candidate || rest.startsWith(`${candidate}-`);
        }) || null
      : null);
  if (!slug) {
    return null;
  }
  return {
    slug,
    url: gameUrlTemplate ? gameUrlTemplate.replace('{slug}', slug) : null
  };
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
        '#{session_name}|#{session_windows}|#{session_attached}|' +
          '#{pane_current_command}|#{session_path}|#{pane_current_path}'
      ],
      { timeout: 3000, maxBuffer: 64 * 1024 }
    );
    const slugs = await readGameSlugs();
    return stdout
      .trim()
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const fields = line.split('|');
        const [name, windows, attached, command] = fields;
        // A working directory may legally contain '|', which would shift every
        // field after it. Six exactly means the split is trustworthy; anything
        // else keeps the session and drops only the paths, so the name rule in
        // gameForSession decides instead of a misread directory.
        const trustPaths = fields.length === 6;
        const session = {
          name,
          windows: Number(windows),
          attached: Number(attached),
          command: sanitizedPaneCommand(command),
          sessionPath: trustPaths ? fields[4] : null,
          panePath: trustPaths ? fields[5] : null
        };
        return {
          name: session.name,
          windows: session.windows,
          attached: session.attached,
          command: session.command,
          game: gameForSession(session, slugs),
          // A game-studio interview. The server marks it, because the naming is
          // a server setting and the page must not carry a copy of the pattern.
          // GameLab Mode keeps these rows: an interview has no game yet, and a
          // row is the only way back to one that is still running.
          studio: studioSessionPattern.test(session.name)
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

/**
 * Every session tmux knows, with the two facts the studio sweep needs.
 *
 * Separate from `listSessions`, which reads game slugs off disk and shapes rows
 * for the page. This one answers the questions the new-game route asks: which
 * names are taken, and which interviews are finished.
 *
 * No server running exits 1, which is a host where nothing is up rather than a
 * failure, so that answers with an empty list. An option no session has set
 * formats as an empty string, so `finished` is '1' or nothing.
 */
async function readSessionStates() {
  let stdout = '';
  try {
    ({ stdout } = await execFileAsync(
      'tmux',
      [
        'list-sessions',
        '-F',
        `#{session_name}|#{session_attached}|#{${studioFinishedOption}}`
      ],
      { timeout: 3000, maxBuffer: 64 * 1024 }
    ));
  } catch (error) {
    if (error.code === 1) {
      return [];
    }
    throw error;
  }
  return stdout
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const fields = line.split('|');
      // A session created outside this app may hold a '|' in its name, which
      // shifts the split. The two fields asked for are the last two, so read
      // from that end and give the rest back to the name.
      if (fields.length < 3) {
        return { name: line, attached: 0, finished: '' };
      }
      const attached = Number(fields[fields.length - 2]);
      return {
        name: fields.slice(0, -2).join('|'),
        attached: Number.isFinite(attached) ? attached : 0,
        finished: fields[fields.length - 1]
      };
    });
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

/**
 * Whether the Create-new-game button can do anything on this host.
 *
 * A games root to put the game in, a studio directory to run the skill from,
 * and the agent on PATH. A button whose only outcome is an error is worse than
 * no button. What it cannot check is that the studio holds a `new-game` skill:
 * that is the studio's own business, and an agent that does not know the
 * command says so.
 */
async function newGameIsPossible() {
  if (!Object.hasOwn(fsRootCatalog, 'games')) {
    return false;
  }
  try {
    await fs.promises.access(
      gameStudioDirectory,
      fs.constants.R_OK | fs.constants.X_OK
    );
    await resolvedSessionLauncherCommand(gameStudioLauncher);
    return true;
  } catch {
    return false;
  }
}

/**
 * Close the interview sessions nobody is in any more.
 *
 * The pane ends with `exec <shell> -l`, so a session outlives the agent that ran
 * in it. That is deliberate everywhere else: a crash stays on screen and
 * readable. An interview is temporary, though — the skill creates the game's own
 * session and the person moves to it — and nothing ever closed the one left
 * behind, so they piled up.
 *
 * Three conditions, all of them required. The name is one this app hands out, so
 * a session somebody renamed is theirs to keep. The mark is set by the pane
 * itself, so the agent is provably gone. Nobody is attached, so nobody is reading
 * it — including the error from an agent that failed, which stays on screen for
 * as long as the person who tapped is looking at it.
 *
 * Returns the names it closed. Best-effort by design: a kill that fails leaves an
 * idle shell, which breaks nothing and gets swept at the next tap.
 */
async function sweepFinishedStudioSessions(states) {
  const closed = [];
  for (const session of states) {
    if (
      !studioSessionPattern.test(session.name) ||
      session.attached !== 0 ||
      session.finished !== '1'
    ) {
      continue;
    }
    try {
      await execFileAsync('tmux', ['kill-session', '-t', `=${session.name}`], {
        timeout: 5000
      });
      forgetSessionActivity(session.name);
      closed.push(session.name);
    } catch {
      // Already gone, or a tmux that refused. Either way the next tap retries.
    }
  }
  return closed;
}

/**
 * The next free interview name.
 *
 * Lowest free number rather than a stored counter, so a host that has been up for
 * months does not reach `lab-400` while three sessions exist. `taken` is every
 * session name, not only the interviews: a person can rename any session to
 * anything, and a name that is taken is taken.
 */
function nextStudioSessionName(taken) {
  const names = new Set(taken);
  for (let index = 1; index <= 999; index += 1) {
    const candidate = `${gameStudioSessionPrefix}-${index}`;
    if (!names.has(candidate)) {
      return candidate;
    }
  }
  const error = new Error('too many game studio sessions');
  error.statusCode = 503;
  throw error;
}

/**
 * A session of its own for one interview, running the agent on the one prompt.
 *
 * A session rather than a window in a shared studio, because the rail lists
 * sessions. It also means the person lands on their own question instead of
 * somebody else's conversation, and nothing selects a window under a second
 * person who is already attached.
 *
 * Two taps at once can read the same free number before either creates it. The
 * loser retries with the next one rather than showing "internal error".
 */
async function openStudioSession(command, email) {
  const pane = studioPaneCommand(command);
  const environment = sessionBrowserOpener
    ? ['-e', `BROWSER=${sessionBrowserOpener}`]
    : [];
  let taken = (await readSessionStates()).map((session) => session.name);
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const name = nextStudioSessionName(taken);
    try {
      await execFileAsync(
        'tmux',
        [
          'new-session',
          '-d',
          '-s',
          name,
          '-c',
          gameStudioDirectory,
          ...environment,
          pane
        ],
        { timeout: 5000 }
      );
      // The person who opened this interview is the one whose request it is.
      recordSessionActivity(name, email);
      return name;
    } catch (error) {
      if (!(await sessionExists(name))) {
        throw error;
      }
      taken = (await readSessionStates()).map((session) => session.name);
    }
  }
  const error = new Error('could not name a free game studio session');
  error.statusCode = 503;
  throw error;
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
      // Return the entry found on PATH, not what it resolves to. An agent CLI
      // is usually a symlink into a versioned install directory, and that
      // directory goes away on the next upgrade. The stat above already
      // confirmed the link points at an executable file.
      return candidate;
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

function shellQuote(value) {
  return `'${String(value).replace(/'/g, "'\\''")}'`;
}

// tmux runs a pane command with no shell around it, so an agent CLI launched
// this way inherits none of the shell startup files and dies taking the whole
// session with it. Run it from a login shell instead, and leave that shell
// behind when the agent exits.
function sessionPaneCommand(command, argument) {
  const invocation =
    argument === undefined
      ? shellQuote(command)
      : `${shellQuote(command)} ${shellQuote(argument)}`;
  return `${invocation}; exec ${sessionLoginShell} -l`;
}

/**
 * The same, for an interview, plus the mark that says the agent is gone.
 *
 * `$TMUX_PANE` rather than the session name: tmux exports it into the pane, and
 * `set-option` takes a pane as a target and applies to the session that holds it.
 * So the mark lands on the right session even if somebody renames it, and no
 * name has to be quoted into a shell string.
 *
 * `;` not `&&`, so an agent that failed is marked finished too. Its output stays
 * on screen for whoever is attached, and the sweep only takes the session once
 * nobody is. Errors from `set-option` go nowhere: an unmarked interview is a
 * session that outstays its welcome, which is not worth printing over the last
 * thing the agent said.
 */
function studioPaneCommand(command) {
  const mark = `tmux set-option -t "$TMUX_PANE" ${studioFinishedOption} 1`;
  return `${shellQuote(command)} ${shellQuote(gameStudioPrompt)}; ${mark} 2>/dev/null; exec ${sessionLoginShell} -l`;
}

/**
 * Who was at the keyboard, per tmux session.
 *
 * Everyone here shares the one Linux user, and two people can be attached to the
 * same session at once, so nothing in the shell can tell them apart. The
 * websocket can: each browser tab carries its own verified login. This appends
 * `<unix seconds> <email>` whenever the login typing into a session changes, so
 * a reader can ask who was active at a given moment rather than who created the
 * session. `notify-assistant` uses it to route its Telegram status to the person
 * who gave the agent its task.
 *
 * Append on change of typist only, so one person typing writes nothing after the
 * first line. Two people typing alternately is the pathological case: every
 * frame is then a change. The cap is therefore set far above any plausible
 * exchange, and the line count is kept in memory so an append never re-reads the
 * file. Trimming has to stay rare — dropping the entry that was in force at a
 * prompt would make the reader find nothing and fall back to the default
 * assistant, which is precisely the misdelivery this record exists to prevent.
 *
 * This is a label, not a permission. It grants nothing, and a failure to write
 * it must never break the keystroke that triggered it.
 */
const sessionActivityDirectory = path.join(stateRoot, 'session-activity');
// Every attached tab holds the session name it upgraded with. tmux keeps a
// renamed session attached, so nothing reconnects and nothing re-reads the name;
// a tab that kept writing under the old one would freeze the current log and
// send the next person's status to whoever typed before the rename.
const terminalSessionNames = new Map();
const sessionActivityLineLimit = (() => {
  const configured = Number(
    process.env.VPS_TERMINAL_SESSION_ACTIVITY_LIMIT || 20000
  );
  return Number.isInteger(configured) && configured >= 4 ? configured : 20000;
})();
const lastRecordedSessionActivity = new Map();
const sessionActivityLineCount = new Map();

function recordSessionActivity(name, email) {
  if (!validatedSessionName(name) || typeof email !== 'string') {
    return;
  }
  const login = email.trim().toLowerCase();
  if (!authenticatedEmailPattern.test(login)) {
    return;
  }
  if (lastRecordedSessionActivity.get(name) === login) {
    return;
  }
  const file = path.join(sessionActivityDirectory, `${name}.log`);
  try {
    fs.mkdirSync(sessionActivityDirectory, { recursive: true, mode: 0o700 });
    fs.appendFileSync(
      file,
      `${Math.floor(Date.now() / 1000)} ${login}\n`,
      { mode: 0o600 }
    );
    // Counted rather than measured: reading the whole file on every keystroke of
    // a two-person exchange put the file size on the event loop every time.
    let lines = sessionActivityLineCount.get(name);
    if (lines === undefined) {
      lines = fs
        .readFileSync(file, 'utf8')
        .split('\n')
        .filter((line) => line.length > 0).length;
    } else {
      lines += 1;
    }
    if (lines > sessionActivityLineLimit) {
      const kept = fs
        .readFileSync(file, 'utf8')
        .split('\n')
        .filter((line) => line.length > 0)
        .slice(-Math.floor(sessionActivityLineLimit / 2));
      fs.writeFileSync(file, `${kept.join('\n')}\n`, { mode: 0o600 });
      lines = kept.length;
    }
    sessionActivityLineCount.set(name, lines);
    lastRecordedSessionActivity.set(name, login);
  } catch {
    // A missing state directory or a full disk must not cost the person their
    // keystroke. The next input tries again, because the map is only updated on
    // a successful write.
  }
}

// A session that is gone cannot be the subject of a notification, and the log
// names a person. Removing it with the session keeps this from accumulating.
// Only sessions ended through this app come through here: one killed from inside
// a pane, or lost to a reboot, leaves its log until the name is reused.
function forgetSessionActivity(name) {
  if (!validatedSessionName(name)) {
    return;
  }
  lastRecordedSessionActivity.delete(name);
  sessionActivityLineCount.delete(name);
  try {
    fs.rmSync(path.join(sessionActivityDirectory, `${name}.log`), {
      force: true
    });
  } catch {
    // Losing the file is not worth failing the kill the person asked for.
  }
}

// Follow a rename, so the record stays findable under the name the session now
// has. The in-memory keys move with it or the next input would be judged against
// the wrong session's last typist.
function moveSessionActivity(name, nextName) {
  if (!validatedSessionName(name) || !validatedSessionName(nextName)) {
    return;
  }
  for (const reference of terminalSessionNames.values()) {
    if (reference.name === name) {
      reference.name = nextName;
    }
  }
  const previousLogin = lastRecordedSessionActivity.get(name);
  const previousCount = sessionActivityLineCount.get(name);
  lastRecordedSessionActivity.delete(name);
  sessionActivityLineCount.delete(name);
  try {
    fs.renameSync(
      path.join(sessionActivityDirectory, `${name}.log`),
      path.join(sessionActivityDirectory, `${nextName}.log`)
    );
  } catch {
    // No log yet, or it could not be moved. Either way the next input starts a
    // fresh one under the new name, so nothing is left pointing at the old.
    return;
  }
  if (previousLogin !== undefined) {
    lastRecordedSessionActivity.set(nextName, previousLogin);
  }
  if (previousCount !== undefined) {
    sessionActivityLineCount.set(nextName, previousCount);
  }
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
  // Web links from an agent CLI belong in the streamed browser workspace. The
  // shell startup file that exports this only runs for interactive shells, so
  // pass it to tmux directly rather than hoping the pane inherits it.
  if (sessionBrowserOpener) {
    args.push('-e', `BROWSER=${sessionBrowserOpener}`);
  }
  const command = await resolvedSessionLauncherCommand(launcher);
  if (command) {
    args.push(sessionPaneCommand(command));
  }
  await execFileAsync(
    'tmux',
    args,
    { timeout: 5000 }
  );
  // The first person on the record for this session is whoever asked for it.
  // Everything typed into it afterwards is attributed as it arrives.
  recordSessionActivity(name, options.email);
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
  forgetSessionActivity(name);
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
  // The log is keyed on the session name, and a reader looks it up by the name
  // the session has now. Leaving it behind would make a renamed session look like
  // one nobody typed in, which routes its notification to the default assistant
  // instead of to the person.
  moveSessionActivity(name, nextName);
  return nextName;
}

const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/manifest+json; charset=utf-8'],
  ['.png', 'image/png'],
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
    const url = new URL(request.url, publicOrigin);

    // Ahead of the login gate, because this is the one route with no browser
    // behind it. A CLI on this host reaches the Unix socket directly, which
    // never passes through Caddy and so carries no identity to check.
    if (request.method === 'POST' && url.pathname === '/api/control/focus-session') {
      if (!isLocalControlRequest(request)) {
        sendError(response, 403, 'local callers only');
        return;
      }
      let body = null;
      try {
        body = JSON.parse(await readBody(request));
      } catch {
        sendError(response, 400, 'invalid JSON body');
        return;
      }
      const name = validatedSessionName(body?.session);
      if (!name) {
        sendError(response, 400, 'invalid session name');
        return;
      }
      const target = validatedControlTarget(body?.target);
      if (target === undefined) {
        sendError(response, 400, 'invalid target');
        return;
      }
      // A tab told to move to a session that is not there would land on a
      // failed connection and show an error where a terminal should be.
      if (!(await sessionExists(name))) {
        sendError(response, 404, 'no such session');
        return;
      }
      sendJson(response, 200, {
        delivered: broadcastControlMessage(
          { type: 'focus-session', session: name },
          target
        )
      });
      return;
    }

    const requestEmail = authenticatedEmail(request);
    if (!requestEmail) {
      sendError(response, 401, 'authentication required');
      return;
    }

    if (request.method === 'GET' && url.pathname === '/api/config') {
      sendJson(response, 200, {
        appName: appDisplayName,
        appShortName,
        localDev: localDevMode,
        clientDebug: clientDebugEnabled,
        // Offering a Games view on a host with no games would be a setting that
        // does nothing, so the toggle only exists where the root does.
        gamesView: Object.hasOwn(fsRootCatalog, 'games'),
        // And a Create-a-game button needs a studio to open and an agent to
        // start. Both are read per request, not at boot: a directory that
        // appears later should light the button up on the next page load, and
        // one that goes away should put it out.
        newGame: await newGameIsPossible()
      });
      return;
    }

    if (request.method === 'GET' && url.pathname === '/api/sessions') {
      sendJson(response, 200, { sessions: await listSessions() });
      return;
    }

    // The games themselves, whether or not one has a session running. Games
    // view puts these where the Files root buttons normally are, and a game
    // nobody is working on today is still a game you can open.
    if (request.method === 'GET' && url.pathname === '/api/games') {
      const slugs = await readGameSlugs();
      sendJson(response, 200, {
        games: [...slugs]
          .sort((first, second) => first.localeCompare(second))
          .map((slug) => ({
            slug,
            url: gameUrlTemplate ? gameUrlTemplate.replace('{slug}', slug) : null
          }))
      });
      return;
    }

    /**
     * Start the interview that makes a new game.
     *
     * One tap in Settings, for someone who has no shell, no slug, and no reason
     * to know the skill is called `new-game`. A window in the studio session
     * with the agent started on that one prompt — passed as an argument rather
     * than typed, so there is no waiting for the agent to be ready and no
     * keystroke that could land somewhere else.
     *
     * A new window, never the existing one. That session usually holds an agent
     * mid-conversation, and sending a prompt into it would interrupt whatever
     * is in the box.
     */
    if (request.method === 'POST' && url.pathname === '/api/games/new') {
      if (!requestOriginIsValid(request)) {
        sendError(response, 403, 'bad origin');
        return;
      }
      if (!Object.hasOwn(fsRootCatalog, 'games')) {
        sendError(response, 404, 'this install has no games root');
        return;
      }
      try {
        await fs.promises.access(
          gameStudioDirectory,
          fs.constants.R_OK | fs.constants.X_OK
        );
      } catch {
        sendError(response, 409, 'the game studio directory is not there');
        return;
      }
      // Throws a 503 of its own when the binary is not on PATH. There is no
      // null to check for: null is only returned for a launcher key that does
      // not exist, and this one is a constant.
      const studioCommand =
        await resolvedSessionLauncherCommand(gameStudioLauncher);
      // Before the new one, so a finished interview's number is free to reuse and
      // the rail does not fill with idle shells. Never fatal: a sweep that fails
      // must not cost somebody their new game.
      try {
        await sweepFinishedStudioSessions(await readSessionStates());
      } catch {
        console.warn('vps-terminal: could not sweep finished studio sessions');
      }
      const session = await openStudioSession(studioCommand, requestEmail);
      // After the session, not before. `show-options` needs a tmux server to ask,
      // and on a host where nothing is running yet this route is what starts
      // one — asking first turned the whole tap into a 500. Nothing has attached
      // at this point, and these options are read at attach.
      try {
        await ensureTmuxCapabilities();
      } catch {
        // Truecolor for a pane nobody is looking at yet is not worth failing a
        // window that already exists.
        console.warn('vps-terminal: could not set tmux capabilities');
      }
      sendJson(response, 200, { session });
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
          sendError(response, 413, 'image is too large (max 10 MB)');
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
          writable: entry.writable !== false,
          parentRoot: entry.parentRoot || null
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
        launcher: value.launcher,
        email: requestEmail
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

    // The control channel. Same login and same origin rules as a terminal, but
    // no session and no PTY: it exists so the server can tell this tab to move.
    if (url.pathname === controlPath) {
      const email = authenticatedEmail(request);
      const refusal = !email
        ? 'auth'
        : !requestOriginIsValid(request)
          ? 'origin'
          : controlConnections.size >= maximumControlConnections
            ? 'capacity'
            : null;
      if (refusal) {
        console.warn(
          `vps-terminal: refused control upgrade (${refusal}) ` +
            `control=${controlConnections.size}`
        );
        socket.write('HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n');
        socket.destroy();
        return;
      }
      websocketServer.handleUpgrade(request, socket, head, (websocket) => {
        acceptControlConnection(websocket, email);
      });
      return;
    }

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

/**
 * A control socket, from upgrade to close.
 *
 * One way, server to page. The page sends nothing on it, so incoming frames are
 * dropped rather than parsed: a channel with no command to read cannot be told
 * to do the wrong thing. The keepalive is the terminal socket's, for the same
 * reason it has one — a tab that is killed rather than closed leaves a
 * half-open socket that would otherwise sit in the map until the lifetime
 * timer, holding a slot against the cap.
 */
function acceptControlConnection(websocket, email) {
  controlConnections.set(websocket, email);
  const lifetime = setTimeout(
    () => websocket.close(1000, 'control channel expired'),
    websocketLifetimeMs
  );
  let awaitingPong = false;
  websocket.on('pong', () => {
    awaitingPong = false;
  });
  const ping = setInterval(() => {
    if (websocket.readyState !== websocket.OPEN) {
      return;
    }
    if (awaitingPong) {
      websocket.terminate();
      return;
    }
    awaitingPong = true;
    websocket.ping();
  }, 30000);
  const cleanup = () => {
    clearTimeout(lifetime);
    clearInterval(ping);
    controlConnections.delete(websocket);
  };
  websocket.on('close', cleanup);
  websocket.on('error', () => websocket.terminate());
  websocket.on('message', () => {});
}

websocketServer.on('connection', (websocket, request, name) => {
  // The upgrade already refused an unauthenticated request, so this is the
  // verified login of the tab on the other end of this socket. Read once: the
  // headers cannot change for the life of the connection.
  const connectionEmail = authenticatedEmail(request);
  // Mutable, because a rename has to reach a tab that is already attached.
  const session = { name };
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
  terminalSessionNames.set(websocket, session);

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
        // Before the write, so the record cannot land after the prompt it
        // belongs to. Only a change of typist writes anything, and an empty
        // frame is not typing: it reaches the pty as nothing.
        if (message.data.length > 0) {
          recordSessionActivity(session.name, connectionEmail);
        }
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
    terminalSessionNames.delete(websocket);
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
