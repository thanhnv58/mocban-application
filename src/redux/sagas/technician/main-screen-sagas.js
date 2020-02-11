import { call, put, takeEvery } from "redux-saga/effects";
import * as MainScreenActType from "../../../actions/technician/main-screen-action/types";
import * as notificationApis from "../../../utils/api/notificationApis";

function* getNotificationOfTechnician(action) {
  const response = yield call(notificationApis.getNotificationOfTechnician);

  if (response === null) {
    yield put({
      type: MainScreenActType.GET_NOTIFICATION_TECHNICIAN_FAILED
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: MainScreenActType.GET_NOTIFICATION_TECHNICIAN_SUCCESS,
    notificationTechnicianRes: response.data
  });
}

export const technician_MainScreenSagas = [
  takeEvery(
    MainScreenActType.GET_NOTIFICATION_TECHNICIAN,
    getNotificationOfTechnician
  )
];
