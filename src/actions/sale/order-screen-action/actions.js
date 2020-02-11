import * as types from "./types";

export const createOrder = requestDto => {
  return {
    type: types.ACT_CREATE_ORDER,
    requestDto
  };
};

export const getOrderOfClient = clientUsername => {
  return {
    type: types.GET_ORDER_OF_CLIENT,
    clientUsername
  };
};

export const fetchListOrder = () => {
  return {
    type: types.ACT_FETCH_LIST_ORDER
  };
};

export const loadMoreListOrder = () => {
  return {
    type: types.LOAD_MORE_LIST_ORDER
  };
};

export const getOrderDetail = orderId => {
  return {
    type: types.ACT_GET_ORDER_DETAIL,
    orderId
  };
};

export const createTransaction = requestDto => {
  return {
    type: types.ACT_DO_TRANSACTION,
    requestDto
  };
};

export const getTransactionIncome = orderId => {
  return {
    type: types.GET_TRANSACTION_INCOME_OF_ORDER,
    orderId
  };
};

export const confirmCreateOrderSuccess = () => {
  return {
    type: types.ACT_CONFIRM_CREATE_ORDER_SUCCESS
  };
};

export const updateClientRequest = requestBody => {
  return {
    type: types.UPDATE_CLIENT_REQUEST,
    requestBody
  };
};
