# Third-party notices

## AgentPeek attach-session pattern

The tmux history replay and attach flow in `attach-session` is adapted from
AgentPeek:

https://github.com/thrinz/agentpeek

MIT License

Copyright (c) 2026 thrinz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## T3 Code terminal link detection

The terminal link detection in `public/app.js` — URL and path matching, balanced
delimiter trimming, `file:line:column` splitting, and wrapped-buffer-row
reconstruction — is derived from `src/terminal-links.ts` in T3 Code:

https://github.com/pingdotgg/t3code

Reviewed at npm `t3@0.0.30`. The port is not literal: Windows path shapes were
dropped, detection was narrowed, resolution moved to the server, and a cell-derived
column map was added. The structure and the wrapped-line approach are theirs.

The keybinding table's `when`-clause model was inspired by the same project's
`keybindings.ts` but written independently, so it is noted here for provenance
rather than as a derivation.

MIT License

Copyright (c) 2026 T3 Tools Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Light terminal theme palettes

The four light themes in `public/app.js` — Pierre Light, Catppuccin Latte, Rosé Pine
Dawn, and Gruvbox Light — take their background, foreground, cursor, and sixteen ANSI
colours from the Shiki themes bundled with T3 Code (`t3@0.0.30`), so the palettes are
the authors' rather than guesses at light equivalents. Bright variants were darkened slightly
where the upstream value did not clear the contrast floor asserted in
`test/themes.test.js`.

Upstream projects and licences:

- **Pierre Light** — T3 Code's own theme. https://github.com/pingdotgg/t3code — MIT,
  Copyright (c) 2026 T3 Tools Inc. Full text under the T3 Code notice above.
- **Catppuccin Latte** — https://github.com/catppuccin/catppuccin — MIT,
  Copyright (c) 2021 Catppuccin.
- **Rosé Pine Dawn** — https://github.com/rose-pine/rose-pine-theme — MIT,
  Copyright (c) 2020 Emilia Dunfelt and Rosé Pine contributors.
- **Gruvbox Light Medium** — https://github.com/morhetz/gruvbox — MIT,
  Copyright (c) 2017 Pavel Pertsev.

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
