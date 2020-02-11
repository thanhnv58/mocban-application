import * as MainScreenActType from "../../../../actions/technician/main-screen-action/types";
import * as AuthActType from "../../../../actions/auth-action/types";

const initialState = null;

const notificationTechnician = (state = initialState, action) => {
  switch (action.type) {
    case MainScreenActType.GET_NOTIFICATION_TECHNICIAN_SUCCESS:
      let { notificationTechnicianRes } = action;
      state = notificationTechnicianRes;

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

export default notificationTechnician;
