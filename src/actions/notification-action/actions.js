import * as types from "./types";

export const getNotification = () => {
  return {
    type: types.GET_NOTIFICATION
  };
};

export const removeNotification = notificationId => {
  return {
    type: types.REMOVE_NOTIFICATION,
    notificationId
  };
};
