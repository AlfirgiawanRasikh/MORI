"use client";

import { useEffect, useRef, useState } from "react";
import type { CompanionGesture, CompanionState } from "@/lib/companion";
import { useInView } from "@/hooks/use-in-view";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/** Existing Stitch companion geometry, adapted into one state-driven asset. */
export function Companion({
  state = "idle",
  greeting = false,
  goodbye = false,
  dark = false,
}: {
  state?: CompanionState;
  greeting?: boolean;
  goodbye?: boolean;
  dark?: boolean;
}) {
  const { ref, visible } = useInView<HTMLDivElement>(goodbye ? 0.65 : 0.6);
  const reduced = usePrefersReducedMotion();
  const played = useRef(false);
  const [gesture, setGesture] = useState<CompanionGesture>("rest");
  useEffect(() => {
    if (reduced || !visible || played.current || (!greeting && !goodbye))
      return;
    const delay = window.setTimeout(
      () => {
        played.current = true;
        setGesture(goodbye ? "goodbye" : "greeting");
      },
      goodbye ? 1000 : 650,
    );
    return () => window.clearTimeout(delay);
  }, [reduced, visible, greeting, goodbye]);
  useEffect(() => {
    if (gesture === "rest") return;
    // Also finish interrupted gestures, without replaying on preference changes.
    const finish = window.setTimeout(
      () => setGesture("rest"),
      reduced ? 0 : 5200,
    );
    return () => window.clearTimeout(finish);
  }, [gesture, reduced]);
  const activeGesture = reduced ? "rest" : gesture;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`companion ${dark ? "companion-dark" : ""} ${activeGesture !== "rest" ? `companion-${activeGesture}` : ""}`}
      data-state={state}
      data-gesture={activeGesture}
      data-motion={reduced ? "reduced" : "normal"}
      data-visible={visible}
    >
      <svg viewBox="0 0 68 54" fill="none" focusable="false">
        <ellipse
          cx="34"
          cy="48"
          rx="20"
          ry="3.2"
          fill="currentColor"
          opacity=".14"
        />
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
      </svg>
    </div>
  );
}
