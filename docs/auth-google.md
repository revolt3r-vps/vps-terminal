# Simplest production auth: Google (Gmail) sign-in

`vps-terminal` does **not** embed Google OAuth. The simplest self-hosted pattern
is still Google login at the **edge**, using a small reverse-proxy helper such
as [oauth2-proxy](https://oauth2-proxy.github.io/oauth2-proxy/).

That gives you:

- Gmail / Google Workspace accounts (or any Google account you allowlist)
- TLS + login handled outside the terminal app
- The email header the app already expects

Other IdPs (Authelia, Keycloak, Cloudflare Access, …) work the same way: after
login, inject `X-Vps-Authenticated-Email`.

## Why this is the recommended default

| Approach | Pros | Cons |
|----------|------|------|
| **Google + oauth2-proxy (recommended)** | Familiar phone login, 2FA via Google, no password store on your VPS | Needs a Google Cloud OAuth client |
| App-built-in auth | — | **Not supported** (by design) |
| HTTP basic auth only | Very small | Weak on mobile; no 2FA unless you add more |
| VPN-only (no public auth) | Strong if VPN is solid | No casual phone access without VPN |

## Architecture

```text
Phone browser
    │ HTTPS
    ▼
Caddy / nginx  ──forward_auth──▶  oauth2-proxy  ──▶  Google sign-in
    │
    │  after success: X-Vps-Authenticated-Email: you@gmail.com
    ▼
Unix socket → vps-terminal → tmux as your Linux user
```

## 1. Google Cloud OAuth client

1. Open [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials.
2. Create an **OAuth 2.0 Client ID** (type: **Web application**).
3. Authorized redirect URI (oauth2-proxy default path):

   ```text
   https://auth.example.com/oauth2/callback
   ```

   Or, if auth lives on the same host as the terminal:

   ```text
   https://terminal.example.com/oauth2/callback
   ```

4. Copy the **Client ID** and **Client secret**. Store them only in your proxy
   env / secret files — never in the `vps-terminal` repo.

5. Under **OAuth consent screen**, start in **Testing** with only your Gmail
   addresses, or publish and still **restrict** who can complete login via
   oauth2-proxy’s email allowlist (next section).

## 2. oauth2-proxy (minimal ideas)

Run oauth2-proxy on loopback (example flags — adjust to your install method):

```bash
oauth2-proxy \
  --provider=google \
  --client-id=... \
  --client-secret=... \
  --cookie-secret="$(openssl rand -base64 32)" \
  --email-domain=* \
  --authenticated-emails-file=/etc/oauth2-proxy/allowlist.txt \
  --redirect-url=https://auth.example.com/oauth2/callback \
  --oidc-issuer-url=https://accounts.google.com \
  --http-address=127.0.0.1:4180 \
  --upstream=static://202 \
  --set-xauthrequest=true \
  --pass-access-token=false \
  --cookie-secure=true \
  --cookie-httponly=true \
  --cookie-samesite=lax \
  --cookie-expire=1h
```

**Allowlist file** (`allowlist.txt`) — one address per line:

```text
you@gmail.com
backup@gmail.com
```

Prefer an explicit allowlist over “any Google account on the planet.” Every
listed email that signs in gets a **full shell** as the service user.

Cookie lifetime of about **1 hour** matches the app’s WebSocket lifetime and
limits how long a stolen cookie works.

Official docs: https://oauth2-proxy.github.io/oauth2-proxy/configuration/providers/google

## 3. Caddy in front (sketch)

See also [examples/caddy/Caddyfile.snippet](../examples/caddy/Caddyfile.snippet).

Critical rules:

1. Unauthenticated users must hit Google via oauth2-proxy (redirect / forward_auth).
2. **Strip** any browser-supplied `X-Vps-Authenticated-Email`.
3. **Set** that header only from oauth2-proxy’s verified email
   (often `X-Auth-Request-Email` when `--set-xauthrequest=true`).
4. Proxy to the Unix socket, not a public Node port.

```caddy
# Illustrative — verify against your Caddy version and oauth2-proxy layout.

auth.example.com {
	reverse_proxy 127.0.0.1:4180
}

terminal.example.com {
	forward_auth 127.0.0.1:4180 {
		uri /oauth2/auth
		copy_headers X-Auth-Request-Email
	}

	reverse_proxy unix//run/vps-terminal/terminal.sock {
		header_up -X-Vps-Authenticated-Email
		header_up X-Vps-Authenticated-Email {http.request.header.X-Auth-Request-Email}
	}
}
```

Mount only the socket directory into the proxy if it runs in Docker, e.g.
`$HOME/.local/share/vps-terminal/run` → `/run/vps-terminal:ro`.

Set the app origin to match the browser URL:

```bash
export VPS_TERMINAL_ORIGIN=https://terminal.example.com
```

## 4. Verify

1. Incognito: open `https://terminal.example.com` → Google login.
2. Wrong account (not on allowlist) → denied.
3. Allowed account → terminal UI loads; sessions work.
4. From another machine, raw TCP to the Node port/socket must **not** be public.
5. Browser DevTools: request to the app must show your email only after auth
   (you should not be able to forge the header from the client against a correct
   proxy config).

## Security notes (read [SECURITY.md](../SECURITY.md))

- Allowlisted Gmail ≠ multi-user OS isolation. All allowlisted people share the
  **same** Linux account that runs `vps-terminal`.
- Enable **2FA / passkeys** on those Google accounts.
- Keep SSH or Tailscale as an independent recovery path.
- Never set `VPS_TERMINAL_LOCAL_DEV=1` on a public deployment.

## Alternatives

If you do not want Google:

- Authelia, Authentik, Keycloak, Pomerium, Cloudflare Access, etc.
- Same contract: verified email → `X-Vps-Authenticated-Email` → Unix socket.
