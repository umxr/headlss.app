import {
  CloseDrawerAction,
  OpenDrawerAction,
  ToggleDrawerAction,
} from "./types";
import { CLOSE_DRAWER, OPEN_DRAWER, TOGGLE_DRAWER } from "./actionTypes";

export const openDrawer = (): OpenDrawerAction => {
  return {
    type: OPEN_DRAWER,
  };
};

export const closeDrawer = (): CloseDrawerAction => {
  return {
    type: CLOSE_DRAWER,
  };
};

export const toggleDrawer = (): ToggleDrawerAction => {
  return {
    type: TOGGLE_DRAWER,
  };
};
