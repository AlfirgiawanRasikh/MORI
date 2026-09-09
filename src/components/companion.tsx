"use client";

import { useEffect, useRef } from "react";
import type { CompanionState } from "@/lib/companion";
import { moodPosture, groundingPosture } from "@/lib/companion";
import { useExperience } from "./experience-provider";
import { useInView } from "@/hooks/use-in-view";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { gsap, useGSAP, motion } from "@/lib/motion";

export function HeroCompanion() {
  const { state } = useExperience();
  const active = !!state.activeActivity && !state.activityComplete;
  return (
    <Companion
      greeting
      ambientAllowed={!active}
      state={
        active
          ? groundingPosture(state.activeActivity!, state.instruction, false)
          : state.input.mood
            ? moodPosture(state.input.mood)
            : "idle"
      }
    />
  );
}

/** Original companion geometry. Locomotion, posture, breath and limbs have separate owners. */
export function Companion({
  state = "idle",
  greeting = false,
  goodbye = false,
  dark = false,
  ambientAllowed = true,
}: {
  state?: CompanionState;
  greeting?: boolean;
  goodbye?: boolean;
  dark?: boolean;
  ambientAllowed?: boolean;
}) {
  const { ref, visible } = useInView<HTMLDivElement>(goodbye ? 0.65 : 0.6);
  const reduced = usePrefersReducedMotion();
  const played = useRef(false);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const location = useRef({ x: 0, y: 0 });
  useGSAP(
    () => {
      const root = ref.current!;
      const select = gsap.utils.selector(root);
      const locomotion = select(".companion-locomotion");
      const orientation = select(".companion-orientation");
      const pose = select(".companion-pose");
      const idle = select(".companion-idle");
      const eyes = select(".companion-eyes");
      const left = select(".arm-left"),
        right = select(".arm-right");
      const footL = select(".leg-left"),
        footR = select(".leg-right");
      const mark = (value: string) => {
        root.dataset.behavior = value;
      };
      root.dataset.gesture = "rest";
      mark("rest");
      const lower = ["low", "sit"].includes(state)
        ? 3
        : ["overwhelmed", "grounded", "settle"].includes(state)
          ? 1.5
          : state === "good"
            ? -1
            : 0;
      const turn =
        state === "notice"
          ? 4
          : state === "look"
            ? -5
            : state === "restless"
              ? -2
              : 0;
      const arms =
        state === "good"
          ? 10
          : ["low", "overwhelmed", "settle"].includes(state)
            ? -10
            : 0;
      if (reduced) {
        location.current = { x: 0, y: 0 };
        gsap.set(pose, { y: lower, rotation: turn });
        gsap.set(left, { rotation: arms });
        gsap.set(right, { rotation: -arms });
        return;
      }
      gsap.set(locomotion, location.current);
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: motion.ease },
      });
      timeline.current = tl;
      const blink = (at: number) => {
        tl.to(eyes, { scaleY: 0.12, duration: 0.2 }, at).to(
          eyes,
          { scaleY: 1, duration: 0.3 },
          at + 0.24,
        );
      };
      if (state !== "idle") {
        tl.call(() => mark("reaction"), [], 0)
          .to(locomotion, { x: 0, y: 0, duration: 1 }, 0)
          .to(pose, { y: lower, rotation: turn, duration: motion.settle }, 0)
          .to(left, { rotation: arms, duration: motion.settle }, 0)
          .to(right, { rotation: -arms, duration: motion.settle }, 0);
        if (state === "notice") tl.to(footR, { x: 1, duration: 0.8 }, 0);
        if (state === "settle" || state === "notice") blink(0.7);
        tl.call(() => mark("rest"), [], 1.5);
      }
      let ambientStart = state === "idle" ? 0 : 3;
      if ((greeting || goodbye) && !played.current && ambientAllowed) {
        const start = state === "idle" ? 0.9 : 2.5;
        tl.call(
          () => {
            played.current = true;
            root.dataset.gesture = goodbye ? "goodbye" : "greeting";
            mark("notice");
          },
          [],
          start,
        )
          .to(orientation, { rotation: -1.2, duration: 0.55 }, start)
          .to(idle, { y: -0.5, duration: 0.65 }, start);
        blink(start + 0.6);
        tl.to(left, { rotation: 100, duration: 0.85 }, start + 1.4)
          .call(() => mark("wave"), [], start + 2.25)
          .to(left, { rotation: 72, duration: 0.6 }, start + 2.25)
          .to(left, { rotation: 100, duration: 0.65 }, start + 2.85)
          .to(left, { rotation: 72, duration: 0.6 }, start + 3.5)
          .to(left, { rotation: arms, duration: 0.85 }, start + 4.1)
          .to(orientation, { rotation: 0, duration: 0.7 }, start + 4.9)
          .to(idle, { y: 0, duration: 0.7 }, start + 4.9)
          .call(
            () => {
              root.dataset.gesture = "rest";
              mark("rest");
            },
            [],
            start + 5.6,
          );
        ambientStart = start + 5.6;
      }
      if (greeting && ambientAllowed) {
        // One authored minute, with long rests. Repeat the quiet territory only.
        const start = ambientStart;
        const walk = (at: number, x: number, y: number, steps = 4) => {
          tl.call(() => mark("walk"), [], at).to(
            locomotion,
            { x, y, duration: steps * 0.8, ease: "none" },
            at,
          );
          for (let i = 0; i < steps; i++) {
            const foot = i % 2 ? footR : footL;
            const other = i % 2 ? right : left;
            tl.to(foot, { x: -3.5, y: -1.2, duration: 0.38 }, at + i * 0.8)
              .to(foot, { x: 0, y: 0, duration: 0.42 }, at + i * 0.8 + 0.38)
              .to(idle, { y: -0.7, duration: 0.38 }, at + i * 0.8)
              .to(idle, { y: 0, duration: 0.42 }, at + i * 0.8 + 0.38)
              .to(other, { rotation: 7, duration: 0.38 }, at + i * 0.8)
              .to(
                other,
                { rotation: arms, duration: 0.42 },
                at + i * 0.8 + 0.38,
              );
          }
          tl.call(() => mark("observe"), [], at + steps * 0.8);
        };
        tl.addLabel("ambient", start).call(() => mark("rest"), [], start);
        blink(start + 7.5);
        tl.call(() => mark("look"), [], start + 9)
          .to(orientation, { rotation: -6, duration: 0.9 }, start + 9)
          .to(orientation, { rotation: 5, duration: 1.1 }, start + 10.8)
          .to(orientation, { rotation: 0, duration: 0.8 }, start + 12.8)
          .call(() => mark("rest"), [], start + 13.6);
        walk(start + 18, -26, -2);
        tl.to(orientation, { rotation: -4, duration: 0.9 }, start + 21.4);
        blink(start + 22.5);
        tl.to(orientation, { rotation: 0, duration: 1 }, start + 24);
        tl.call(() => mark("sit"), [], start + 29)
          .to(idle, { y: 3.5, duration: 1.1 }, start + 29)
          .to([footL, footR], { y: 0.8, duration: 1.1 }, start + 29)
          .call(() => mark("stand"), [], start + 35)
          .to(idle, { y: 0, duration: 1.2 }, start + 35)
          .to([footL, footR], { y: 0, duration: 1.2 }, start + 35);
        walk(start + 38, -8, -7, 3);
        walk(start + 41, 17, -4, 3);
        blink(start + 46);
        walk(start + 49, 0, 0, 3);
        tl.call(() => mark("rest"), [], start + 52)
          .to({}, { duration: 8 }, start + 52)
          .call(() => {
            tl.play("ambient");
          });
      } else if (!goodbye && !dark && ambientAllowed) {
        const start = tl.duration() + 7;
        tl.addLabel("quiet", start);
        blink(start);
        tl.to(
          select(".companion-breath"),
          { scaleY: 1.008, duration: 4 },
          start + 1,
        )
          .to(
            select(".companion-breath"),
            { scaleY: 1, duration: 4 },
            start + 5,
          )
          .to({}, { duration: 8 }, start + 9)
          .call(() => {
            tl.play("quiet");
          });
      }
      if (visible) tl.play();
      return () => {
        location.current = {
          x: Number(gsap.getProperty(locomotion[0], "x")),
          y: Number(gsap.getProperty(locomotion[0], "y")),
        };
        timeline.current = null;
      };
    },
    {
      scope: ref,
      dependencies: [state, reduced, greeting, goodbye, dark, ambientAllowed],
      revertOnUpdate: true,
    },
  );
  useEffect(() => {
    if (visible) timeline.current?.resume();
    else timeline.current?.pause();
  }, [visible, reduced, state]);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`companion ${dark ? "companion-dark" : ""}`}
      data-state={state}
      data-gesture="rest"
      data-motion={reduced ? "reduced" : "normal"}
      data-visible={visible}
    >
      <svg viewBox="0 0 68 54" fill="none" focusable="false">
        <g className="companion-locomotion">
          <ellipse
            className="companion-shadow"
            cx="34"
            cy="48"
            rx="20"
            ry="3.2"
            fill="currentColor"
            opacity=".14"
          />
          <g className="companion-orientation">
            <g className="companion-pose">
              <g className="companion-idle">
                <path
                  className="leg-left limb"
                  d="M26 40C26 40 25.5 45 23.5 46.5C21.5 48 25 48.5 28 47.5C29.5 47 29.5 42 29.5 40"
                />
                <path
                  className="leg-right limb"
                  d="M38.5 40C38.5 40 38.5 45 40.5 46.5C42.5 48 39 48.5 36 47.5C34.5 47 35 42 35 40"
                />
                <g className="companion-body">
                  <g className="companion-reaction">
                    <g className="companion-breath">
                      <path
                        className="torso"
                        d="M12 28C10.5 16 20 6 34 6C48 6 56 15 55 27C54 38 46 43 33 43C19 43 13.5 39 12 28Z"
                      />
                      <path
                        d="M14 31C20 39 39 41 51 32C45 40 25 42 14 31Z"
                        fill="#b9aa9e"
                        opacity=".35"
                      />
                      <path
                        className="arm-left limb"
                        d="M14 26C11 26 7.5 28.5 8 32C8.5 34.5 11.5 34 13.5 31.5C14.5 30 15 28 14 26Z"
                      />
                      <path
                        className="arm-right limb"
                        d="M53 26C56 26 59.5 28.5 59 32C58.5 34.5 55.5 34 53.5 31.5C52.5 30 52 28 53 26Z"
                      />
                      <g className="companion-eyes">
                        <circle cx="29.5" cy="22" r="1.3" />
                        <circle cx="38.5" cy="22" r="1.3" />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
