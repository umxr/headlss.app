import { combineReducers } from "redux";

import counterReducer from "../../reducers/counter";
import drawerReducer from "../../reducers/drawer";

const rootReducer = combineReducers({
  counter: counterReducer,
  drawer: drawerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
