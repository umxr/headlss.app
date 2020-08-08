import { REDUCERS, RootState } from "./createRootReducer";

import { State as DrawerState } from "../../reducers/drawer/types";
import { State as NavigationState } from "../../reducers/navigation/types";
import { State as CustomerState } from "../../reducers/customer/types";
import { State as NotificationState } from "../../reducers/notification/types";

import { INITIAL_STATE as DrawerInitialState } from "../../reducers/drawer/constants";
import { INITIAL_STATE as NavigationInitialState } from "../../reducers/navigation/constants";
import { INITIAL_STATE as CustomerInitialState } from "../../reducers/customer/constants";
import { INITIAL_STATE as NotifcationDefaultState } from "../../reducers/notification/constants";

export const loadCustomerToken = () => {
  try {
    const serializedToken = localStorage.getItem("shopify_customer_token");
    if (serializedToken === null) return null;
    return serializedToken;
  } catch (err) {
    return null;
  }
};

export const loadCustomerExpiry = () => {
  try {
    const serializedExpiry = localStorage.getItem("shopify_customer_expiry");
    if (serializedExpiry === null) return null;
    return serializedExpiry;
  } catch (err) {
    return null;
  }
};

export const loadCheckoutId = () => {
  try {
    const serializedCheckoutId = localStorage.getItem("shopify_checkout_id");
    if (serializedCheckoutId === null) return null;
    return serializedCheckoutId;
  } catch (err) {
    return null;
  }
};

export const loadState = (): {
  notification: NotificationState;
  navigation: NavigationState;
  drawer: DrawerState;
  customer: CustomerState;
} => {
  return {
    notification: NotifcationDefaultState,
    navigation: NavigationInitialState,
    drawer: DrawerInitialState,
    customer: CustomerInitialState,
  };
};
