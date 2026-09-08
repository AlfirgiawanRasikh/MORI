export const moods = [
  "Overwhelmed",
  "Low",
  "Restless",
  "Okay",
  "Good",
  "I'm not sure",
] as const;
export type Mood = (typeof moods)[number];
export type Reflection = "lighter" | "same" | "heavier";
export type ActivityId =
  | "grounding"
  | "prioritize"
  | "breathing"
  | "physical"
  | "connection"
  | "release"
  | "reflection"
  | "positive"
  | "awareness";
export type CheckIn = {
  mood: Mood | null;
  detail: string | null;
  context: string | null;
};
export type Instruction = { title: string; description: string };
export type Activity = {
  id: ActivityId;
  name: string;
  response: string;
  invitation: string;
  action: string;
  steps: readonly Instruction[];
};

export const moodDescriptions: Record<Mood, string> = {
  Overwhelmed: "My mind feels crowded",
  Low: "Heavy or drained",
  Restless: "Hard to be still",
  Okay: "Steady enough",
  Good: "Light and clear",
  "I'm not sure": "Hard to name it",
};
export const details: Record<Mood, readonly string[]> = {
  Overwhelmed: [
    "Too much to do",
    "Can't stop thinking",
    "Something happened",
    "Emotionally drained",
    "I don't know",
  ],
  Low: [
    "Low energy",
    "Feeling disconnected",
    "Missing someone",
    "Emotionally drained",
    "I don't know",
  ],
  Restless: [
    "Body tension",
    "Can't stop thinking",
    "Feeling frustrated",
    "Something happened",
    "I don't know",
  ],
  Okay: [
    "A busy mind",
    "A quiet moment",
    "Feeling disconnected",
    "I don't know",
  ],
  Good: [
    "Something went well",
    "Feeling connected",
    "A quiet moment",
    "I don't know",
  ],
  "I'm not sure": [
    "A busy mind",
    "Feeling disconnected",
    "Feeling confused",
    "I don't know",
  ],
};
export const contexts = [
  "Work / Study",
  "Relationship",
  "Future",
  "Something I did",
  "Everything",
  "Rather not say",
] as const;
const step = (title: string, description: string): Instruction => ({
  title,
  description,
});
export const activities: Record<ActivityId, Activity> = {
  grounding: {
    id: "grounding",
    name: "A moment of stillness",
    response: "Your mind has been holding onto a lot.",
    invitation:
      "We don't have to untangle it all right now. Let's give it somewhere to rest for two minutes.",
    action: "Start 2-minute reset",
    steps: [
      step(
        "Put both feet on the floor.",
        "Notice the support beneath you. Choose another comfortable position if you need to.",
      ),
      step(
        "Look around.",
        "Find three things that are completely still. You can notice them through touch instead.",
      ),
      step(
        "Listen closely.",
        "Notice one sound you weren't paying attention to before, or one sensation you can feel.",
      ),
      step(
        "Nothing needs fixing right now.",
        "Let your shoulders rest. Take this moment at your own pace.",
      ),
    ],
  },
  prioritize: {
    id: "prioritize",
    name: "One thing at a time",
    response: "There may be a lot asking for your attention.",
    invitation:
      "You don't have to carry the whole list right now. Let's find one small place to begin.",
    action: "Try a tiny prioritization reset",
    steps: [
      step(
        "Let the whole list wait.",
        "You don't need to organize everything. Just pause for a moment.",
      ),
      step(
        "Think of one thing that matters today.",
        "It can be small. Keep it in your mind; there's nothing to write down.",
      ),
      step(
        "Make the first step smaller.",
        "What could you begin in just a minute? Opening a document can be enough.",
      ),
      step(
        "The rest can wait a moment.",
        "You can take that small step when you're ready.",
      ),
    ],
  },
  breathing: {
    id: "breathing",
    name: "Room for a breath",
    response: "It can be hard to find a place to settle.",
    invitation:
      "Try a few comfortable breaths. No counting, holding, or getting it right.",
    action: "Try a gentle breathing pause",
    steps: [
      step(
        "Find a comfortable position.",
        "Let your hands rest wherever they feel at ease.",
      ),
      step(
        "Notice a breath coming in.",
        "Keep it natural. There's no need to breathe more deeply.",
      ),
      step(
        "Let the next breath leave.",
        "Allow the breath to move at its own pace. You can stop if this feels uncomfortable.",
      ),
      step(
        "Return to the room.",
        "Notice the surface supporting you. Nothing else is required.",
      ),
    ],
  },
  physical: {
    id: "physical",
    name: "A little room to move",
    response: "You might not have much energy to spare.",
    invitation: "A small action can be enough for now. Let's keep this gentle.",
    action: "Try one tiny physical action",
    steps: [
      step(
        "Notice how you're sitting or standing.",
        "There's no need to change anything yet.",
      ),
      step(
        "Make one comfortable adjustment.",
        "Uncross your legs, soften your hands, or shift your weight. Choose what works for your body.",
      ),
      step(
        "Give yourself a small kindness.",
        "Perhaps a sip of water, or a little more light. You can simply rest instead.",
      ),
      step(
        "That can be enough.",
        "You don't have to turn a small action into a productive day.",
      ),
    ],
  },
  connection: {
    id: "connection",
    name: "A small moment of connection",
    response: "You don't have to hold every feeling alone.",
    invitation:
      "Perhaps there's someone you feel at ease with. Let's start with a small thought of them.",
    action: "Try a connection prompt",
    steps: [
      step(
        "Think of someone you trust.",
        "Someone who can listen without needing you to explain everything.",
      ),
      step(
        "Keep the message simple.",
        "You could say: ‘I'm having a hard moment. Do you have a little time to talk?’",
      ),
      step(
        "Decide what feels comfortable.",
        "You can reach out later, now, or not at all. MORI won't contact anyone.",
      ),
      step("You can leave it there.", "There is no perfect thing to say."),
    ],
  },
  release: {
    id: "release",
    name: "Let a little tension go",
    response: "Something may still be taking up space.",
    invitation:
      "You don't have to work it all out now. Try making a little room around it.",
    action: "Try a gentle release",
    steps: [
      step(
        "Let your hands rest.",
        "Notice whether you're holding them tightly.",
      ),
      step(
        "Soften one small area.",
        "Your hands, jaw, or shoulders — only if it feels comfortable.",
      ),
      step(
        "Let one breath pass.",
        "Nothing has to change. Just leave a little space.",
      ),
      step(
        "You can set this down for a moment.",
        "You can return to what happened when you're ready.",
      ),
    ],
  },
  reflection: {
    id: "reflection",
    name: "A little space to notice",
    response: "You don't need to have a clear answer yet.",
    invitation:
      "Let's notice one part of this moment without trying to explain everything.",
    action: "Try a short guided reflection",
    steps: [
      step(
        "What is taking up the most space?",
        "You can hold the answer quietly. No need to put it into words.",
      ),
      step(
        "What might you need in the next few minutes?",
        "A little quiet, a pause, some company — or perhaps you're not sure.",
      ),
      step(
        "Let one small need matter.",
        "There is no right answer and no need to make a plan.",
      ),
      step("You can leave the question open.", "Noticing is enough for now."),
    ],
  },
  positive: {
    id: "positive",
    name: "Stay with something good",
    response: "There's a little lightness here today.",
    invitation:
      "You don't have to make anything of it. Take a moment to notice what's already here.",
    action: "Try a positive reflection",
    steps: [
      step(
        "Notice one good part of this moment.",
        "It doesn't have to be a big thing.",
      ),
      step(
        "Give it a little attention.",
        "A person, a feeling, the light in the room — let it be simple.",
      ),
      step("Let yourself enjoy it.", "There's nothing to record or achieve."),
      step(
        "Take a little of it with you.",
        "You can go back to your day whenever you're ready.",
      ),
    ],
  },
  awareness: {
    id: "awareness",
    name: "Start with what you can feel",
    response: "It's okay not to have a name for it.",
    invitation:
      "You don't have to figure out the feeling. Let's start with something you can notice.",
    action: "Try a body awareness pause",
    steps: [
      step(
        "Notice where your body meets a surface.",
        "The chair, the floor, or the fabric against your skin.",
      ),
      step(
        "Notice one simple sensation.",
        "Warmth, coolness, pressure, or the texture of something near you.",
      ),
      step(
        "Allow the feeling to be unnamed.",
        "You can notice without deciding what it means.",
      ),
      step("You're here, in this moment.", "That can be a place to begin."),
    ],
  },
};

/** Transparent prototype rules. No diagnosis, model call, or animation dependency. */
export function routeCheckIn(input: CheckIn): ActivityId {
  const { mood, detail, context } = input;
  if (mood === "Good") return "positive";
  if (detail === "Too much to do") return "prioritize";
  if (detail === "Feeling frustrated" || detail === "Something happened")
    return "release";
  if (
    detail === "Missing someone" ||
    (detail === "Feeling disconnected" && context === "Relationship")
  )
    return "connection";
  if (detail === "Feeling confused") return "reflection";
  if (detail === "Can't stop thinking" || detail === "A busy mind")
    return "grounding";
  if (mood === "Restless" || detail === "Body tension") return "breathing";
  if (
    mood === "Low" ||
    detail === "Low energy" ||
    detail === "Emotionally drained"
  )
    return "physical";
  if (!mood || mood === "I'm not sure") return "awareness";
  if (mood === "Okay") return "reflection";
  return "grounding";
}
export function alternativeTo(id: ActivityId): ActivityId {
  return id === "grounding" ? "reflection" : "grounding";
}
