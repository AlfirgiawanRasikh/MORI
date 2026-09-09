# MORI identity and motion QA

Reviewed 2026-09-09, Asia/Jakarta. This pass extends the existing product and
warm editorial direction. The PRD, deterministic routing, product reducer,
support content, privacy model, three reference photographs and original SVG
geometry remain intact. No product features, persistence, tracking or AI services
were added. This is a preview, not a public portfolio release.

## Visual direction and composition

The open, irregular O is shared by the custom wordmark and favicon. Newsreader,
Plus Jakarta Sans and the cream, espresso, terracotta, sage and warm dark palette
remain. The hero photograph retains its room and light; the companion stands
on the rug with a stronger contact shadow instead of floating at the edge.

A restrained chapter system marks Arrive, Notice, Less thinking, One small step
and Reflect. Grounding intentionally has no visible chapter label. Philosophy
leads with a statement, the pause photograph has an asymmetric composition,
Patterns uses a margin caption and offset observations, Privacy uses a small
caption, and the final section resolves into generous space and "Start with now."
The ordinary CTA block is gone. The footer follows the finished MORI narrative.

## GSAP and motion ownership

Added `gsap` 3.15.0 and `@gsap/react` 2.1.2. `useGSAP` and `ScrollTrigger` are
explicitly registered in `src/lib/motion.ts`. Durations and easing are shared.
ScrollTrigger observes native scrolling for selected editorial elements.
No Flip or MotionPath plugin was needed: the transition uses a measured viewport
surface and the companion uses a shallow sequence of grounded path segments.
No ScrollSmoother, Lenis, Framer Motion or scroll input interception was added.
CSS remains responsible for hover colors, focus, selection and button feedback.

The companion DOM separates locomotion, orientation, posture, idle weight,
body reaction, breathing, eyes and limbs. The contact shadow travels with the
locomotion layer. Timelines own distinct transforms. Animation uses refs rather
than React state updates on every frame. `useGSAP` contexts revert on dependency
changes and unmount; event-created work is context-safe. Visibility hooks pause
work when offscreen or when the document is hidden. No permanent will-change
promotion is used. Server markup is visible and still before enhancement.

Priority is reduced motion, activity instructions, product-state reaction,
greeting/goodbye, then ambient behavior. A state reaction records the current
locomotion, cancels the ambient timeline and gently returns home before resuming
allowed activity. No greeting is replayed after an interruption.

## Companion choreography

- Hero greeting: already at home; 60% visibility; 900ms of stillness; a small
  orientation, slow blink, pause, two slow arm waves, arm lowering and settle.
  Whole-body greeting travel is under 2px. Feet do not walk during greeting.
- Hero idle: a deterministic 60-second sequence after greeting. Long rests,
  observation, a 26-unit left wander, blink, sitting, standing, a shallow arc,
  return home and eight seconds of rest. It does not rapidly cycle behaviors.
- Walking: alternating feet travel 3.5 SVG units with a 1.2-unit lift, opposite
  arm response and less than one unit of weight transfer. The cadence is 800ms
  per step. Maximum authored territory is x -26 to +17 and y -7 to 0, comfortably
  within the photograph even at the smallest tested width. Turns stay within
  six degrees. The complete sequence returns to x 0, y 0.
- Check-in: stationary, occasional blink and tiny breath; each existing mood
  maps to its quiet posture. There is no wandering or sitting loop here.
- Grounding: instruction-driven grounded, look, listen, breathe and settle
  behavior. No wandering. Material, companion breath and quiet Trace share one
  eight-second breathing timeline, with four seconds in each direction.
- Reflection: lighter opens slightly, same stays neutral, heavier settles lower.
  No crying, celebration or wandering.
- Goodbye: visibility-gated, stationary, once only, then complete stillness.

## Density Collapse and the grounding handoff

The check-in is a light sheet with a top hairline and slight paper depth.
It has no device outline or heavy rounded frame. As questions advance, the
flow list contracts, explanatory context disappears, details become shorter
and context choices become a compact decision. The six existing context values
remain available, preserving routing and skip behavior.

GSAP sequences outgoing choices and incoming content. At the recommendation,
choice rows, progress dots and the paper frame disappear; the recommendation
uses larger type and becomes the dominant content. Previous and alternative
controls remain available. Heading focus follows each question.

The MORI Trace begins with six branches. Branches reduce through the check-in
until a single continuation remains. In grounding it is almost still; in
Patterns it becomes a temporal observation line; at the end it stops at one
point. Clearing a visit returns it to an empty state.

Starting the recommendation measures the existing surface. Surrounding UI
fades while a cream viewport veil expands from that surface and becomes warm
dark. Native scrolling moves to grounding only while the surface covers the
viewport, then the veil dissolves. This creates continuity without fragile DOM
reparenting. Resize, hidden-tab and reduced-motion changes resolve safely to the
stable destination. Final transforms are cleared and keyboard focus arrives at
the grounding heading. Native wheel input remains available during transition.

Grounding is a spacious dark environment rather than a card. One instruction,
a softly irregular paper light, fine grain, diffused physical shadow, small
companion and a quiet continuation control remain. The light has no neon halo,
glossy sphere treatment or countdown. Activity routing and instructions are
unchanged.

## Patterns, privacy and portfolio handoff

Patterns has three observational micro-compositions: temporal dots, short
fragments and a quiet trace. These are not graphs or measurements. Example
content remains explicitly labeled. Actual observations use only completed
check-ins in the current visit after the existing threshold is reached.

Clear this visit immediately clears state and announces the result. It also
cancels any departing answer, resets selections and the check-in, empties
Patterns and redraws the empty Trace. A 650ms visual acknowledgment follows;
no old session data is retained for animation. Export remains a local text file.

`src/lib/portfolio.ts` defines `PortfolioProject` and `PortfolioConfig`.
`PortfolioHandoff` sits after MORI's footer and uses one large visual, title,
discipline, year, description and directional link. It renders nothing with
empty configuration. Required real inputs: title, category, year, description,
image, imageAlt, href and optionally allWorkHref. No project content or URLs
have been invented.

## Browser and accessibility verification

Normal and reduced motion are separate Playwright projects. Browser coverage
samples real transforms over the authored ambient minute rather than asserting
an exact frame timestamp. It verifies stationary greeting, visible waves,
delayed walking, feet, territory, home return, mood interruption, offscreen
pausing, hidden-document lifecycle handling, quiet product companions and
once-only goodbye. The hidden-document event is emulated deterministically in
CI; physical OS background behavior remains a real-device check.

Transition coverage includes recommendation visibility, keyboard activation,
expansion, stable end state, focus arrival, wheel input, resize and reduced
motion at 375, 430, 768, 1024 and 1440px. Full-page section review also covers
390px. All six widths were reviewed for crop, composition, horizontal overflow,
choice sizes, grounding, observations, support dialogs and the final exhale.
Tall element captures can contain sticky-header artifacts; normal viewport
captures were used to judge actual reading composition.

The existing skip link, heading order, native buttons, non-color selected
indicators, aria-pressed, minimum action sizes and support dialog focus
containment, Escape and return focus remain. Reduced motion has no wave,
wandering, walking, blink loop, breathing loop, photograph drift, animated
Trace, moving reveal or surface transformation. Product behavior is identical.

| Check | Result |
| --- | --- |
| Typecheck | Passed |
| ESLint | Passed, no warnings |
| Unit tests | 8 passed |
| Playwright | 48 passed, no failures, retries or skips |
| Responsive widths | 375, 390, 430, 768, 1024, 1440px passed |
| Motion modes | Normal and reduced passed |
| Punctuation, source | U+2014: 0; U+2013: 0 |
| Punctuation, production export | U+2014: 0; U+2013: 0 |
| Production build | Passed, static export |
| Prettier format check | Passed |
| Git diff whitespace check | Passed |

The final small correction limits the paper's breathing rotation to 1.2 degrees
relative to its resting angle; the affected normal and reduced breathing checks
were repeated after that change. Reports and screenshots are in the ignored
`artifacts/playwright-full-report` and `artifacts/playwright-full-results` folders.
The last two focused checks are retained in `artifacts/playwright-report`.

## Performance and loading

| Measure | Earlier recorded QA | Fresh before | Final after |
| --- | ---: | ---: | ---: |
| Performance | 87 | 77 | 81 |
| Accessibility | 100 | 100 | 100 |
| Best Practices | 100 | 100 | 100 |
| LCP | 4.0s | 6.6s | 5.0s |
| CLS | 0 | 0 | 0 |
| TBT | 40ms | 40ms | 70ms |

| Generated JavaScript | Before | After | Difference |
| --- | ---: | ---: | ---: |
| Raw, all chunks | 627,281 bytes | 753,171 bytes | +125,890 bytes |
| Gzip, all chunks | 194,332 bytes | 242,724 bytes | +48,392 bytes |
| Raw, KiB | 612.6 | 735.5 | +122.9 |
| Gzip, KiB | 189.8 | 237.0 | +47.3 |

Standalone minified GSAP core, ScrollTrigger and React-helper distributions
measure 118,884 bytes raw / 47,201 bytes gzip together. This is an approximate
library contribution, not a source-map attribution of the final Next bundle.
The measured all-chunk gzip increase is about 47.3 KiB. No claim is made that
removing fontsource reduced browser JavaScript.

Saved reports: `artifacts/lighthouse-before.report.html` and JSON,
`artifacts/lighthouse-final.report.html` and JSON, plus `bundle-before.json`
and `bundle-after.json`. The intermediate post-GSAP audit was 76 Performance
and 7.1s LCP before font optimization; it prompted the loading refinements.
Preceding optimized runs scored 77 to 78 with 6.3s LCP. The final run scored
81 with 5.0s LCP, illustrating local lab variability; the improvement between
those runs should not be attributed to the final small paper-angle correction.

Lighthouse 13.4.1, Chromium 153, mobile simulated throttling, normal motion,
production static export on the same loopback test-server configuration. These
are local lab results, not field Core Web Vitals. The original recorded 87 / 100 /
100 and 4.0s LCP came from an earlier environment; a new untouched baseline was
measured before editing for a more direct comparison. No scores are invented.
The test server serves raw assets without production compression or immutable
cache headers. These assumptions must be checked on the final host.

The hero is discoverable through a responsive head preload with matching
picture source sizes and high fetch priority. Browser coverage confirms one
hero request, not both a fallback and variant. It is never hidden for a reveal.
At the audited mobile viewport the hero uses the 640px variant, 31,592 bytes,
instead of the 94,002-byte original. Other local variants support tablet and
desktop sizes; pause and privacy remain lazy. Hero drift is at most 2% over
22 seconds, paused offscreen, hidden or in reduced motion.

Local web font derivatives are 172,448 bytes total (168.4 KiB), down from
306,220 bytes (299.0 KiB). They retain Newsreader's optical-size axis, use the
already-declared weight ranges and keep the current English glyphs. The original
licensed assets remain intact. Visual comparison confirmed the current text
retains its appearance. Extend glyph coverage before adding another language.
`next/font/local` still self-hosts and preloads the three files with display swap.
There are no remote font connections.

Both unused fontsource packages were removed, reducing installed font-package
content by approximately 1.6 MiB. They were not imported at runtime, so removal
itself saves no browser JavaScript. GSAP's installed distribution is about
6.4 MiB plus 48 KiB for its React helper; installed size includes unused plugins,
source and documentation and is not the shipped bundle size. Asset preparation
scripts are optional development tools and do not run on page requests.

## Release metadata and remaining acceptance

Preview robots remain noindex, nofollow. `MORI_PRODUCTION_URL` gates metadataBase,
canonical, Open Graph and Twitter URL metadata. `MORI_SOCIAL_IMAGE` gates the
approved social image. Neither setting enables indexing. A real production URL
and approved 1200 x 630 social asset still need to be supplied for public release.

No GitHub repository settings, default branch, homepage or topics were changed.
The development branch remains `codex/mori-landing`. A stable main branch,
README live demo, approved project preview and repository metadata belong to
the later public release. The existing Sites configuration was inspected; no
publication was requested for this existing project, so no deployment was made.

Remaining hosted QA: real hosted LCP, compression, caching, image selection and
font priority on mobile networks after deployment. The local LCP remains above
the earlier 4.0s reference and should not be presented as a solved field metric.
Remaining real-device QA: iOS Safari, Android Chrome, landscape, low-power mode,
VoiceOver, NVDA, 200%/400% zoom, OS text enlargement and forced-colors behavior.
Browser-emulated widths and preferences are not substitutes for these checks.

## Files changed

- `README.md`
- `package-lock.json`
- `package.json`
- `public/images/hero-400.webp`
- `public/images/hero-640.webp`
- `public/images/paper-grain.svg`
- `public/images/pause-1280.webp`
- `public/images/pause-400.webp`
- `public/images/pause-640.webp`
- `public/images/pause-960.webp`
- `public/images/privacy-400.webp`
- `public/images/privacy-640.webp`
- `public/images/privacy-960.webp`
- `reference/QA.md`
- `scripts/check-punctuation.mjs`
- `scripts/prepare-fonts.py`
- `scripts/prepare-images.mjs`
- `src/app/globals.css`
- `src/app/icon.svg`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/assets/fonts/jakarta-web.woff2`
- `src/assets/fonts/newsreader-italic-web.woff2`
- `src/assets/fonts/newsreader-roman-web.woff2`
- `src/components/check-in.tsx`
- `src/components/companion.tsx`
- `src/components/editorial.tsx`
- `src/components/experience-provider.tsx`
- `src/components/grounding-handoff.tsx`
- `src/components/grounding.tsx`
- `src/components/mori-trace.tsx`
- `src/components/motion-reveals.tsx`
- `src/components/patterns.tsx`
- `src/components/portfolio-handoff.tsx`
- `src/components/reflection.tsx`
- `src/components/wordmark.tsx`
- `src/hooks/use-in-view.ts`
- `src/lib/metadata.ts`
- `src/lib/motion.ts`
- `src/lib/portfolio.ts`
- `tests/e2e/experience.spec.ts`
- `tests/e2e/motion.spec.ts`
- `tests/e2e/transition.spec.ts`
- `tests/e2e/visual.spec.ts`
