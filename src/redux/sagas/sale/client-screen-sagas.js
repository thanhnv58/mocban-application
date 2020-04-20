import { call, put, takeEvery } from "redux-saga/effects";
import * as ClientManagementAct from "./../../../actions/sale/client-management/types";
import * as saleApis from "./../../../utils/api/saleApis";
import * as toastUtils from "./../../../utils/ToastUtils";

function* createClient(action) {
  let { requestDto } = action;

  const response = yield call(saleApis.createClient, requestDto);

  if (response === null) {
    yield put({
      type: ClientManagementAct.ACT_CREATE_CLIENT_FAILED,
    });
    return;
  }

  // Case SUCCESS
  toastUtils.toastSuccess("Mã khách hàng mới: " + response.data.code);
  yield put({
    type: ClientManagementAct.ACT_CREATE_CLIENT_SUCCESS,
  });
}

function* updateClient(action) {
  let { idClient, requestDto } = action;

  const response = yield call(saleApis.updateClient, idClient, requestDto);

  if (response === null) {
    yield put({
      type: ClientManagementAct.ACT_UPDATE_CLIENT_FAILED,
    });
    return;
  }

  // Case SUCCESS
  toastUtils.toastSuccess("Cập nhật thành công!");
  yield put({
    type: ClientManagementAct.ACT_UPDATE_CLIENT_SUCCESS,
    updateClientRes: response.data,
  });
}

function* getAllClient(action) {
  let { isLoading, pageIndex, size, search, status } = action;

  const response = yield call(
    saleApis.getAllClient,
    pageIndex,
    size,
    search,
    status
  );

  if (response === null) {
    yield put({
      type: ClientManagementAct.ACT_GET_ALL_CLIENT_FAILED,
      isLoading,
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: ClientManagementAct.ACT_GET_ALL_CLIENT_SUCCESS,
    isLoading,
    getAllClientRes: response.data,
    page: pageIndex,
    size,
    search,
    status,
  });
}

function* getClientDetail(action) {
  let { idClient } = action;

  const response = yield call(saleApis.getClientDetail, idClient);

  if (response === null) {
    yield put({
      type: ClientManagementAct.ACT_GET_CLIENT_DETAIL_FAILED,
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: ClientManagementAct.ACT_GET_CLIENT_DETAIL_SUCCESS,
    getClientDetailRes: response.data,
  });
}

// function* loadMoreClient(action) {
//   const pageClient = yield select(state => state.saleReducer.pageClient);

//   let { currentPage } = pageClient;

//   const response = yield call(
//     userApis.getAllUser,
//     currentPage + 1,
//     UserRole.CLIENT
//   );

//   if (response === null) {
//     yield put({
//       type: ClientManagementAct.ACT_LOAD_MORE_CLIENT_FAILED
//     });
//     return;
//   }

//   // Case SUCCESS
//   yield put({
//     type: ClientManagementAct.ACT_LOAD_MORE_CLIENT_SUCCESS,
//     pageLoadMoreClientRes: response.data
//   });
// }

export const sale_ClientScreenSagas = [
  takeEvery(ClientManagementAct.ACT_CREATE_CLIENT, createClient),
  takeEvery(ClientManagementAct.ACT_GET_ALL_CLIENT, getAllClient),
  takeEvery(ClientManagementAct.ACT_GET_CLIENT_DETAIL, getClientDetail),
  takeEvery(ClientManagementAct.ACT_UPDATE_CLIENT, updateClient),
];
