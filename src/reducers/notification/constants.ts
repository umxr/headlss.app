import { State, Types } from "./types";

export const INITIAL_STATE: State = {
  success: {
    type: Types.Success,
    message: "",
    visible: false,
  },
  warning: {
    type: Types.Warning,
    message: "",
    visible: false,
  },
  error: {
    type: Types.Error,
    message: "",
    visible: false,
  },
};
