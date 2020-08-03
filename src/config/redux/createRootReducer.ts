import { combineReducers } from "redux";

import counterReducer from "../../reducers/counter";
import drawerReducer from "../../reducers/drawer";
import navigationReducer from "../../reducers/navigation";
import notificationReducer from "../../reducers/notification";

const rootReducer = combineReducers({
  counter: counterReducer,
  drawer: drawerReducer,
  navigation: navigationReducer,
  notification: notificationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
