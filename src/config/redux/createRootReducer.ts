import {
  combineReducers,
  Middleware as ReduxMiddleware,
  Store as ReduxStore,
  Dispatch as ReduxDispatch,
} from "redux";

import drawerReducer from "../../reducers/drawer";
import navigationReducer from "../../reducers/navigation";
import notificationReducer from "../../reducers/notification";
import customerReducer from "../../reducers/customer";
import { Action, State } from "./types";

export const REDUCERS = {
  drawer: drawerReducer,
  navigation: navigationReducer,
  notification: notificationReducer,
  customer: customerReducer,
};

const rootReducer = combineReducers({
  ...REDUCERS,
});

export type GetState = () => State;
export type Store = ReduxStore<State, Action>;
export type Thunk<R> = (dispatch: Dispatch, getState: () => State) => R;
export type Dispatch = (<R>(action: Thunk<R>) => R) & ReduxDispatch<Action>;
export type Middleware = ReduxMiddleware<State, Action>;

export default rootReducer;
