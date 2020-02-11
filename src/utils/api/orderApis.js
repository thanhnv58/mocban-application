import * as apiClient from "./apiClient";
import { BASE_URL } from "../../configs/serviceConfig";

const CLIENT_ORDER_LIST_DEFAULT_SIZE = 10;
const ORDER_LIST_DEFAULT_SIZE = 10;

export const createOrder = requestDto => {
  const url = `${BASE_URL}/api/v1/create-order`;

  return apiClient.callApiPost(url, requestDto);
};

export const getOrdersOfClient = (clientUsername, page) => {
  const url = `${BASE_URL}/api/v1/client/get-orders?page=${page}&size=${CLIENT_ORDER_LIST_DEFAULT_SIZE}&sort=id,desc&clientUsername=${clientUsername}`;

  return apiClient.callApiGet(url);
};

export const fetchListOrder = page => {
  const url = `${BASE_URL}/api/v1/client/get-orders?page=${page}&size=${ORDER_LIST_DEFAULT_SIZE}&sort=id,desc`;

  return apiClient.callApiGet(url);
};

export const getOrderDetail = orderId => {
  const url = `${BASE_URL}/api/v1/client/get-orders/${orderId}`;

  return apiClient.callApiGet(url);
};

export const updateProgress = requestBody => {
  const url = `${BASE_URL}/api/v1/update-progress`;

  return apiClient.callApiPost(url, requestBody);
};

export const updateItems = requestBody => {
  const url = `${BASE_URL}/api/v1/update-items`;

  return apiClient.callApiPost(url, requestBody);
};

export const updateClientRequest = requestBody => {
  const url = `${BASE_URL}/api/v1/update-client-request`;

  return apiClient.callApiPost(url, requestBody);
};
