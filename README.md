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

GSAP and `@gsap/react` orchestrate the companion, density collapse, surface
handoff, MORI Trace and selective editorial reveals. `ScrollTrigger` observes
native scrolling. There is no scroll smoothing, pinning, Framer Motion or
scroll hijacking. Timelines use scoped `useGSAP` cleanup, and decorative
motion pauses outside the viewport and in hidden tabs.

The hero is already standing on the rug. After 60% visibility and 900ms of
stillness it notices, blinks, waves twice and settles. Feet stay planted.
An authored 60-second ambient sequence follows: long rests, observation,
a 26px wander, sitting, standing, a shallow arc and a return home. Walking
articulates alternate feet; greeting and goodbye never walk. The goodbye
plays once, then remains still. Product-state reactions interrupt the hero
and settle its locomotion before further ambient behavior. The check-in,
grounding and reflection companions never wander.

The check-in sheds context, rules and framing as it progresses. Its surface
expands into a viewport veil, turns warm dark, then reveals grounding beneath
it. This avoids fragile reparenting or Flip across distant responsive layouts.
Resize and motion-preference changes resolve to the stable destination with
keyboard focus. The dark environment has one instruction, a paper-like light,
a quiet companion and a continuation control. Material and companion breathing
share one timeline. Reduced motion skips all decorative choreography.

Clearing a visit clears actual state immediately, cancels a pending answer,
resets the Trace and reveals an empty Patterns state over 650ms. No previous
history is retained for animation. All motion remains presentation only.

The open O wordmark and favicon share an imperfect opening. The Trace links
decisions, becomes a quiet temporal line and resolves at the final exhale.
Patterns remain clearly labeled examples until enough real session data exists.

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
disabled in `src/lib/metadata.ts` for now.

TODO before the final public portfolio release:

- Complete the remaining real-device and assistive-technology checks.
- Merge the final reviewed implementation into a stable `main` branch.
  Preserve the existing `codex/mori-landing` branch during preparation.
- Explicitly enable both robots indexing and following for the public release.
  Do not enable them automatically for previews.

## Assets and release configuration

The three reference photographs remain local. Native `picture` sources select
checked-in WebP sizes for the static export; the hero is eager with high fetch
priority and never starts hidden. Other photographs stay lazy. No image service
or production cache behavior is assumed.

Web font derivatives retain Newsreader optical-size variation and the current
weight ranges, with the glyphs used by this English experience. The original
licensed WOFF2 files remain in `src/assets/fonts`. `scripts/prepare-fonts.py`
recreates derivatives with Python, fonttools and brotli; this is optional asset
preparation, not a build dependency. Regenerate or extend coverage before adding
other languages. Both unused fontsource packages have been removed.

`MORI_PRODUCTION_URL` must be a verified HTTPS origin. Until supplied, no
canonical URL, metadataBase or URL-dependent social metadata is emitted.
`MORI_SOCIAL_IMAGE` accepts the path or URL of an approved 1200 x 630 image.
Neither setting enables indexing. The final social image and public URL remain
release inputs; no domain or project imagery has been invented.

`src/lib/portfolio.ts` defines the handoff after MORI's footer. It renders
nothing until real data exists. Supply title, category, year, description,
image, meaningful imageAlt and destination href for one next project, plus
an optional allWorkHref. The handoff is a large editorial visual, not a grid.
Do not add portfolio content inside the product narrative.

Before public release, add the real demo URL and an approved visual preview to
this README. Repository homepage, topics and branch settings require a separate
reviewed release step; they are not changed automatically.
