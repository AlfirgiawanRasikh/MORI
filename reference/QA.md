# Final cleanup QA

Checked on 2026-09-08 in the Chromium-based local preview. This is a focused
implementation cleanup, preserving the existing PRD, Stitch composition,
local assets, ephemeral state, activity routing, and SVG companion.

## Responsive review

Manually inspected navigation, hero typography and photography, companion
placement, check-in frame, grounding, reflection, pattern rows, privacy,
support dialogs, and footer across these viewport widths:

| Width  | Horizontal overflow | Check-in frame | Minimum choice-row height |
| ------ | ------------------- | -------------- | ------------------------- |
| 375px  | None                | 312px          | 56px                      |
| 430px  | None                | 367px          | 56px                      |
| 768px  | None                | 420px          | 56px                      |
| 1024px | None                | 390px          | 56px                      |
| 1440px | None                | 390px          | 56px                      |

Measurements include the browser's 15px scrollbar. Phone layouts retain
their stacked sections and wrapped navigation. Mood descriptions are 14px;
body text and the established typography scale remain intact. Both support
dialog variants were reviewed, including the professional-support panel at
375px by 812px and 430px by 932px.

## Keyboard and motion

- Skip link moves focus to the main landmark.
- Check-in answers and Previous move focus to the current question. Back
  navigation preserves the selected answer, and optional questions can be skipped.
- Starting an activity focuses its section heading. Progression focuses each
  instruction, and completion moves focus to reflection.
- Lighter, same, and heavier responses retain their distinct actions and
  textual selection indicators. Finishing focuses the final message.
- Dialog opening focuses its close control. Tab and Shift+Tab wrap within
  the dialog. Escape and the close button return focus to the opener.
- Keyboard focus indicators remain visible. Clear this visit retains focus
  and announces the cleared state.
- The browser reported `prefers-reduced-motion: reduce` throughout the pass.
  An active breathing activity remained fully usable. Computed styles across
  product elements showed no animations or nonessential transitions, including
  greeting, goodbye, limbs/footsteps, breathing, and photography.
- The companion implementation and presentation mappings are unchanged.
  Recommendation logic remains independent of companion state.

## Repository checks

CI uses Node.js 24 and runs a lockfile install, typecheck, lint, tests, static
build, and formatting. Type checking first generates Next.js route types so
it also works in a clean checkout.

Unicode scans cover repository-owned text, all product source (including
export and accessibility strings), and generated static HTML/runtime files.
Installed dependencies, binary assets, framework build caches, and original
ignored Stitch reference artifacts are outside the repository-source scan.

Final local results:

- Typecheck: passed.
- Lint: passed with no warnings or errors. Generated `dist` and `artifacts`
  directories are excluded, matching the existing build-output exclusions.
- Tests: all 8 passed.
- Build: passed, including static export. The host has an unrelated lockfile
  outside this repository; Next.js correctly ignored it.
- Formatting: passed.
- Dash scan: zero U+2014 and zero U+2013 across 37 repository text files and
  27 generated runtime text files. Browser-rendered copy also contained zero.

Robots indexing and following remain disabled. See the README release TODO
for enabling them explicitly and merging the reviewed implementation into
a stable main branch. Preserve `codex/mori-landing` during preparation.

## Remaining acceptance checks

- Actual iOS Safari and Android Chrome on touch devices, including landscape.
- NVDA with Firefox/Chrome and VoiceOver with Safari announcement behavior.
- Browser zoom at 200% and 400%, OS text enlargement, and forced-colors mode.
- Final public-host checks after the separately approved portfolio release.

Viewport emulation and accessibility-tree inspection do not replace these
checks. No WCAG conformance claim is made.
