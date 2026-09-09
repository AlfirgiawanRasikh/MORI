"use client";
import { useEffect, useRef } from "react";
import { activities } from "@/lib/routing";
import { groundingPosture } from "@/lib/companion";
import { useInView } from "@/hooks/use-in-view";
import { Companion } from "./companion";
import { MoriTrace } from "./mori-trace";
import { gsap, useGSAP, motion } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { focusSection, useExperience } from "./experience-provider";

export function Grounding() {
  const { state, dispatch } = useExperience();
  const activity = activities[state.activeActivity ?? "grounding"];
  const active = !!state.activeActivity && !state.activityComplete;
  const { ref: visualRef, visible: visualVisible } =
    useInView<HTMLDivElement>(0.2);
  const instruction = activity.steps[state.instruction];
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lastInstruction = useRef(state.instruction);
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const breathing = useRef<gsap.core.Timeline | null>(null);
  useGSAP(
    () => {
      if (reduced || !active || activity.id !== "breathing") return;
      const tl = gsap.timeline({
        paused: true,
        repeat: -1,
        yoyo: true,
        defaults: { duration: motion.breath, ease: "sine.inOut" },
      });
      tl.to(".breath-disc", { scale: 1.075, rotation: -5.8 }, 0)
        .to(".paper-light", { opacity: 0.7, scale: 1.04 }, 0)
        .to(".companion-breath", { scaleY: 1.015, y: -0.4 }, 0)
        .to(".trace-ground", { scaleX: 1.025, opacity: 0.6 }, 0);
      breathing.current = tl;
      if (visualVisible) tl.play();
      return () => {
        breathing.current = null;
      };
    },
    {
      scope: sectionRef,
      dependencies: [active, activity.id, reduced],
      revertOnUpdate: true,
    },
  );
  useEffect(() => {
    breathing.current?.paused(!visualVisible);
  }, [visualVisible]);
  useGSAP(
    () => {
      if (reduced) return;
      gsap.from(".grounding-instruction", { opacity: 0, duration: 0.65 });
    },
    {
      scope: sectionRef,
      dependencies: [state.instruction, state.activityComplete, reduced],
      revertOnUpdate: true,
    },
  );
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
      data-active={active}
      aria-labelledby="grounding-heading"
    >
      <div className="page-width relative">
        <div className={`grounding-intro ${active ? "sr-only" : ""}`}>
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
        <div className="grounding-space">
          <div
            className="grounding-visual"
            ref={visualRef}
            data-breathing={
              active && activity.id === "breathing" && visualVisible
            }
            aria-hidden="true"
          >
            <div
              className={`breath-disc ${active && activity.id === "breathing" ? "breathing" : ""}`}
            >
              <span className="paper-light" />
            </div>
            <div className="grounding-companion">
              <Companion
                dark
                state={groundingPosture(
                  activity.id,
                  state.instruction,
                  state.activityComplete,
                )}
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
          <MoriTrace kind="ground" />
          <p className="grounding-step">
            {active
              ? `${state.instruction + 1} of ${activity.steps.length} · At your pace`
              : "Around two minutes · Take as long as you need"}
          </p>
          <button
            type="button"
            className="grounding-continue"
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
