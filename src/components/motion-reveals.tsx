"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/** Progressive enhancement: content is visible without JS or reduced-motion support. */
export function MotionReveals() {
  const reduced = usePrefersReducedMotion();
  const seen = useRef(new WeakSet<Element>());
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const photos = document.querySelectorAll<HTMLElement>(".photograph");
    const photoVisibility = new Map<HTMLElement, boolean>();
    const show = (element: HTMLElement) => {
      seen.current.add(element);
      element.dataset.revealState = "shown";
    };
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target as HTMLElement);
          reveal.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );
    for (const element of elements) {
      const box = element.getBoundingClientRect();
      if (
        reduced ||
        seen.current.has(element) ||
        box.top < window.innerHeight
      ) {
        element.dataset.revealState = "visible";
        if (box.top < window.innerHeight) seen.current.add(element);
      } else {
        element.dataset.revealState = "pending";
        reveal.observe(element);
      }
    }
    const updatePhotos = () => {
      for (const [photo, visible] of photoVisibility)
        photo.dataset.photoActive = String(
          visible && !document.hidden && !reduced,
        );
    };
    const photoObserver = new IntersectionObserver((entries) => {
      for (const entry of entries)
        photoVisibility.set(entry.target as HTMLElement, entry.isIntersecting);
      updatePhotos();
    });
    photos.forEach((photo) => photoObserver.observe(photo));
    // Never hide a keyboard destination inside an enhanced reveal.
    const onFocus = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const parent = target.closest<HTMLElement>("[data-reveal]");
      if (parent) show(parent);
    };
    document.addEventListener("focusin", onFocus);
    document.addEventListener("visibilitychange", updatePhotos);
    return () => {
      reveal.disconnect();
      photoObserver.disconnect();
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("visibilitychange", updatePhotos);
      elements.forEach((element) => {
        element.dataset.revealState = "visible";
      });
      photos.forEach((photo) => {
        photo.dataset.photoActive = "false";
      });
    };
  }, [reduced]);
  return null;
}
