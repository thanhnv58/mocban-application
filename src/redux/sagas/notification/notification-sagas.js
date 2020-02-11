import { call, put, takeEvery } from "redux-saga/effects";
import * as NotificationActionType from "./../../../actions/notification-action/types";
import * as notificationApis from "./../../../utils/api/notificationApis";
import * as toastUtils from "./../../../utils/toastUtils";

function* getNotification(action) {
  const response = yield call(notificationApis.getNotification, 0);

  if (response === null) {
    yield put({
      type: NotificationActionType.GET_NOTIFICATION_FAILED
    });
    return;
  }

  // Case 204 - No content
  let { status } = response;
  if (status === 204) {
    yield put({
      type: NotificationActionType.GET_NOTIFICATION_NO_CONTENT
    });
    return;
  }

  // Case SUCCESS
  // toastUtils.toastSuccess("Tạo khách hàng thành công!");
  yield put({
    type: NotificationActionType.GET_NOTIFICATION_SUCCESS,
    pageNotificationRes: response.data
  });
}

function* removeNotification(action) {
  let { notificationId } = action;
  const response = yield call(
    notificationApis.removeNotification,
    notificationId
  );

  if (response === null) {
    yield put({
      type: NotificationActionType.REMOVE_NOTIFICATION_FAILED
    });
    return;
  }

  // Case 204 - No content
  let { status } = response;
  if (status === 204) {
    yield put({
      type: NotificationActionType.REMOVE_NOTIFICATION_SUCCESS
    });
    return;
  }

  // Case SUCCESS
  toastUtils.toastSuccess("Xóa thông báo thành công!");
  yield put({
    type: NotificationActionType.REMOVE_NOTIFICATION_SUCCESS,
    notificationId
  });
}

export const notificationSagas = [
  takeEvery(NotificationActionType.GET_NOTIFICATION, getNotification),
  takeEvery(NotificationActionType.REMOVE_NOTIFICATION, removeNotification)
];
