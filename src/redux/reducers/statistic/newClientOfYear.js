import * as StatisticActionType from "../../../actions/statistic-action/types";
import * as AuthActType from "../../../actions/common-user-action/types";

const initialState = null;

const newClientOfYear = (state = initialState, action) => {
  switch (action.type) {
    case StatisticActionType.GET_NEW_CLIENT_OF_YEAR_SUCCESS:
      let { newClientOfYearRes } = action;
      state = newClientOfYearRes;
      return state;
    case AuthActType.ACT_LOG_OUT:
      return null;
    default:
      return state;
  }
};

export default newClientOfYear;
