import { State } from "./types";

export const INITIAL_STATE: State = {
  authenticated: false,
  customerAccessToken: null,
  expiry: null,
};
