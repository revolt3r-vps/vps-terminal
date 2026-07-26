# Docker (optional)

Host install with a user systemd unit is the primary path. Docker is useful for
demos or isolated environments.

## Caveats

- Container tmux sessions are **not** automatically the same as host-user tmux
  sessions unless you share namespaces carefully.
- Never publish the app port on `0.0.0.0` without a hardened reverse proxy and
  auth in front.
- Prefer binding to `127.0.0.1` on the host and proxying from there.

## Demo compose

See [examples/docker-compose.yml](../examples/docker-compose.yml).

Typical demo uses `VPS_TERMINAL_LOCAL_DEV=1` on loopback only. That mode **skips
authentication** and must never face a network you do not trust.

## Production-like container

1. Do **not** set `LOCAL_DEV`.
2. Set `VPS_TERMINAL_ORIGIN` and inject `X-Vps-Authenticated-Email` from a
   proxy on the host.
3. Bind `VPS_TERMINAL_HOST=0.0.0.0` only inside a private container network, or
   use a shared Unix socket volume with the proxy container.
4. Mount home/projects if you need real files; understand the security impact.
