import { all } from "redux-saga/effects";
import { accountant_ClientScreenSagas } from "./accountant/client-screen-sagas";
import { accountant_MainScreenSagas } from "./accountant/main-screen-sagas";
import { accountant_TransactionScreenSagas } from "./accountant/transaction-screen-sagas";
import { commonUserSagas } from "./common-user-sagas";
import { notificationSagas } from "./notification/notification-sagas";
import { statisticSagas } from "./statistic/statistic-sagas";
import { technician_MainScreenSagas } from "./technician/main-screen-sagas";
import { technician_TaskScreen } from "./technician/task-screen-sagas";
import { manager_UserScreenSagas } from "./manager/user-screen-saga";
import { saleMainSagas } from "./sale/sale-main-sagas";
import { adminMainSagas } from "./admin/admin-main-sagas";

function* rootSaga() {
  yield all([
    ...commonUserSagas,
    ...saleMainSagas,
    ...adminMainSagas,
    ...accountant_ClientScreenSagas,
    ...accountant_TransactionScreenSagas,
    ...accountant_MainScreenSagas,
    ...notificationSagas,
    ...statisticSagas,
    ...technician_TaskScreen,
    ...technician_MainScreenSagas,
    ...manager_UserScreenSagas,
  ]);
}

export default rootSaga;
