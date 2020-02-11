import * as NotificationActType from "./../../../actions/notification-action/types";
import * as AuthActType from "./../../../actions/auth-action/types";
import * as arrayUtils from "./../../../utils/arrayUtils";

const initialState = {
  totalElements: 0,
  totalPage: 0,
  currentPage: -1,
  currentTotal: -1,
  notifications: []
};

const pageNotification = (state = initialState, action) => {
  switch (action.type) {
    case NotificationActType.GET_NOTIFICATION_SUCCESS:
      let { pageNotificationRes } = action;

      return {
        ...state,
        totalElements: pageNotificationRes.totalElements,
        totalPage: pageNotificationRes.totalPage,
        currentPage: pageNotificationRes.currentPage,
        currentTotal: pageNotificationRes.elements.length,
        notifications: pageNotificationRes.elements
      };
    case NotificationActType.GET_NOTIFICATION_NO_CONTENT:
      return {
        ...state,
        currentPage: 0,
        currentTotal: 0
      };
    case NotificationActType.REMOVE_NOTIFICATION_SUCCESS:
      let { notificationId } = action;
      let newArray = arrayUtils.removeItemWith(state.notifications, n => {
        return n.id === notificationId;
      });

      return {
        ...state,
        totalElements: state.totalElements - 1,
        currentTotal: state.notifications.length - 1,
        notifications: newArray
      };
    case AuthActType.ACT_LOG_OUT:
      state = initialState;
      return {
        ...state
      };
    default:
      return { ...state };
  }
};

export default pageNotification;
