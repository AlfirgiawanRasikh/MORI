import { Header, Eyebrow, BeginLink, Photograph } from "@/components/editorial";
import { Wordmark } from "@/components/wordmark";
import { MoriTrace } from "@/components/mori-trace";
import { GroundingHandoff } from "@/components/grounding-handoff";
import { PortfolioHandoff } from "@/components/portfolio-handoff";
import { portfolio } from "@/lib/portfolio";
import { Companion, HeroCompanion } from "@/components/companion";
import { ExperienceProvider } from "@/components/experience-provider";
import { CheckIn, OneSmallStep } from "@/components/check-in";
import { Grounding } from "@/components/grounding";
import { ReflectionSection } from "@/components/reflection";
import { Patterns, Privacy } from "@/components/patterns";
import { SupportButton } from "@/components/support-dialog";
import { MotionReveals } from "@/components/motion-reveals";

export default function Home() {
  return (
    <ExperienceProvider>
      <GroundingHandoff>
        <MotionReveals />
        <Header />
        <main id="main" tabIndex={-1}>
          <section
            className="page-width hero-section"
            aria-labelledby="hero-heading"
          >
            <div className="editorial-grid items-start">
              <div className="lg:col-span-7 lg:pr-10 hero-copy">
                <Eyebrow className="hero-eyebrow">Quiet companion</Eyebrow>
                <h1 id="hero-heading">
                  Too much on
                  <br />
                  <em>your mind?</em>
                </h1>
                <p className="hero-description">
                  MORI helps you understand what you’re feeling and find one
                  small thing to do next.
                </p>
                <div className="hero-actions">
                  <BeginLink />
                  <p className="small-copy muted">
                    No diagnosis. No pressure.
                    <br />
                    Just a place to begin.
                  </p>
                </div>
                <p className="hero-footnote">Less thinking. More grounding.</p>
              </div>
              <figure className="lg:col-span-5 hero-figure">
                <Photograph
                  name="hero"
                  priority
                  alt="Afternoon light through a linen curtain, beside an empty oak chair in a quiet room."
                >
                  <div className="hero-companion">
                    <HeroCompanion />
                  </div>
                </Photograph>
                <figcaption className="flex flex-wrap justify-between gap-2">
                  <span>01 / Arrive. Stay a moment.</span>
                  <span className="photo-presence">A quiet presence</span>
                </figcaption>
              </figure>
            </div>
          </section>
          <CheckIn />
          <section
            className="page-width section-space ruled"
            id="philosophy"
            data-reveal="rule"
            aria-labelledby="philosophy-heading"
          >
            <div className="editorial-grid">
              <div className="lg:col-span-8">
                <span className="chapter-margin">03 / Less thinking</span>
                <h2
                  className="manifesto-heading"
                  id="philosophy-heading"
                  data-reveal="heading"
                >
                  When your mind already feels full, more options aren’t always
                  helpful.
                </h2>
                <p className="body-copy manifesto-copy" data-reveal="copy">
                  MORI asks only what it needs to understand the moment, then
                  offers one small next step. Less thinking. More grounding.
                </p>
                <div className="principles">
                  {[
                    {
                      title: "Feel",
                      copy: "Notice how you are, without grading or measuring yourself.",
                    },
                    {
                      title: "Understand",
                      copy: "Recognize what feels closest. You don’t have to explain it all.",
                    },
                    {
                      title: "One small step",
                      copy: "Try a single action that fits the energy you have right now.",
                    },
                  ].map((item, index) => (
                    <article key={item.title}>
                      <span className="small-copy muted">0{index + 1}</span>
                      <h3>{item.title}</h3>
                      <p className="small-copy">{item.copy}</p>
                    </article>
                  ))}
                </div>
              </div>
              <aside className="lg:col-span-4 philosophy-aside">
                <p>
                  Sometimes you don’t need more options.
                  <br />
                  <em>Just fewer decisions.</em>
                </p>
              </aside>
            </div>
          </section>
          <section className="visual-pause" aria-label="A quiet pause">
            <div className="page-width editorial-grid items-center">
              <figure className="lg:col-span-8">
                <Photograph
                  name="pause"
                  alt="Warm morning light falling across rumpled linen and an open notebook on a bedside table."
                />
                <figcaption>Between moments / Nothing to do</figcaption>
              </figure>
              <div className="lg:col-span-4 lg:pl-6">
                <blockquote data-reveal="heading">
                  You don’t have to
                  <br />
                  explain everything.
                </blockquote>
                <p className="body-copy mt-6">
                  You can start with what you notice. The rest can wait.
                </p>
              </div>
            </div>
          </section>
          <OneSmallStep />
          <Grounding />
          <ReflectionSection />
          <Patterns />
          <Privacy />
          <section
            className="support-section"
            id="support"
            aria-labelledby="support-heading"
          >
            <div className="page-width">
              <div className="max-w-3xl">
                <Eyebrow reveal>Human support</Eyebrow>
                <h2
                  id="support-heading"
                  className="section-heading support-heading"
                  data-reveal="heading"
                >
                  Sometimes you need more than an app.
                </h2>
                <p className="body-copy mt-6 mb-8">
                  MORI is a wellness companion, not therapy, diagnosis, or
                  emergency care. If something feels too heavy to carry alone,
                  another person can help you take the next step.
                </p>
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  <SupportButton />
                  <SupportButton kind="trusted" />
                </div>
              </div>
            </div>
          </section>
          <section
            className="page-width final-section"
            aria-labelledby="final-heading"
          >
            <p className="final-prelude" data-reveal="copy">
              You don’t need to figure everything out today.
            </p>
            <h2 id="final-heading" data-reveal="heading">
              Start with <em>now.</em>
            </h2>
            <MoriTrace kind="end" />
            <div className="final-companion">
              <Companion goodbye />
            </div>
            <a className="text-link final-return" href="#the-practice">
              Here whenever you need it <span aria-hidden="true">↗</span>
            </a>
          </section>
        </main>
        <footer className="site-footer">
          <div className="page-width">
            <div className="flex flex-wrap justify-between gap-8">
              <div>
                <a className="wordmark" href="#main">
                  <Wordmark />
                </a>
                <p className="small-copy muted mt-4 max-w-sm">
                  A quieter way to understand how you feel
                  <br />
                  and decide what to do next.
                </p>
              </div>
              <nav className="footer-nav" aria-label="Footer navigation">
                <a href="#philosophy">Philosophy</a>
                <a href="#the-practice">The Practice</a>
                <a href="#privacy">Privacy</a>
                <SupportButton className="text-button">
                  Care boundaries
                </SupportButton>
              </nav>
            </div>
            <div className="footer-bottom">
              <p>MORI · Independent concept project, 2026.</p>
              <p>You’re here when you need it.</p>
            </div>
          </div>
        </footer>
        <PortfolioHandoff config={portfolio} />
      </GroundingHandoff>
    </ExperienceProvider>
  );
}
