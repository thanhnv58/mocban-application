import * as types from "./types";

export const getAllClient = () => {
  return {
    type: types.GET_ALL_CLIENT
  };
};

export const loadMoreClient = () => {
  return {
    type: types.LOAD_MORE_CLIENT
  };
};
