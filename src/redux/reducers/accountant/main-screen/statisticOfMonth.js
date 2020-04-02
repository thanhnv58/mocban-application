import * as MainScreenActType from "../../../../actions/sale/main-screen-action/types";
import * as AuthActType from "../../../../actions/common-user-action/types";

const initialState = null;

const statisticOfMonth = (state = initialState, action) => {
  switch (action.type) {
    case MainScreenActType.GET_STATISTIC_OF_MONTH_SUCCESS:
      let { statisticOfMonth } = action;
      state = statisticOfMonth;

      return {
        ...state
      };

    case AuthActType.ACT_LOG_OUT:
      state = initialState;
      return state;
    default:
      return state === null ? null : { ...state };
  }
};

export default statisticOfMonth;

// {
//   "numberOfDesignOrder": 11,
//   "numberOfProductionOrder": 0,
//   "amountOfMonth": 9022232
// }
