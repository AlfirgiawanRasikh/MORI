"use client";

import { useEffect, useRef, useState } from "react";

/** Stop decorative work offscreen and while the browser tab is hidden. */
export function useInView<T extends Element>(threshold = 0.6) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    let intersecting = false;
    const update = () => setVisible(intersecting && !document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        intersecting =
          entry.isIntersecting && entry.intersectionRatio >= threshold;
        update();
      },
      { threshold },
    );
    observer.observe(ref.current);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [threshold]);
  return { ref, visible };
}
