# Security

## One-line summary

Anyone who can complete your reverse-proxy login can run shell commands as the
**service Unix user**. Design the edge (TLS + identity + allowlist) as carefully
as you would an SSH account.

## What the app does and does not do

| Layer | Responsibility |
|-------|----------------|
| **You (edge)** | TLS, login (e.g. Google via oauth2-proxy), email allowlist, strip/spoof-proof identity headers, private path to the app |
| **vps-terminal** | Trust `X-Vps-Authenticated-Email`, check `Origin`, session/tmux/FS limits, CSP |

The app has **no** built-in Gmail/password/OAuth UI. That is intentional: one
auth stack at the proxy covers HTTP and WebSockets the same way.

Recommended simplest edge: **[docs/auth-google.md](docs/auth-google.md)**
(Google sign-in + oauth2-proxy + allowlisted Gmail addresses).

## Trust boundary

```text
Untrusted Internet
        │
        ▼
┌───────────────────────┐
│ Reverse proxy + auth  │  ← all real security lives here
└───────────┬───────────┘
            │ X-Vps-Authenticated-Email (verified only)
            │ Unix socket (preferred)
            ▼
┌───────────────────────┐
│ vps-terminal          │  ← full shell power of one Linux user
└───────────────────────┘
```

## Hard requirements for production

1. Set `VPS_TERMINAL_ORIGIN` to the exact public HTTPS origin (fail-closed if missing).
2. Prefer `VPS_TERMINAL_SOCKET` over any public TCP port.
3. Terminate TLS and authentication at the proxy — never expose Node directly.
4. **Strip** client-supplied `X-Vps-Authenticated-Email`; set it only after auth.
5. Allowlist specific emails when using Google/SSO (every admitted user = full shell).
6. Run as a non-root user whose privileges you accept for browser access.
7. Keep independent recovery access (SSH / Tailscale / console).
8. Never enable `VPS_TERMINAL_LOCAL_DEV=1` on a reachable network.

## Threats and mitigations

| Threat | Mitigation |
|--------|------------|
| Unauthenticated public TCP | Do not publish the app port. Socket only into the proxy. |
| Header spoofing | Proxy strips and re-sets identity headers after login. |
| CSRF / cross-site WebSocket | Exact `Origin` must equal `VPS_TERMINAL_ORIGIN`. |
| Stolen browser cookie | Short auth cookie TTL (e.g. 1h); Google 2FA/passkeys; app WS max lifetime 1h. |
| Over-broad Google allowlist | Explicit email list; treat each address as an admin of that Unix user. |
| `LOCAL_DEV` exposed | Skips auth; loopback only; forbidden with `VPS_TERMINAL_SOCKET`. |
| Compromised proxy | Compromised shell — isolate host, minimize proxy attack surface. |

## Google / Gmail specific notes

- Prefer an **authenticated emails file** (allowlist) over open `email-domain=*`.
- Enforce **2FA or passkeys** on allowlisted Google accounts.
- Keep OAuth client secrets only in proxy config/secrets managers — not in this repo.
- Consent screen in “Testing” is fine for personal use with listed test users.

## App limits (defense in depth, not multi-tenant isolation)

These reduce blast radius; they do **not** separate multiple human users into
different OS accounts:

- WebSocket lifetime: 1 hour
- Max concurrent WebSocket connections: 10
- Session name charset and length limits
- Path jail for the file browser
- Upload / preview size caps
- CSP without inline scripts

## Operational checklist

- [ ] Unauthenticated request redirects to login (or 401)
- [ ] Non-allowlisted Google account cannot open the terminal
- [ ] Client cannot inject `X-Vps-Authenticated-Email`
- [ ] App listens only on Unix socket or loopback
- [ ] `VPS_TERMINAL_ORIGIN` matches the browser origin exactly
- [ ] Independent SSH/Tailscale recovery still works after stopping the unit

## Reporting issues

Use GitHub private security advisories on the public repository when possible.
Do not open public issues that include exploit details against live deployments.
