import * as apiClient from "./apiClient";
import { BASE_URL } from "./../../configs/serviceConfig";

export const authenticate = (username, password) => {
  const url = `${BASE_URL}/api/v1/authenticate`;

  let auth = {
    username,
    password
  };

  return apiClient.callApiPost(url, null, auth);
};

export const validateToken = () => {
  const url = `${BASE_URL}/api/v1/login-profile`;

  return apiClient.callApiGet(url, null, null);
};

export const changePassword = requestDto => {
  const url = `${BASE_URL}/api/v1/change-password`;

  return apiClient.callApiPost(url, requestDto);
};
