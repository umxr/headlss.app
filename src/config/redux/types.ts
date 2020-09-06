import {
  State as DrawerState,
  Action as DrawerAction,
} from "../../reducers/drawer/types";
import {
  State as NavigationState,
  Action as NavigationAction,
} from "../../reducers/drawer/types";
import {
  State as NotificationState,
  Action as NotificationAction,
} from "../../reducers/notification/types";
import {
  State as CustomerState,
  Action as CustomerAction,
} from "../../reducers/customer/types";

export type State = {
  drawer: DrawerState;
  navigation: NavigationState;
  notification: NotificationState;
  customer: CustomerState;
};

export type Action =
  | DrawerAction
  | NavigationAction
  | NotificationAction
  | CustomerAction;
