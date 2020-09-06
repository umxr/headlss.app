import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./createRootReducer";
import preloadedState from "./preloadedState";

import customerMiddleware from "../../reducers/customer/middleware";

const middleware: any[] = [];

middleware.push(thunk);
middleware.push(customerMiddleware())

export default () =>
  createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
