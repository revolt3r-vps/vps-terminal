# Configuration

All settings are environment variables. Production values usually live in a
systemd user unit (`Environment=` / `EnvironmentFile=`).

## Required (production)

| Variable | Description |
|----------|-------------|
| `VPS_TERMINAL_ORIGIN` | Exact public origin for Origin checks, e.g. `https://terminal.example.com` |
| `VPS_TERMINAL_SOCKET` **or** `VPS_TERMINAL_HOST` | Unix socket path (recommended) **or** explicit TCP bind host |

Missing `VPS_TERMINAL_ORIGIN` outside `LOCAL_DEV` causes startup failure.

## Listen modes

| Mode | Variables | Use |
|------|-----------|-----|
| Unix socket | `VPS_TERMINAL_SOCKET=/path/to.sock` | Production behind reverse proxy |
| TCP | `VPS_TERMINAL_HOST=127.0.0.1` `VPS_TERMINAL_PORT=3001` | Local proxy on same host |
| Local dev | `VPS_TERMINAL_LOCAL_DEV=1` | Skips auth header; loopback defaults |

`LOCAL_DEV` cannot be combined with `VPS_TERMINAL_SOCKET`.

## Optional

| Variable | Default | Description |
|----------|---------|-------------|
| `VPS_TERMINAL_APP_NAME` | `VPS Terminal` | UI title (`/api/config`) |
| `VPS_TERMINAL_PORT` | `3001` (prod TCP) / `3099` (LOCAL_DEV) | TCP port when not using a socket |
| `VPS_TERMINAL_PROJECT_ROOT` | `$HOME/projects` | Default tmux session cwd + projects FS root |
| `VPS_TERMINAL_PASTE_ROOT` | `$HOME/paste` | Paste-image store |
| `VPS_TERMINAL_STATE_DIR` | app directory | Preferences, snippets, client debug log |
| `VPS_TERMINAL_FS_HOME` | enabled | Set `0` to disable home FS root |
| `VPS_TERMINAL_FS_EXTRA` | unset | `id:label:path[:ro][,…]` extra FS roots |
| `VPS_TERMINAL_GAMES_ROOT` | `$PROJECT_ROOT/games` | Games root; enables the Games view setting |
| `VPS_TERMINAL_GAME_URL` | unset | Play link template, e.g. `https://{slug}.play.example.com/` |
| `VPS_TERMINAL_DEV_EMAIL` | `dev@localhost.test` | Identity in LOCAL_DEV only |
| `VPS_TERMINAL_CLIENT_DEBUG` | disabled | Set `1` for bounded metadata-only client diagnostics |
| `HOME` | process home | State under `~/.local/share/vps-terminal` |

## File locations

The Files UI does not hardcode `Home`, `Projects`, or `Paste`. It renders the
root catalog returned by the server for that installation:

- `VPS_TERMINAL_FS_HOME=0` removes the home root.
- `VPS_TERMINAL_STATE_DIR` keeps runtime state out of the installed application,
  so reinstalling or clearing the app directory cannot delete preferences,
  snippets, or pasted images. Leave it unset to keep everything in one directory.
- `VPS_TERMINAL_PROJECT_ROOT` and `VPS_TERMINAL_PASTE_ROOT` change the built-in
  project and paste locations.
- `VPS_TERMINAL_FS_EXTRA=id:label:path[:ro]` adds an installation-specific
  labeled root; append `:ro` for read-only access.

## Games view

Each directory under `VPS_TERMINAL_GAMES_ROOT` is a game, and the directory
name is its slug. When that root exists at startup, `/api/config` reports
`gamesView: true` and each account gets a **Games view** setting. It is stored
per login, so it follows one person to any browser and changes nothing for
anyone else.

The setting lives on its own **GameLab** tab in the panel, which is hidden
where there is no games root.

With it on, the app lists game sessions only and puts **Play** on each one.
Files replaces its Locations with the games themselves — one entry per game,
from `GET /api/games` — and cannot be sent above the games root: a bookmark, a
remembered location, or a path clicked in terminal output that names another
root lands on the games root instead. The snippet library drops the host
diagnostics. Play needs `VPS_TERMINAL_GAME_URL`; without it the rest of the
view still works and no Play link appears.

A session belongs to a game when its working directory — the session's own or
its active pane's — is inside that game's directory. A session named
`game-<slug>` counts too, which keeps a game listed while its pane sits
somewhere else. A session named after a directory that is not there is not a
game.

**This is a view, not a boundary.** The shell inside it is unchanged: every
command, every path, and every agent still works exactly as before. Anything
that needs a real limit needs a separate Unix user running its own instance.

These Locations are filesystem security boundaries, not client-side
bookmarks. The UI may navigate and remember paths inside them, but it cannot
add a root or escape one. Desktop and sufficiently large tablets show
Locations in a sidebar; phones and short landscape windows use a compact
native selector.

Files → Start Session resolves the current folder through the same root jail,
then starts a tmux shell or the fixed `codex`, `grok`, or `claude` executable.
Those executable names must be available on the service's `PATH`; launcher
values from the browser are allowlisted and are never interpreted as shell
commands.

## On-disk state

| Path | Purpose |
|------|---------|
| `~/.local/share/vps-terminal/run/terminal.sock` | Listen socket (when configured) |
| `~/.local/share/vps-terminal/snippets.json` | User snippets |
| `~/.local/share/vps-terminal/preferences/*.json` | Opt-in per-login key and theme setup (hashed identity filenames, 0600) |
| `~/.local/share/vps-terminal/client-debug.log` | Opt-in metadata-only client debug (0600, bounded to 256 KiB) |
| `~/paste/*` | Temporary paste images (pruned) |

## Auth header

Production requests must include:

```http
X-Vps-Authenticated-Email: user@example.com
```

The value must look like an email. There is no per-user permission model inside
the app: any authenticated email gets full access as the service Unix user.

The authenticated email also separates optional Shared setup documents.
Filenames contain only a SHA-256 identity digest, not the email address. A
matching digest is embedded in the authenticated, `no-store` app shell so the
browser can choose the correct private cache before first paint without
exposing the email. A browser must explicitly seed the first shared setup;
after that, browsers using the same authenticated login load it automatically.
Revision checks prevent a stale browser from silently replacing a newer setup.

Shared setup includes the key set — which keys the bar carries, in which order,
plus any custom ones — and themes. Active session, Terminal/Files view, current
Files location, font size, open panel tab, and dismissed hints remain
device-local because they describe the current device or moment rather than
durable configuration.

## Snippet defaults

Built-in presets are portable shell helpers (`uptime`, `df`, `tmux ls`, …).
Users can edit/save snippets in the UI; saved data lives in `snippets.json`.
