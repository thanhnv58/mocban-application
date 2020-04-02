import * as MainScreenActType from "../../../../actions/sale/main-screen-action/types";
import * as AuthActType from "./../../../../actions/common-user-action/types";

const initialState = null;

const statisticOfYear = (state = initialState, action) => {
  switch (action.type) {
    case MainScreenActType.GET_STATISTIC_OF_YEAR_SUCCESS:
      let { statisticOfYear } = action;
      state = statisticOfYear;

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

export default statisticOfYear;

// {
//   "numberOfDesignOrder": 11,
//   "numberOfProductionOrder": 0,
//   "amountOfYear": 109022232,
//   "designOrders": [
//       null,
//       11,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null
//   ],
//   "productionOrders": [
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null
//   ],
//   "amounts": [
//       null,
//       109022232,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null,
//       null
//   ]
// }
