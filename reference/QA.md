# Motion and portfolio QA

Reviewed on 2026-09-09 (Asia/Jakarta). This pass preserves the PRD, Stitch
composition, photographs, local fonts, product decisions, privacy, and support
boundaries. It extends the existing SVG presentation instead of replacing it.

## Companion architecture

- `usePrefersReducedMotion` uses `matchMedia` through `useSyncExternalStore`.
  Server output starts still, and preference changes take effect during the visit.
- `useInView` tracks viewport and browser-tab visibility. Decorative activity
  pauses offscreen or when the tab is hidden.
- Gesture state is local to each mounted companion. The hero requires 60%
  visibility followed by 650ms; goodbye requires 65% followed by 1000ms.
  Each 5.2-second gesture is consumed once without storage or replay on scrolling.
- Existing arrival, wave, and footstep keyframes are retained and refined.
  Arrival travels 14px, each foot articulates about 4px, and two slow waves
  finish at rest. Idle breathing pauses during deliberate gestures.
- Idle uses long still intervals, a blink near eight seconds, a weight shift
  near twelve, and a small tilt near seventeen within a 22-second cycle.
  Low posture slows blinking. Listening and settling remain especially still.
- Body breathing uses an eight-second cycle, 1.2% scale, and 0.6px lift.
  The active breathing disc and companion start their rhythms together.
- `src/lib/companion.ts` maps presentation only, including grounded, look,
  listen, breathe, and settle. `src/lib/routing.ts` and the experience reducer
  are unchanged. Posture transitions take 750ms.
- Hero/final companions are 76px wide, grounding 72px, check-in 64px, and
  reflection 60px. Placements remain unchanged.

## Motion verification

Normal motion and reduced motion run as separate Playwright projects. Tests
observe real rendered animation frames, including foot lift, arm rotation,
body travel, gesture completion, and the absence of replay. They also change
motion preference during a visit. Reduced mode resolves companion animations
to `none`; active product elements have no animations or transitions.

An additional actual-time idle review sampled about eighteen seconds after
arrival, confirming blink, weight-shift, tilt, and breathing changes with long
quiet intervals. Mobile navigation was separately captured as a normal viewport
image. Tall element screenshots can include sticky-header capture artifacts;
the normal viewport check confirmed the skip link stays offscreen until focused.

Photography uses a maximum 2% hero drift over twenty seconds, an entry mask
for the pause photo, and a clipping reveal for privacy. Selected headings,
eyebrows, body copy, rules, and pattern markers have distinct reveal behavior.
Controls retain their existing focus treatment. No animation library was added.

## Responsive and behavior review

Normal-motion screenshots cover 375px, 390px, 430px, 768px, 1024px, and 1440px.
Each width was checked for hero balance and crop, companion presence, check-in,
One Small Step, grounding, reflection, patterns, privacy, support, final CTA,
and footer. No horizontal overflow was found. Choice rows remain at least
56px high. The restrained two-row phone navigation was retained.

Playwright covers complete check-in, both optional skips, back navigation,
recommendations, starting and advancing activities, all three reflections,
both support dialogs, Escape, focus containment and return, restart, export
contents, and clear. It checks the skip link, explicit button types, local
assets, empty persistent storage, and preview robots metadata.

All 28 Playwright cases passed with zero failures, retries, or skipped cases.
The suite spans two motion preferences, including 12 responsive
smoke cases. Screenshots are review artifacts, not pixel-perfect golden tests.
Unit tests cover eight routing, reducer, and presentation-separation cases.
All eight unit tests, typecheck, lint, production build, and formatting passed.

## Files changed

- Motion presentation: `src/components/companion.tsx`, `src/lib/companion.ts`,
  `src/hooks/use-in-view.ts`, `src/hooks/use-prefers-reduced-motion.ts`,
  `src/components/motion-reveals.tsx`, and `src/app/globals.css`.
- Existing composition integration: `src/app/page.tsx`,
  `src/components/check-in.tsx`, `src/components/editorial.tsx`,
  `src/components/grounding.tsx`, and `src/components/patterns.tsx`.
- Browser testing and checks: `playwright.config.ts`,
  `tests/e2e/experience.spec.ts`, `tests/e2e/motion.spec.ts`,
  `tests/e2e/visual.spec.ts`, `scripts/check-punctuation.mjs`,
  and `scripts/serve-preview.mjs`.
- Repository setup and documentation: `.github/workflows/ci.yml`, `package.json`,
  `package-lock.json`, `README.md`, and `reference/QA.md`.

## Performance observations

Lighthouse 13.4.1 was run against the final production export on a loopback
static server with mobile simulated throttling. Actual results:

| Measure                  | Result |
| ------------------------ | ------ |
| Performance              | 87     |
| Accessibility            | 100    |
| Best Practices           | 100    |
| Largest Contentful Paint | 4.0s   |
| Cumulative Layout Shift  | 0      |
| Total Blocking Time      | 40ms   |

The first audit identified missing high fetch priority on the hero image.
The final image is eager with `fetchPriority="high"`; other photographs remain
lazy. The final report is in ignored `artifacts/lighthouse-final.html` and JSON.
The initial CLI audit hit a Windows temporary-profile cleanup error after
writing its report. The final audit used an isolated workspace profile and
completed successfully.

These are local lab measurements, not field Core Web Vitals or a conformance
certification. LCP still merits checking on the final host. The simple test
server does not apply production compression or immutable asset caching.
The existing Latin Newsreader files retain optical-size variation and their
original appearance; all three font files total about 299KiB. All generated
JavaScript chunks total about 613KiB raw / 190KiB gzip, roughly 1KiB gzip above
the earlier staged build. No remote fonts, tracking, or animation runtime was
introduced. Review actual host compression, caching, and responsive image
variants before the public release rather than treating this lab score as a
production guarantee.

## Validation and release

Run the commands in the README. CI uses Node.js 24, a lockfile install,
typecheck, lint, unit tests, punctuation scan, build, formatting, and the full
Playwright suite with pinned Chromium. Local QA used installed Chrome because
the browser CDN download timed out in this environment.

The punctuation script rejects literal U+2014 and U+2013 in repository-owned
text, including generated export strings and accessibility copy. It excludes
installed dependencies, caches, output artifacts, font licenses, binary files,
and the ignored original Stitch HTML. `--build` scans generated runtime files
separately. Both scans contain zero prohibited characters.

This remains a preview with `noindex, nofollow`. Keep `codex/mori-landing`.
After the final visual review is approved, merge the reviewed implementation
into a stable `main` branch. Enable indexing only for the explicitly approved
public portfolio release. No repository default-branch or access settings were
changed in this pass.

## Remaining real-device acceptance

- iOS Safari and Android Chrome on touch devices, including landscape and
  low-power behavior.
- NVDA with Firefox/Chrome and VoiceOver with Safari, including announcement
  order during question transitions and reflection completion.
- Browser zoom at 200% and 400%, OS text enlargement, and forced-colors mode.
- Final hosted LCP, compression, caching, and loading behavior on mobile networks.

No WCAG conformance or medical efficacy claim is made.
