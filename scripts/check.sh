#!/usr/bin/env bash
# Lightweight contract checks for the portable package.
set -Eeuo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
server="${root}/server.js"
client="${root}/public/app.js"
fail() {
  printf 'FAIL: %s\n' "$*" >&2
  exit 1
}

node --check "$server"
node --check "${root}/diagnostics.js"
node --check "${root}/fs-jail.js"
node --check "${root}/preferences-store.js"
node --check "$client"
node --check "${root}/public/viewport-init.js"
bash -n "${root}/attach-session"
bash -n "${root}/scripts/install.sh"
bash -n "${root}/scripts/vendor-assets.sh"

grep -Fq "VPS_TERMINAL_LOCAL_DEV === '1'" "$server"
grep -Fq "request.headers['x-vps-authenticated-email']" "$server"
grep -Fq "request.headers.origin === publicOrigin" "$server"
grep -Fq 'const defaultSnippetPresets' "$server"
grep -Fq "VPS_TERMINAL_CLIENT_DEBUG === '1'" "$server"
grep -Fq 'appendBoundedClientDebugEntries' "$server"
grep -Fq 'VPS_TERMINAL_ORIGIN is required outside LOCAL_DEV' "$server"
grep -Fq 'Set VPS_TERMINAL_SOCKET (recommended) or VPS_TERMINAL_HOST' "$server"

# No project-specific hard defaults in the public package.
if grep -Eiq 'jackolab|vps\.jackolab\.com|172\.29\.93\.1' "$server"; then
  fail 'server.js must not hardcode site-specific host/origin defaults'
fi
if grep -Eiq 'jackolab' "${root}/public/manifest.webmanifest"; then
  fail 'manifest must be generic'
fi
if grep -Eiq 'jackolab' "${root}/package.json"; then
  fail 'package.json must be generic'
fi

grep -Fq 'name": "vps-terminal"' "${root}/package.json"
grep -Fq '"name": "VPS Terminal"' "${root}/public/manifest.webmanifest"
test -f "${root}/LICENSE"
test -f "${root}/SECURITY.md"
test -f "${root}/README.md"
test -f "${root}/examples/systemd/vps-terminal.service"
test -f "${root}/examples/caddy/Caddyfile.snippet"
test -f "${root}/docs/configuration.md"
test -f "${root}/docs/reverse-proxy.md"
test -f "${root}/docs/auth-google.md"
test -f "${root}/docs/install.md"
test -f "${root}/docs/faq.md"
grep -Fq 'docs/install.md' "${root}/README.md"
grep -Fq 'First SSH login' "${root}/docs/install.md"
grep -Fq 'oauth2-proxy' "${root}/docs/auth-google.md"
grep -Fq 'X-Vps-Authenticated-Email' "${root}/SECURITY.md"
grep -Fq 'Start here' "${root}/README.md"

printf '%s\n' 'check.sh: PASS'
