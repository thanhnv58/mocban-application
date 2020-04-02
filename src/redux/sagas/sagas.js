import { all } from "redux-saga/effects";
import { accountant_ClientScreenSagas } from "./accountant/client-screen-sagas";
import { accountant_MainScreenSagas } from "./accountant/main-screen-sagas";
import { accountant_TransactionScreenSagas } from "./accountant/transaction-screen-sagas";
import { commonUserSagas } from "./common-user-sagas";
import { notificationSagas } from "./notification/notification-sagas";
import { sale_ClientScreenSagas } from "./sale/client-screen-sagas";
import { sale_MainScreenSagas } from "./sale/main-screen-sagas";
import { sale_OrderScreenSagas } from "./sale/order-screen-sagas";
import { statisticSagas } from "./statistic/statistic-sagas";
import { technician_MainScreenSagas } from "./technician/main-screen-sagas";
import { technician_TaskScreen } from "./technician/task-screen-sagas";
import { manager_UserScreenSagas } from "./manager/user-screen-saga";

function* rootSaga() {
  yield all([
    ...commonUserSagas,
    ...sale_ClientScreenSagas,
    ...sale_OrderScreenSagas,
    ...sale_MainScreenSagas,
    ...accountant_ClientScreenSagas,
    ...accountant_TransactionScreenSagas,
    ...accountant_MainScreenSagas,
    ...notificationSagas,
    ...statisticSagas,
    ...technician_TaskScreen,
    ...technician_MainScreenSagas,
    ...manager_UserScreenSagas
  ]);
}

export default rootSaga;
