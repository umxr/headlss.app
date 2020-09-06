import { State } from "../../config/redux/types";

export const getAccessToken = (state: State) =>
  state.customer.customerAccessToken;

export const getExpiryToken = (state: State) => state.customer.expiry;
