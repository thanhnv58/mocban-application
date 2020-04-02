import * as UserScreenActType from "../../../../actions/manager/user-screen-action/types";
import * as MainScreenActType from "../../../../actions/common-user-action/types";

const initialState = null;

const userDetail = (state = initialState, action) => {
  switch (action.type) {
    case UserScreenActType.GET_USER_DETAIL_SUCCESS:
      let { userDetailRes } = action;
      state = userDetailRes;

      return {
        ...state
      };

    case UserScreenActType.UPDATE_USER_SUCCESS:
      let { updateUserRes } = action;

      if (state && state.id === updateUserRes.id) {
        state = updateUserRes;
      }

      return {
        ...state
      };

    case UserScreenActType.GET_PASSWORD_SUCCESS:
      let { getPasswordRes } = action;
      if (state && state.username === getPasswordRes.username) {
        return {
          ...state,
          password: getPasswordRes.password
        };
      } else {
        return {
          ...state
        };
      }

    case MainScreenActType.ACT_LOG_OUT:
      state = initialState;
      return state;
    default:
      return state;
  }
};

export default userDetail;
