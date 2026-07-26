#!/usr/bin/env bash
# Copy browser vendor assets from node_modules into public/vendor.
set -Eeuo pipefail

umask 077

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
modules="${root}/node_modules"
vendor="${root}/public/vendor"

[[ -d "$modules" ]] || {
  printf '%s\n' 'vendor-assets: run npm ci first' >&2
  exit 1
}

install -d -m 755 "$vendor"
install -m 644 \
  "${modules}/@xterm/xterm/css/xterm.css" \
  "${vendor}/xterm.css"
install -m 644 \
  "${modules}/@xterm/xterm/lib/xterm.js" \
  "${vendor}/xterm.js"
install -m 644 \
  "${modules}/@xterm/addon-fit/lib/addon-fit.js" \
  "${vendor}/addon-fit.js"
install -m 644 \
  "${modules}/@xterm/addon-search/lib/addon-search.js" \
  "${vendor}/addon-search.js"
install -m 644 \
  "${modules}/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2" \
  "${vendor}/jetbrains-mono-regular.woff2"
install -m 644 \
  "${modules}/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-600-normal.woff2" \
  "${vendor}/jetbrains-mono-semibold.woff2"

printf '%s\n' 'vendor-assets: OK'
