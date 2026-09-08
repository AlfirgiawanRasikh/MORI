import { test } from "node:test";
import assert from "node:assert/strict";
import {
  activities,
  alternativeTo,
  contexts,
  details,
  moods,
  routeCheckIn,
  type CheckIn,
} from "../src/lib/routing";
import { experienceReducer, initialState } from "../src/lib/experience";
import { moodPosture, reflectionPosture } from "../src/lib/companion";

test("routes the PRD's supported inputs to distinct, manageable activities", () => {
  const cases: [CheckIn, string][] = [
    [
      {
        mood: "Overwhelmed",
        detail: "Can't stop thinking",
        context: "Work / Study",
      },
      "grounding",
    ],
    [
      { mood: "Overwhelmed", detail: "Too much to do", context: null },
      "prioritize",
    ],
    [{ mood: "Restless", detail: "Body tension", context: null }, "breathing"],
    [{ mood: "Low", detail: "Low energy", context: null }, "physical"],
    [
      { mood: "Low", detail: "Feeling disconnected", context: "Relationship" },
      "connection",
    ],
    [
      { mood: "Restless", detail: "Feeling frustrated", context: null },
      "release",
    ],
    [
      { mood: "I'm not sure", detail: "Feeling confused", context: null },
      "reflection",
    ],
    [{ mood: "Good", detail: null, context: null }, "positive"],
    [{ mood: "I'm not sure", detail: null, context: null }, "awareness"],
  ];
  for (const [input, expected] of cases)
    assert.equal(routeCheckIn(input), expected);
});

test("every available combination, including skips, leads to one complete activity", () => {
  for (const mood of moods)
    for (const detail of [...details[mood], null])
      for (const context of [...contexts, null]) {
        const activity = activities[routeCheckIn({ mood, detail, context })];
        assert.ok(activity.response && activity.invitation && activity.action);
        assert.ok(activity.steps.length > 0);
        for (const step of activity.steps)
          assert.ok(step.title && step.description);
        assert.notEqual(alternativeTo(activity.id), activity.id);
      }
});

test("a recommendation takes three choices with no text entry and skips work", () => {
  let state = experienceReducer(initialState, {
    type: "mood",
    value: "I'm not sure",
  });
  assert.equal(state.stage, 1);
  state = experienceReducer(state, { type: "detail", value: null });
  assert.equal(state.stage, 2);
  state = experienceReducer(state, { type: "context", value: null });
  assert.equal(state.stage, 3);
  assert.equal(routeCheckIn(state.input), "awareness");
});

test("changing an earlier answer clears dependent answers and alternative", () => {
  let state = experienceReducer(initialState, {
    type: "mood",
    value: "Overwhelmed",
  });
  state = experienceReducer(state, { type: "detail", value: "Too much to do" });
  state = experienceReducer(state, { type: "context", value: "Work / Study" });
  state = experienceReducer(state, { type: "alternative" });
  state = experienceReducer(state, { type: "mood", value: "Good" });
  assert.deepEqual(state.input, { mood: "Good", detail: null, context: null });
  assert.equal(state.alternative, null);
  assert.equal(state.stage, 1);
});

test("activity completion supports all three reflections without duplicate history", () => {
  let state = experienceReducer(initialState, {
    type: "start",
    activity: "grounding",
  });
  assert.equal(
    experienceReducer(state, { type: "reflect", value: "lighter" }).history
      .length,
    0,
  );
  for (let i = 0; i < activities.grounding.steps.length; i++)
    state = experienceReducer(state, {
      type: "advance",
      count: activities.grounding.steps.length,
    });
  assert.equal(state.activityComplete, true);
  assert.equal(state.instruction, activities.grounding.steps.length - 1);
  for (const value of ["lighter", "same", "heavier"] as const) {
    state = experienceReducer(state, { type: "reflect", value });
    assert.equal(state.reflection, value);
    assert.equal(state.history.length, 1);
    assert.equal(state.history[0].reflection, value);
  }
  state = experienceReducer(state, { type: "finish" });
  assert.equal(state.finished, true);
  state = experienceReducer(state, { type: "restart" });
  assert.equal(state.history.length, 1);
  assert.equal(state.reflection, null);
  assert.equal(state.stage, 0);
  state = experienceReducer(state, { type: "clear" });
  assert.deepEqual(state.history, []);
  assert.deepEqual(state.input, initialState.input);
});

test("exiting never fabricates completion, an outcome or check-in history", () => {
  let state = experienceReducer(initialState, {
    type: "start",
    activity: "breathing",
  });
  state = experienceReducer(state, { type: "advance", count: 4 });
  state = experienceReducer(state, { type: "exit" });
  assert.equal(state.activeActivity, null);
  assert.equal(state.activityComplete, false);
  assert.equal(state.instruction, 0);
  assert.equal(state.history.length, 0);
});

test("a new activity preserves earlier reflections and captures its own input", () => {
  let state = experienceReducer(initialState, { type: "mood", value: "Low" });
  state = experienceReducer(state, { type: "start", activity: "physical" });
  state = experienceReducer(state, { type: "mood", value: "Good" });
  for (let i = 0; i < 4; i++)
    state = experienceReducer(state, { type: "advance", count: 4 });
  state = experienceReducer(state, { type: "reflect", value: "lighter" });
  assert.equal(state.history[0].mood, "Low");
  state = experienceReducer(state, { type: "start", activity: "positive" });
  for (let i = 0; i < 4; i++)
    state = experienceReducer(state, { type: "advance", count: 4 });
  state = experienceReducer(state, { type: "reflect", value: "same" });
  assert.equal(state.history.length, 2);
  assert.equal(state.history[1].mood, "Good");
});

test("companion posture stays separate from routing and never implies failure", () => {
  assert.equal(reflectionPosture("heavier"), "sit");
  assert.equal(reflectionPosture("same"), "neutral");
  assert.equal(reflectionPosture("lighter"), "good");
  assert.equal(moodPosture("I'm not sure"), "notice");
});
