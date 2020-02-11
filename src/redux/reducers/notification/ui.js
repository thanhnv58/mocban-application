import * as NotificationActType from "./../../../actions/notification-action/types";

const initialState = {
  isLoading1: false,
  isLoading2: false
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    case NotificationActType.GET_NOTIFICATION:
      return {
        ...state,
        isLoading1: true
      };
    case NotificationActType.GET_NOTIFICATION_FAILED:
    case NotificationActType.GET_NOTIFICATION_NO_CONTENT:
    case NotificationActType.GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isLoading1: false
      };

    case NotificationActType.REMOVE_NOTIFICATION:
      return {
        ...state,
        isLoading2: true
      };
    case NotificationActType.REMOVE_NOTIFICATION_FAILED:
    case NotificationActType.REMOVE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isLoading2: false
      };

    default:
      return { ...state };
  }
};

export default ui;
