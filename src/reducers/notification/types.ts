import {
  SHOW_ERROR_NOTIFICATION,
  SHOW_SUCCESS_NOTIFICATION,
  HIDE_SUCCESS_NOTIFICATION,
  HIDE_ERROR_NOTIFICATION,
  HIDE_WARNING_NOTIFICATION,
  SHOW_WARNING_NOTIFICATION,
} from "./actionTypes";

export enum Types {
  "Success" = "success",
  "Error" = "error",
  "Warning" = "warning",
}

interface IToast {
  type: Types;
  message: string;
  visible: boolean;
}

export interface State {
  success: IToast;
  warning: IToast;
  error: IToast;
}

export interface ShowSuccessNotificationAction {
  type: typeof SHOW_SUCCESS_NOTIFICATION;
  payload: {
    message: string;
  };
}

export interface HideSuccessNotificationAction {
  type: typeof HIDE_SUCCESS_NOTIFICATION;
}

export interface ShowWarningNotificationAction {
  type: typeof SHOW_WARNING_NOTIFICATION;
  payload: {
    message: string;
  };
}

export interface HideWarningNotificationAction {
  type: typeof HIDE_WARNING_NOTIFICATION;
}

export interface ShowErrorNotificationAction {
  type: typeof SHOW_ERROR_NOTIFICATION;
  payload: {
    message: string;
  };
}

export interface HideErrorNotificationAction {
  type: typeof HIDE_ERROR_NOTIFICATION;
}

export type Action =
  | ShowSuccessNotificationAction
  | HideSuccessNotificationAction
  | ShowWarningNotificationAction
  | HideWarningNotificationAction
  | ShowErrorNotificationAction
  | HideErrorNotificationAction;
