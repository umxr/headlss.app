import { DECREMENT, INCREMENT } from "./actionTypes";

export interface State {
  count: number;
}

interface Count {
  count: number;
}

interface IncrementAction {
  type: typeof INCREMENT;
  payload: Count;
}

interface DecrementAction {
  type: typeof DECREMENT;
  payload: Count;
}

export type Action = IncrementAction | DecrementAction;
