# vps-terminal

Mobile-first **tmux terminal** Progressive Web App for a Linux host.

Attach a phone or laptop browser to real tmux sessions, with a touch-friendly
keyboard/snippets bar, reconnect, scrollback find, and a jailed file browser.

**Authentication is not built in.** You put a reverse proxy (Caddy, nginx,
Traefik, …) with real login in front. The proxy injects a trusted email header;
everyone who passes auth gets a shell as the service Unix user.

## Security warning

An authenticated browser session is equivalent to an **unlocked SSH session**
for the account that runs `vps-terminal`. Do not expose the app without:

1. TLS termination
2. Strong authentication at the edge
3. A private backend channel (Unix socket recommended)
4. Exact public origin configuration (`VPS_TERMINAL_ORIGIN`)

Read [SECURITY.md](SECURITY.md) before deploying.

## Requirements

- Linux host (primary target)
- Node.js ≥ 18, npm
- Build tools for native `node-pty` (`python3`, `make`, `g++` on Debian/Ubuntu)
- `tmux`
- Reverse proxy + authentication for production
- Non-root Unix user whose shell you intend to expose

## Quick install (host + user systemd)

```bash
git clone https://github.com/revolt3r-vps/vps-terminal.git
cd vps-terminal

export VPS_TERMINAL_ORIGIN=https://terminal.example.com
# optional: export VPS_TERMINAL_APP_NAME='My Terminal'
# optional: export VPS_TERMINAL_PROJECT_ROOT="$HOME/projects"

./scripts/install.sh
```

Then:

1. Point your reverse proxy at
   `$HOME/.local/share/vps-terminal/run/terminal.sock`
   (see [docs/reverse-proxy.md](docs/reverse-proxy.md) and `examples/`).
2. After auth, inject **`X-Vps-Authenticated-Email`** (and strip any client value).
3. Open the site, create/attach a tmux session, install the PWA.

## Architecture

```text
Browser ──HTTPS──▶ Reverse proxy + auth ──Unix socket──▶ vps-terminal
                                                              │
                                                         node-pty + tmux
```

| Header | Role |
|--------|------|
| `X-Vps-Authenticated-Email` | Required in production; set only by your proxy after login |
| `Origin` | Must match `VPS_TERMINAL_ORIGIN` for mutating HTTP and WebSockets |

## Configuration

Short list:

| Variable | Purpose |
|----------|---------|
| `VPS_TERMINAL_ORIGIN` | Public origin (required outside LOCAL_DEV) |
| `VPS_TERMINAL_SOCKET` | Unix socket path (recommended production) |
| `VPS_TERMINAL_HOST` / `PORT` | TCP bind when not using a socket |
| `VPS_TERMINAL_APP_NAME` | UI title |
| `VPS_TERMINAL_PROJECT_ROOT` | Default projects path / new session cwd |
| `VPS_TERMINAL_LOCAL_DEV=1` | Local no-auth mode (loopback only) |

Full table: [docs/configuration.md](docs/configuration.md).

## Docker

Optional demo path only — see [docs/docker.md](docs/docker.md) and
`examples/docker-compose.yml`. Host install is preferred for real host tmux.

## Development

```bash
npm ci
npm run vendor
export VPS_TERMINAL_LOCAL_DEV=1
npm start
```

Details: [docs/development.md](docs/development.md).

## Features

- tmux session list, create, rename, kill
- xterm.js terminal with fit, truecolor-friendly options, reconnect
- Mobile footer: keys, snippets, pins, paste/copy helpers
- Scrollback find
- Hardware keyboard bridge when focus is on chrome
- Files browser with path jail (home / projects / paste + extras)
- Installable PWA manifest

## License

MIT — see [LICENSE](LICENSE). Third-party notices: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
