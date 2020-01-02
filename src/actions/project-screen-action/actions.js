import * as types from "./types";

export const getUserInfo = (username, phoneNumber, email) => {
  return {
    type: types.GET_USER_INFO,
    username,
    phoneNumber,
    email
  };
};

export const clearUserInfo = () => {
  return {
    type: types.CLEAR_USER_INFO
  };
};

export const createProject = requestDto => {
  return {
    type: types.CREATE_PROJECT,
    requestDto
  };
};

export const createProjectClear = () => {
  return {
    type: types.CREATE_PROJECT_CLEAR
  };
};

export const fetchProjectDetail = projectId => {
  return {
    type: types.FETCH_PROJECT_DETAIL,
    projectId
  };
};

export const updateProjectInfo = requestDto => {
  return {
    type: types.UPDATE_PROJECT_INFO,
    requestDto
  };
};

export const changePhase = requestDto => {
  return {
    type: types.CHANGE_PHASE,
    requestDto
  };
};

export const confirmWork = (requestDto, phase) => {
  return {
    type: types.CONFIRM_WORK,
    requestDto,
    phase
  };
};

export const updateProjectDetail = requestDto => {
  return {
    type: types.UPDATE_PROJECT_DETAIL,
    requestDto
  };
};

export const closeProject = requestDto => {
  return {
    type: types.CLOSE_PROJECT,
    requestDto
  };
};

export const fetchListProject = () => {
  return {
    type: types.FETCH_LIST_PROJECT
  };
};

export const fetchListProjectOfUser = userId => {
  return {
    type: types.FETCH_LIST_PROJECT_OF_USER,
    userId
  };
};
