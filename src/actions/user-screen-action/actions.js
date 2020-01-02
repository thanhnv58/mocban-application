import * as types from "./types";

export const fetchUser = page => {
  return {
    type: types.ACT_FETCH_USER,
    page
  };
};

export const createUser = user => {
  return {
    type: types.ACT_CREATE_USER,
    payload: {
      user
    }
  };
};

export const createProjectForUser = user => {
  return {
    type: types.ACT_CREATE_PROJECT_FOR_USER,
    user
  };
};
