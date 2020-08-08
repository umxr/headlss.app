import { Action, State } from "./types";
import { INITIAL_STATE } from "./constants";
import * as A from "./actionTypes";

export default function customer(state: State = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case A.AUTHENTICATED_SUCCESS:
      return {
        ...state,
        authenticated: true,
      };
    case A.UNAUTHENTICATED_SUCCESS:
      return {
        ...state,
        authenticated: false,
      };
    case A.ACCESS_TOKEN_CREATE_SUCCESS:
      return {
        ...state,
        customerAccessToken: action.payload.customerAccessToken,
      };
    case A.ACCESS_TOKEN_DELETE_SUCCESS:
      return {
        ...state,
        customerAccessToken: null,
      };
    case A.EXPIRY_TOKEN_CREATE_SUCCESS:
      return {
        ...state,
        expiry: action.payload.expiryToken,
      };
    case A.EXPIRY_TOKEN_DELETE_SUCCESS:
      return {
        ...state,
        expiry: null,
      };
    case A.CUSTOMER_DESTROY_SUCCESS:
      return {
        ...state,
        authenticated: false,
        customerAccessToken: null,
        expiry: null,
      };
    default:
      return state;
  }
}
