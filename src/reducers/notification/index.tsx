import { INITIAL_STATE } from "./constants";
import { Action, State, Types } from "./types";
import * as A from "./actionTypes";

export default function notification(
  state = INITIAL_STATE,
  action: Action
): State {
  switch (action.type) {
    case A.SHOW_SUCCESS_NOTIFICATION:
      return {
        ...state,
        success: {
          type: Types.Success,
          message: action.payload.message,
          visible: true,
        },
      };
    case A.HIDE_SUCCESS_NOTIFICATION:
      return {
        ...state,
        success: {
          type: Types.Success,
          message: "",
          visible: false,
        },
      };
    case A.SHOW_WARNING_NOTIFICATION:
      return {
        ...state,
        warning: {
          type: Types.Warning,
          message: action.payload.message,
          visible: true,
        },
      };
    case A.HIDE_WARNING_NOTIFICATION:
      return {
        ...state,
        warning: {
          type: Types.Warning,
          message: "",
          visible: false,
        },
      };
    case A.SHOW_ERROR_NOTIFICATION:
      return {
        ...state,
        error: {
          type: Types.Error,
          message: action.payload.message,
          visible: true,
        },
      };
    case A.HIDE_ERROR_NOTIFICATION:
      return {
        ...state,
        error: {
          type: Types.Error,
          message: "",
          visible: false,
        },
      };
    default:
      return state;
  }
}
