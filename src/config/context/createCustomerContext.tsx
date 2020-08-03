import { createContext } from "react";

export interface ICustomerContext {
  authenticated: boolean;
  customerAccessToken: string | null;
  expiry: string | null;
  getAccessToken: () => void;
  setAccessToken: (customerAccessToken: string) => void;
  deleteAccessToken: () => void;
  getExpiry: () => void;
  setExpiry: (expiry: string) => void;
  deleteExpiry: () => void;
  checkExpiry: () => void;
  logout: (callback?: () => void | Promise<void>) => void;
  deleteCustomerInstance: () => void;
}

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

export const CustomerContext = createContext<ICustomerContext>(
  defaultCustomerContext
);
