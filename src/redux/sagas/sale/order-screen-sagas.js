import { call, put, takeEvery } from "redux-saga/effects";
import * as SaleOrderScreenActionType from "../../../actions/sale/order-screen-action/types";
import * as orderApis from "../../../utils/api/orderApis";
import * as transactionApi from "../../../utils/api/transactionApi";
import * as toastUtils from "../../../utils/toastUtils";

function* createOrder(action) {
  let { requestDto } = action;

  const response = yield call(orderApis.createOrder, requestDto);

  if (response === null) {
    yield put({
      type: SaleOrderScreenActionType.ACT_CREATE_ORDER_FAILED
    });
    return;
  }

  // Case SUCCESS
  toastUtils.toastSuccess("Tạo đơn hàng thành công!");
  yield put({
    type: SaleOrderScreenActionType.ACT_CREATE_ORDER_SUCCESS,
    newOrder: response.data
  });
}

function* searchOrderByClientId(action) {
  let { clientId } = action;

  const response = yield call(orderApis.searchOrderByClientId, clientId, 0);

  if (response === null) {
    yield put({
      type: SaleOrderScreenActionType.ACT_SEARCH_BY_CLIENT_ID_FAILED
    });
    return;
  }

  // Case 204 - No content
  let { status } = response;
  if (status === 204) {
    yield put({
      type: SaleOrderScreenActionType.ACT_SEARCH_BY_CLIENT_ID_NO_CONTENT
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: SaleOrderScreenActionType.ACT_SEARCH_BY_CLIENT_ID_SUCCESS,
    pageOrderRes: response.data
  });
}

function* fetchListOrder(action) {
  const response = yield call(orderApis.fetchListOrder, 0);

  if (response === null) {
    yield put({
      type: SaleOrderScreenActionType.ACT_FETCH_LIST_ORDER_FAILED
    });
    return;
  }

  // Case 204 - No content
  let { status } = response;
  if (status === 204) {
    yield put({
      type: SaleOrderScreenActionType.ACT_FETCH_LIST_ORDER_NO_CONTENT
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: SaleOrderScreenActionType.ACT_FETCH_LIST_ORDER_SUCCESS,
    pageOrderRes: response.data
  });
}

function* getOrderDetail(action) {
  let { orderId } = action;

  const response = yield call(orderApis.getOrderDetail, orderId);

  if (response === null) {
    yield put({
      type: SaleOrderScreenActionType.ACT_GET_ORDER_DETAIL_FAILED
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: SaleOrderScreenActionType.ACT_GET_ORDER_DETAIL_SUCCESS,
    orderDetail: response.data
  });
}

function* doTransaction(action) {
  let { requestDto } = action;

  const response = yield call(orderApis.doTransaction, requestDto);

  if (response === null) {
    yield put({
      type: SaleOrderScreenActionType.ACT_DO_TRANSACTION_FAILED
    });
    return;
  }

  // Case SUCCESS
  toastUtils.toastSuccess("Thanh toán thành công!");
  yield put({
    type: SaleOrderScreenActionType.ACT_DO_TRANSACTION_SUCCESS,
    transactionResponse: response.data
  });
}

function* getTransactionOfOrder(action) {
  let { orderId } = action;

  const response = yield call(
    transactionApi.getTransactionIncomeOfOrder,
    orderId,
    0
  );

  if (response === null) {
    yield put({
      type: SaleOrderScreenActionType.GET_TRANSACTION_INCOME_OF_ORDER_FAILED
    });
    return;
  }

  // Case 204 - No content
  let { status } = response;
  if (status === 204) {
    yield put({
      type:
        SaleOrderScreenActionType.GET_TRANSACTION_INCOME_OF_ORDER_NO_CONTENT,
      orderId
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: SaleOrderScreenActionType.GET_TRANSACTION_INCOME_OF_ORDER_SUCCESS,
    pageTransactionRes: response.data,
    orderId
  });
}

export const sale_OrderScreenSagas = [
  takeEvery(SaleOrderScreenActionType.ACT_CREATE_ORDER, createOrder),
  takeEvery(SaleOrderScreenActionType.ACT_FETCH_LIST_ORDER, fetchListOrder),
  takeEvery(SaleOrderScreenActionType.ACT_GET_ORDER_DETAIL, getOrderDetail),
  takeEvery(SaleOrderScreenActionType.ACT_DO_TRANSACTION, doTransaction),
  takeEvery(
    SaleOrderScreenActionType.ACT_SEARCH_BY_CLIENT_ID,
    searchOrderByClientId
  ),

  takeEvery(
    SaleOrderScreenActionType.GET_TRANSACTION_INCOME_OF_ORDER,
    getTransactionOfOrder
  )
];
