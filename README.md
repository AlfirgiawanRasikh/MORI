# MORI

A quieter way to understand how you feel and decide what to do next.

Independent concept project · 2026. A functional wellness prototype, not a
clinical product or service.

## Run locally

Requires Node.js 22 or newer and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Next.js. To produce a deployable static site:

```sh
npm run build
```

The output is `out/`. Serve that directory with any static web server.
`next start` does not serve a static export. No environment variables,
database, AI API, or account are needed.

## Source of truth

- Product: [the supplied PRD](reference/MORI-PRD.md).
- Visuals: existing Stitch project `9215704505241041647`, screen
  `273e3e71ba86471abedca45c9a53d71c`, **MORI | Living Editorial Sanctuary**.
- [Reference notes](reference/SOURCE.md) document provenance and intentional
  differences. Stitch itself was not modified.

The reference was inspected as HTML and as a full-resolution screenshot.
Its composition, fonts, palette, photography and companion were rebuilt as
React components. The source HTML is not embedded, injected, or executed.

## Structure

- `src/app/page.tsx`: server-rendered editorial story, in PRD section order.
- `src/app/globals.css`: visual tokens, layout, breakpoints, and motion.
- `src/components/check-in.tsx`: recognition-based, three-decision check-in.
- `src/lib/routing.ts`: deterministic recommendations and guided content.
- `src/lib/experience.ts`: reducer for the product flow and ephemeral history.
- `src/lib/companion.ts`: presentation-only posture mappings.
- `src/components/companion.tsx`: reusable SVG adapted from Stitch geometry.
- `src/components/grounding.tsx`: self-paced activity, easy exit, no timer.
- `src/components/reflection.tsx`: lighter, same and heavier outcomes.
- `src/components/support-dialog.tsx`: native modal with Escape, focus
  containment, return focus and a labeled close control.
- `src/components/patterns.tsx`: observations, session export and clear.
- `public/images`: three locally hosted reference photographs in WebP.
- `src/assets/fonts`: local variable fonts and their licenses.

## Behavior and privacy

Mood, detail and context produce a single recommendation in three decisions.
The latter two questions can be skipped. Changing an earlier choice clears
dependent answers. Activity instructions advance manually; the user can leave
at any time. Repeated reflection choices update one entry instead of creating
duplicate history. Each new activity captures its input separately.

Check-ins exist only in React memory. No cookies, browser storage, emotional
data requests, analytics, AI services or third-party runtime assets are used
by the application. Refreshing clears the session. The user can export their
completed check-ins to a local text file or clear all current input and history.
Downloaded exports are outside the application's control.

Before three completed check-ins, Patterns displays clearly labeled
illustrations without invented user metrics. After that it uses only the
current session. Persistent history, real account settings, app lock,
reminders, and regional clinical services are not implemented or claimed.

## Accessibility and motion

Semantic landmarks and headings, visible keyboard focus, native buttons,
44px minimum actions, textual selection indicators, answer-change focus
management, polite outcome announcements, and a skip link are included.
Activity instructions provide alternatives to visual/audio/movement actions.
Native dialogs provide browser focus containment and Escape handling.
Main navigation moves out of view only while an active activity is in view,
and reappears when it receives keyboard focus.

All nonessential motion is disabled with `prefers-reduced-motion: reduce`,
including when the preference changes during a visit. Hero greeting waits
for 60% visibility and 650ms of quiet before a 5.2-second walk and wave.
The final goodbye waits for 65% visibility and 1000ms, and plays only once.
These flags live in React, never browser storage.

Idle movement has long still intervals, an occasional blink and weight shift,
and a very small eight-second breath. Deliberate gestures pause idle motion;
listening and settling stay particularly still. Grounding posture follows the
current instruction through presentation-only mappings. Companion motion
carries no essential information and never controls recommendations.

Selective viewport reveals enhance editorial headings, rules, and photographs.
The hero photo drifts at most 2% over 20 seconds; other photos use one-time
clipping reveals. Decorative loops pause outside the viewport and in hidden
tabs. Content remains available without JavaScript and in reduced motion.

## Checks

```sh
npm run typecheck
npm run lint
npm test
npm run check:punctuation
npm run build
npm run format:check
npx playwright install chromium
npm run test:e2e
```

Tests cover routing combinations, skipped questions, three-decision access,
answer resets, completion, all reflection branches, history isolation, exit,
and companion separation. Build and HTTP smoke checks verify compilation
and initial rendering. Playwright runs the production static export on a
loopback-only test server, in both normal and reduced motion. It covers the
critical product flow, support dialogs, export/clear behavior, real greeting
transforms, once-only gestures, and six responsive widths. Screenshots and
failure traces are written to the ignored `artifacts/` directory.

If a browser download is unavailable locally, `PLAYWRIGHT_CHANNEL=chrome`
selects an installed Chrome browser; CI uses Playwright's pinned Chromium.
The punctuation check scans repository-owned text. Use
`node scripts/check-punctuation.mjs --build` to also scan the static export.
See [QA notes](reference/QA.md) for scope and remaining device checks.
No WCAG conformance claim is made.

## Preview and portfolio release

GitHub Actions validates pushes and pull requests using Node.js 24, which
is supported by this project's Node.js 22-or-newer requirement. CI installs
from the lockfile and runs type checking, lint, unit tests, punctuation checks,
build, formatting, and Playwright in both motion modes.

This remains a development preview. Keep `robots.index` and `robots.follow`
disabled in `src/app/layout.tsx` for now.

TODO before the final public portfolio release:

- Complete the remaining real-device and assistive-technology checks.
- Merge the final reviewed implementation into a stable `main` branch.
  Preserve the existing `codex/mori-landing` branch during preparation.
- Explicitly enable both robots indexing and following for the public release.
  Do not enable them automatically for previews.
