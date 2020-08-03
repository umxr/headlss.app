import React from "react";
import { Provider } from "react-redux";

import configureStore from "../config/redux/configureStore";

const store = configureStore();

export default ({ element }: any) => (
  <Provider store={store}>{element}</Provider>
);
