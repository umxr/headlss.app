import {
  CloseNavigationAction,
  OpenNavigationAction,
  ToggleNavigationAction,
} from "./types";
import { TOGGLE_NAVIGATION, OPEN_NAVIGATION, CLOSE_NAVIGATION } from "./actionTypes";

export const openNavigation = (): OpenNavigationAction => {
  return {
    type: OPEN_NAVIGATION,
  };
};

export const closeNavigation = (): CloseNavigationAction => {
  return {
    type: CLOSE_NAVIGATION,
  };
};

export const toggleNavigation = (): ToggleNavigationAction => {
  return {
    type: TOGGLE_NAVIGATION,
  };
};
