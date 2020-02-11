import * as types from "./types";

export const createUser = user => {
  return {
    type: types.CREATE_USER,
    user
  };
};

export const getAllUser = () => {
  return {
    type: types.GET_ALL_USER
  };
};

export const loadMoreUser = () => {
  return {
    type: types.LOAD_MORE_LIST_USER
  };
};

export const getUserDetail = username => {
  return {
    type: types.GET_USER_DETAIL,
    username
  };
};

export const updateUser = user => {
  return {
    type: types.UPDATE_USER,
    user
  };
};

export const getPassword = requestDto => {
  return {
    type: types.GET_PASSWORD,
    requestDto
  };
};
