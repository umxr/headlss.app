import { createContext } from "react";

export const defaultCustomerContext = {
  authenticated: false,
  customerAccessToken: null,
  expiry: null,
  getAccessToken: () => {},
  setAccessToken: (customerAccessToken: string) => {},
  deleteAccessToken: () => {},
  getExpiry: () => {},
  setExpiry: (expiry: string) => {},
  deleteExpiry: () => {},
  checkExpiry: () => {},
  logout: () => {},
  deleteCustomerInstance: () => {},
};

export const CustomerContext = createContext(defaultCustomerContext);
