import { call, put, takeEvery, select } from "redux-saga/effects";
import * as ClientScreenType from "./../../../actions/sale/client-screen-action/types";
import * as UserRole from "./../../../constants/UserRole";
import * as userApis from "./../../../utils/api/userApis";
import * as toastUtils from "./../../../utils/toastUtils";

function* createClient(action) {
  let { requestDto } = action;

  const response = yield call(userApis.createUser, requestDto);

  if (response === null) {
    yield put({
      type: ClientScreenType.ACT_CREATE_CLIENT_FAILED
    });
    return;
  }

  // Case SUCCESS
  toastUtils.toastSuccess("Tạo khách hàng thành công!");
  yield put({
    type: ClientScreenType.ACT_CREATE_CLIENT_SUCCESS,
    newClient: response.data
  });
}

function* fetchListClient(action) {
  const response = yield call(userApis.getAllUser, 0, UserRole.CLIENT);

  if (response === null) {
    yield put({
      type: ClientScreenType.ACT_FETCH_LIST_CLIENT_FAILED
    });
    return;
  }

  // Case 204 - No content
  let { status } = response;
  if (status === 204) {
    yield put({
      type: ClientScreenType.ACT_FETCH_LIST_CLIENT_NO_CONTENT
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: ClientScreenType.ACT_FETCH_LIST_CLIENT_SUCCESS,
    pageClientRes: response.data
  });
}

function* loadMoreClient(action) {
  const pageClient = yield select(state => state.saleReducer.pageClient);

  let { currentPage } = pageClient;

  const response = yield call(
    userApis.getAllUser,
    currentPage + 1,
    UserRole.CLIENT
  );

  if (response === null) {
    yield put({
      type: ClientScreenType.ACT_LOAD_MORE_CLIENT_FAILED
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: ClientScreenType.ACT_LOAD_MORE_CLIENT_SUCCESS,
    pageLoadMoreClientRes: response.data
  });
}

export const sale_ClientScreenSagas = [
  takeEvery(ClientScreenType.ACT_CREATE_CLIENT, createClient),
  takeEvery(ClientScreenType.ACT_FETCH_LIST_CLIENT, fetchListClient),
  takeEvery(ClientScreenType.ACT_LOAD_MORE_CLIENT, loadMoreClient)
];
