# vps-terminal

A **mobile-friendly terminal** for your Linux VPS: open a browser (or install
the PWA), sign in, and attach to real **tmux** sessions on the server.

Built for phones and tablets, with an on-screen keys/snippets bar, reconnect,
scrollback search, and a simple file browser.

---

## Start here (first VPS?)

If this is your first time SSHing into a VPS, use the full walkthrough:

### → **[docs/install.md](docs/install.md)** — SSH → install → Google login → phone

That guide covers:

1. First SSH login and a non-root user
2. Installing Node, tmux, and tools
3. DNS and HTTPS hostnames
4. Installing this app
5. Recommended **Gmail / Google** login in front
6. Firewall, first visit, and troubleshooting

---

## Security (short version)

| Fact | What it means for you |
|------|------------------------|
| This app has **no built-in login** | You add Google (or another login) on a reverse proxy |
| Login success = **full shell** | Same power as SSH for that Linux user |
| Keep SSH working | Recovery if the website or auth breaks |
| Do not expose Node publicly | Only the proxy should reach the app (Unix socket) |

Full details: **[SECURITY.md](SECURITY.md)**
Recommended login: **[docs/auth-google.md](docs/auth-google.md)** (Gmail + oauth2-proxy)

```text
Phone browser
    │ HTTPS + “Sign in with Google”
    ▼
Caddy (or nginx) + oauth2-proxy
    │ private Unix socket
    ▼
vps-terminal  →  your tmux sessions on the VPS
```

---

## Requirements (checklist)

You need:

- [ ] A Linux VPS you can reach with **SSH**
- [ ] A **domain name** (for HTTPS + Google OAuth)
- [ ] **Node.js 18+**, **npm**, **tmux**, GNU coreutils (`mv`), and build tools
      (`g++`, `python3`, …)
- [ ] A reverse proxy with real auth (Google + oauth2-proxy is the documented path)
- [ ] A **non-root** Linux user to run the app

Exact package commands: [docs/install.md](docs/install.md).

---

## Quick install (if you already know VPS basics)

```bash
# on the VPS, as a normal user (not root)
git clone https://github.com/revolt3r-vps/vps-terminal.git
cd vps-terminal

# exact public URL you will open in the browser (https, no trailing slash)
export VPS_TERMINAL_ORIGIN=https://terminal.example.com

./scripts/install.sh
```

Then put **TLS + Google login** in front of:

```text
$HOME/.local/share/vps-terminal/run/terminal.sock
```

See [docs/auth-google.md](docs/auth-google.md) and
[examples/caddy/Caddyfile.snippet](examples/caddy/Caddyfile.snippet).

---

## Features

- tmux session list, create, rename, kill
- xterm.js terminal, reconnect, scrollback find
- Mobile footer: a scrolling key bar with every key on it
- A panel where the keyboard would be, shared by both views. Term gets paste,
  keys, snippets and debug; Files gets its folder settings; appearance, GameLab
  and app settings are on both
- One editable key set and one snippet list, both edited in place: hold one to
  reorder, remove or change it, with optional per-login setup sync across
  browsers
- Paste from the clipboard, a device file, or your password manager
- App-wide adaptive terminal themes
- Hardware keyboard support when focus is on chrome
- Files workspace with jailed Locations, preview, rename, new folders, and
  folder-scoped Terminal/Codex/Grok/Claude session launch
- `vps-terminal-focus <session>`: a host command that moves the open browser
  tab to a tmux session, over a one-way control channel
- GameLab Mode: an optional per-login setting on its own GameLab tab. It lists
  game sessions only, gives each a Play link, and turns the Files Locations into
  the games themselves. It changes what the app shows, not what the shell can do
- Create new game: one interview session per tap, closed again once its agent has
  exited and nobody is attached
- Installable PWA

---

## Configuration

| Variable | Purpose |
|----------|---------|
| `VPS_TERMINAL_ORIGIN` | Public HTTPS origin (**required** in production) |
| `VPS_TERMINAL_SOCKET` | Unix socket path (set by install script) |
| `VPS_TERMINAL_APP_NAME` | UI title |
| `VPS_TERMINAL_PROJECT_ROOT` | Default projects folder / new session cwd |
| `VPS_TERMINAL_LOCAL_DEV=1` | Laptop testing only — **no auth**, loopback only |

Full list: [docs/configuration.md](docs/configuration.md).

---

## Docs map

| Doc | Audience |
|-----|----------|
| **[docs/install.md](docs/install.md)** | **First-time VPS install (start here)** |
| [SECURITY.md](SECURITY.md) | Security model and checklist |
| [docs/auth-google.md](docs/auth-google.md) | Gmail / Google + oauth2-proxy |
| [docs/reverse-proxy.md](docs/reverse-proxy.md) | Any reverse proxy / IdP |
| [docs/configuration.md](docs/configuration.md) | Environment variables |
| [docs/development.md](docs/development.md) | Local development without auth |
| [docs/docker.md](docs/docker.md) | Optional Docker (advanced) |
| [docs/faq.md](docs/faq.md) | Common questions |

---

## License

MIT — [LICENSE](LICENSE). Notices: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
