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
  ACCESS_TOKEN_DELETE_FAILURE,
  ACCESS_TOKEN_DELETE_SUCCESS,
  ACCESS_TOKEN_UPDATE,
  AUTHENTICATED_SUCCESS,
  CUSTOMER_DESTROY_FAILURE,
  CUSTOMER_DESTROY_SUCCESS,
  EXPIRY_TOKEN_CREATE_SUCCESS,
  EXPIRY_TOKEN_DELETE_SUCCESS,
  EXPIRY_TOKEN_UPDATE,
  EXPIRY_TOKEN_VALIDATE,
  UNAUTHENTICATED_SUCCESS,
} from "./actionTypes";
import { Action } from "../../config/redux/types";
import { GetState } from "../../config/redux/createRootReducer";
import { getAccessToken } from "./selectors";
import { apolloClient } from "../../config/providers/createCustomerProvider";
import { CHECKOUT_CUSTOMER_DISASSOCIATE_V2 } from "../../modules/App/mutations/checkoutCustomerDisassociateV2";
import { CUSTOMER_ACCESS_TOKEN_DELETE } from "../../modules/App/mutations/customerAccessTokenDelete";

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
  const checkoutId = "checkoutId";
  const customerAccessToken = getAccessToken(getState());
  if (!checkoutId || !customerAccessToken) return;
  try {
    const { data } = await apolloClient.mutate({
      mutation: CHECKOUT_CUSTOMER_DISASSOCIATE_V2,
      variables: {
        checkoutId,
      },
    });
    if (data.checkoutCustomerDisassociateV2.checkoutUserErrors.length === 0) {
      try {
        const { data } = await apolloClient.mutate({
          mutation: CUSTOMER_ACCESS_TOKEN_DELETE,
          variables: { customerAccessToken },
        });
        if (data.customerAccessTokenDelete.userErrors.length === 0) {
          dispatch(customerDestroySuccess());
        }
      } catch (e) {
        dispatch({
          type: ACCESS_TOKEN_DELETE_FAILURE,
        });
        console.log("customerAccessTokenDelete");
        console.error(e);
      }
    }
  } catch (e) {
    dispatch({
      type: CUSTOMER_DESTROY_FAILURE,
    });
    console.log("checkoutCustomerDisassociateV2");
    console.error(e);
  }
};

export const customerDestroySuccess = (): CustomerDestroySuccessAction => {
  return {
    type: CUSTOMER_DESTROY_SUCCESS,
  };
};
