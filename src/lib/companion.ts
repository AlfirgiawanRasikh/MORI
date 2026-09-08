import type { Mood, Reflection } from "./routing";
export type CompanionState =
  | "idle"
  | "notice"
  | "overwhelmed"
  | "low"
  | "restless"
  | "neutral"
  | "good"
  | "sit"
  | "breathe"
  | "settle";
export function moodPosture(mood: Mood | null): CompanionState {
  switch (mood) {
    case "Overwhelmed":
      return "overwhelmed";
    case "Low":
      return "low";
    case "Restless":
      return "restless";
    case "Good":
      return "good";
    case "I'm not sure":
      return "notice";
    default:
      return "neutral";
  }
}
export function reflectionPosture(
  reflection: Reflection | null,
): CompanionState {
  return reflection === "lighter"
    ? "good"
    : reflection === "heavier"
      ? "sit"
      : "neutral";
}
