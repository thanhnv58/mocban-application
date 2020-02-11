import { call, put, takeEvery, select } from "redux-saga/effects";
import * as OrderScreenActionType from "../../../actions/sale/order-screen-action/types";
import * as orderApis from "../../../utils/api/orderApis";
import * as transactionApi from "../../../utils/api/transactionApi";
import * as toastUtils from "../../../utils/toastUtils";

function* createOrder(action) {
  let { requestDto } = action;

  const response = yield call(orderApis.createOrder, requestDto);

  if (response === null) {
    yield put({
      type: OrderScreenActionType.ACT_CREATE_ORDER_FAILED
    });
    return;
  }

  // Case SUCCESS
  toastUtils.toastSuccess("Tạo đơn hàng thành công!");
  yield put({
    type: OrderScreenActionType.ACT_CREATE_ORDER_SUCCESS,
    newOrder: response.data
  });
}

function* getOrderOfClient(action) {
  let { clientUsername } = action;

  const response = yield call(orderApis.getOrdersOfClient, clientUsername, 0);

  if (response === null) {
    yield put({
      type: OrderScreenActionType.GET_ORDER_OF_CLIENT_FAILED
    });
    return;
  }

  // Case 204 - No content
  let { status } = response;
  if (status === 204) {
    yield put({
      type: OrderScreenActionType.GET_ORDER_OF_CLIENT_NO_CONTENT
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: OrderScreenActionType.GET_ORDER_OF_CLIENT_SUCCESS,
    pageOrderRes: response.data,
    clientUsername
  });
}

function* fetchListOrder(action) {
  const response = yield call(orderApis.fetchListOrder, 0);

  if (response === null) {
    yield put({
      type: OrderScreenActionType.ACT_FETCH_LIST_ORDER_FAILED
    });
    return;
  }

  // Case 204 - No content
  let { status } = response;
  if (status === 204) {
    yield put({
      type: OrderScreenActionType.ACT_FETCH_LIST_ORDER_NO_CONTENT
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: OrderScreenActionType.ACT_FETCH_LIST_ORDER_SUCCESS,
    pageOrderRes: response.data
  });
}

function* loadMoreListOrder(action) {
  const pageOrder = yield select(state => state.saleReducer.pageOrder);

  let { currentPage } = pageOrder;

  const response = yield call(orderApis.fetchListOrder, currentPage + 1);

  if (response === null) {
    yield put({
      type: OrderScreenActionType.LOAD_MORE_LIST_ORDER_FAILED
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: OrderScreenActionType.LOAD_MORE_LIST_ORDER_SUCCESS,
    pageLoadMoreOrderRes: response.data
  });
}

function* getOrderDetail(action) {
  let { orderId } = action;

  const response = yield call(orderApis.getOrderDetail, orderId);

  if (response === null) {
    yield put({
      type: OrderScreenActionType.ACT_GET_ORDER_DETAIL_FAILED
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: OrderScreenActionType.ACT_GET_ORDER_DETAIL_SUCCESS,
    orderDetail: response.data
  });
}

function* createTransaction(action) {
  let { requestDto } = action;

  const response = yield call(transactionApi.createTransaction, requestDto);

  if (response === null) {
    yield put({
      type: OrderScreenActionType.ACT_DO_TRANSACTION_FAILED
    });
    return;
  }

  // Case SUCCESS
  toastUtils.toastSuccess("Thanh toán thành công!");
  yield put({
    type: OrderScreenActionType.ACT_DO_TRANSACTION_SUCCESS,
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
      type: OrderScreenActionType.GET_TRANSACTION_INCOME_OF_ORDER_FAILED
    });
    return;
  }

  // Case 204 - No content
  let { status } = response;
  if (status === 204) {
    yield put({
      type: OrderScreenActionType.GET_TRANSACTION_INCOME_OF_ORDER_NO_CONTENT,
      orderId
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: OrderScreenActionType.GET_TRANSACTION_INCOME_OF_ORDER_SUCCESS,
    pageTransactionRes: response.data,
    orderId
  });
}

function* updateClientRequest(action) {
  let { requestBody } = action;

  const response = yield call(orderApis.updateClientRequest, requestBody);

  if (response === null) {
    yield put({
      type: OrderScreenActionType.UPDATE_CLIENT_REQUEST_FAILED
    });
    return;
  }

  // Case SUCCESS
  toastUtils.toastSuccess("Cập nhật yêu cầu khách hàng thành công!");
  yield put({
    type: OrderScreenActionType.UPDATE_CLIENT_REQUEST_SUCCESS,
    updateClientRequestRes: response.data
  });
}

export const sale_OrderScreenSagas = [
  takeEvery(OrderScreenActionType.ACT_CREATE_ORDER, createOrder),
  takeEvery(OrderScreenActionType.ACT_FETCH_LIST_ORDER, fetchListOrder),
  takeEvery(OrderScreenActionType.LOAD_MORE_LIST_ORDER, loadMoreListOrder),
  takeEvery(OrderScreenActionType.ACT_GET_ORDER_DETAIL, getOrderDetail),
  takeEvery(OrderScreenActionType.ACT_DO_TRANSACTION, createTransaction),
  takeEvery(OrderScreenActionType.GET_ORDER_OF_CLIENT, getOrderOfClient),

  takeEvery(
    OrderScreenActionType.GET_TRANSACTION_INCOME_OF_ORDER,
    getTransactionOfOrder
  ),

  takeEvery(OrderScreenActionType.UPDATE_CLIENT_REQUEST, updateClientRequest)
];
