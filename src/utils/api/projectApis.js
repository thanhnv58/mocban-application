import * as apiClient from "./apiClient";
import { BASE_URL } from "../../configs/serviceConfig";

const DEFAULT_SIZE = 50;

export const createProject = requestDto => {
  const url = `${BASE_URL}/api/v1/create-project`;

  return apiClient.callApiPost(url, requestDto, null, null);
};

export const updateProjectInfo = requestDto => {
  const url = `${BASE_URL}/api/v1/update-project`;

  return apiClient.callApiPost(url, requestDto, null, null);
};

export const changePhase = requestDto => {
  const url = `${BASE_URL}/api/v1/request-phase`;

  return apiClient.callApiPost(url, requestDto, null, null);
};

export const confirmWork = requestDto => {
  const url = `${BASE_URL}/api/v1/confirm-work`;

  return apiClient.callApiPost(url, requestDto, null, null);
};

export const updateProjectDetail = requestDto => {
  const url = `${BASE_URL}/api/v1/update-project-detail`;

  return apiClient.callApiPost(url, requestDto, null, null);
};

export const closeProject = requestDto => {
  const url = `${BASE_URL}/api/v1/close-project`;

  return apiClient.callApiPost(url, requestDto, null, null);
};

export const fetchProjectDetail = projectId => {
  const url = `${BASE_URL}/api/v1/projects/${projectId}`;

  return apiClient.callApiGet(url);
};

export const fetchListProject = page => {
  const url = `${BASE_URL}/api/v1/list-projects?page=${page}&size=${DEFAULT_SIZE}&sort=id,desc`;

  return apiClient.callApiGet(url);
};

export const fetchListProjectOfUser = (page, userId) => {
  const url = `${BASE_URL}/api/v1/user/${userId}/list-projects?page=${page}&size=${DEFAULT_SIZE}&sort=id,desc`;

  return apiClient.callApiGet(url);
};
