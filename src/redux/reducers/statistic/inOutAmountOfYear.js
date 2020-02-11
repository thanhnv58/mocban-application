import * as StatisticActionType from "../../../actions/statistic-action/types";
import * as AuthActType from "../../../actions/auth-action/types";

const initialState = null;

const inOutAmountOfYear = (state = initialState, action) => {
  switch (action.type) {
    case StatisticActionType.GET_IN_OUT_AMOUNT_OF_YEAR_SUCCESS:
      let { inOutAmountOfYearRes } = action;
      state = inOutAmountOfYearRes;
      return state;
    case AuthActType.ACT_LOG_OUT:
      return null;
    default:
      return state;
  }
};

export default inOutAmountOfYear;
