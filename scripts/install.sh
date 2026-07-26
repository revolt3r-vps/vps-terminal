#!/usr/bin/env bash
# Portable host install for vps-terminal (user systemd + Unix socket).
set -Eeuo pipefail

umask 077

readonly app_source="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
readonly state_root="${VPS_TERMINAL_STATE_ROOT:-${HOME}/.local/share/vps-terminal}"
readonly unit_source="${app_source}/examples/systemd/vps-terminal.service"
readonly unit_target="${HOME}/.config/systemd/user/vps-terminal.service"
readonly origin_required="${VPS_TERMINAL_ORIGIN:-}"

usage() {
  cat <<'EOF'
Usage: scripts/install.sh

Installs vps-terminal into ~/.local/share/vps-terminal (or VPS_TERMINAL_STATE_ROOT),
vendors browser assets, installs a user systemd unit, and starts the service.

Required for production:
  export VPS_TERMINAL_ORIGIN=https://terminal.example.com

Optional:
  VPS_TERMINAL_STATE_ROOT   install prefix (default: ~/.local/share/vps-terminal)
  VPS_TERMINAL_APP_NAME     UI title (default: VPS Terminal)
  VPS_TERMINAL_PROJECT_ROOT new-session cwd / projects root

See README.md and docs/configuration.md.
EOF
}

if [[ "${1:-}" == '-h' || "${1:-}" == '--help' ]]; then
  usage
  exit 0
fi

if [[ -z "$origin_required" ]]; then
  printf '%s\n' \
    'install.sh: set VPS_TERMINAL_ORIGIN to your exact public HTTPS origin first.' \
    'Example: export VPS_TERMINAL_ORIGIN=https://terminal.example.com' \
    >&2
  exit 1
fi

for command_name in node npm systemctl tmux install; do
  command -v "$command_name" >/dev/null || {
    printf '%s\n' "install.sh: missing required command: ${command_name}" >&2
    exit 1
  }
done

[[ -f "${app_source}/server.js" ]] || {
  printf '%s\n' 'install.sh: server.js not found next to scripts/' >&2
  exit 1
}
[[ -f "$unit_source" ]] || {
  printf '%s\n' 'install.sh: examples/systemd/vps-terminal.service missing' >&2
  exit 1
}

install -d -m 700 "$state_root" "${state_root}/public"
install -d -m 750 "${state_root}/run"

install -m 600 \
  "${app_source}/package.json" \
  "${app_source}/package-lock.json" \
  "$state_root/"
npm ci --omit=dev --no-audit --no-fund --prefix "$state_root"

install -m 600 "${app_source}/server.js" "${state_root}/server.js"
install -m 600 "${app_source}/fs-jail.js" "${state_root}/fs-jail.js"
install -m 700 "${app_source}/attach-session" "${state_root}/attach-session"
node --check "${state_root}/fs-jail.js"

install -m 600 "${app_source}/public/index.html" "${state_root}/public/index.html"
install -m 600 "${app_source}/public/app.css" "${state_root}/public/app.css"
install -m 600 "${app_source}/public/app.js" "${state_root}/public/app.js"
install -m 600 \
  "${app_source}/public/manifest.webmanifest" \
  "${app_source}/public/terminal.svg" \
  "${state_root}/public/"

# Vendor assets from the installed node_modules tree.
(
  cd "$state_root"
  install -d -m 700 public/vendor
  install -m 600 \
    node_modules/@xterm/xterm/css/xterm.css \
    public/vendor/xterm.css
  install -m 600 \
    node_modules/@xterm/xterm/lib/xterm.js \
    public/vendor/xterm.js
  install -m 600 \
    node_modules/@xterm/addon-fit/lib/addon-fit.js \
    public/vendor/addon-fit.js
  install -m 600 \
    node_modules/@xterm/addon-search/lib/addon-search.js \
    public/vendor/addon-search.js
  install -m 600 \
    node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2 \
    public/vendor/jetbrains-mono-regular.woff2
  install -m 600 \
    node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-600-normal.woff2 \
    public/vendor/jetbrains-mono-semibold.woff2
)

node --check "${state_root}/server.js"
node --check "${state_root}/public/app.js"
bash -n "${state_root}/attach-session"

# Materialize unit with this user's paths and required origin.
tmp_unit="$(mktemp)"
trap 'rm -f "$tmp_unit"' EXIT
sed \
  -e "s|@HOME@|${HOME}|g" \
  -e "s|@STATE_ROOT@|${state_root}|g" \
  -e "s|@ORIGIN@|${origin_required}|g" \
  -e "s|@APP_NAME@|${VPS_TERMINAL_APP_NAME:-VPS Terminal}|g" \
  -e "s|@PROJECT_ROOT@|${VPS_TERMINAL_PROJECT_ROOT:-${HOME}/projects}|g" \
  "$unit_source" >"$tmp_unit"

install -d -m 700 "${HOME}/.config/systemd/user"
install -m 600 "$tmp_unit" "$unit_target"
systemd-analyze --user verify "$unit_target"
systemctl --user daemon-reload
systemctl --user enable vps-terminal.service
systemctl --user restart vps-terminal.service

for _ in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20; do
  [[ -S "${state_root}/run/terminal.sock" ]] && break
  sleep 0.25
done
systemctl --user is-active --quiet vps-terminal.service
test -S "${state_root}/run/terminal.sock"

cat <<EOF
install.sh: PASS

Listening on: ${state_root}/run/terminal.sock
Origin:       ${origin_required}

Next:
  1. Point your reverse proxy at the Unix socket (docs/reverse-proxy.md).
  2. Inject X-Vps-Authenticated-Email only after successful authentication.
  3. Open ${origin_required} and install the PWA on your phone.
EOF
