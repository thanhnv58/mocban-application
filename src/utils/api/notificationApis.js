import * as apiClient from "./apiClient";
import { BASE_URL } from "../../configs/serviceConfig";

const PAGE_SIZE = 20;

export const getNotification = pageIndex => {
  let url = `${BASE_URL}/api/v1/get-notification?page=${pageIndex}&size=${PAGE_SIZE}&sort=id,desc`;

  return apiClient.callApiGet(url);
};

export const getNotificationOfAccountant = () => {
  let url = `${BASE_URL}/api/v1/accountant/get-notification`;

  return apiClient.callApiGet(url);
};

export const getNotificationOfTechnician = () => {
  let url = `${BASE_URL}/api/v1/technician/get-notification`;

  return apiClient.callApiGet(url);
};

export const removeNotification = notificationId => {
  let url = `${BASE_URL}/api/v1/remove-notification/${notificationId}`;

  return apiClient.callApiPost(url);
};
