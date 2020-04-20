import { call, put, takeEvery } from "redux-saga/effects";
import * as OrderManagementAct from "../../../actions/sale/order-management/types";
import * as saleApis from "../../../utils/api/saleApis";
import * as toastUtils from "../../../utils/ToastUtils";
import * as OrderType from "../../../constants/OrderType";

function* getAllOrder(action) {
  let { isLoading, pageIndex, size, status } = action;

  const response = yield call(saleApis.getAllOrder, pageIndex, size, status);

  if (response === null) {
    yield put({
      type: OrderManagementAct.ACT_GET_ALL_ORDER_FAILED,
      isLoading,
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: OrderManagementAct.ACT_GET_ALL_ORDER_SUCCESS,
    isLoading,
    getAllOrderRes: response.data,
    page: pageIndex,
    size,
    status,
  });
}

function* createOrder(action) {
  let { idClient, orderType, requestDto } = action;

  let response;
  if (orderType === OrderType.DESIGN) {
    response = yield call(saleApis.createOrderDesign, idClient, requestDto);
  } else {
    response = yield call(saleApis.createOrderProduct, idClient, requestDto);
  }

  if (response === null) {
    yield put({
      type: OrderManagementAct.ACT_CREATE_ORDER_FAILED,
    });
    return;
  }

  // Case SUCCESS
  toastUtils.toastSuccess("Tạo đơn hàng thành công!");
  yield put({
    type: OrderManagementAct.ACT_CREATE_ORDER_SUCCESS,
    createOrderRes: response.data,
  });
}

function* getOrderDetail(action) {
  let { idOrder } = action;
  const response = yield call(saleApis.getOrderDetail, idOrder);

  if (response === null) {
    yield put({
      type: OrderManagementAct.ACT_GET_ORDER_DETAIL_FAILED,
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: OrderManagementAct.ACT_GET_ORDER_DETAIL_SUCCESS,
    getOrderDetailRes: response.data,
  });
}

function* updateOrder(action) {
  let { idOrder, requestDto } = action;

  const response = yield call(saleApis.updateOrder, idOrder, requestDto);

  if (response === null) {
    yield put({
      type: OrderManagementAct.ACT_UPDATE_ORDER_FAILED,
    });
    return;
  }

  // Case SUCCESS
  toastUtils.toastSuccess("Cập nhật thành công!");
  yield put({
    type: OrderManagementAct.ACT_UPDATE_ORDER_SUCCESS,
    updateOrderRes: response.data,
  });
}

function* paymentOrder(action) {
  let { idOrder, requestDto, step } = action;

  const response = yield call(saleApis.paymentOrder, idOrder, requestDto);

  if (response === null) {
    yield put({
      type: OrderManagementAct.ACT_PAYMENT_ORDER_FAILED,
      step,
    });
    return;
  }

  // Case SUCCESS
  toastUtils.toastSuccess("Thanh toán thành công!");
  yield put({
    type: OrderManagementAct.ACT_PAYMENT_ORDER_SUCCESS,
    paymentOrderRes: response.data,
    step,
  });
}

export const sale_OrderScreenSagas = [
  takeEvery(OrderManagementAct.ACT_GET_ALL_ORDER, getAllOrder),
  takeEvery(OrderManagementAct.ACT_CREATE_ORDER, createOrder),
  takeEvery(OrderManagementAct.ACT_GET_ORDER_DETAIL, getOrderDetail),
  takeEvery(OrderManagementAct.ACT_UPDATE_ORDER, updateOrder),
  takeEvery(OrderManagementAct.ACT_PAYMENT_ORDER, paymentOrder),
];
