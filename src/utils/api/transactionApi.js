import * as apiClient from "./apiClient";
import { BASE_URL } from "../../configs/serviceConfig";
import * as TransactionType from "../../constants/TransactionType";

const DEFAULT_SIZE = 10;

export const fetchTransactionProject = projectId => {
  const url = `${BASE_URL}/api/v1/project/${projectId}/transaction`;

  return apiClient.callApiGet(url, null, null, null);
};

export const saveAllTransaction = (type, requestDto) => {
  const url =
    type === TransactionType.INCOME
      ? `${BASE_URL}/api/v1/project/income`
      : `${BASE_URL}/api/v1/project/pay`;

  return apiClient.callApiPost(url, requestDto, null, null);
};

export const getTransactionIncomeOfOrder = (orderId, page) => {
  const url = `${BASE_URL}/api/v1/transaction/order/${orderId}?page=${page}&size=30&sort=id,asc&type=INCOME`;

  return apiClient.callApiGet(url, null, null, null);
};

export const createTransaction = requestDto => {
  const url = `${BASE_URL}/api/v1/create-transaction`;

  return apiClient.callApiPost(url, requestDto, null);
};

export const searchTransaction = (requestDto, page) => {
  const url = `${BASE_URL}/api/v1/search-transaction?page=${page}&size=${DEFAULT_SIZE}&sort=createdDate,asc`;

  return apiClient.callApiPost(url, requestDto, null);
};

export const getTransactionNeedValidate = page => {
  const url = `${BASE_URL}/api/v1/get-transaction-need-validate?page=${page}&size=${DEFAULT_SIZE}&sort=createdDate,asc`;

  return apiClient.callApiGet(url, null, null);
};

export const validateTransactionOk = transactionId => {
  const url = `${BASE_URL}/api/v1/validate-transaction/${transactionId}`;

  return apiClient.callApiPost(url, null, null);
};

export const getTransactionOfClient = (clientUsername, type, page) => {
  let url;

  if (type) {
    url = `${BASE_URL}/api/v1/transaction/client/${clientUsername}?page=${page}&size=${DEFAULT_SIZE}&sort=createdDate,asc&type=${type}`;
  } else {
    url = `${BASE_URL}/api/v1/transaction/client/${clientUsername}?page=${page}&size=${DEFAULT_SIZE}&sort=createdDate,asc`;
  }

  return apiClient.callApiGet(url, null, null, null);
};
