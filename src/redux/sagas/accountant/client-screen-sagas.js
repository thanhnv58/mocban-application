import { call, put, takeEvery, select } from "redux-saga/effects";
import * as ClientScreenType from "./../../../actions/accountant/client-screen-action/types";
import * as UserRole from "./../../../constants/UserRole";
import * as userApis from "./../../../utils/api/userApis";
// import * as toastUtils from "./../../../utils/ToastUtils";

function* getAllClient(action) {
  const response = yield call(userApis.getAllUser, 0, UserRole.CLIENT);

  if (response === null) {
    yield put({
      type: ClientScreenType.GET_ALL_CLIENT_FAILED,
    });
    return;
  }

  // Case 204 - No content
  let { status } = response;
  if (status === 204) {
    yield put({
      type: ClientScreenType.GET_ALL_CLIENT_NO_CONTENT,
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: ClientScreenType.GET_ALL_CLIENT_SUCCESS,
    pageClientRes: response.data,
  });
}

function* loadMoreClient(action) {
  const pageClient = yield select(
    (state) => state.accountantReducer.pageClient
  );

  let { currentPage } = pageClient;

  const response = yield call(
    userApis.getAllUser,
    currentPage + 1,
    UserRole.CLIENT
  );

  if (response === null) {
    yield put({
      type: ClientScreenType.LOAD_MORE_CLIENT_FAILED,
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: ClientScreenType.LOAD_MORE_CLIENT_SUCCESS,
    pageLoadMoreClientRes: response.data,
  });
}

export const accountant_ClientScreenSagas = [
  takeEvery(ClientScreenType.GET_ALL_CLIENT, getAllClient),
  takeEvery(ClientScreenType.LOAD_MORE_CLIENT, loadMoreClient),
];
