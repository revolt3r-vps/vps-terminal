#!/usr/bin/env bash
# OSC 133 shell integration for vps-terminal.
#
# Tells the terminal where a prompt starts, where the command line starts, when
# the command runs, and how it exited. The browser reads those marks and can then
# offer Run on a command you have already run, without guessing from the text.
#
# Sourced from an interactive bash. Deliberately defensive: this file runs before
# every prompt, and a mistake here breaks the shell rather than a feature.
#
# Two copies of every mark are emitted:
#
#   bare      - tmux consumes `133;A` itself, for copy-mode next-prompt and
#               previous-prompt. It drops B, C and D, and forwards none of them
#               to its client.
#   wrapped   - `ESC P tmux; ... ESC \` with every inner ESC doubled, which tmux
#               passes through to the terminal untouched. This is the copy the
#               browser sees. Needs `set -g allow-passthrough on`.
#
# Outside tmux the wrapped copy is skipped, since there is nothing to pass
# through and the bare copy already reaches the terminal.
#
# One mark is ours, not FinalTerm's: OSC 4133 carries the command line itself.
#
# The standard marks only bracket the command, leaving the terminal to read the text
# out of its own buffer between B and C. That cannot work through tmux. tmux forwards
# a passthrough sequence the moment it parses it, but repaints the pane on its own
# redraw cycle, so the browser sees the B mark while the cursor is still at column 0
# and reads the prompt in as part of the command. Measured, not guessed: it recorded
# `dev@host:/$ echo probe`, and Run then sent that whole row.
#
# VS Code's shell integration carries the same extension (`OSC 633;E`) for the same
# reason. 4133 is ours, so no terminal mistakes it for a sequence it knows.
#
# Sequences: https://terminfo.dev/osc  ·  tmux(1) `next-prompt`, `allow-passthrough`

# Interactive shells only. A script that sources this must not gain a DEBUG trap
# or a rewritten PS1.
case $- in
  *i*) ;;
  *) return 0 ;;
esac

# Bash only, and only where PROMPT_COMMAND and the DEBUG trap both work.
if [ -z "${BASH_VERSION:-}" ]; then
  return 0
fi

# Sourcing twice would stack a second copy of the marks onto PS1.
if [ -n "${VPS_TERMINAL_SHELL_INTEGRATION:-}" ]; then
  return 0
fi
VPS_TERMINAL_SHELL_INTEGRATION=1

# A DEBUG trap that is already in use belongs to whoever set it. Leave it alone
# and give up the C mark rather than break their tooling.
__vps_ti_debug_trap_free() {
  [ -z "$(trap -p DEBUG)" ]
}

__vps_ti_esc=$'\033'
__vps_ti_bel_st="${__vps_ti_esc}\\"

# One mark, both copies. `$1` is the OSC number and `$2` the payload after it, so
# (133, A), (133, D;0), or (4133, npm test).
__vps_ti_mark() {
  printf '%s]%s;%s%s' "$__vps_ti_esc" "$1" "$2" "$__vps_ti_bel_st"
  if [ -n "${TMUX:-}" ]; then
    printf '%sPtmux;%s%s]%s;%s%s%s\\%s\\' \
      "$__vps_ti_esc" \
      "$__vps_ti_esc" "$__vps_ti_esc" "$1" "$2" "$__vps_ti_esc" "$__vps_ti_esc" \
      "$__vps_ti_esc"
  fi
}

# The command line as typed, for the 4133 mark.
#
# `history 1` rather than `$BASH_COMMAND`, which the DEBUG trap sets to the first
# simple command only — `a && b` would report `a`, and a row reading `a && b` would
# then match nothing. bash-preexec reads it the same way for the same reason.
#
# Sent raw. A typed command holds no ESC and no control characters, and the browser
# declines a payload that does rather than storing it.
__vps_ti_typed_command() {
  local entry
  entry=$(HISTTIMEFORMAT= builtin history 1) || return 0
  if [[ $entry =~ ^[[:space:]]*[0-9]+[[:space:]]+(.*)$ ]]; then
    printf '%s' "${BASH_REMATCH[1]}"
  fi
}

# The DEBUG trap fires for every simple command, including the ones inside
# PROMPT_COMMAND. Only the first one after a prompt is the command you typed.
__vps_ti_at_prompt=''

__vps_ti_preexec() {
  if [ -z "$__vps_ti_at_prompt" ]; then
    return 0
  fi
  __vps_ti_at_prompt=''
  __vps_ti_mark '133' 'C'
  local typed
  typed=$(__vps_ti_typed_command)
  if [ -n "$typed" ]; then
    __vps_ti_mark '4133' "$typed"
  fi
}

# Two entries, at opposite ends of PROMPT_COMMAND, and both ends matter.
#
# `__vps_ti_precmd` has to run first, because it reads `$?`. Anything else running
# before it replaces the status with its own, and `false` then reports `D;0`.
#
# `__vps_ti_arm` has to run last, because the DEBUG trap fires for every simple
# command — including the ones in someone else's PROMPT_COMMAND. Arming first means
# the trap fires on one of those, spends the flag, and no `C` mark is ever emitted
# for the command you actually typed. The browser then believes a shell prompt is
# live for the whole life of `vim` or an agent, and Run strips the `!` from a command
# meant for that agent. Measured with `PROMPT_COMMAND='true'`; bash-preexec splits it
# the same way.
__vps_ti_precmd() {
  local status=$?
  __vps_ti_mark '133' "D;${status}"
  return $status
}

__vps_ti_arm() {
  __vps_ti_at_prompt=1
}

# bash 5.1 lets PROMPT_COMMAND be an array. Treating one as a string reads only its
# first element and the assignment throws the rest away, so the array keeps its own
# shape and gains two elements.
if declare -p PROMPT_COMMAND 2>/dev/null | grep -q '^declare -[aA]'; then
  case " ${PROMPT_COMMAND[*]} " in
    *__vps_ti_precmd*) ;;
    *) PROMPT_COMMAND=('__vps_ti_precmd' "${PROMPT_COMMAND[@]}" '__vps_ti_arm') ;;
  esac
elif [ -z "${PROMPT_COMMAND:-}" ]; then
  PROMPT_COMMAND=$'__vps_ti_precmd\n__vps_ti_arm'
else
  case "$PROMPT_COMMAND" in
    *__vps_ti_precmd*) ;;
    # Newlines, not semicolons. `PROMPT_COMMAND='history -a;'` is a common shape and
    # a semicolon join makes it `...;;__vps_ti_arm`, a syntax error on every prompt.
    # A trailing comment is worse: `true # keep` swallows the arm silently, so the
    # marks keep arriving and no command is ever reported. Both measured.
    *) PROMPT_COMMAND=$'__vps_ti_precmd\n'"${PROMPT_COMMAND}"$'\n__vps_ti_arm' ;;
  esac
fi

if __vps_ti_debug_trap_free; then
  trap '__vps_ti_preexec' DEBUG
fi

# A marks the prompt, B marks the end of it and so the start of what you type.
# Both go inside `\[ \]`, or bash counts their bytes as prompt width and line
# editing wraps in the wrong column.
PS1="\\[\$(__vps_ti_mark 133 A)\\]${PS1}\\[\$(__vps_ti_mark 133 B)\\]"
