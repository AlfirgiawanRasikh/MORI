"use client";
import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import {
  experienceReducer,
  initialState,
  type ExperienceAction,
  type ExperienceState,
} from "@/lib/experience";
const ExperienceContext = createContext<{
  state: ExperienceState;
  dispatch: Dispatch<ExperienceAction>;
} | null>(null);
export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(experienceReducer, initialState);
  return (
    <ExperienceContext.Provider value={{ state, dispatch }}>
      {children}
    </ExperienceContext.Provider>
  );
}
export function useExperience() {
  const value = useContext(ExperienceContext);
  if (!value)
    throw new Error("Experience components require ExperienceProvider");
  return value;
}
export function focusSection(id: string) {
  requestAnimationFrame(() => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
    const heading = element.querySelector<HTMLElement>("[data-focus-heading]");
    heading?.focus({ preventScroll: true });
  });
}
