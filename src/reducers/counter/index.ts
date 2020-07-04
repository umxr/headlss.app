import { INITIAL_STATE } from "./constants";
import { Action, State } from "./types";
import * as A from "./actionTypes";

export default function counter(state = INITIAL_STATE, action: Action): State {
  switch (action.type) {
    case A.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case A.DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
}
