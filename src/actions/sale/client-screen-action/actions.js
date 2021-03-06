import * as types from "./types";

export const fetchListClient = pageIndex => {
  return {
    type: types.ACT_FETCH_LIST_CLIENT
  };
};

export const loadMoreClient = () => {
  return {
    type: types.ACT_LOAD_MORE_CLIENT
  };
};

export const createClient = requestDto => {
  return {
    type: types.ACT_CREATE_CLIENT,
    requestDto
  };
};
