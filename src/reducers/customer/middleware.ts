import * as A from "./actionTypes";
import { MiddlewareAPI, Dispatch } from "redux";
import { Middleware } from "../../config/redux/createRootReducer";
import type { Action } from "./types";
import { getExpiryToken } from "./selectors";
import { checkExpiry } from "./utils";
import { customerDestroySuccess } from "./actions";

function middleware() {
  const customerMiddleware: Middleware = (store: MiddlewareAPI) => (
    next: Dispatch<Action>
  ) => (action) => {
    // Access Token
    if (action.type === A.ACCESS_TOKEN_CREATE_SUCCESS) {
      localStorage.setItem(
        "shopify_customer_token",
        action.payload.customerAccessToken
      );
    }
    if (action.type === A.ACCESS_TOKEN_DELETE_SUCCESS) {
      localStorage.removeItem("shopify_customer_token");
    }

    // Expiry Token
    if (action.type === A.EXPIRY_TOKEN_CREATE_SUCCESS) {
      localStorage.setItem(
        "shopify_customer_expiry",
        action.payload.expiryToken
      );
    }
    if (action.type === A.EXPIRY_TOKEN_DELETE_SUCCESS) {
      localStorage.removeItem("shopify_customer_expiry");
    }

    // Validate Expiry Token
    if (
      action.type === A.EXPIRY_TOKEN_VALIDATE ||
      action.type === A.EXPIRY_TOKEN_READ
    ) {
      const expiryToken = getExpiryToken(store.getState());
      if (expiryToken) {
        const valid = checkExpiry(expiryToken);
        if (!valid) {
          store.dispatch(customerDestroySuccess());
        }
      }
    }

    // Customer Logging Out
    if (action.type === A.UNAUTHENTICATED_SUCCESS) {
      localStorage.removeItem("shopify_customer_token");
      localStorage.removeItem("shopify_customer_expiry");
    }

    next(action);
  };

  return customerMiddleware;
}

export default middleware;
