import * as types from "./types";

export const getAllUser = (
  isLoading,
  pageIndex = 0,
  size = 10,
  search = "",
  role = ""
) => {
  return {
    type: types.ACT_GET_ALL_USER,
    pageIndex,
    search,
    role,
    size,
    isLoading,
  };
};

export const createUser = (requestDto) => {
  return {
    type: types.ACT_CREATE_USER,
    requestDto,
  };
};

export const getUserDetail = (idUser) => {
  return {
    type: types.ACT_GET_USER_DETAIL,
    idUser,
  };
};

export const updateUser = (idUser, requestDto) => {
  return {
    type: types.ACT_UPDATE_USER,
    requestDto,
    idUser,
  };
};

export const deleteUser = (idUser) => {
  return {
    type: types.ACT_DELETE_USER,
    idUser,
  };
};

export const resetUserPass = (idUser) => {
  return {
    type: types.ACT_RESET_USER_PASS,
    idUser,
  };
};

export const showUpdateUser = () => {
  return {
    type: types.ACT_SHOW_UPDATE_USER,
  };
};
