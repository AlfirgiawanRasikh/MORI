import {
  alternativeTo,
  routeCheckIn,
  type ActivityId,
  type CheckIn,
  type Mood,
  type Reflection,
} from "./routing";
export type Stage = 0 | 1 | 2 | 3;
export type SessionEntry = CheckIn & {
  id: number;
  activity: ActivityId;
  reflection: Reflection;
};
export type ExperienceState = {
  input: CheckIn;
  stage: Stage;
  alternative: ActivityId | null;
  activeActivity: ActivityId | null;
  activityInput: CheckIn | null;
  instruction: number;
  activityComplete: boolean;
  reflection: Reflection | null;
  finished: boolean;
  history: SessionEntry[];
  session: number;
};
export const initialState: ExperienceState = {
  input: { mood: null, detail: null, context: null },
  stage: 0,
  alternative: null,
  activeActivity: null,
  activityInput: null,
  instruction: 0,
  activityComplete: false,
  reflection: null,
  finished: false,
  history: [],
  session: 1,
};
export type ExperienceAction =
  | { type: "mood"; value: Mood }
  | { type: "detail"; value: string | null }
  | { type: "context"; value: string | null }
  | { type: "back"; stage: Stage }
  | { type: "alternative" }
  | { type: "start"; activity: ActivityId }
  | { type: "advance"; count: number }
  | { type: "exit" }
  | { type: "reflect"; value: Reflection }
  | { type: "finish" }
  | { type: "restart" }
  | { type: "clear" };
export function experienceReducer(
  state: ExperienceState,
  action: ExperienceAction,
): ExperienceState {
  switch (action.type) {
    case "mood":
      return {
        ...state,
        input: { mood: action.value, detail: null, context: null },
        stage: 1,
        alternative: null,
      };
    case "detail":
      return {
        ...state,
        input: { ...state.input, detail: action.value, context: null },
        stage: 2,
        alternative: null,
      };
    case "context":
      return {
        ...state,
        input: { ...state.input, context: action.value },
        stage: 3,
        alternative: null,
      };
    case "back":
      return action.stage <= state.stage
        ? { ...state, stage: action.stage }
        : state;
    case "alternative":
      return {
        ...state,
        alternative: alternativeTo(
          state.alternative ?? routeCheckIn(state.input),
        ),
      };
    case "start":
      return {
        ...state,
        activeActivity: action.activity,
        activityInput: { ...state.input },
        instruction: 0,
        activityComplete: false,
        reflection: null,
        finished: false,
        session: state.session + 1,
      };
    case "advance":
      return !state.activeActivity
        ? state
        : state.instruction + 1 < action.count
          ? { ...state, instruction: state.instruction + 1 }
          : { ...state, activityComplete: true };
    case "exit":
      return {
        ...state,
        activeActivity: null,
        activityInput: null,
        instruction: 0,
        activityComplete: false,
      };
    case "reflect": {
      if (!state.activeActivity || !state.activityComplete) return state;
      const entry: SessionEntry = {
        ...(state.activityInput ?? state.input),
        id: state.session,
        activity: state.activeActivity,
        reflection: action.value,
      };
      return {
        ...state,
        reflection: action.value,
        history: [
          ...state.history.filter((item) => item.id !== state.session),
          entry,
        ],
      };
    }
    case "finish":
      return { ...state, finished: true };
    case "restart":
      return {
        ...initialState,
        history: state.history,
        session: state.session + 1,
      };
    case "clear":
      return { ...initialState, session: state.session + 1 };
  }
}
