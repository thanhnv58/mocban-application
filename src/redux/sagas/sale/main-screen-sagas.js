import { call, put, takeEvery } from "redux-saga/effects";
import * as MainScreenActType from "./../../../actions/sale/main-screen-action/types";
import * as statisticApis from "./../../../utils/api/statisticApis";
// import * as toastUtils from "./../../../utils/toastUtils";

function* getStatisticOfMonth(action) {
  let { month, year } = action;

  const response = yield call(
    statisticApis.getStatisOfMonthOfUserLogin,
    year,
    month
  );

  if (response === null) {
    yield put({
      type: MainScreenActType.GET_STATISTIC_OF_MONTH_FAILED
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: MainScreenActType.GET_STATISTIC_OF_MONTH_SUCCESS,
    statisticOfMonth: response.data
  });
}

function* getStatisticOfYear(action) {
  let { year } = action;

  const response = yield call(statisticApis.getStatisOfYearOfUserLogin, year);

  if (response === null) {
    yield put({
      type: MainScreenActType.GET_STATISTIC_OF_YEAR_FAILED
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: MainScreenActType.GET_STATISTIC_OF_YEAR_SUCCESS,
    statisticOfYear: response.data
  });
}

export const sale_MainScreenSagas = [
  takeEvery(MainScreenActType.GET_STATISTIC_OF_MONTH, getStatisticOfMonth),
  takeEvery(MainScreenActType.GET_STATISTIC_OF_YEAR, getStatisticOfYear)
];
