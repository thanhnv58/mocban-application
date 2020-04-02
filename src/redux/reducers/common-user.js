import * as CommonUserAct from "../../actions/common-user-action/types";
import moment from "moment";
import { helpers_GetLocalToken } from "../../utils/helpers";

const initialState = {
  ui_isLogin: false,
  ui_isValidateToken: false,
  isChangePassword: false,
  isAuthenticated: null,
  token: null,
  expiredTime: null,
  listRole: [],
  username: null
};

const commonUser = (state = initialState, action) => {
  switch (action.type) {
    case CommonUserAct.ACT_AUTHENTICATE:
      return {
        ...state,
        ui_isLogin: true
      };

    case CommonUserAct.ACT_AUTHENTICATE_FAILED:
      return {
        ...state,
        ui_isLogin: false
      };

    case CommonUserAct.ACT_AUTHENTICATE_SUCCESS:
      let { authResponse, username } = action;
      let { token, duration, listRole } = authResponse;

      let expiredTime = moment()
        .add(duration - 60, "s")
        .format("YYYY-MM-DDTHH:mm:ssZ");

      return {
        ...state,
        ui_isLogin: false,
        isAuthenticated: true,
        token,
        expiredTime,
        listRole: [...listRole],
        username
      };

    case CommonUserAct.VALIDATE_TOKEN:
      return {
        ...state,
        ui_isValidateToken: true
      };

    case CommonUserAct.VALIDATE_TOKEN_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        ui_isValidateToken: false
      };
    case CommonUserAct.VALIDATE_TOKEN_SUCCESS:
      let { validateTokenRes } = action;
      const authObj = helpers_GetLocalToken();

      return {
        ...state,
        ui_isValidateToken: false,
        isAuthenticated: true,
        token: authObj.token,
        expiredTime: moment(authObj.expiredTime).format("YYYY-MM-DDTHH:mm:ssZ"),
        listRole: validateTokenRes.listRole,
        username: validateTokenRes.username
      };

    case CommonUserAct.CHANGE_PASSWORD:
      return {
        ...state,
        isChangePassword: true
      };
    case CommonUserAct.CHANGE_PASSWORD_FAILED:
    case CommonUserAct.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isChangePassword: false
      };
    case CommonUserAct.ACT_LOG_OUT:
      state = initialState;
      return {
        ...state
      };
    default:
      return { ...state };
  }
};

export default commonUser;
