import { call, put, takeEvery } from "redux-saga/effects";
import * as MainScreenActType from "../../../actions/accountant/main-screen-action/types";
import * as notificationApis from "../../../utils/api/notificationApis";

function* getNotificationOfAccountant(action) {
  const response = yield call(notificationApis.getNotificationOfAccountant);

  if (response === null) {
    yield put({
      type: MainScreenActType.GET_NOTIFICATION_ACCOUNTANT_FAILED
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: MainScreenActType.GET_NOTIFICATION_ACCOUNTANT_SUCCESS,
    notificationAccountantRes: response.data
  });
}

export const accountant_MainScreenSagas = [
  takeEvery(
    MainScreenActType.GET_NOTIFICATION_ACCOUNTANT,
    getNotificationOfAccountant
  )
];
