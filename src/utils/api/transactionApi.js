import * as apiClient from "./apiClient";
import { BASE_URL } from "../../configs/serviceConfig";
import * as TransactionType from "../../constants/TransactionType";

const DEFAULT_SIZE = 20;

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
  const url = `${BASE_URL}/api/v1/order/${orderId}/transaction/income?page=${page}&size=${DEFAULT_SIZE}&sort=id,asc`;

  return apiClient.callApiGet(url, null, null, null);
};
