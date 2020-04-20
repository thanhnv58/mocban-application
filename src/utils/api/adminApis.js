import * as apiClient from "./apiClient";
import { BASE_URL } from "../../configs/serviceConfig";

export const getAllUser = (pageIndex, size, search, role) => {
  let url = `${BASE_URL}/api/v1/admin/get-all-user?page=${pageIndex}&size=${size}&search=${search}&role=${role}`;

  return apiClient.callApiGet(url);
};

export const getUserDetail = (idUser) => {
  let url = `${BASE_URL}/api/v1/admin/get-user/${idUser}`;

  return apiClient.callApiGet(url);
};

export const createUser = (requestDto) => {
  let url = `${BASE_URL}/api/v1/admin/create-user`;

  return apiClient.callApiPost(url, requestDto, null, null);
};

export const updateClient = (idUser, requestDto) => {
  let url = `${BASE_URL}/api/v1/admin/update-user/${idUser}`;

  return apiClient.callApiPost(url, requestDto, null, null);
};

export const deleteUser = (idUser) => {
  let url = `${BASE_URL}/api/v1/admin/delete-user/${idUser}`;

  return apiClient.callApiPost(url, null, null, null);
};

export const resetUserPass = (idUser) => {
  let url = `${BASE_URL}/api/v1/admin/reset-user/${idUser}`;

  return apiClient.callApiPost(url, null, null, null);
};
