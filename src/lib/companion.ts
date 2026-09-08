import type { ActivityId, Mood, Reflection } from "./routing";
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
  | "grounded"
  | "look"
  | "listen"
  | "settle";

export type CompanionGesture = "rest" | "greeting" | "goodbye";

/** Interpret product progress for presentation only. Never select an activity. */
export function groundingPosture(
  activity: ActivityId,
  instruction: number,
  complete: boolean,
): CompanionState {
  if (complete) return "settle";
  if (activity === "breathing") return "breathe";
  if (activity === "grounding")
    return (
      (["grounded", "look", "listen", "settle"] as const)[instruction] ??
      "settle"
    );
  return instruction === 0
    ? "grounded"
    : instruction === 3
      ? "settle"
      : "notice";
}
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
