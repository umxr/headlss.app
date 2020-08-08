import {
  AccessTokenDeleteSuccessAction,
  AccessTokenUpdateAction,
  ExpiryTokenCreateSuccessAction,
  ExpiryTokenValidateAction,
} from "./types";
import {
  ACCESS_TOKEN_DELETE_SUCCESS,
  ACCESS_TOKEN_UPDATE,
  CUSTOMER_DESTROY_SUCCESS,
  EXPIRY_TOKEN_CREATE_SUCCESS,
  EXPIRY_TOKEN_UPDATE,
  EXPIRY_TOKEN_VALIDATE,
} from "./actionTypes";

export const accessTokenDeleteSuccess = (
  customerAccessToken: string
): AccessTokenDeleteSuccessAction => {
  return {
    type: ACCESS_TOKEN_DELETE_SUCCESS,
    payload: {
      customerAccessToken,
    },
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

export const customerDestroySuccess = () => {
  return {
    type: CUSTOMER_DESTROY_SUCCESS,
    payload: {
      authenticated: false,
      customerAccessToken: null,
      expiry: null,
    },
  };
};
