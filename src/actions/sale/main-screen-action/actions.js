import * as types from "./types";

export const getStisticOfMonth = (month, year) => {
  return {
    type: types.GET_STATISTIC_OF_MONTH,
    month,
    year
  };
};

export const getStisticOfYear = year => {
  return {
    type: types.GET_STATISTIC_OF_YEAR,
    year
  };
};
