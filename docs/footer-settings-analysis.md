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

At 390px wide, after 5 fixed controls and gaps, the scrolling sublist gets about
**175px — roughly three chips of the ten**. Seven are off-screen behind a
horizontal scroll, on the one row the user reaches for most.

**Two numbers make the case on their own.** The fixed controls take 220px of 390
(56%) for things used occasionally. The chips, used constantly, get 45%.

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

Four approaches, cheapest first. They compose — 4.1 is a prerequisite for none of
them but improves all.

### 4.1 Targeted: re-price the bar (S)

Keep the shape, fix the allocation.

```
[⌨] [📋] │ Esc  Tab  ←  ↓  ↑  →  Ctrl  ⏎  ^C  ^D … │ [⋯] [⚙]
└─ 88px ─┘ └────────── ~250px, ~6 chips ──────────┘ └─ 88 ─┘
```

- Merge Keys and Snips into one `⋯` control that opens a drawer with both. Frees
  44px.
- Cap chip labels at 4 characters: `Ctrl+C` → `^C`, `S-Tab` → `⇧⇥`. 511px of chips
  becomes roughly 340px.
- Put a full arrow cluster in the default and contextual sets.

Together these roughly double the chips on screen, from about three to six.
**Cost:** hours. **Risk:** low; no new mechanism. **Does not fix** 2.4, 2.5, 2.7.

### 4.2 Two-row keyboard-aware bar (M)

The bar becomes two rows **only while the soft keyboard is open**, and one row
otherwise. The second row is a fixed arrow cluster.

```
keyboard closed:  [⌨] [📋] │ Esc Tab ^C … │ [⋯] [⚙]
keyboard open:    [⌨] [📋] │ Esc Tab ^C … │ [⋯] [⚙]
                  │   ←    ↓    ↑    →    Home  End   │
```

Costs 44px only when the keyboard has already taken the terminal down to a few
rows, so it comes out of space the keyboard owns rather than out of terminal.
Requires T18's `keyboardViewportIsReduced()`, which now reports honestly.

**Cost:** days. **Risk:** medium — a second rail while open touches principle 1's
"at most one persistent rail per edge"; defensible because it is not persistent,
but it needs the argument made. **Fixes** 2.1, 2.5.

### 4.3 Gesture arrows, Termius-style (M, spike first)

Long-press the terminal and drag to move the cursor. Arrows leave the bar
entirely, freeing four slots.

**Cost:** days, and it needs a spike. **Risk:** high — it collides directly with
the existing long-press-to-select gesture (`beginLongPressTerminalSelection`,
`nativeSelectionLongPressMilliseconds`), which is load-bearing and was expensive
to get right. Two long-press meanings on the same surface need a distinguishing
gesture, and getting that wrong breaks selection. **Do not start this without
measuring how often selection is used.**

### 4.4 Full redesign: the bar becomes an input accessory (L)

Reconceive the footer as the terminal's input surface rather than an app toolbar.
App-level actions (Settings, Files, session) move to the header or Menu; the
footer holds only keys, and it appears with the keyboard.

**Cost:** weeks. **Risk:** high, and it invalidates a large part of the responsive
suite. **Not recommended now** — 4.1 and 4.2 capture most of the value at a
fraction of the cost, and this is the wrong point in the product to spend weeks on
layout.

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

**Do 4.1 and 5.1 now.** Both are hours, both are low risk, and together they fix
the complaint that prompted this: the keys you press most are the hardest to
reach, and Settings does not say what matters. Concretely:

1. Merge Keys and Snips into one `⋯` drawer control.
2. Shorten chip labels to at most four characters.
3. Put a full arrow cluster in the default and contextual chip sets.
4. Collapse Theme, App and Debug into one App tab, Debug behind a disclosure.

**Then 4.2**, once 4.1 is on a phone and the gain is measured. Two rows while the
keyboard is open is the honest fix for arrows, and T18 made the signal it needs
trustworthy.

**Then 5.2**, incrementally, as settings are touched.

**Do not do 4.3 without a spike**, and do not do 4.4 or 5.3 at all right now.

**Also worth doing regardless of which option is chosen:** give Ctrl a locked
state distinct from armed (2.4). It is small, it is independent of layout, and
every comparable app has it.

---

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
- `t3@0.0.31` npm package, `dist/client` source maps — 573 first-party sources
  read locally; `ThreadTerminalDrawer.tsx`, `SettingsSidebarNav.tsx`,
  `settingsLayout.tsx`.
