import { createContext } from "react";

export const defaultCustomerContext = {
  authenticated: false,
  customerAccessToken: null,
  getAccessToken: () => {},
  setAccessToken: (customerAccessToken: string) => {},
  deleteAccessToken: () => {},
};

export const CustomerContext = createContext(defaultCustomerContext);
