# Development

For a **public VPS**, use [install.md](install.md) instead. This page is for
hacking on the code on a laptop with **no authentication**.

## Local no-auth server

```bash
cd vps-terminal
npm ci
bash scripts/vendor-assets.sh
export VPS_TERMINAL_LOCAL_DEV=1
# optional: VPS_TERMINAL_HOST=127.0.0.1 VPS_TERMINAL_PORT=3099
node server.js
```

Open `http://127.0.0.1:3099/`. Identity is `dev@localhost.test` (override with
`VPS_TERMINAL_DEV_EMAIL`).

Set `VPS_TERMINAL_CLIENT_DEBUG=1` to write bounded, metadata-only browser
diagnostics to `~/.local/share/vps-terminal/client-debug.log`. The local
workspace launcher enables this by default. Terminal contents, selected text,
clipboard text, paths, session names, and credentials are discarded.

**Never** enable `LOCAL_DEV` on a publicly reachable interface or a real VPS
you care about.

## Checks

```bash
npm test          # scripts/check.sh
npm run check     # node --check on main sources
```

Responsive browser QA, device profiles, artifacts, and the AI iteration loop
are documented in [qa.md](qa.md).

## System packages for node-pty

On Debian/Ubuntu:

```bash
sudo apt-get install -y python3 make g++ tmux
```

Node ≥ 18 is required.
