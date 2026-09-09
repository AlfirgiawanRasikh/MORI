"use client";
import { useRef, useEffect } from "react";
import { useInView } from "@/hooks/use-in-view";
import { gsap, useGSAP, motion } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function MoriTrace({
  stage = 3,
  kind = "decisions",
  empty = false,
}: {
  stage?: number;
  kind?: "decisions" | "ground" | "time" | "end";
  empty?: boolean;
}) {
  const { ref, visible } = useInView<SVGSVGElement>(0.15);
  const tween = useRef<gsap.core.Timeline | null>(null);
  const reduced = usePrefersReducedMotion();
  useGSAP(
    () => {
      if (reduced) return;
      const tl = gsap.timeline({ paused: true });
      tween.current = tl;
      tl.fromTo(
        ".trace-path",
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.1,
          ease: motion.ease,
        },
      );
      if (ref.current?.querySelector(".trace-branch"))
        tl.fromTo(
          ".trace-branch",
          { opacity: 0 },
          { opacity: 1, duration: motion.clear },
          0,
        );
      if (visible) tl.play();
      return () => {
        tween.current = null;
      };
    },
    { scope: ref, dependencies: [stage, empty, reduced], revertOnUpdate: true },
  );
  useEffect(() => {
    tween.current?.paused(!visible);
  }, [visible]);
  return (
    <svg
      ref={ref}
      className={`mori-trace trace-${kind}`}
      data-empty={empty}
      viewBox="0 0 300 90"
      fill="none"
      aria-hidden="true"
    >
      <path
        className="trace-path"
        pathLength="1"
        strokeDasharray="1"
        d={
          kind === "end"
            ? "M4 44C76 45 102 40 144 44S215 47 245 45"
            : "M4 46C54 43 68 49 108 45S173 43 204 45S254 43 286 45"
        }
      />
      {kind === "decisions" &&
        !empty &&
        Array.from({ length: Math.max(0, 3 - stage) }, (_, i) => (
          <g className="trace-branch" key={i}>
            <path
              d={`M${24 + i * 56} ${13 + i * 4}Q${62 + i * 50} 18 204 45`}
            />
            <path
              d={`M${18 + i * 64} ${80 - i * 5}Q${74 + i * 50} 73 204 45`}
            />
            <circle cx={24 + i * 56} cy={13 + i * 4} r="1.8" />
            <circle cx={18 + i * 64} cy={80 - i * 5} r="1.8" />
          </g>
        ))}
      {!empty && (
        <circle
          className="trace-point"
          cx={kind === "end" ? 245 : 286}
          cy="45"
          r="3"
        />
      )}
    </svg>
  );
}
