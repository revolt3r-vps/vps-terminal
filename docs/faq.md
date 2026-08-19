# FAQ

## Is this a replacement for SSH?

No. It is a **convenient browser/PWA path** for tmux on a phone or laptop.
Always keep SSH (or Tailscale / provider console) as recovery.

## Does it include Gmail login?

**Not inside the app.** The recommended production setup is Google sign-in via
**oauth2-proxy** in front of Caddy/nginx. See [auth-google.md](auth-google.md).

## Who can run commands on my VPS?

Anyone who:

1. Completes your reverse-proxy login, and
2. Is allowed by your Google/oauth allowlist (or other IdP rules)

They run as the **same Linux user** that runs `vps-terminal` — not as separate
Unix accounts per email.

## Do I need a domain name?

For the documented HTTPS + Google OAuth path: **yes**. Free DNS (or a subdomain
you already own) is enough. Local IP + HTTP is only for private testing
(`LOCAL_DEV`), not for the open internet.

## Can I run it as root?

Do not. Create a normal user and install as that user. Root in the browser is a
severe risk if anything in the auth path fails.

## What is a Unix socket?

A private file on the server (here:
`~/.local/share/vps-terminal/run/terminal.sock`) that only local programs (your
reverse proxy) should connect to. It is not a public internet port.

## Why does install require `VPS_TERMINAL_ORIGIN`?

The app checks the browser `Origin` header so random websites cannot drive your
terminal. The value must match the exact public URL, e.g.
`https://terminal.example.com`.

## Can two people use it?

Yes, if both emails are allowlisted — but they **share one Linux user** and can
see/kill each other’s tmux sessions. This is not multi-tenant hosting.

## How do copy and paste work?

**Copy.** Drag-select and press Ctrl/Cmd+C, or use the Copy chip after a
long-press on touch. Inside tmux with `mouse on`, tmux — not the browser — owns
the drag, and a repainting TUI drops the browser's selection anyway; both cases
are covered because tmux reports its own copies as OSC 52 and the terminal
writes those straight to your clipboard. Nothing extra to configure if tmux has
`set-clipboard on` (or the default `external`) and the `xterm*:clipboard`
terminal feature.

**A command you were told to run.** On touch, tap a line that starts with `! `. A
chip appears, and it says which of two things it will do.

`Run` sends the command and presses Enter. `Type` puts it on the prompt and stops,
because the line may be a fragment: an agent breaks a long line at a word boundary and
puts the rest on an indented row of its own, which nothing can rejoin. Reading it
before it runs is the only safe answer there — one cut point separates `rm -rf /tmp/x`
from `rm -rf /`.

A command the terminal itself wrapped is different. That happens to a single token
longer than the width, those rows carry a wrap flag, and they rejoin exactly. Even
then, an indented row below still holds the Enter back, because the flags prove where
the terminal broke the text and nothing more.

The Enter is sent as a separate write, a moment after the command. At an agent's prompt
the leading `!` switches the input to shell mode, and that only happens if the text
arrives with no newline behind it; in one write the whole thing is submitted as typed
and the command reaches the agent as a chat message. Run on a snippet sends its Enter
the same way, for the same reason.

The `!` is the mark. An agent writes a command you are meant to run as `! bash
x.sh`, because `!` is what sends it to the shell instead of to the agent as a
message. The chip is offered on marked lines only, and it sends the mark too. A
line without it gets no chip, which is what keeps the chip off ordinary output.

This is also the way to run a command the terminal wrapped across rows. A copy of
a wrapped command carries the row breaks with it. The shell then reads each row as
a command of its own. The line does not have to contain a link:
`! scripts/install-vps-terminal` has no file extension, so it is not a link, and
the chip still offers it.

`Run` presses Enter, so two shapes are refused outright. A line carrying a second
`!` is never offered: an interactive shell has history expansion on, and it would
rewrite `! echo a-!ec` into a previous command and run that instead of what you
read. A line inside `vim` or `less` that happens to start with `! ` is still
offered, and its keys reach that program. There is no way to tell those apart
here, because this terminal always attaches to tmux, and tmux keeps the terminal
on the alternate screen and `mouse on` for the whole session.

**A command you ran before.** Tap it. No `!` needed, because the shell told the
terminal what it was.

That is OSC 133, the same shell integration VS Code and iTerm2 use. Each prompt
marks where it starts and ends, and each command reports itself, so the browser
knows which text in your scrollback is a command.

It needs two lines. Source the emitter from `~/.bashrc`:

```bash
. "${HOME}/.local/share/vps-terminal/shell-integration.bash"
```

And let the marks past tmux, which consumes some of them itself:

```
set -g allow-passthrough on
```

`install.sh` reports whether the first one is in place; it does not edit your files.
Remove the line to turn the feature off, and the chip goes back to needing a `!`.

The marks also tell the chip whether a shell is at its prompt. That is what settles
the `!` above: at a shell prompt the mark is dropped before the command is sent,
because `!` is bash's negation word there, and `! x && y` would otherwise run `y`
when `x` fails. At an agent's prompt the mark is kept, because that is where it
means "run the rest as a shell command". Where the shell does not report at all,
the line is sent exactly as offered.

**Paste.** Ctrl/Cmd+V pastes text or an image, and is handled in the browser
rather than passed through as `^V`, which TUIs bind to their own actions. It
uses the browser's own paste, so no clipboard permission prompt appears and
screenshots come through — on desktop the async clipboard API often refuses to
hand over an image, which would otherwise look like an empty clipboard. Text is
pasted through the terminal's bracketed-paste path, so a multi-line paste stays
one block. A copied image is uploaded to `~/paste/` and pasted as a path, which
is how you hand a screenshot to a program running in the session. Pasted images
are kept for 24 hours, up to 200 files and 10 MB each; the server deletes the
rest, oldest first. Shift+Insert
and the footer Paste button read the clipboard directly instead, which is the
path that can prompt for permission. A literal `^V` is still available from the
on-screen Ctrl key.

A clipboard *read* request from the session (`OSC 52` with `?`) is never
answered, so nothing running in the terminal can read your clipboard.

## Docker or bare metal?

Bare metal (or a normal VPS user + systemd) is the documented beginner path so
you get real host tmux sessions. Docker is optional and more advanced
([docker.md](docker.md)).

## Something broke after reboot

```bash
# user services need lingering
sudo loginctl enable-linger "$USER"
export XDG_RUNTIME_DIR="/run/user/$(id -u)"
systemctl --user status vps-terminal.service
```

Also confirm Caddy/oauth2-proxy start on boot.

## Where do I get help?

- Troubleshooting in [install.md](install.md)
- Security expectations in [SECURITY.md](../SECURITY.md)
- GitHub issues on the public repo for bugs/docs gaps (no secrets in issues)
