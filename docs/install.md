# Install guide (first VPS / first SSH)

This walkthrough assumes you are new to running a Linux VPS and want a
**phone-friendly terminal** protected by **Google (Gmail) login**.

You will:

1. SSH into the VPS
2. Install system tools
3. Install `vps-terminal`
4. Put **Caddy + oauth2-proxy + Google** in front
5. Open the site on your phone

Replace every example hostname with **your** domain.

| Example in docs | Meaning |
|-----------------|---------|
| `terminal.example.com` | Public URL for the terminal PWA |
| `auth.example.com` | Optional host for Google OAuth callbacks |
| `you@gmail.com` | Gmail account allowed to use the terminal |
| `deploy` | Non-root Linux username (use yours) |

---

## 0. What you need before starting

| Item | Why |
|------|-----|
| A Linux VPS (Ubuntu 22.04/24.04 is fine) | Where everything runs |
| Ability to **SSH** into it (provider console or key) | Install and fix things if the web UI breaks |
| A **domain name** pointing at the VPS (or you can use a free DNS service) | HTTPS + Google OAuth need real hostnames |
| A **Gmail** (or Google) account | Login to the terminal in the browser |
| Ports **80** and **443** open on the VPS firewall | Let's Encrypt / HTTPS |

**Critical safety idea:**
Once Google login works, anyone on your allowlist can run shell commands as your
Linux user. Keep **SSH** (or Tailscale) working as a backup. Do not turn off SSH
until the web path is proven in a second device/session.

Read [SECURITY.md](../SECURITY.md) when you can; the short version is enough to
start.

---

## 1. First SSH login

From your laptop (replace IP and user with what your provider gave you):

```bash
ssh root@YOUR_VPS_IP
```

Or, if the provider already created a user:

```bash
ssh deploy@YOUR_VPS_IP
```

If login works, you are on the server. All following commands run **there**,
unless noted.

### Create a normal user (if you are root)

Do **not** run the terminal app as root.

```bash
# Ubuntu/Debian example
adduser deploy
usermod -aG sudo deploy

# Optional: copy your SSH key so deploy can log in without a password
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy
```

Then log in as that user:

```bash
ssh deploy@YOUR_VPS_IP
```

### Keep SSH working

- Prefer SSH keys over passwords
- Note your provider’s **web console** / recovery path
- Optional later: Tailscale for private admin access

---

## 2. Install system packages

On **Debian/Ubuntu** as your normal user (with sudo):

```bash
sudo apt-get update
sudo apt-get install -y \
  curl ca-certificates git build-essential coreutils python3 \
  tmux
```

### Node.js 20 (recommended)

NodeSource example for Ubuntu (check [NodeSource](https://github.com/nodesource/distributions)
if this ages out):

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v    # should be v18+ (v20 is fine)
npm -v
```

### systemd user services (so the app restarts after reboot)

```bash
# Allow your user services to run even when you are not logged in via SSH
sudo loginctl enable-linger "$USER"

# Make sure a user bus is available in this SSH session
export XDG_RUNTIME_DIR="/run/user/$(id -u)"
systemctl --user status
```

If `systemctl --user` errors, log out/in once after `enable-linger`, or reboot.

---

## 3. Point DNS at the VPS

In your DNS provider, create **A** (or AAAA) records:

| Name | Type | Value |
|------|------|--------|
| `terminal` | A | your VPS public IP |
| `auth` | A | same IP (if you use a separate auth host) |

Wait until they resolve (can take a few minutes):

```bash
# from your laptop
dig +short terminal.example.com
```

You should see your VPS IP.

---

## 4. Install vps-terminal

Still on the VPS as your normal user:

```bash
cd ~
git clone https://github.com/revolt3r-vps/vps-terminal.git
cd vps-terminal

# MUST match the exact HTTPS URL you will open in the browser (no trailing slash)
export VPS_TERMINAL_ORIGIN=https://terminal.example.com

# optional branding
# export VPS_TERMINAL_APP_NAME='My VPS Terminal'
# export VPS_TERMINAL_PROJECT_ROOT="$HOME/projects"

./scripts/install.sh
```

What success looks like:

```text
install.sh: PASS
Listening on: /home/deploy/.local/share/vps-terminal/run/terminal.sock
Origin:       https://terminal.example.com
```

Check the service:

```bash
systemctl --user status vps-terminal.service
test -S "$HOME/.local/share/vps-terminal/run/terminal.sock" && echo sock_ok
```

At this point the app is running **only** on a private Unix socket.
Nothing is public yet until the reverse proxy is up — that is intentional.

Useful commands:

```bash
systemctl --user restart vps-terminal.service
journalctl --user -u vps-terminal.service -n 50 --no-pager
```

---

## 5. Put Google login in front (recommended)

Full detail: [auth-google.md](auth-google.md).

Short path:

1. Create a Google OAuth **Web** client
2. Redirect URI like `https://auth.example.com/oauth2/callback`
3. Run **oauth2-proxy** with an **email allowlist** (`you@gmail.com` only)
4. Run **Caddy** (or nginx) for HTTPS + `forward_auth`
5. Caddy proxies to the Unix socket and sets `X-Vps-Authenticated-Email`

### Why this step exists

`vps-terminal` does **not** include Gmail login. If you open the socket without
auth, anyone who can reach it has your shell. Always put TLS + Google (or another
IdP) in front before opening firewall holes to the world.

### Minimal mental model

```text
Phone
  → https://terminal.example.com   (Caddy, free HTTPS)
      → checks login with oauth2-proxy
          → Google “Sign in with Google”
      → if allowlisted, proxy to terminal.sock
          → vps-terminal → your tmux sessions
```

Copy-paste Caddy sketch: [examples/caddy/Caddyfile.snippet](../examples/caddy/Caddyfile.snippet)

---

## 6. Firewall (do this carefully)

Allow SSH, HTTP, and HTTPS. **Do not** open a random Node port for this app.

Ubuntu `ufw` example:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

Confirm you can still `ssh deploy@YOUR_VPS_IP` **before** you close the laptop.

---

## 7. First browser visit

1. On your phone or laptop, open `https://terminal.example.com`
2. Sign in with the **allowlisted** Google account
3. You should see the terminal UI
4. Tap **+** to create a tmux session (or attach an existing one)
   From Files, **Start Session** can instead launch Terminal, Codex, Grok, or
   Claude directly in the folder currently open.
5. Use **Add to Home Screen** / install PWA for app-like use

If login fails, see [Troubleshooting](#troubleshooting) below and
[auth-google.md](auth-google.md).

---

## 8. Day-2 habits

| Goal | What to do |
|------|------------|
| Update the app | `cd ~/vps-terminal && git pull && export VPS_TERMINAL_ORIGIN=... && ./scripts/install.sh` |
| Stop web access only | `systemctl --user disable --now vps-terminal.service` (SSH still works) |
| See logs | `journalctl --user -u vps-terminal.service -f` |
| Keep SSH recovery | Never rely only on the PWA; keep keys and provider console |

---

## Troubleshooting

### `install.sh: missing required command: node` (or `tmux`, `mv`, `systemctl`)

Install packages from [§2](#2-install-system-packages). For `systemctl --user`,
enable linger and set `XDG_RUNTIME_DIR`.

### `VPS_TERMINAL_ORIGIN is required`

```bash
export VPS_TERMINAL_ORIGIN=https://terminal.example.com
./scripts/install.sh
```

Use the **same** URL you type in the browser (https, correct host, no path).

### Service inactive / no socket

```bash
systemctl --user status vps-terminal.service
journalctl --user -u vps-terminal.service -n 80 --no-pager
export XDG_RUNTIME_DIR="/run/user/$(id -u)"
systemctl --user restart vps-terminal.service
```

### Browser: connection refused / SSL error

- DNS A record not ready
- Caddy not running or ports 80/443 closed
- Wrong hostname vs certificate

### Browser: loops on Google login or 401

- Email not on oauth2-proxy allowlist
- Redirect URI in Google Cloud does not match oauth2-proxy exactly
- Proxy not setting `X-Vps-Authenticated-Email` after auth
- `VPS_TERMINAL_ORIGIN` does not match the browser origin (http vs https, wrong host)

### I locked myself out of SSH

Use the VPS provider **web console**, fix `sshd`/firewall, then re-enable key
login. Do not experiment with firewall rules without a console path.

---

## What to read next

| Doc | When |
|-----|------|
| [auth-google.md](auth-google.md) | Setting up Gmail login end-to-end |
| [SECURITY.md](../SECURITY.md) | Threat model and hard rules |
| [configuration.md](configuration.md) | All environment variables |
| [reverse-proxy.md](reverse-proxy.md) | Header contract if you use another IdP |
| [development.md](development.md) | Local no-auth testing on a laptop |
| [docker.md](docker.md) | Optional containers (not the beginner path) |
