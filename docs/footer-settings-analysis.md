# Footer bar and Settings: analysis and options

**Date:** 2026-07-31
**Question asked:** does the bottom bar or Settings need a redesign, a rework, or
targeted improvement? Priority is one-handed mobile use of Esc, arrows, Enter and
Tab, plus the keyboard toggle and Paste. Settings must be simple and clear.
**Standard applied:** every placement earns its position. Judged against
`docs/design-principles.md`, principles 1, 2, 4 and 6.

This is an analysis, not an implementation. Nothing here is built.

---

## 1. What is there now, measured

Measured in Chrome with touch emulation on, a session connected, keyboard closed.

| Profile | Header | Footer | Terminal | Grid |
|---|---|---|---|---|
| iPhone 13 portrait (390x844) | 52px (6.2%) | 62px (7.3%) | 722px (**85.5%**) | 42x46 |
| iPhone SE portrait (375x667) | 52px (7.8%) | 62px (9.3%) | 545px (**81.7%**) | 32x45 |
| iPhone 13 landscape (844x390) | side rail 48px | side rail 48px | 382px (**97.9%**) | 22x93 |

**The terminal-area floors are not the problem.** 85.5% and 81.7% both clear the
75% touch target from principle 1, with room to spare. Any proposal that spends a
little more height is affordable; any that claims the footer is starving the
terminal is wrong.

The problem is inside the 62px. The bar holds fifteen controls:

```
[⌨ 44] [📋 44] [Keys 44] [Snips 44] │ Esc44 Ctrl44 Tab44 Enter52 Ctrl+C55 Ctrl+D57 Ctrl+Z55 Ctrl+L55 S-Tab50 ↑44 │ [⚙ 44]
└──────────── fixed, 176px ────────┘ └──────── scrolling sublist, 511px of content ────────┘ └─ fixed 44 ─┘
```

Measured, not estimated: the scrolling sublist gets **131px of 390** for **544px
of chip content**. That is **2.4 chips visible of ten**. The five fixed 44px
controls plus their gaps take **254px — 65% of the bar** — for things used
occasionally, and the chips get 34%.

**A padding audit found 9px of the 62px height was waste** and was removed on
2026-07-31: `#footer-main` declared `grid-template-rows: auto auto` with a shared
`gap`, and a row gap applies between an empty row and the next one, so the hidden
drawer cost 5px of footer height permanently. Vertical padding went 6px to 4px, and
chip padding 10px to 6px. Footer is now **53px** and portrait terminal **86.6%**.
Chip padding fell from 40% of the strip to 28%.

**What that audit also established: padding is no longer the lever.** Ten chips at
`min-width: 44px` cannot total less than 485px including gaps, and they are at
499px. Further horizontal gain has to come from fewer fixed controls or fewer
chips, not from spacing.

---

## 2. What is actually wrong

**2.1 The most-used keys are the hardest to reach.** Arrows are the clearest
case. Only `↑` is on the bar; `←`, `→` and `↓` need either a scroll or the Keys
drawer. Cursor movement is not an occasional action in a terminal — it is most of
what a phone user does after recalling a command.

**2.2 Keys and Snips are priced wrong.** They cost 88px of permanent bar — the
same as two chips — to open a drawer. By principle 2 they are "one extra action"
depth, and they are already reachable there. They sit at "always visible" depth.

**2.3 Chip width is unbounded and inconsistent.** `Ctrl+D` is 57px, `Esc` is 44px.
Ten chips at an average 51px is 511px of content in 175px of space. Shortening the
labels would fit more chips without touching the layout.

**2.4 Ctrl has one state where it needs two.** `ctrlArmed` is on or off. Every
production mobile terminal distinguishes **one-shot** (next key only) from
**locked** (until tapped off). Blink documents holding a modifier to chain
combinations for `C-x C-c` sequences. Without lock, a sequence means re-arming
between each key.

**2.5 The bar does not know the keyboard is open.** It renders identically with
the soft keyboard up and with a hardware keyboard attached. Blink shows its Smart
Keys bar *only* with the on-screen keyboard and hides it for an external one. With
a hardware keyboard our bar is 62px of permanently wasted height.

**2.6 Settings tabs are not five peers.** Measured contents:

| Tab | Controls | Honest description |
|---|---|---|
| Profiles | 5 selects, 2 inputs, 8 buttons | The whole configuration model |
| Library | 2 inputs, 1 button | A snippet list |
| Theme | 1 select | One setting |
| App | 1 button | Install, plus sync prose |
| Debug | 3 buttons | A keyboard-transition dump |

One tab carries fifteen controls. Three carry one each. A tab strip states that
its tabs are comparable, and here that is false. Theme is one `<select>` behind a
tab of its own.

**2.7 The Debug tab is at the same depth as Theme.** It exists to diagnose T19. It
is a permanent, equal-weight destination for something almost no one should open.

---

## 3. What the field does

**T3 Code contributes nothing here, and this is worth stating plainly.** I pulled
`t3@0.0.31`, extracted 573 first-party sources from the intact source maps, and
searched them. The client has **no `visualViewport` handling at all** and one
`safe-area` reference in the whole codebase. `ThreadTerminalDrawer.tsx` is 1550
lines with no Esc, no arrows, no Tab, no modifier keys, no paste control — its
only clipboard code is copy-on-selection. Their terminal is a desktop drawer
driven by a hardware keyboard. **Do not look to T3 Code for the mobile key bar.**
Its useful ideas were terminal links (T1/T2, shipped) and settings structure
(below).

**Blink Shell** — the most credible reference:

- Smart Keys bar shown **only with the on-screen keyboard**, hidden for an
  external one.
- Ctrl, Alt, Esc, arrows fixed; a **scrollable centre section** for the rest. Our
  shape is right; our fixed/scrolling ratio is not.
- Modifiers support **continuous press** to chain combinations.

**Termius** — the newer touch redesign, and the more interesting one:

- **Hold Space and drag to emulate arrows**, with three speed tiers, plus
  long-press on the terminal for the same. Arrows move off the bar and into a
  gesture entirely.
- An accessory keyboard for special signals, history and snippets, with an Edit
  button, following the emoji-keyboard pattern iOS users already know.

The convergent finding across sources: **a dedicated key row is the difference
between usable and painful**, and the row is the input surface, not a toolbar.

---

## 4. Options for the footer

**Revised 2026-07-31 after review.** The first version of this section offered four
options, three of which were adjustments to the existing bar. That was too
conservative, and it skipped the question that matters: *should there be a
persistent bar at all?* Four shipping products answer that differently. This
section is now organised by architecture, not by effort.

The five architectures below are mutually exclusive choices about **where terminal
keys live**. Everything in the previous draft — shorter labels, merged Keys/Snips,
an arrow cluster — is tuning that applies inside whichever one is chosen.

### The measurement that decides most of this

Portrait terminal area is already **85.5%**, against a 75% target. **We do not need
to reclaim screen space.** Any architecture whose main benefit is a bigger terminal
is solving a problem we do not have, and is paying for it in reach.

That single fact is what separates the options below.

---

### A. Persistent chip bar — what we have

```
┌────────────────────────────────────────┐
│                                        │
│              terminal                  │  85.5%
│                                        │
├────────────────────────────────────────┤
│ ⌨ 📋 Keys Snips │Esc Ctrl Tab …│ ⚙     │  62px, always
└────────────────────────────────────────┘
```

**Wins:** every key is one tap. No mode, no discovery problem. **Loses:** 62px
whether or not it is useful — including with a hardware keyboard attached, where
it is pure waste. Fixed controls take 56% of its width.

---

### B. Edge-docked floating control

The pattern seen in **Microsoft Remote Desktop**, whose connection bar carries the
keyboard toggle and is moved by dragging it along the display edges. Not free
floating — **docked to an edge**, which is the detail that makes it workable.

```
┌────────────────────────────────────────┐
│                                        │
│              terminal                  │  ~100%
│                                        │
│  ⌨                                     │  draggable puck
└────────────────────────────────────────┘
```

**Wins:** the terminal gets the whole screen. The control moves to whichever thumb
you use — the only option here that adapts to handedness.

**Loses, and this is decisive for us:** it converts every key press into at least
two taps, or requires the puck to expand into a fan of keys, at which point it is a
bar that you have to open first. We press Esc and arrows constantly. Trading
one-tap access for screen area we measured as sufficient is a bad trade.

**Second problem, specific to us:** the terminal surface is already dense with
gesture handling — `beginLongPressTerminalSelection`, `nativeTouchStartX` tracking,
the scroll catcher. A draggable object living on top of that surface has to not
capture gestures meant for the terminal, and must not sit where the user wants to
select text. Remote Desktop can do this cheaply because its remote screen has no
competing local gestures. Ours does.

**Verdict: worse than what we have, on its own.** It answers "the bar wastes
space", which our own measurement says is not our problem. It is worth revisiting
only as the *closed* state of option D.

---

### C. Replace the system keyboard

The **clsh** approach: suppress the iOS keyboard and render your own. clsh ships a
6-row "iOS Terminal" layout with big keys for phone, a compact 5-row "MacBook"
layout, **sticky modifiers** (tap Ctrl once, it holds for the next key), **key
repeat** (400 ms delay, 60 ms interval), and six skins.

```
┌────────────────────────────────────────┐
│              terminal                  │
├────────────────────────────────────────┤
│ Esc  1 2 3 4 5 6 7 8 9 0    ⌫          │
│ Tab  q w e r t y u i o p    ⏎          │
│ Ctrl a s d f g h j k l      ↑          │
│ Alt  z x c v b n m      ←   ↓   →      │
└────────────────────────────────────────┘
```

**Wins:** the strongest answer to the actual complaint. Esc, Ctrl, Tab and arrows
stop being chips competing for 175px and become permanent keys on their own rows.
Sticky modifiers and key repeat come free with owning the keyboard. No chip bar,
no overflow, no scrolling sublist, no contextual sets — T21 dissolves.

**Loses:** we would be building and maintaining a phone keyboard. That means
letters, numbers, symbols, shift states, and long-press alternates, plus every
locale we do not support. Autocorrect goes, which is good for a terminal.
**Dictation goes, which is not** — voice input is genuinely useful for prose in an
agent session. Accessibility is on us, not the OS.

**Feasible for us?** Yes technically — `inputmode="none"` suppresses the iOS
keyboard and we render HTML keys. But it is the largest single piece of work in
this document by a wide margin, and it puts us in the keyboard business
permanently.

**Verdict: the most interesting option and the most expensive.** Worth a spike only
if a measured week of use says the chip bar is still the bottleneck after cheaper
fixes. A middle path exists — see E.

---

### D. Bar only while the keyboard is up

The **Blink Shell** rule: the Smart Keys bar appears *only* with the on-screen
keyboard and is hidden for an external one.

```
keyboard closed:   ┌──────────────────┐    keyboard open:  ┌──────────────────┐
                   │                  │                    │    terminal      │
                   │    terminal      │  ~100%             ├──────────────────┤
                   │                  │                    │ Esc Tab ^C ← ↓ ↑ │
                   └──────────────────┘                    ├──────────────────┤
                                                           │  system keyboard │
                                                           └──────────────────┘
```

**Wins:** the bar costs nothing when it cannot be used. With a hardware keyboard it
disappears entirely, which is 62px we currently waste on every iPad-with-keyboard
session. When it *is* shown it can afford two rows, because the keyboard has
already taken the terminal down — so a full arrow cluster becomes affordable
without spending any terminal height.

**Loses:** the keyboard toggle itself must survive the bar being gone, which is
exactly where option B earns its place — a small edge-docked puck as the
keyboard-closed state. Also, the bar appearing and disappearing is a mode, and
modes need to be obvious.

**Feasible for us?** This is the one architecture we are already equipped for. T18
made `keyboardViewportIsReduced()` honest — it now reports keyboard-open only when
the viewport is genuinely reduced, which is precisely the signal this needs. That
was not true a week ago.

**Verdict: the best fit.** It gets most of C's benefit, needs no keyboard of our
own, and reuses machinery that already exists and is now trustworthy.

---

### E. Split: terminal keys on a custom row, text on the system keyboard

The middle path between C and D, and worth naming because it is not obvious. Keep
the system keyboard for typing. Replace only the *modifier and navigation* surface
with our own two-row block that sits between the terminal and the system keyboard.

Practically this is option D with a fixed two-row layout instead of a scrolling
chip list: row one is Esc / Tab / Ctrl / Alt with sticky states, row two is the
arrow cluster with Home/End. No pinning, no overflow, no contextual sets — the
layout is fixed, and fixed is the point.

**Wins:** the keys you press constantly are always in the same place, which is what
"one-handed" actually requires. Muscle memory is impossible with a list whose
contents change by foreground command.

**Loses:** T21's contextual chips and pinning become far less useful, and might be
demoted to a third optional row. That is a real cost — T21 shipped yesterday.

**Verdict: strongest candidate alongside D, and they combine.** D is the visibility
rule; E is what to show.

---

### Honest note on T21

Options C, D and E all reduce or remove the contextual chip rail that shipped
yesterday. That is not an argument against them. It is an argument for deciding the
architecture before tuning the rail further — the tuning proposed in the first
draft of this document would be wasted work under C or E.

---

## 5. Options for Settings

### 5.1 Targeted: collapse the false peers (S) — recommended

Five tabs become three, matching real weight:

| Now | Proposed |
|---|---|
| Profiles | **Profiles** — unchanged, it is the substance |
| Library | **Library** — unchanged |
| Theme, App, Debug | **App** — theme select, install, sync note, and Debug behind a disclosure |

Debug moves behind a `<details>` inside App. It stays reachable for T19 dumps and
stops claiming equal status. **Cost:** hours. **Risk:** low.

### 5.2 Adopt T3's row grammar (S–M)

This is the one place T3 Code is worth copying. Their `SettingsRow` is title +
**description** + control, stacked on mobile and two-column above it, with a
per-setting reset-to-default that appears only when the value differs.

Our settings are bare labels with a shared `settings-hint` paragraph per panel. A
description per row is more scannable and removes the guesswork about what a
control does. The reset affordance is genuinely good and we have nothing like it.

**Cost:** a day for the row component, then incremental. **Risk:** low.

### 5.3 Full redesign: settings as routes (L)

T3 gives each section a URL and a sidebar. That buys deep links and back-button
navigation. **Not recommended** — we have five sections in a modal on a phone, and
routing is a lot of machinery for that. Revisit if Settings grows past ten
sections.

---

## 6. Recommendation

**Revised after review.** The earlier recommendation — shorten labels, merge two
buttons, collapse three tabs — was tuning, and tuning is premature while the
architecture is undecided. Under C or E most of it is wasted work.

### The architecture question, answered

**Take D + E: the key surface exists only while the soft keyboard is up, and while
it is up it is a fixed two-row block rather than a scrolling list.**

The reasoning is three facts, in order:

1. **We do not need screen area.** 85.5% portrait against a 75% target. This kills
   B as a primary answer and removes the main argument for C.
2. **Fixed position beats rich content.** One-handed use means muscle memory, and
   muscle memory is impossible when the row reorders itself by foreground command.
   A fixed Esc/Tab/Ctrl/Alt row over a fixed arrow cluster is worth more than ten
   contextually perfect chips in a scroller.
3. **We can afford two rows exactly when we need them.** While the keyboard is up
   the terminal is already short, so a second row costs keyboard space rather than
   terminal space. While the keyboard is down, the surface should not exist.

**The floating puck (B) earns one job, not the main one.** The keyboard-closed
state still needs a way back to the keyboard, and an edge-docked movable puck is a
better answer than a 62px bar that exists to hold one button. That is the version
of the floating-button idea worth building — as D's closed state, not as a
replacement for the row.

### Direct answer to "is the floating button better or worse?"

**On its own, worse.** It optimises for screen area we already have, and it costs
one-tap access to keys pressed constantly. Every key becomes two taps, or the puck
expands into a bar you must open first — which is the current bar plus a step. It
also has to coexist with the terminal's own long-press and drag gestures, which
Remote Desktop never had to solve.

**As the closed state of D, better than what we have.** It removes a permanently
visible bar that is useless with a hardware keyboard, and it is the only option
here that adapts to which hand is holding the phone.

### Order of work

1. **Spike D behind a flag** — hide the bar when `keyboardViewportIsReduced()` is
   false and show an edge-docked keyboard puck instead. Small, because T18 already
   made the signal trustworthy, and reversible.
2. **Use it on the phone for a few days.** This step cannot be skipped and cannot
   be done from here — see §7.
3. **If D holds up, do E:** replace the chip list with the fixed two-row block
   while the keyboard is up. Decide then what happens to T21's contextual chips —
   most likely an optional third row, possibly nothing.
4. **Settings (§5.1) is independent** of all of this and is still worth doing now.
   It is hours, it is low risk, and no footer decision changes it.

### What not to do

- **Do not build C.** Owning a phone keyboard means owning letters, symbols, shift
  states, locales, lost dictation, and accessibility. clsh can carry that; a web
  terminal maintained on the side should not, and D+E gets most of the benefit.
- **Do not tune the current bar first.** Shorter labels and a merged Keys/Snips
  control are right under A and D, and wasted under E.
- **Do not add gesture arrows yet.** They collide with long-press selection, and E
  makes them unnecessary.

## 7. What this analysis does not cover

- **No phone.** Every measurement is Chrome with touch emulation. Thumb reach is
  the central question for a one-handed bar and it cannot be measured this way.
- **No usage data.** "Most-used keys" is inferred from the shape of terminal work,
  not from counts. The MRU list shipped in T21 will produce real data — a week of
  it would make the arrow-priority claim in 2.1 either solid or wrong.
- **Landscape is not analysed.** It measures 97.9% terminal and looks healthy; the
  side rails are a different layout and deserve their own pass.
- **Blink and Termius were read about, not used.** Both are paid iOS apps. The
  descriptions come from their documentation and Termius's own redesign write-up.

## Sources

- [Blink Shell documentation](https://docs.blink.sh/) — Smart Keys bar, modifier
  chaining, on-screen-keyboard-only visibility.
- [Termius: New Touch Terminal on iOS](https://termius.com/blog/new-touch-terminal-on-ios)
  — space-drag arrows with speed tiers, editable accessory keyboard.
- [Termius mobile terminal docs](https://docs.termius.com/terminal/mobile-terminal)
  — special key coverage.
- [Microsoft Remote Desktop client features (iOS/iPadOS)](https://learn.microsoft.com/en-us/previous-versions/remote-desktop-client/client-features-ios-ipados)
  — connection bar carrying the keyboard toggle, moved by dragging it along the
  display edges.
- [clsh](https://github.com/my-claude-utils/clsh) — replaces the system keyboard
  with its own 6-row terminal layout, sticky modifiers, key repeat.
- `t3@0.0.31` npm package, `dist/client` source maps — 573 first-party sources
  read locally; `ThreadTerminalDrawer.tsx`, `SettingsSidebarNav.tsx`,
  `settingsLayout.tsx`.

---

## Update — the two-row key surface, 2026-08-08

**This is §"The architecture question, answered" built, and it changes §2's
arithmetic.** Row 2 is no longer a drawer you open. It is present whenever the
soft keyboard is up, holding the profile's keys, and a modifier chip swaps its
contents for that modifier's keys.

```
row 1:  [⌨][📋] │ Esc  Ctrl  Shift  Alt  Tab  Enter  ↑ … │ [⚙]
row 2:  Esc  Ctrl  Shift  Alt  Tab  Enter  ←  ↑  ↓  →  …  [Edit]

tap Ctrl ↓

row 2:  [Ctrl+] C A B D E G K L N P R U W Z
        └ cancels
```

**Why the row stands open rather than opening on demand.** `#footer-drawer` used
to be `display: none` when closed, so opening it grew the footer ~50px, shrank
`#terminal` and tripped the `ResizeObserver` into `scheduleFit()` — xterm
reflowing every row, about three text rows jumping, twice per use. Standing open
costs that once, when the keyboard arrives, instead of on every modifier tap.
Measured after the change: footer 93px and row 2 44px, unchanged across Ctrl →
Shift → Alt → resting.

**Portrait only.** The 85.5%-against-75% headroom this document measured is a
portrait number. Landscape has no such room, so there row 2 appears for a picker
and otherwise stays away.

**Row 1 gave back 88px.** Keys and Snips are gone from it — row 2 replaced Keys,
and snippets live in Settings. Against §2's measurement of 65% of the bar going
to fixed controls, that is the largest single reduction available without
removing a feature.

**Tapping a modifier holds it and shows its keys, both.** The hold folds the next
thing typed on either keyboard: Ctrl+letter to a control code, Alt+key to the ESC
prefix, Shift+letter to a capital. Picking from the row sends that combination
directly. Either spends the hold. `Ctrl+C` lost its own chip, so `C` leads the
Ctrl row out of alphabetical order — the interrupt is in the same place every
time and one tap after Ctrl.

**Edit closes the row.** It sits after every shortcut, so scrolling to the end of
your keys lands on the way to change them, and it costs no row 1 width.

**No migrations.** Nothing is distributed, so stored preferences are never worth
carrying forward. The legacy readers, the starter-profile version gates and the
snippet-selection one-shot are all gone, replaced by a single schema stamp: if
what is stored was written against a different shape, key and profile
preferences reset to defaults. Themes and paste history are left alone.
