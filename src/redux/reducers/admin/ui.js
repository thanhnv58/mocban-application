import * as UserManagementAct from "../../../actions/admin/user-management/types";

const initialState = {
  isLoading1: false,
  isLoading2: false,
  isLoading3: false,
  isLoading4: false,
  isLoading5: false,
  isShowUpdateUser: false,
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    case UserManagementAct.ACT_GET_ALL_USER:
      if (action.isLoading === 1) {
        return {
          ...state,
          isLoading1: true,
        };
      } else {
        return {
          ...state,
          isLoading2: true,
        };
      }
    case UserManagementAct.ACT_GET_ALL_USER_FAILED:
    case UserManagementAct.ACT_GET_ALL_USER_SUCCESS:
      if (action.isLoading === 1) {
        return {
          ...state,
          isLoading1: false,
        };
      } else {
        return {
          ...state,
          isLoading2: false,
        };
      }

    case UserManagementAct.ACT_CREATE_USER:
      return {
        isLoading1: true,
      };
    case UserManagementAct.ACT_CREATE_USER_FAILED:
    case UserManagementAct.ACT_CREATE_USER_SUCCESS:
      return {
        isLoading1: false,
      };

    case UserManagementAct.ACT_GET_USER_DETAIL:
      return {
        isLoading1: true,
      };
    case UserManagementAct.ACT_GET_USER_DETAIL_FAILED:
    case UserManagementAct.ACT_GET_USER_DETAIL_SUCCESS:
      return {
        isLoading1: false,
      };

    case UserManagementAct.ACT_SHOW_UPDATE_USER:
      return {
        isShowUpdateUser: true,
      };

    case UserManagementAct.ACT_UPDATE_USER:
      return {
        isLoading2: true,
      };
    case UserManagementAct.ACT_UPDATE_USER_FAILED:
      return {
        isLoading2: false,
      };
    case UserManagementAct.ACT_UPDATE_USER_SUCCESS:
      return {
        isLoading2: false,
        isShowUpdateUser: false,
      };

    case UserManagementAct.ACT_DELETE_USER:
      return {
        isLoading3: true,
      };
    case UserManagementAct.ACT_DELETE_USER_FAILED:
    case UserManagementAct.ACT_DELETE_USER_SUCCESS:
      return {
        isLoading3: false,
      };

    case UserManagementAct.ACT_RESET_USER_PASS:
      return {
        isLoading4: true,
      };
    case UserManagementAct.ACT_RESET_USER_PASS_FAILED:
    case UserManagementAct.ACT_RESET_USER_PASS_SUCCESS:
      return {
        isLoading4: false,
      };

    default:
      return { ...state };
  }
};

export default ui;
