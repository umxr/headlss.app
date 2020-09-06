import React, { Fragment, useEffect, useCallback } from "react";
import { useToast } from "@chakra-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  hideErrorNotification,
  hideSuccessNotification,
  hideWarningNotification,
} from "../../reducers/notification/actions";
import { Types } from "../../reducers/notification/types";
import { State } from "../../config/redux/types";

const Notification = () => {
  const toast = useToast();
  const dispatch = useDispatch();

  const notification = useSelector((state: State) => state.notification);

  const closeSuccessNotification = useCallback(() => {
    dispatch(hideSuccessNotification());
  }, [dispatch]);
  const closeWarningNotification = useCallback(() => {
    dispatch(hideWarningNotification());
  }, [dispatch]);
  const closeErrorNotification = useCallback(() => {
    dispatch(hideErrorNotification());
  }, [dispatch]);

  useEffect(() => {
    if (notification.success.visible) {
      toast({
        title: "Success.",
        description: notification.success.message,
        status: Types.Success,
        duration: 2500,
        isClosable: true,
        onCloseComplete: closeSuccessNotification,
      });
    }
    if (notification.warning.visible) {
      toast({
        title: "Warning.",
        description: notification.warning.message,
        status: Types.Warning,
        duration: 2500,
        isClosable: true,
        onCloseComplete: closeWarningNotification,
      });
    }
    if (notification.error.visible) {
      toast({
        title: "Error.",
        description: notification.error.message,
        status: Types.Error,
        duration: 2500,
        isClosable: true,
        onCloseComplete: closeErrorNotification,
      });
    }
  }, [notification]);

  return <Fragment />;
};

export default Notification;
