# vps-terminal

Mobile-first **tmux terminal** Progressive Web App for a Linux host.

Attach a phone or laptop browser to real tmux sessions, with a touch-friendly
keyboard/snippets bar, reconnect, scrollback find, and a jailed file browser.

## Security (read this first)

**Authentication is not built into the app.** You put TLS + login on a reverse
proxy; the proxy injects a trusted email header. Anyone who passes that login
gets a shell as the **same Unix user** that runs `vps-terminal` — treat it like
an unlocked SSH session for that account.

Before you expose anything publicly:

1. Terminate TLS at the edge
2. Require strong authentication (see recommended Google setup below)
3. Keep the app on a private channel (Unix socket recommended)
4. Set `VPS_TERMINAL_ORIGIN` to the exact public HTTPS origin
5. Keep independent recovery access (SSH / Tailscale / console)

Full threat model, header rules, and limits: **[SECURITY.md](SECURITY.md)**.

## Recommended auth: Google (Gmail) sign-in

Simplest production pattern for most people:

```text
Browser → Caddy/nginx + oauth2-proxy → Google login → Unix socket → vps-terminal
```

- You create a Google Cloud OAuth client
- [oauth2-proxy](https://oauth2-proxy.github.io/oauth2-proxy/) handles the
  redirect and cookies
- You **allowlist** only your Gmail addresses
- The proxy sets `X-Vps-Authenticated-Email` after a successful login

Step-by-step: **[docs/auth-google.md](docs/auth-google.md)**
Proxy contract (any IdP): **[docs/reverse-proxy.md](docs/reverse-proxy.md)**

Other providers (Authelia, Keycloak, Cloudflare Access, …) work the same way.
The app only cares about the verified email header.

## Requirements

- Linux host (primary target)
- Node.js ≥ 18, npm
- Build tools for native `node-pty` (`python3`, `make`, `g++` on Debian/Ubuntu)
- `tmux`
- Reverse proxy + authentication for production (Google + oauth2-proxy recommended)
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

1. Put **Google + oauth2-proxy** (or another IdP) in front of the Unix socket
   `$HOME/.local/share/vps-terminal/run/terminal.sock`
   → [docs/auth-google.md](docs/auth-google.md)
2. After auth, inject **`X-Vps-Authenticated-Email`** (and strip any client value)
3. Open the site, create/attach a tmux session, install the PWA

## Architecture

```text
Browser ──HTTPS──▶ Reverse proxy + auth ──Unix socket──▶ vps-terminal
                         │                                    │
                    e.g. Google                          node-pty + tmux
                    via oauth2-proxy
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

## Docs map

| Doc | Topic |
|-----|--------|
| [SECURITY.md](SECURITY.md) | Threat model and hard requirements |
| [docs/auth-google.md](docs/auth-google.md) | Recommended Google / Gmail setup |
| [docs/reverse-proxy.md](docs/reverse-proxy.md) | Header contract for any proxy |
| [docs/configuration.md](docs/configuration.md) | Full environment reference |
| [docs/docker.md](docs/docker.md) | Optional container notes |
| [docs/development.md](docs/development.md) | LOCAL_DEV workflow |

## License

MIT — see [LICENSE](LICENSE). Third-party notices: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
