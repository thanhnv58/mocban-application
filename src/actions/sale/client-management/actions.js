import * as types from "./types";

export const getAllClient = (
  isLoading,
  pageIndex = 0,
  size = 10,
  search = "",
  status = "HAVE_ORDER"
) => {
  return {
    type: types.ACT_GET_ALL_CLIENT,
    pageIndex,
    search,
    status,
    size,
    isLoading,
  };
};

export const createClient = (requestDto) => {
  return {
    type: types.ACT_CREATE_CLIENT,
    requestDto,
  };
};

export const updateClient = (idClient, requestDto) => {
  return {
    type: types.ACT_UPDATE_CLIENT,
    requestDto,
    idClient,
  };
};

export const getClientDetail = (idClient) => {
  return {
    type: types.ACT_GET_CLIENT_DETAIL,
    idClient,
  };
};
