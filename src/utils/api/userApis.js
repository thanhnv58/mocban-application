import * as apiClient from "./apiClient";
import { BASE_URL } from "./../../configs/serviceConfig";

const PAGE_SIZE = 60;

export const createUser = user => {
  const url = `${BASE_URL}/api/v1/create-user`;

  return apiClient.callApiPost(url, user, null, null);
};

export const getAllUser = (pageIndex, role) => {
  let url = null;
  if (role) {
    url = `${BASE_URL}/api/v1/list-users?role=${role}&page=${pageIndex}&size=${PAGE_SIZE}&sort=id,desc`;
  } else {
    url = `${BASE_URL}/api/v1/list-users?page=${pageIndex}&size=${PAGE_SIZE}&sort=id,desc`;
  }

  return apiClient.callApiGet(url);
};

export const getUserInfo = (username = "", phoneNumber = "", email = "") => {
  const url = `${BASE_URL}/api/v1/user-profile`;

  return apiClient.callApiPost(
    url,
    { username, phoneNumber, email },
    null,
    null
  );
};
