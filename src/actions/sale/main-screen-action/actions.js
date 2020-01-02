import * as types from "./types";

export const getStisticOfMonth = month => {
  return {
    type: types.GET_STATISTIC_OF_MONTH,
    month
  };
};

export const getStisticOfYear = year => {
  return {
    type: types.GET_STATISTIC_OF_YEAR,
    year
  };
};
