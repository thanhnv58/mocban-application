import * as AuthActTypes from "../../actions/auth-action/types";
import moment from "moment";
import { getLocalToken } from "./../../utils/helpers";

const initialState = {
  isAuthenticated: null,
  token: null,
  expiredTime: null,
  role: null,
  username: null
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AuthActTypes.VALIDATE_TOKEN_FAILED:
      return {
        ...state,
        isAuthenticated: false
      };
    case AuthActTypes.VALIDATE_TOKEN_SUCCESS:
      let { validateUser } = action;
      const authObj = getLocalToken();

      return {
        ...state,
        isAuthenticated: true,
        token: authObj.token,
        expiredTime: moment(authObj.expiredTime).format("YYYY-MM-DDTHH:mm:ssZ"),
        role: validateUser.role,
        username: validateUser.username
      };
    case AuthActTypes.ACT_AUTHENTICATE_SUCCESS:
      let { authResponse, username } = action;
      let { token, duration, role } = authResponse;

      let expiredTime = moment()
        .add(duration - 60, "s")
        .format("YYYY-MM-DDTHH:mm:ssZ");

      return {
        ...state,
        isAuthenticated: true,
        token,
        expiredTime,
        role,
        username
      };
    case AuthActTypes.ACT_LOG_OUT:
      state = initialState;
      return {
        ...state
      };
    default:
      return { ...state };
  }
};

export default auth;
