"use client";
import { useEffect, useRef } from "react";
import { activities } from "@/lib/routing";
import { Companion } from "./companion";
import { Eyebrow } from "./editorial";
import { focusSection, useExperience } from "./experience-provider";

export function Grounding() {
  const { state, dispatch } = useExperience();
  const activity = activities[state.activeActivity ?? "grounding"];
  const active = !!state.activeActivity && !state.activityComplete;
  const instruction = activity.steps[state.instruction];
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lastInstruction = useRef(state.instruction);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (lastInstruction.current !== state.instruction)
      titleRef.current?.focus({ preventScroll: true });
    lastInstruction.current = state.instruction;
  }, [state.instruction]);
  useEffect(() => {
    if (!active || !sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        document.body.classList.toggle("in-activity", entry.isIntersecting);
      },
      { threshold: 0.25 },
    );
    observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      document.body.classList.remove("in-activity");
    };
  }, [active]);
  return (
    <section
      ref={sectionRef}
      id="guided-grounding"
      className="grounding-section"
      aria-labelledby="grounding-heading"
    >
      <div className="page-width relative">
        <div className="grounding-intro">
          <Eyebrow>
            {state.activeActivity ? "Your small step" : "Grounding"}
          </Eyebrow>
          <h2
            id="grounding-heading"
            tabIndex={-1}
            data-focus-heading
            className="section-heading"
          >
            {state.activeActivity
              ? activity.name + "."
              : "A moment of stillness."}
          </h2>
          <p className="body-copy mt-5">
            Take a quiet moment. No countdown. No need to get it right.
          </p>
        </div>
        <div className="grounding-card">
          <div className="grounding-visual" aria-hidden="true">
            <div
              className={`breath-disc ${active && activity.id === "breathing" ? "breathing" : ""}`}
            >
              <span>{activity.id === "breathing" ? "Breathe" : "Be here"}</span>
            </div>
            <div className="grounding-companion">
              <Companion
                dark
                state={
                  state.activityComplete
                    ? "settle"
                    : state.instruction === 1
                      ? "notice"
                      : "sit"
                }
              />
            </div>
          </div>
          <div
            className="grounding-instruction"
            key={`${activity.id}-${state.instruction}-${state.activityComplete}`}
          >
            <h3 ref={titleRef} tabIndex={-1}>
              {state.activityComplete
                ? "A moment, just for you."
                : instruction.title}
            </h3>
            <p>
              {state.activityComplete
                ? "You can notice how you feel now, or simply leave it here."
                : instruction.description}
            </p>
          </div>
          <p className="grounding-step">
            {active
              ? `${state.instruction + 1} of ${activity.steps.length} · At your pace`
              : "Around two minutes · Take as long as you need"}
          </p>
          <button
            type="button"
            className="button w-full"
            onClick={() => {
              if (state.activityComplete) {
                focusSection("reflection");
                return;
              }
              if (!active) {
                dispatch({ type: "start", activity: "grounding" });
                return;
              }
              dispatch({ type: "advance", count: activity.steps.length });
              if (state.instruction === activity.steps.length - 1)
                focusSection("reflection");
            }}
          >
            {state.activityComplete
              ? "Notice how you feel"
              : active
                ? state.instruction === activity.steps.length - 1
                  ? "Finish this moment"
                  : "Continue when you’re ready"
                : "Begin this quiet moment"}
          </button>
          {active ? (
            <button
              type="button"
              className="text-button grounding-exit"
              onClick={() => {
                dispatch({ type: "exit" });
                focusSection("the-practice");
              }}
            >
              Leave this activity
            </button>
          ) : (
            <p className="small-copy grounding-footnote">
              Nothing to finish. Nowhere to get to.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
