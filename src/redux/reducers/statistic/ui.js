import * as StatisticActionType from "../../../actions/statistic-action/types";

const initialState = {
  isLoading1: false,
  isLoading2: false
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    case StatisticActionType.GET_IN_OUT_AMOUNT_OF_YEAR:
      return {
        ...state,
        isLoading1: true
      };
    case StatisticActionType.GET_IN_OUT_AMOUNT_OF_YEAR_FAILED:
    case StatisticActionType.GET_IN_OUT_AMOUNT_OF_YEAR_SUCCESS:
      return {
        ...state,
        isLoading1: false
      };

    case StatisticActionType.GET_NEW_CLIENT_OF_YEAR:
      return {
        ...state,
        isLoading2: true
      };
    case StatisticActionType.GET_NEW_CLIENT_OF_YEAR_FAILED:
    case StatisticActionType.GET_NEW_CLIENT_OF_YEAR_SUCCESS:
      return {
        ...state,
        isLoading2: false
      };

    default:
      return { ...state };
  }
};

export default ui;
