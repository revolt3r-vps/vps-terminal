#!/usr/bin/env bash
# Lightweight contract checks for the portable package.
set -Eeuo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
server="${root}/server.js"
client="${root}/public/app.js"
# `npm run check` wants the parse pass and nothing else. It used to keep its own
# copy of the file list in package.json, which is how three QA suites ended up
# unchecked by both.
syntax_only=0
[[ ${1:-} == --syntax ]] && syntax_only=1
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
# Every QA harness, found rather than listed. The hand-written list fell three
# suites behind the directory, so key-reorder, async-and-theme and files-delete
# were never syntax-checked by `npm test` at all.
#
# The markers are load-bearing. publish-vps-terminal-public strips this block
# from the public export, which ships no qa/ directory, and it deletes the whole
# range rather than matching lines: a per-line rule takes the `for` and leaves
# `done` behind, which is a syntax error rather than a missing check.
node --check "${root}/bin/vps-terminal-focus"
bash -n "${root}/attach-session"
bash -n "${root}/scripts/install.sh"
bash -n "${root}/scripts/vendor-assets.sh"

if (( syntax_only )); then
  printf '%s\n' 'check.sh: PASS (syntax only)'
  exit 0
fi


grep -Fq "VPS_TERMINAL_LOCAL_DEV === '1'" "$server"
grep -Fq "request.headers['x-vps-authenticated-email']" "$server"
grep -Fq "request.headers.origin === publicOrigin" "$server"
grep -Fq 'const defaultSnippetPresets' "$server"
# Clipboard wiring: tmux reports copies as OSC 52, and Ctrl/Cmd+V must be read
# from the host clipboard rather than sent to the pty as ^V.
grep -Fq 'registerOscHandler' "$client"
grep -Fq 'function handleClipboardOsc(' "$client"
grep -Fq 'function handleTerminalPasteEvent(' "$client"
grep -Fq 'void pasteClipboard();' "$client"
# The in-app text mirror must never stand in for a clipboard the browser read
# successfully but would not hand over — that pastes unrelated older text.
grep -Fq 'if (appClipboardText && error) {' "$client"
grep -Fq "VPS_TERMINAL_CLIENT_DEBUG === '1'" "$server"
grep -Fq 'appendBoundedClientDebugEntries' "$server"
# T19 keyboard transition capture. The failure is intermittent and phone-only, so
# the ring buffer has to stay sliceable for the unit test.
grep -Fq 'const maximumKeyboardTransitions' "$client"
# The Debug tab is back, hidden behind five taps on the build line. Pin both the
# markup and the gate: the tab shipping unhidden is the failure that matters, and
# a panel with no gate looks identical to one whose gate was deleted.
grep -Fq 'data-panel-tab="debug"' "${root}/public/index.html"
grep -Fq 'data-panel-page="debug"' "${root}/public/index.html"
grep -Fq 'const debugUnlockTapsRequired = 5;' "$client"
grep -Fq 'const debugUnlockStorageKey' "$client"
grep -Fq '// ---- End of the pure keyboard transition block. ----' "$client"
grep -Fq 'function recordKeyboardTransition(' "$client"
# The declined release is the transition the ticket is chasing; losing this call
# site would leave a stuck conjunction invisible again.
grep -Fq "recordKeyboardTransition('release-declined')" "$client"
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
# The home screen caption, which is not the product name. iOS truncates at
# about twelve characters and Android uses short_name, so both get "Terminal".
grep -Fq '"short_name": "Terminal"' "${root}/public/manifest.webmanifest"
grep -Fq 'name="apple-mobile-web-app-title" content="Terminal"' \
  "${root}/public/index.html"

# iOS reads none of the manifest icons and does not render SVG on the home
# screen. Without this link and this file it draws a letter tile instead, which
# is not a visible failure anywhere in CI — so it is asserted here.
grep -Fq 'rel="apple-touch-icon" href="/apple-touch-icon.png' \
  "${root}/public/index.html"
for icon in apple-touch-icon.png icon-192.png icon-512.png \
  icon-maskable-512.png terminal.svg; do
  test -s "${root}/public/${icon}" ||
    fail "public/${icon} is missing or empty"
done
# A maskable icon is cropped to the centre 80% circle. Declaring the full-bleed
# art maskable, which this manifest used to do, loses the glyph's edges on any
# Android launcher that crops to a circle.
if grep -Fq '"purpose": "any maskable"' "${root}/public/manifest.webmanifest"; then
  fail 'no icon may be both any and maskable; ship a separate padded one'
fi
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
