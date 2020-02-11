import * as UserScreenActType from "../../../actions/manager/user-screen-action/types";

const initialState = {
  isLoading1: false,
  isLoading2: false
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    case UserScreenActType.CREATE_USER:
      return {
        ...state,
        isLoading1: true
      };
    case UserScreenActType.CREATE_USER_FAILED:
    case UserScreenActType.CREATE_USER_SUCCESS:
      return {
        ...state,
        isLoading1: false
      };

    case UserScreenActType.GET_ALL_USER:
      return {
        ...state,
        isLoading1: true
      };
    case UserScreenActType.GET_ALL_USER_FAILED:
    case UserScreenActType.GET_ALL_USER_NO_CONTENT:
    case UserScreenActType.GET_ALL_USER_SUCCESS:
      return {
        ...state,
        isLoading1: false
      };
    case UserScreenActType.LOAD_MORE_LIST_USER:
      return {
        ...state,
        isLoading2: true
      };
    case UserScreenActType.LOAD_MORE_LIST_USER_FAILED:
    case UserScreenActType.LOAD_MORE_LIST_USER_SUCCESS:
      return {
        ...state,
        isLoading2: false
      };
    case UserScreenActType.GET_USER_DETAIL:
      return {
        ...state,
        isLoading1: true
      };
    case UserScreenActType.GET_USER_DETAIL_FAILED:
    case UserScreenActType.GET_USER_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading1: false
      };
    case UserScreenActType.UPDATE_USER:
      return {
        ...state,
        isLoading2: true
      };
    case UserScreenActType.UPDATE_USER_FAILED:
    case UserScreenActType.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading2: false
      };

    case UserScreenActType.GET_PASSWORD:
      return {
        ...state,
        isLoading3: true
      };
    case UserScreenActType.GET_PASSWORD_FAILED:
    case UserScreenActType.GET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading3: false
      };

    default:
      return { ...state };
  }
};

export default ui;
