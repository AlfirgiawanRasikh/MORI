"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export { gsap, useGSAP, ScrollTrigger };
export const motion = {
  reveal: 0.8,
  surface: 1.15,
  clear: 0.65,
  settle: 0.75,
  ease: "power2.inOut",
  opening: "power2.out",
  breath: 4,
} as const;
