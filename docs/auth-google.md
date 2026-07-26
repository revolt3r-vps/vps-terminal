# Google (Gmail) sign-in — recommended production auth

`vps-terminal` does **not** embed Google OAuth. You put Google login on the
**reverse proxy**, then the proxy tells the app who signed in.

This is the **simplest** production pattern for most people:

- Sign in with the Google account you already use on your phone
- 2FA / passkeys stay with Google
- No password database on your VPS
- The app only sees a verified email header

If you have not installed the app yet, start with **[install.md](install.md)**.

---

## What you will set up

```text
Phone browser
    │
    ▼
https://terminal.example.com     ← Caddy gets a free HTTPS cert
    │
    ├─ not logged in?  →  oauth2-proxy  →  Google “Sign in”
    │
    └─ logged in + allowlisted
            │
            │  header: X-Vps-Authenticated-Email: you@gmail.com
            ▼
     Unix socket → vps-terminal → tmux
```

You need:

- Domain names for `terminal` (and usually `auth`) pointing at the VPS
- A Google Cloud **OAuth client** (free for personal use)
- [oauth2-proxy](https://oauth2-proxy.github.io/oauth2-proxy/)
- Caddy (or nginx)

---

## 1. Google Cloud OAuth client

1. Open [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. **APIs & Services → OAuth consent screen**
   - User type: **External** is fine for personal Gmail
   - App name: e.g. `My VPS Terminal`
   - Add yourself as a **test user** while the app is in Testing
4. **APIs & Services → Credentials → Create credentials → OAuth client ID**
   - Application type: **Web application**
   - Authorized redirect URIs — pick **one** style and stick to it:

```text
https://auth.example.com/oauth2/callback
```

5. Copy **Client ID** and **Client secret** into a private file on the VPS
   (not into git).

Consent screen “Testing” is enough for personal use if your Gmail is listed as
a test user. You can still **restrict** access further with oauth2-proxy’s
allowlist below.

---

## 2. Email allowlist (important)

Create a file only root/your user can read, e.g.
`/home/deploy/oauth2-proxy-allowlist.txt`:

```text
you@gmail.com
```

Only these addresses may use the terminal.
**Every listed person gets a full shell** as the Linux user running
`vps-terminal`. Do not allowlist coworkers lightly.

Enable **2FA or a passkey** on those Google accounts.

---

## 3. Run oauth2-proxy

Install a current release from upstream:
https://oauth2-proxy.github.io/oauth2-proxy/installation/

Example flags (replace secrets and paths):

```bash
COOKIE_SECRET="$(openssl rand -base64 32)"

oauth2-proxy \
  --provider=google \
  --client-id='YOUR_CLIENT_ID.apps.googleusercontent.com' \
  --client-secret='YOUR_CLIENT_SECRET' \
  --cookie-secret="$COOKIE_SECRET" \
  --email-domain='*' \
  --authenticated-emails-file=/home/deploy/oauth2-proxy-allowlist.txt \
  --redirect-url='https://auth.example.com/oauth2/callback' \
  --oidc-issuer-url='https://accounts.google.com' \
  --http-address='127.0.0.1:4180' \
  --upstream=static://202 \
  --set-xauthrequest=true \
  --pass-access-token=false \
  --cookie-secure=true \
  --cookie-httponly=true \
  --cookie-samesite=lax \
  --cookie-expire=1h \
  --cookie-domains='.example.com' \
  --whitelist-domain='.example.com'
```

Notes for beginners:

| Flag | Meaning |
|------|---------|
| `--http-address=127.0.0.1:4180` | Only the VPS itself can talk to oauth2-proxy |
| `--authenticated-emails-file` | Your Gmail allowlist |
| `--set-xauthrequest=true` | Exposes email to Caddy as `X-Auth-Request-Email` |
| `--cookie-expire=1h` | Matches the terminal’s 1-hour WebSocket limit |

Run this under **systemd** (system or user unit) so it restarts on reboot.
Exact unit files depend on how you installed the binary; keep secrets in
`EnvironmentFile=` with mode `600`.

Official Google provider docs:
https://oauth2-proxy.github.io/oauth2-proxy/configuration/providers/google

---

## 4. Caddy (HTTPS + forward to the terminal)

Install Caddy: https://caddyserver.com/docs/install

Use a Caddyfile inspired by
[examples/caddy/Caddyfile.snippet](../examples/caddy/Caddyfile.snippet):

```caddy
auth.example.com {
	reverse_proxy 127.0.0.1:4180
}

terminal.example.com {
	forward_auth 127.0.0.1:4180 {
		uri /oauth2/auth
		copy_headers X-Auth-Request-Email
	}

	reverse_proxy unix//home/deploy/.local/share/vps-terminal/run/terminal.sock {
		header_up -X-Vps-Authenticated-Email
		header_up X-Vps-Authenticated-Email {http.request.header.X-Auth-Request-Email}
	}
}
```

**Adapt the socket path** to your home directory (`echo $HOME`).

Rules that must stay true:

1. Unauthenticated users never reach the terminal socket.
2. Browser-supplied `X-Vps-Authenticated-Email` is **stripped**.
3. The header is **set** only from oauth2-proxy’s verified email.
4. Caddy (or the host user it runs as) can **connect** to the socket
   (socket is mode `0660`; you may need a shared group — see below).

### Socket permissions (common gotcha)

`vps-terminal` creates the socket as your user. Caddy often runs as another
user. Options:

- Run Caddy as the same user (less common), or
- Put both in a shared group and adjust socket directory group/`setgid`, or
- Proxy via loopback TCP only on `127.0.0.1` (still not public) if you prefer
  simpler permissions — set `VPS_TERMINAL_HOST=127.0.0.1` instead of a socket
  (advanced; reinstall/configure unit carefully).

If the browser shows **502** after login, check Caddy logs and socket
permissions first.

---

## 5. App origin must match the browser

```bash
export VPS_TERMINAL_ORIGIN=https://terminal.example.com
cd ~/vps-terminal && ./scripts/install.sh
```

Wrong origin symptoms: login works but API/WebSocket fails or CSRF-style errors.

---

## 6. Verify

| Check | Expected |
|-------|----------|
| Incognito → terminal URL | Redirect / prompt for Google |
| Non-allowlisted Google account | Denied |
| Allowlisted account | Terminal UI loads |
| Create a session | Shell prompt works |
| `ss -lntp` / firewall | No public Node port for the app |
| SSH still works | You can recover without the PWA |

---

## Security reminders

- Allowlisted Gmail ≠ separate Linux users. Shared OS account.
- Use Google 2FA/passkeys.
- Keep OAuth client secret off git and chat logs.
- Never set `VPS_TERMINAL_LOCAL_DEV=1` on a public VPS.
- Details: [SECURITY.md](../SECURITY.md)

---

## Alternatives to Google

Authelia, Authentik, Keycloak, Cloudflare Access, etc. all work if they end
with: **verified email → `X-Vps-Authenticated-Email` → private path to the app**.

Contract: [reverse-proxy.md](reverse-proxy.md)
