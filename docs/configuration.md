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
| `VPS_TERMINAL_GAMES_ROOT` | `$PROJECT_ROOT/games` | Games root; enables the GameLab Mode setting |
| `VPS_TERMINAL_GAME_URL` | unset | Play link template, e.g. `https://{slug}.play.example.com/` |
| `VPS_TERMINAL_GAME_STUDIO_DIR` | `$PROJECT_ROOT/game-lab` | Where the `new-game` skill lives |
| `VPS_TERMINAL_GAME_STUDIO_SESSION` | `lab` | Name prefix for the interview sessions Create-new-game starts, as `<prefix>-<number>`; a prefix that cannot form a valid session name refuses startup |
| `VPS_TERMINAL_DEV_EMAIL` | `dev@localhost.test` | Identity in LOCAL_DEV only |
| `VPS_TERMINAL_CLIENT_DEBUG` | disabled | Set `1` for bounded metadata-only client diagnostics |
| `VPS_TERMINAL_SESSION_ACTIVITY_LIMIT` | `20000` | Lines kept per session-activity log; trimmed to half when exceeded |
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

Roots may sit inside each other: `~/projects/games` is inside the projects
root, and both are inside home. `GET /api/fs/roots` reports each root's
container as `parentRoot`, so **up** at the top of a root moves into that
container instead of switching off. The up button only ever crosses into a root
the person is already offered, and a root no other root contains still has no
way up.

`:ro` marks a root, not a path. A read-only root inside a writable one was
always writable through the outer root's Locations entry; up is now a second
route to the same place. Keep files that must not be written outside every
writable root.

## Moving a browser tab to a session

`vps-terminal-focus <session>` moves every open tab to that tmux session. It is
installed on `PATH` beside the app and reaches the server over
`VPS_TERMINAL_SOCKET`, so it works from any script or agent on the host:

```sh
vps-terminal-focus game-night-shift            # every open tab
vps-terminal-focus game-night-shift --user me@example.com   # one login's tabs
```

Exit `3` means nobody was listening — no tab is open. That is not a failure, and
a caller usually reports it rather than stops. `--url http://127.0.0.1:3099` is
for a development server on a loopback port instead of a socket.

The tab hears about it on a second websocket, `/control`, opened alongside the
terminal one and carrying messages in one direction only. A proxy that forwards
websockets on `/ws` already forwards this; both example configs do. The page
switches through the same code path a tap on the session list uses, so the
header and the remembered session move with the terminal — which is what
`tmux switch-client` cannot do from outside the pane.

`SECURITY.md` covers why this route has no login on it and what stands in for
one.

## GameLab Mode

Each directory under `VPS_TERMINAL_GAMES_ROOT` is a game, and the directory
name is its slug. When that root exists at startup, `/api/config` reports
`gamesView: true` and each account gets a **GameLab Mode** setting. It is stored
per login, so it follows one person to any browser and changes nothing for
anyone else.

The setting lives on its own **GameLab** tab in the panel, which is hidden
where there is no games root. The tab is on both strips — Term and Files —
because the setting changes what each of them shows.

With it on, the app lists game sessions only and puts **Play** on each one.
Files replaces its Locations with the games themselves — one entry per game,
from `GET /api/games` — and cannot be sent above the games root: a bookmark, a
remembered location, or a path clicked in terminal output that names another
root lands on the games root instead. The snippet library drops the host
diagnostics. Play needs `VPS_TERMINAL_GAME_URL`; without it the rest of the
view still works and no Play link appears.

Each mode keeps its own place. Switching the mode saves the session, the Files
location, and the current Terminal-or-Files view under the mode being left,
then restores the one saved for the mode being entered. Turning the mode off
returns you to the session and folder you had before you turned it on; turning
it on again returns you to the game you were last in. A saved place is used
only where it still works — the session must still exist and be listed in that
mode, and the root must be one that mode offers — so the first visit to a mode
behaves as it always did. The two places live in `localStorage` beside the
active session, so they are per browser, unlike the setting itself.

**Create new game** sits on the same tab, and appears where the games root, the
studio directory, and the agent on `PATH` are all there. It asks
`POST /api/games/new`; the server opens a **session of its own** for the
interview, starts the agent in it, and answers with the session to move to. The
page sends no command and no name. The prompt that starts the interview is a
constant in the server, because anything typed at an agent runs and a string
assembled from a browser is not one to type.

One session per tap, named `lab-1`, `lab-2`, and so on — the lowest free number,
not a counter. A window in a shared studio session would be cheaper, and it is
what this used to do, but the session rail is the only navigation the app has and
it lists sessions: a second window was a conversation with no row to reach it by.
An interview in progress is never attached to, never closed, and never has a
window opened under it.

GameLab Mode keeps interview rows, labelled **New game**, so a conversation still
in progress stays one tap away after you move to the game it created.

The interview is temporary. Its pane marks its own session finished when the
agent exits, and the next tap closes every interview that is marked and has
nobody attached. Three conditions, all required: the name is one the app handed
out, so a session you renamed is yours to keep; the mark is set by the pane
itself, so the agent is provably gone; and nobody is attached, so an agent's
error stays on screen for as long as you are reading it. Nothing is closed on a
schedule, and nothing is closed while you are in it.

The prompt is passed to the agent as an argument rather than sent as
keystrokes, so nothing has to wait for the agent to be ready and no keystroke
can land in the wrong place.

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

Everyone here shares one Linux user, and two people can be attached to one
session at the same time, so the app keeps its own record of who is typing:
`session-activity/<session>.log` under the state directory gains a
`<unix seconds> <login>` line whenever the login sending input to a session
changes. Requesting a session counts as the first entry. `notify-assistant` reads
it to send its Telegram status to whoever gave an agent its task. This is a
label, not a permission: it grants nothing and restricts nothing.

## On-disk state

| Path | Purpose |
|------|---------|
| `~/.local/share/vps-terminal/run/terminal.sock` | Listen socket (when configured) |
| `~/.local/share/vps-terminal/snippets.json` | User snippets |
| `~/.local/share/vps-terminal/preferences/*.json` | Opt-in per-login key and theme setup (hashed identity filenames, 0600) |
| `~/.local/share/vps-terminal/session-activity/*.log` | Which login last typed into each session (0600) |
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
