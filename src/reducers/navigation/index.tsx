import { INITIAL_STATE } from "./constants";
import { Action, State } from "./types";
import * as A from "./actionTypes";

export default function navigation(
  state = INITIAL_STATE,
  action: Action
): State {
  switch (action.type) {
    case A.OPEN_NAVIGATION:
      return {
        ...state,
        isOpen: true,
      };
    case A.CLOSE_NAVIGATION:
      return {
        ...state,
        isOpen: false,
      };
    case A.TOGGLE_NAVIGATION:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
}
