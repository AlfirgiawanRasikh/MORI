"use client";
import { gsap, useGSAP, ScrollTrigger, motion } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/** Only selected editorial elements are enhanced. Server content is always visible. */
export function MotionReveals() {
  const reduced = usePrefersReducedMotion();
  useGSAP(
    () => {
      if (reduced) return;
      const animations: {
        element: Element;
        tween: gsap.core.Animation;
        visible: boolean;
      }[] = [];
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const item = animations.find((a) => a.element === entry.target);
          if (item) {
            item.visible = entry.isIntersecting;
            item.tween.paused(!item.visible || document.hidden);
          }
        }
      });
      const watch = (element: Element, tween: gsap.core.Animation) => {
        animations.push({ element, tween, visible: false });
        observer.observe(element);
      };
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((element) => {
          const type = element.dataset.reveal;
          if (type === "rule") {
            const line = document.createElement("span");
            line.className = "editorial-hairline";
            line.setAttribute("aria-hidden", "true");
            element.prepend(line);
            const tween = gsap.from(line, {
              scaleX: 0,
              duration: 1,
              ease: motion.ease,
              paused: true,
            });
            watch(element, tween);
          } else {
            const target =
              type === "pause" || type === "privacy"
                ? element.querySelector("img")!
                : element;
            const photo = type === "pause" || type === "privacy";
            const tween = gsap.from(target, {
              ...(photo
                ? {
                    clipPath:
                      type === "pause"
                        ? "inset(0 0 100% 0)"
                        : "inset(0 100% 0 0)",
                  }
                : { opacity: 0, ...(type === "heading" ? { y: 12 } : {}) }),
              duration: photo ? 1.15 : type === "eyebrow" ? 0.5 : 0.8,
              ease: motion.opening,
              paused: true,
            });
            // ScrollTrigger observes native scroll and never pins or changes input.
            ScrollTrigger.create({
              trigger: element,
              start: "top 92%",
              onEnter: () => {
                if (!document.hidden) tween.play();
              },
            });
            watch(element, tween);
          }
        });
      const hero = document.querySelector(".photograph-hero");
      if (hero)
        watch(
          hero,
          gsap.to(hero.querySelector("img"), {
            scale: 1.02,
            duration: 22,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            paused: true,
          }),
        );
      const visibility = () =>
        animations.forEach((a) =>
          a.tween.paused(!a.visible || document.hidden),
        );
      const focus = (event: FocusEvent) => {
        animations
          .filter((a) => a.element.contains(event.target as Node))
          .forEach((a) => {
            if (a.tween.repeat() !== -1) a.tween.progress(1);
          });
      };
      document.addEventListener("visibilitychange", visibility);
      document.addEventListener("focusin", focus);
      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", visibility);
        document.removeEventListener("focusin", focus);
        document
          .querySelectorAll(".editorial-hairline")
          .forEach((line) => line.remove());
      };
    },
    { dependencies: [reduced], revertOnUpdate: true },
  );
  return null;
}
