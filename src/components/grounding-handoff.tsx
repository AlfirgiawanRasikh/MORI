"use client";
import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import type { ActivityId } from "@/lib/routing";
import { gsap, useGSAP, motion } from "@/lib/motion";
import { useExperience } from "./experience-provider";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const HandoffContext = createContext<
  (activity: ActivityId, source: HTMLElement) => void
>(() => {});
export const useGroundingHandoff = () => useContext(HandoffContext);

/** A viewport veil carries the actual surface into the destination. Native scroll stays native. */
export function GroundingHandoff({ children }: { children: ReactNode }) {
  const { dispatch } = useExperience();
  const veil = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const pending = useRef(false);
  const reduced = usePrefersReducedMotion();
  const { contextSafe } = useGSAP();
  const finish = useCallback(
    () =>
      contextSafe(() => {
        if (!pending.current) return;
        pending.current = false;
        timeline.current?.kill();
        const destination = document.getElementById("guided-grounding");
        destination?.scrollIntoView({ behavior: "instant", block: "start" });
        destination?.setAttribute("data-arrival", "settled");
        document
          .getElementById("grounding-heading")
          ?.focus({ preventScroll: true });
        gsap.set(veil.current, { clearProps: "all" });
        gsap.set(
          ".site-header, .check-in-editorial, .product-bottom, .product-top",
          { clearProps: "opacity,transform" },
        );
        document.body.removeAttribute("data-handoff");
      })(),
    [contextSafe],
  );
  const start = (activity: ActivityId, source: HTMLElement) =>
    contextSafe(() => {
      if (pending.current) return;
      dispatch({ type: "start", activity });
      pending.current = true;
      if (reduced) {
        requestAnimationFrame(() => finish());
        return;
      }
      const surface =
        source.closest(".product-frame, .one-step-note") ?? source;
      const rect = surface.getBoundingClientRect();
      document.body.dataset.handoff = "expanding";
      document
        .getElementById("guided-grounding")
        ?.setAttribute("data-arrival", "entering");
      gsap.set(veil.current, {
        display: "block",
        opacity: 0,
        x: rect.left,
        y: rect.top,
        scaleX: rect.width / innerWidth,
        scaleY: rect.height / innerHeight,
        backgroundColor: "#fffbf9",
        borderRadius: "3px",
      });
      timeline.current = gsap
        .timeline()
        .to(
          ".site-header, .check-in-editorial, .product-bottom, .product-top",
          {
            opacity: 0,
            duration: 0.3,
          },
        )
        .to(
          veil.current,
          {
            opacity: 1,
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            borderRadius: 0,
            backgroundColor: "#211c18",
            duration: motion.surface,
            ease: motion.ease,
          },
          0.12,
        )
        .call(() => {
          document
            .getElementById("guided-grounding")
            ?.scrollIntoView({ behavior: "instant", block: "start" });
          document.body.dataset.handoff = "arriving";
        })
        .to(veil.current, { opacity: 0, duration: 0.5, ease: "power1.out" })
        .call(finish);
    })();
  useEffect(() => {
    const resolve = () => finish();
    const hidden = () => {
      if (document.hidden) finish();
    };
    window.addEventListener("resize", resolve);
    document.addEventListener("visibilitychange", hidden);
    return () => {
      window.removeEventListener("resize", resolve);
      document.removeEventListener("visibilitychange", hidden);
    };
  }, [finish]);
  useEffect(() => {
    if (reduced) finish();
  }, [reduced, finish]);
  useGSAP(
    () => () => {
      timeline.current?.kill();
      document.body.removeAttribute("data-handoff");
    },
    [],
  );
  return (
    <HandoffContext.Provider value={start}>
      {children}
      <div ref={veil} className="grounding-veil" aria-hidden="true" />
    </HandoffContext.Provider>
  );
}
