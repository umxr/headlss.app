import {
  HideErrorNotificationAction,
  HideSuccessNotificationAction,
  HideWarningNotificationAction,
  ShowErrorNotificationAction,
  ShowSuccessNotificationAction,
  ShowWarningNotificationAction,
} from "./types";
import {
  HIDE_ERROR_NOTIFICATION,
  HIDE_SUCCESS_NOTIFICATION,
  HIDE_WARNING_NOTIFICATION,
  SHOW_ERROR_NOTIFICATION,
  SHOW_SUCCESS_NOTIFICATION,
  SHOW_WARNING_NOTIFICATION,
} from "./actionTypes";

export const showSuccessNotification = (payload: {
  message: string;
}): ShowSuccessNotificationAction => {
  return {
    type: SHOW_SUCCESS_NOTIFICATION,
    payload,
  };
};

export const hideSuccessNotification = (): HideSuccessNotificationAction => {
  return {
    type: HIDE_SUCCESS_NOTIFICATION,
  };
};

export const showWarningNotification = (payload: {
  message: string;
}): ShowWarningNotificationAction => {
  return {
    type: SHOW_WARNING_NOTIFICATION,
    payload,
  };
};

export const hideWarningNotification = (): HideWarningNotificationAction => {
  return {
    type: HIDE_WARNING_NOTIFICATION,
  };
};

export const showErrorNotification = (payload: {
  message: string;
}): ShowErrorNotificationAction => {
  return {
    type: SHOW_ERROR_NOTIFICATION,
    payload,
  };
};

export const hideErrorNotification = (): HideErrorNotificationAction => {
  return {
    type: HIDE_ERROR_NOTIFICATION,
  };
};
