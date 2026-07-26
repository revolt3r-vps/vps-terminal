# Reverse proxy setup

## Contract

1. Authenticate the user at the edge.
2. **Strip** any client-supplied `X-Vps-Authenticated-Email`.
3. **Set** `X-Vps-Authenticated-Email` from the verified identity only.
4. Forward HTTP and WebSocket to the app (Unix socket preferred).
5. Ensure `Origin` seen by the app matches `VPS_TERMINAL_ORIGIN`.

## Simplest recommended setup

For most self-hosters, use **Google (Gmail) sign-in** via **oauth2-proxy** in
front of Caddy or nginx:

→ **[auth-google.md](auth-google.md)** (step-by-step)

Security model: **[../SECURITY.md](../SECURITY.md)**

Any other IdP is fine if it ends with the same header contract.

## Recommended topology

```text
Internet → TLS proxy + auth → Unix socket → vps-terminal (user service)
```

Mount only the socket directory into the proxy (read-only), for example:

```text
/home/YOU/.local/share/vps-terminal/run  →  /run/vps-terminal:ro
```

Socket mode is `0660`. Ensure the proxy user/group can connect.

## Examples

- [Google + oauth2-proxy walkthrough](auth-google.md)
- [Caddy sketch](../examples/caddy/Caddyfile.snippet)
- [nginx + auth_request sketch](../examples/nginx/nginx.snippet.conf)

## WebSockets

Upgrade requests must reach the app with the same auth path as HTTP. Keep
proxy read timeouts long enough for an interactive session (the app closes
WebSockets after one hour anyway).

## Checklist

- [ ] Unauthenticated HTTPS request is rejected or redirected to login
- [ ] Client cannot spoof `X-Vps-Authenticated-Email`
- [ ] App is not listening on a public TCP interface
- [ ] `VPS_TERMINAL_ORIGIN` equals the browser origin exactly
- [ ] Independent SSH/Tailscale recovery still works
