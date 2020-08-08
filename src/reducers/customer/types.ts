import {
  ACCESS_TOKEN_CREATE_FAILURE,
  ACCESS_TOKEN_CREATE_REQUEST,
  ACCESS_TOKEN_CREATE_SUCCESS,
  ACCESS_TOKEN_DELETE_FAILURE,
  ACCESS_TOKEN_DELETE_REQUEST,
  ACCESS_TOKEN_DELETE_SUCCESS,
  ACCESS_TOKEN_READ,
  ACCESS_TOKEN_UPDATE,
  AUTHENTICATED_FAILURE,
  AUTHENTICATED_REQUEST,
  AUTHENTICATED_SUCCESS,
  CUSTOMER_DESTROY_FAILURE,
  CUSTOMER_DESTROY_REQUEST,
  CUSTOMER_DESTROY_SUCCESS,
  EXPIRY_TOKEN_CREATE_FAILURE,
  EXPIRY_TOKEN_CREATE_REQUEST,
  EXPIRY_TOKEN_CREATE_SUCCESS,
  EXPIRY_TOKEN_DELETE_FAILURE,
  EXPIRY_TOKEN_DELETE_REQUEST,
  EXPIRY_TOKEN_DELETE_SUCCESS,
  EXPIRY_TOKEN_READ,
  EXPIRY_TOKEN_UPDATE,
  EXPIRY_TOKEN_VALIDATE,
  UNAUTHENTICATED_FAILURE,
  UNAUTHENTICATED_REQUEST,
  UNAUTHENTICATED_SUCCESS,
} from "./actionTypes";

export interface State {
  authenticated: boolean;
  customerAccessToken: string | null;
  expiry: string | null;
}

export interface UnauthenticatedRequest {
  type: typeof UNAUTHENTICATED_REQUEST;
}

export interface UnauthenticatedFailure {
  type: typeof UNAUTHENTICATED_FAILURE;
}

export interface UnauthenticatedSuccess {
  type: typeof UNAUTHENTICATED_SUCCESS;
}

export interface AuthenticatedRequest {
  type: typeof AUTHENTICATED_REQUEST;
}

export interface AuthenticatedFailure {
  type: typeof AUTHENTICATED_FAILURE;
}

export interface AuthenticatedSuccess {
  type: typeof AUTHENTICATED_SUCCESS;
}

export interface ExpiryTokenDeleteSuccess {
  type: typeof EXPIRY_TOKEN_DELETE_SUCCESS;
}

export interface ExpiryTokenDeleteRequest {
  type: typeof EXPIRY_TOKEN_DELETE_REQUEST;
}

export interface ExpiryTokenDeleteFailure {
  type: typeof EXPIRY_TOKEN_DELETE_FAILURE;
}

export interface AccessTokenCreateRequest {
  type: typeof ACCESS_TOKEN_CREATE_REQUEST;
}

export interface AccessTokenCreateSuccess {
  type: typeof ACCESS_TOKEN_CREATE_SUCCESS;
}

export interface AccessTokenCreateFailure {
  type: typeof ACCESS_TOKEN_CREATE_FAILURE;
}

export interface AccessTokenDeleteRequestAction {
  type: typeof ACCESS_TOKEN_DELETE_REQUEST;
}

export interface AccessTokenDeleteSuccessAction {
  type: typeof ACCESS_TOKEN_DELETE_SUCCESS;
  payload: {
    customerAccessToken: string;
  };
}

export interface AccessTokenDeleteFailureAction {
  type: typeof ACCESS_TOKEN_DELETE_FAILURE;
}

export interface AccessTokenReadAction {
  type: typeof ACCESS_TOKEN_READ;
}

export interface AccessTokenUpdateAction {
  type: typeof ACCESS_TOKEN_UPDATE;
  payload: {
    customerAccessToken: string;
  };
}

export interface ExpiryTokenCreateRequestAction {
  type: typeof EXPIRY_TOKEN_CREATE_REQUEST;
}

export interface ExpiryTokenCreateSuccessAction {
  type: typeof EXPIRY_TOKEN_CREATE_SUCCESS;
  payload: {
    expiryToken: string;
  };
}

export interface ExpiryTokenCreateFailureAction {
  type: typeof EXPIRY_TOKEN_CREATE_FAILURE;
}

export interface ExpiryTokenReadAction {
  type: typeof EXPIRY_TOKEN_READ;
}

export interface ExpiryTokenValidateAction {
  type: typeof EXPIRY_TOKEN_VALIDATE;
  payload: {
    valid: boolean;
  };
}

export interface ExpiryTokenUpdateAction {
  type: typeof EXPIRY_TOKEN_UPDATE;
  payload: {
    expiryToken: string;
  };
}

export interface CustomerDestroyRequestAction {
  type: typeof CUSTOMER_DESTROY_REQUEST;
}

export interface CustomerDestroySuccessAction {
  type: typeof CUSTOMER_DESTROY_SUCCESS;
  payload: {
    authenticated: boolean;
    customerAccessToken: null;
    expiry: null;
  };
}

export interface CustomerDestroyFailureAction {
  type: typeof CUSTOMER_DESTROY_FAILURE;
}
