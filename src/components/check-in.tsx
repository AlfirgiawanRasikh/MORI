"use client";
import { useEffect, useRef } from "react";
import {
  activities,
  contexts,
  details,
  moods,
  moodDescriptions,
  routeCheckIn,
} from "@/lib/routing";
import { gsap, useGSAP, motion } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { MoriTrace } from "./mori-trace";
import { useGroundingHandoff } from "./grounding-handoff";
import type { ExperienceAction } from "@/lib/experience";
import type { Stage } from "@/lib/experience";
import { moodPosture } from "@/lib/companion";
import { Companion } from "./companion";
import { Arrow, Eyebrow } from "./editorial";
import { useExperience } from "./experience-provider";

const labels = [
  "How you feel",
  "What feels closest",
  "A little context",
  "One small step",
];
const headings = [
  "How are you, really?",
  "What feels closest right now?",
  "Where is your mind stuck?",
];
export function CheckIn() {
  const { state, dispatch, clearRevision } = useExperience();
  const startGrounding = useGroundingHandoff();
  const { stage, input } = state;
  const section = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const changing = useRef(false);
  const departure = useRef<gsap.core.Timeline | null>(null);
  const { contextSafe } = useGSAP({ scope: section });
  const choose = (action: ExperienceAction) =>
    contextSafe(() => {
      if (changing.current) return;
      if (reduced) {
        dispatch(action);
        return;
      }
      changing.current = true;
      departure.current = gsap
        .timeline({
          onComplete: () => {
            changing.current = false;
            dispatch(action);
          },
        })
        .to(".choice-row", {
          opacity: 0,
          x: -3,
          duration: 0.18,
          stagger: { each: 0.015, from: "end" },
          ease: motion.ease,
        })
        .to(".product-content", { opacity: 0, duration: 0.1 }, "<0.06");
    })();
  useGSAP(
    () => {
      departure.current?.kill();
      changing.current = false;
      if (reduced) return;
      gsap.fromTo(
        ".product-content",
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: motion.opening,
          clearProps: "all",
        },
      );
      if (section.current?.querySelector(".choice-row"))
        gsap.from(".choice-row", {
          opacity: 0,
          duration: 0.45,
          stagger: 0.035,
          clearProps: "opacity,transform",
        });
      return () => {
        departure.current?.kill();
      };
    },
    {
      scope: section,
      dependencies: [stage, clearRevision, reduced],
      revertOnUpdate: true,
    },
  );
  const heading = useRef<HTMLHeadingElement>(null);
  const previousStage = useRef(stage);
  useEffect(() => {
    if (previousStage.current !== stage)
      heading.current?.focus({ preventScroll: true });
    previousStage.current = stage;
  }, [stage]);
  const recommendation = activities[state.alternative ?? routeCheckIn(input)];
  const options =
    stage === 0
      ? moods
      : stage === 1
        ? details[input.mood ?? "I'm not sure"]
        : contexts;
  const selected =
    stage === 0 ? input.mood : stage === 1 ? input.detail : input.context;
  return (
    <section
      ref={section}
      data-stage={stage}
      id="the-practice"
      className="page-width section-space check-in-section"
      aria-labelledby="check-in-heading"
    >
      <div className="editorial-grid items-start">
        <div className="lg:col-span-5 check-in-editorial">
          <Eyebrow>02 / Notice</Eyebrow>
          <MoriTrace stage={stage} empty={clearRevision > 0 && !input.mood} />
          <h2
            id="check-in-heading"
            className="section-heading"
            tabIndex={-1}
            data-focus-heading
          >
            Start where you are.
          </h2>
          <p className="body-copy mt-6">
            You never have to explain everything to use MORI.
          </p>
          <p className="body-copy muted mt-4 max-w-md check-in-context">
            Start with what feels closest. Share only what feels comfortable,
            and find one manageable next step.
          </p>
          <ol className="flow-list" aria-label="Check-in steps">
            {labels.map((label, index) => (
              <li key={label} hidden={stage > 0 && index !== stage}>
                <button
                  type="button"
                  aria-current={stage === index ? "step" : undefined}
                  disabled={index > stage}
                  onClick={() =>
                    dispatch({ type: "back", stage: index as Stage })
                  }
                >
                  <span>
                    <span className="step-number">0{index + 1}</span>
                    {label}
                  </span>
                  <span className="flow-status">
                    {stage === index
                      ? "You are here"
                      : index < stage
                        ? "✓"
                        : ""}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <p className="small-copy muted border-t border-hairline pt-6 check-in-context">
            No account. No long explanations.
            <br />
            You can skip either of the next questions.
          </p>
        </div>
        <div className="lg:col-span-7 flex justify-center lg:justify-end pt-8 lg:pt-0">
          <div className="product-frame" data-density={stage}>
            {stage < 3 && (
              <div className="product-companion">
                <Companion state={moodPosture(input.mood)} />
              </div>
            )}
            <div className="product-top">
              <span>
                {stage < 3
                  ? `Check-in · ${stage + 1} of 3`
                  : "Your small next step"}
              </span>
              <span>Just now</span>
            </div>
            <div className="product-content" key={stage}>
              <h3 className="product-heading" ref={heading} tabIndex={-1}>
                {stage < 3 ? headings[stage] : recommendation.response}
              </h3>
              {stage < 3 ? (
                <>
                  <p className="sr-only">
                    Choosing an answer takes you to the next question.
                  </p>
                  <div className="choice-list">
                    {options.map((option) => (
                      <button
                        className="choice-row"
                        type="button"
                        key={option}
                        aria-pressed={selected === option}
                        onClick={() => {
                          if (stage === 0)
                            choose({
                              type: "mood",
                              value: option as (typeof moods)[number],
                            });
                          else if (stage === 1)
                            choose({ type: "detail", value: option });
                          else
                            choose({
                              type: "context",
                              value:
                                option === "Rather not say" ? null : option,
                            });
                        }}
                      >
                        <span>
                          <span className="choice-name">{option}</span>
                          {stage === 0 && (
                            <span className="choice-description">
                              {
                                moodDescriptions[
                                  option as (typeof moods)[number]
                                ]
                              }
                            </span>
                          )}
                        </span>
                        <span className="choice-indicator" aria-hidden="true">
                          {selected === option ? "✓ Selected" : "→"}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="recommendation-copy">
                  <p>{recommendation.invitation}</p>
                  <p className="recommendation-name">
                    Try this: {recommendation.name.toLowerCase()}.
                  </p>
                  <button
                    type="button"
                    className="button w-full"
                    onClick={(event) =>
                      startGrounding(recommendation.id, event.currentTarget)
                    }
                  >
                    {recommendation.action} <Arrow />
                  </button>
                  <button
                    type="button"
                    className="text-button mt-3 w-full"
                    onClick={() => dispatch({ type: "alternative" })}
                  >
                    Choose something else
                  </button>
                </div>
              )}
            </div>
            <div className="product-bottom">
              <button
                type="button"
                className="text-button"
                disabled={stage === 0}
                onClick={() =>
                  dispatch({ type: "back", stage: (stage - 1) as Stage })
                }
              >
                ← Previous
              </button>
              <span className="step-dots" aria-hidden="true">
                {labels.map((label, i) => (
                  <i key={label} data-active={i === stage} />
                ))}
              </span>
              {stage === 1 || stage === 2 ? (
                <button
                  type="button"
                  className="text-button accent"
                  onClick={() =>
                    dispatch({
                      type: stage === 1 ? "detail" : "context",
                      value: null,
                    })
                  }
                >
                  Skip <Arrow />
                </button>
              ) : (
                <span className="small-copy muted">At your pace</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export function OneSmallStep() {
  const { state } = useExperience();
  const startGrounding = useGroundingHandoff();
  const ready = state.stage === 3;
  const activity = activities[state.alternative ?? routeCheckIn(state.input)];
  return (
    <section
      className="page-width section-space one-step"
      aria-labelledby="one-step-heading"
    >
      <div className="editorial-grid items-center">
        <div className="lg:col-span-6">
          <Eyebrow reveal>04 / One small step</Eyebrow>
          <h2
            id="one-step-heading"
            className="section-heading"
            data-reveal="heading"
          >
            One thing.
            <br />
            <em>Not ten.</em>
          </h2>
          <p className="body-copy mt-6 max-w-md">
            A little understanding. One manageable action. You don’t have to
            decide your way through another library.
          </p>
        </div>
        <div className="lg:col-span-5 lg:col-start-8 one-step-note">
          <Eyebrow>{ready ? "For this moment" : "A place to begin"}</Eyebrow>
          <h3 className="font-serif text-3xl">
            {ready ? activity.response : "What can I do right now?"}
          </h3>
          <p className="body-copy mt-5">
            {ready
              ? activity.invitation
              : "Start with a short check-in. MORI will suggest one small step based on what you share."}
          </p>
          {ready ? (
            <button
              type="button"
              className="text-link mt-6"
              onClick={(event) =>
                startGrounding(activity.id, event.currentTarget)
              }
            >
              {activity.action} <Arrow />
            </button>
          ) : (
            <a className="text-link mt-6" href="#the-practice">
              Check in with yourself <Arrow />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
