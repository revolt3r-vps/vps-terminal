# Security model

## Summary

`vps-terminal` does **not** authenticate users by itself. It trusts a reverse
proxy to:

1. Authenticate the human (OAuth, SSO, mTLS, etc.).
2. Strip any client-supplied identity headers.
3. Inject **`X-Vps-Authenticated-Email`** with a verified email.
4. Forward only over a private channel (Unix socket recommended).

Anyone who obtains a valid authenticated session can run shell commands as the
**same Unix user** that runs the service. Treat an open browser session like an
unlocked SSH client for that account.

## Threats

| Threat | Mitigation |
|--------|------------|
| Unauthenticated public TCP | Do not publish the app port. Prefer Unix socket mounted only into the proxy. |
| Header spoofing | Proxy must strip and re-set `X-Vps-Authenticated-Email` after auth. |
| CSRF / cross-site WS | Exact `Origin` must match `VPS_TERMINAL_ORIGIN`. |
| `LOCAL_DEV` exposed | Mode skips auth; bind loopback only; never combine with `VPS_TERMINAL_SOCKET`. |
| Over-broad allowlist | Every admitted email has full shell power of the service user. |

## Hard requirements for production

- Set `VPS_TERMINAL_ORIGIN` to the exact public HTTPS origin.
- Prefer `VPS_TERMINAL_SOCKET` over TCP.
- Terminate TLS and auth at the proxy.
- Run as a non-root user dedicated to the shell you intend to expose.
- Keep independent recovery access (SSH / Tailscale / console).

## Limits (defense in depth, not multi-tenant isolation)

- WebSocket lifetime: 1 hour  
- Max concurrent WS connections: 10  
- Session name charset and length limits  
- Path jail for the file browser  
- Upload / preview size caps  
- CSP without inline scripts  

## Reporting issues

Use GitHub private security advisories on the public repository when possible.
Do not open public issues that include exploit details against live deployments.
