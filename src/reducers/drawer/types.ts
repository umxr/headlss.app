import { CLOSE_DRAWER, OPEN_DRAWER, TOGGLE_DRAWER } from "./actionTypes";

export interface State {
  isOpen: boolean;
}

export interface OpenDrawerAction {
  type: typeof OPEN_DRAWER;
}

export interface CloseDrawerAction {
  type: typeof CLOSE_DRAWER;
}

export interface ToggleDrawerAction {
  type: typeof TOGGLE_DRAWER;
}

export type Action = OpenDrawerAction | CloseDrawerAction | ToggleDrawerAction;
