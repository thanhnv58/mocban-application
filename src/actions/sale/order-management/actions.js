import * as types from "./types";
import * as PaymentStep from "../../../constants/PaymentStep";

export const getAllOrder = (
  isLoading,
  pageIndex = 0,
  size = 10,
  status = "NORMAL"
) => {
  return {
    type: types.ACT_GET_ALL_ORDER,
    pageIndex,
    status,
    size,
    isLoading,
  };
};

export const createOrder = (idClient, orderType, requestDto) => {
  return {
    type: types.ACT_CREATE_ORDER,
    requestDto,
    idClient,
    orderType,
  };
};

export const removeNewOrder = () => {
  return {
    type: types.ACT_REMOVE_NEW_ORDER,
  };
};

export const getOrderDetail = (idOrder) => {
  return {
    type: types.ACT_GET_ORDER_DETAIL,
    idOrder,
  };
};

export const updateOrder = (idOrder, requestDto) => {
  return {
    type: types.ACT_UPDATE_ORDER,
    requestDto,
    idOrder,
  };
};

export const paymentOrder = (
  idOrder,
  requestDto,
  step = PaymentStep.PAYMENT_1
) => {
  return {
    type: types.ACT_PAYMENT_ORDER,
    requestDto,
    idOrder,
    step,
  };
};
