import { RootState as State } from "../../config/redux/createRootReducer";

export const getAccessToken = (state: State) =>
  state.customer.customerAccessToken;

export const getExpiryToken = (state: State) => state.customer.expiry;
