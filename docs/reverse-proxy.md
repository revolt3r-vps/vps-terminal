# Reverse proxy setup

Beginners: follow **[install.md](install.md)** then **[auth-google.md](auth-google.md)**.
This page is the short technical contract for any identity provider.

## Contract

1. Authenticate the user at the edge.
2. **Strip** any client-supplied `X-Vps-Authenticated-Email`.
3. **Set** `X-Vps-Authenticated-Email` from the verified identity only.
4. Forward HTTP and WebSocket to the app (Unix socket preferred).
5. Ensure `Origin` seen by the app matches `VPS_TERMINAL_ORIGIN`.

## Simplest recommended setup

**Google (Gmail) + oauth2-proxy + Caddy** (or nginx):

→ **[auth-google.md](auth-google.md)**

Security model: **[../SECURITY.md](../SECURITY.md)**

## Topology

```text
Internet → TLS proxy + auth → Unix socket → vps-terminal (user service)
```

Mount only the socket directory into the proxy if the proxy is containerized:

```text
/home/YOU/.local/share/vps-terminal/run  →  /run/vps-terminal:ro
```

Socket mode is `0660`. The proxy process must be allowed to connect (same user
or shared group). **502 after login** is often a permissions problem.

## Examples

- [Google walkthrough](auth-google.md)
- [Caddy sketch](../examples/caddy/Caddyfile.snippet)
- [nginx + auth_request sketch](../examples/nginx/nginx.snippet.conf)

## WebSockets

Upgrade requests must use the same auth path as normal HTTP. Keep proxy read
timeouts long enough for an interactive session (the app closes WebSockets after
one hour).

## Checklist

- [ ] Unauthenticated HTTPS request is rejected or redirected to login
- [ ] Client cannot spoof `X-Vps-Authenticated-Email`
- [ ] App is not listening on a public TCP interface
- [ ] `VPS_TERMINAL_ORIGIN` equals the browser origin exactly
- [ ] Independent SSH recovery still works
