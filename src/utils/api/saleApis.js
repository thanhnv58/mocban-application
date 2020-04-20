import * as apiClient from "./apiClient";
import { BASE_URL } from "../../configs/serviceConfig";

export const createClient = (requestDto) => {
  const url = `${BASE_URL}/api/v1/sale/create-client`;

  return apiClient.callApiPost(url, requestDto, null, null);
};

export const updateClient = (idClient, requestDto) => {
  const url = `${BASE_URL}/api/v1/sale/update-client/${idClient}`;

  return apiClient.callApiPost(url, requestDto, null, null);
};

export const getAllClient = (pageIndex, size, search, status) => {
  let url = `${BASE_URL}/api/v1/sale/get-all-client?page=${pageIndex}&size=${size}&search=${search}&status=${status}`;

  return apiClient.callApiGet(url);
};

export const getClientDetail = (idClient) => {
  const url = `${BASE_URL}/api/v1/sale/get-client/${idClient}`;

  return apiClient.callApiGet(url);
};

// Order management api
export const getAllOrder = (pageIndex, size, status) => {
  let url = `${BASE_URL}/api/v1/sale/get-all-order?page=${pageIndex}&size=${size}&status=${status}`;

  return apiClient.callApiGet(url);
};

export const createOrderDesign = (idClient, requestDto) => {
  const url = `${BASE_URL}/api/v1/sale/${idClient}/create-order-design`;

  return apiClient.callApiPost(url, requestDto, null, null);
};

export const createOrderProduct = (idClient, requestDto) => {
  const url = `${BASE_URL}/api/v1/sale/${idClient}/create-order-product`;

  return apiClient.callApiPost(url, requestDto, null, null);
};

export const getOrderDetail = (idOrder) => {
  const url = `${BASE_URL}/api/v1/sale/order/${idOrder}`;

  return apiClient.callApiGet(url);
};

export const updateOrder = (idOrder, requestDto) => {
  const url = `${BASE_URL}/api/v1/sale/update-order/${idOrder}`;

  return apiClient.callApiPost(url, requestDto, null, null);
};

export const paymentOrder = (idOrder, requestDto) => {
  const url = `${BASE_URL}/api/v1/sale/payment-order/${idOrder}`;

  return apiClient.callApiPost(url, requestDto, null, null);
};
