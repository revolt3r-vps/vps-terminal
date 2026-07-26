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
| `VPS_TERMINAL_PROJECT_ROOT` | `$HOME/projects` | New tmux session cwd + projects FS root |
| `VPS_TERMINAL_PASTE_ROOT` | `$HOME/paste` | Paste-image store |
| `VPS_TERMINAL_FS_HOME` | enabled | Set `0` to disable home FS root |
| `VPS_TERMINAL_FS_EXTRA` | unset | `id:label:path[:ro][,…]` extra FS roots |
| `VPS_TERMINAL_DEV_EMAIL` | `dev@localhost.test` | Identity in LOCAL_DEV only |
| `HOME` | process home | State under `~/.local/share/vps-terminal` |

## On-disk state

| Path | Purpose |
|------|---------|
| `~/.local/share/vps-terminal/run/terminal.sock` | Listen socket (when configured) |
| `~/.local/share/vps-terminal/snippets.json` | User snippets |
| `~/.local/share/vps-terminal/client-debug.log` | Optional client debug |
| `~/paste/*` | Temporary paste images (pruned) |

## Auth header

Production requests must include:

```http
X-Vps-Authenticated-Email: user@example.com
```

The value must look like an email. There is no per-user permission model inside
the app: any authenticated email gets full access as the service Unix user.

## Snippet defaults

Built-in presets are portable shell helpers (`uptime`, `df`, `tmux ls`, …).
Users can edit/save snippets in the UI; saved data lives in `snippets.json`.
