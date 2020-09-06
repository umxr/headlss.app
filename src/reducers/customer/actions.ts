import { Dispatch } from "redux";
import {
  AccessTokenDeleteSuccessAction,
  AccessTokenUpdateAction,
  AuthenticatedSuccess,
  CustomerDestroySuccessAction,
  ExpiryTokenCreateSuccessAction,
  ExpiryTokenDeleteSuccess,
  ExpiryTokenValidateAction,
  UnauthenticatedSuccess,
} from "./types";
import {
  ACCESS_TOKEN_DELETE_SUCCESS,
  ACCESS_TOKEN_UPDATE,
  AUTHENTICATED_SUCCESS,
  CUSTOMER_DESTROY_SUCCESS,
  EXPIRY_TOKEN_CREATE_SUCCESS,
  EXPIRY_TOKEN_DELETE_SUCCESS,
  EXPIRY_TOKEN_UPDATE,
  EXPIRY_TOKEN_VALIDATE,
  UNAUTHENTICATED_SUCCESS,
} from "./actionTypes";
import { Action } from "../../config/redux/types";
import {GetState} from "../../config/redux/createRootReducer";

export const authenticatedSuccess = (): AuthenticatedSuccess => {
  return {
    type: AUTHENTICATED_SUCCESS,
  };
};

export const unauthenticatedSuccess = (): UnauthenticatedSuccess => {
  return {
    type: UNAUTHENTICATED_SUCCESS,
  };
};

export const accessTokenDeleteSuccess = (): AccessTokenDeleteSuccessAction => {
  return {
    type: ACCESS_TOKEN_DELETE_SUCCESS,
  };
};

export const accessTokenUpdate = (
  customerAccessToken: string
): AccessTokenUpdateAction => {
  return {
    type: ACCESS_TOKEN_UPDATE,
    payload: {
      customerAccessToken,
    },
  };
};

export const expiryTokenCreateSuccess = (
  expiryToken: string
): ExpiryTokenCreateSuccessAction => {
  return {
    type: EXPIRY_TOKEN_CREATE_SUCCESS,
    payload: {
      expiryToken,
    },
  };
};

export const expiryTokenDeleteSuccess = (): ExpiryTokenDeleteSuccess => {
  return {
    type: EXPIRY_TOKEN_DELETE_SUCCESS,
  };
};

export const expiryTokenValidate = (
  valid: boolean
): ExpiryTokenValidateAction => {
  return {
    type: EXPIRY_TOKEN_VALIDATE,
    payload: {
      valid,
    },
  };
};

export const expiryTokenUpdate = (expiryToken: string) => {
  return {
    type: EXPIRY_TOKEN_UPDATE,
    payload: {
      expiryToken,
    },
  };
};

export const customerDestoryThunk = () => async (
  dispatch: Dispatch<Action>,
  getState: GetState
) => {

};

export const customerDestroySuccess = (): CustomerDestroySuccessAction => {
  return {
    type: CUSTOMER_DESTROY_SUCCESS,
  };
};
