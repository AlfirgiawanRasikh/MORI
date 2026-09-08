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

All nonessential motion is disabled with `prefers-reduced-motion: reduce`.
Greetings play once. The final wave starts once on entering view. Companion
motion carries no essential information and does not control recommendations.

## Checks

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

Tests cover routing combinations, skipped questions, three-decision access,
answer resets, completion, all reflection branches, history isolation, exit,
and companion separation. Build and HTTP smoke checks verify compilation
and initial rendering. Interactive browser, screen-reader, zoom and device
testing remain manual acceptance steps; no WCAG conformance claim is made.
