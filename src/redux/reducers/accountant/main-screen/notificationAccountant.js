import * as MainScreenActType from "../../../../actions/accountant/main-screen-action/types";
import * as AuthActType from "../../../../actions/auth-action/types";

const initialState = null;

const notificationAccountant = (state = initialState, action) => {
  switch (action.type) {
    case MainScreenActType.GET_NOTIFICATION_ACCOUNTANT_SUCCESS:
      let { notificationAccountantRes } = action;
      state = notificationAccountantRes;

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

export default notificationAccountant;
