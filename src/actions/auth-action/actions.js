import * as types from "./types";

export const logout = () => {
  localStorage.removeItem("MB_AUTH");
  return {
    type: types.ACT_LOG_OUT
  };
};

export const changePassword = requestDto => {
  return {
    type: types.CHANGE_PASSWORD,
    requestDto
  };
};

export const authenticate = (username, password) => {
  return {
    type: types.ACT_AUTHENTICATE,
    username,
    password
  };
};

export const actValidateToken = () => {
  return {
    type: types.VALIDATE_TOKEN
  };
};
