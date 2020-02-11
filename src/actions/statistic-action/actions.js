import * as types from "./types";

export const getInOutAmountOfYear = year => {
  return {
    type: types.GET_IN_OUT_AMOUNT_OF_YEAR,
    year
  };
};

export const getNewClientOfYear = year => {
  return {
    type: types.GET_NEW_CLIENT_OF_YEAR,
    year
  };
};
