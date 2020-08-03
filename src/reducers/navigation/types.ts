import {
  CLOSE_NAVIGATION,
  OPEN_NAVIGATION,
  TOGGLE_NAVIGATION,
} from "./actionTypes";

export interface State {
  isOpen: boolean;
}

export interface OpenNavigationAction {
  type: typeof OPEN_NAVIGATION;
}

export interface CloseNavigationAction {
  type: typeof CLOSE_NAVIGATION;
}

export interface ToggleNavigationAction {
  type: typeof TOGGLE_NAVIGATION;
}

export type Action =
  | OpenNavigationAction
  | CloseNavigationAction
  | ToggleNavigationAction;
