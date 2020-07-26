import { INITIAL_STATE } from "./constants";
import { Action, State } from "./types";
import * as A from "./actionTypes";

export default function drawer(state = INITIAL_STATE, action: Action): State {
  switch (action.type) {
    case A.OPEN_DRAWER:
      return {
        ...state,
        isOpen: true,
      };
    case A.CLOSE_DRAWER:
      return {
        ...state,
        isOpen: false,
      };
    case A.TOGGLE_DRAWER:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
}
