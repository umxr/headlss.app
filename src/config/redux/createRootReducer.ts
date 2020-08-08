import { combineReducers } from "redux";

import drawerReducer from "../../reducers/drawer";
import navigationReducer from "../../reducers/navigation";
import notificationReducer from "../../reducers/notification";
import customerReducer from "../../reducers/customer";

export const REDUCERS = {
  drawer: drawerReducer,
  navigation: navigationReducer,
  notification: notificationReducer,
  customer: customerReducer,
};

const rootReducer = combineReducers({
  ...REDUCERS,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
