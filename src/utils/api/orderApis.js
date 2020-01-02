import * as apiClient from "./apiClient";
import { BASE_URL } from "../../configs/serviceConfig";

const CLIENT_ORDER_LIST_DEFAULT_SIZE = 50;
const ORDER_LIST_DEFAULT_SIZE = 50;

export const createOrder = requestDto => {
  const url = `${BASE_URL}/api/v1/create-order`;

  return apiClient.callApiPost(url, requestDto, null);
};

export const searchOrderByClientId = (clientId, page) => {
  const url = `${BASE_URL}/api/v1/client/get-orders?page=${page}&size=${CLIENT_ORDER_LIST_DEFAULT_SIZE}&sort=id,desc&clientUsername=${clientId}`;

  return apiClient.callApiGet(url, null, null);
};

export const fetchListOrder = page => {
  const url = `${BASE_URL}/api/v1/client/get-orders?page=${page}&size=${ORDER_LIST_DEFAULT_SIZE}&sort=id,desc`;

  return apiClient.callApiGet(url, null, null);
};

export const getOrderDetail = orderId => {
  const url = `${BASE_URL}/api/v1/client/get-orders/${orderId}`;

  return apiClient.callApiGet(url, null, null);
};

export const doTransaction = requestDto => {
  const url = `${BASE_URL}/api/v1/order/transaction`;

  return apiClient.callApiPost(url, requestDto, null);
};
