import { call, put, takeEvery } from "redux-saga/effects";
import * as StatisticActionType from "../../../actions/statistic-action/types";
import * as statisticApis from "../../../utils/api/statisticApis";

function* getInOutAmountOfYear(action) {
  let { year } = action;
  const response = yield call(statisticApis.getInOutAmountOfYear, year);

  if (response === null) {
    yield put({
      type: StatisticActionType.GET_IN_OUT_AMOUNT_OF_YEAR_FAILED
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: StatisticActionType.GET_IN_OUT_AMOUNT_OF_YEAR_SUCCESS,
    inOutAmountOfYearRes: response.data
  });
}

function* getNewClientOfYear(action) {
  let { year } = action;
  const response = yield call(statisticApis.getNewClientOfYear, year);

  if (response === null) {
    yield put({
      type: StatisticActionType.GET_NEW_CLIENT_OF_YEAR_FAILED
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: StatisticActionType.GET_NEW_CLIENT_OF_YEAR_SUCCESS,
    newClientOfYearRes: response.data
  });
}

export const statisticSagas = [
  takeEvery(
    StatisticActionType.GET_IN_OUT_AMOUNT_OF_YEAR,
    getInOutAmountOfYear
  ),
  takeEvery(StatisticActionType.GET_NEW_CLIENT_OF_YEAR, getNewClientOfYear)
];
