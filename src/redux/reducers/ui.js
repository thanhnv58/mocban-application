import * as UserScreenActType from "./../../actions/user-screen-action/types";
import * as AuthActType from "../../actions/auth-action/types";
import * as ProjectActType from "../../actions/project-screen-action/types";
import * as TransactionActType from "../../actions/transaction-action/types";
import * as ClientScreenActType from "../../actions/sale/client-screen-action/types";

const initialState = {
  isLogin: false,
  isValidateToken: false,

  isCreateUserFormSubmit: false,
  isShowCreateUserForm: false,
  isLoadMoreUser: false,
  isLoadUserInfo: false,
  isCreateProjectFormSubmit: false,
  isFetchProjectDetail: false,
  isUpdateProjectInfo: false,
  isChangePhase: false,
  isConfirmWork: false,
  isUpdateProjectDetail: false,
  isCloseProject: false,
  isLoadListProject: false,
  isLoadTransactionProject: false,
  isSaveAllTransaction: false,
  isFetchListClient: false
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    case AuthActType.ACT_AUTHENTICATE:
      return {
        ...state,
        isLogin: true
      };

    case AuthActType.ACT_AUTHENTICATE_FAILED:
    case AuthActType.ACT_AUTHENTICATE_SUCCESS:
      return {
        ...state,
        isLogin: true
      };

    case AuthActType.VALIDATE_TOKEN:
      return {
        ...state,
        isValidateToken: true
      };
    case AuthActType.VALIDATE_TOKEN_FAILED:
    case AuthActType.VALIDATE_TOKEN_SUCCESS:
      return {
        ...state,
        isValidateToken: false
      };

    case UserScreenActType.ACT_CREATE_USER:
      return {
        ...state,
        isCreateUserFormSubmit: true
      };
    case UserScreenActType.ACT_CREATE_USER_FAILED:
      return {
        ...state,
        isCreateUserFormSubmit: false
      };
    case UserScreenActType.ACT_CREATE_USER_SUCCESS:
      return {
        ...state,
        isCreateUserFormSubmit: false,
        isShowCreateUserForm: false
      };
    case UserScreenActType.ACT_FETCH_USER:
      return {
        ...state,
        isLoadMoreUser: true
      };
    case UserScreenActType.ACT_FETCH_USER_FAILED:
    case UserScreenActType.ACT_FETCH_USER_SUCCESS:
      return { ...state, isLoadMoreUser: false };

    case AuthActType.ACT_LOG_OUT:
      state = initialState;
      return {
        ...state
      };
    case ProjectActType.GET_USER_INFO:
      return {
        ...state,
        isLoadUserInfo: true
      };
    case ProjectActType.GET_USER_INFO_SUCCES:
    case ProjectActType.GET_USER_INFO_FAILED:
      return {
        ...state,
        isLoadUserInfo: false
      };
    case ProjectActType.CREATE_PROJECT:
      return {
        ...state,
        isCreateProjectFormSubmit: true
      };
    case ProjectActType.CREATE_PROJECT_FAILED:
    case ProjectActType.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        isCreateProjectFormSubmit: false
      };
    case ProjectActType.FETCH_PROJECT_DETAIL:
      return {
        ...state,
        isFetchProjectDetail: true
      };
    case ProjectActType.FETCH_PROJECT_DETAIL_FAILED:
    case ProjectActType.FETCH_PROJECT_DETAIL_NOT_FOUND:
    case ProjectActType.FETCH_PROJECT_DETAIL_SUCCESS:
      return {
        ...state,
        isFetchProjectDetail: false
      };
    case ProjectActType.UPDATE_PROJECT_INFO:
      return {
        ...state,
        isUpdateProjectInfo: true
      };
    case ProjectActType.UPDATE_PROJECT_INFO_FAILED:
    case ProjectActType.UPDATE_PROJECT_INFO_SUCCESS:
      return {
        ...state,
        isUpdateProjectInfo: false
      };
    case ProjectActType.CHANGE_PHASE:
      return {
        ...state,
        isChangePhase: true
      };
    case ProjectActType.CHANGE_PHASE_FAILED:
    case ProjectActType.CHANGE_PHASE_SUCCESS:
      return {
        ...state,
        isChangePhase: false
      };
    case ProjectActType.CONFIRM_WORK:
      return {
        ...state,
        isConfirmWork: true
      };
    case ProjectActType.CONFIRM_WORK_FAILED:
    case ProjectActType.CONFIRM_WORK_SUCCESS:
      return {
        ...state,
        isConfirmWork: false
      };
    case ProjectActType.UPDATE_PROJECT_DETAIL:
      return {
        ...state,
        isUpdateProjectDetail: true
      };
    case ProjectActType.UPDATE_PROJECT_DETAIL_FAILED:
    case ProjectActType.UPDATE_PROJECT_DETAIL_SUCCESS:
      return {
        ...state,
        isUpdateProjectDetail: false
      };
    case ProjectActType.CLOSE_PROJECT:
      return {
        ...state,
        isCloseProject: true
      };
    case ProjectActType.CLOSE_PROJECT_FAILED:
    case ProjectActType.CLOSE_PROJECT_SUCCESS:
      return {
        ...state,
        isCloseProject: false
      };
    case ProjectActType.FETCH_LIST_PROJECT:
      return {
        ...state,
        isLoadListProject: true
      };
    case ProjectActType.FETCH_LIST_PROJECT_FAILED:
    case ProjectActType.FETCH_LIST_PROJECT_NO_CONTENT:
    case ProjectActType.FETCH_LIST_PROJECT_SUCCESS:
      return {
        ...state,
        isLoadListProject: false
      };
    case ProjectActType.FETCH_LIST_PROJECT_OF_USER:
      return {
        ...state,
        isLoadListProject: true
      };
    case ProjectActType.FETCH_LIST_PROJECT_OF_USER_FAILED:
    case ProjectActType.FETCH_LIST_PROJECT_OF_USER_NO_CONTENT:
    case ProjectActType.FETCH_LIST_PROJECT_OF_USER_SUCCESS:
      return {
        ...state,
        isLoadListProject: false
      };

    case TransactionActType.FETCH_TRANSACTION_PROJECT:
      return {
        ...state,
        isLoadTransactionProject: true
      };
    case TransactionActType.FETCH_TRANSACTION_PROJECT_FAILED:
    case TransactionActType.FETCH_TRANSACTION_PROJECT_SUCCESS:
      return {
        ...state,
        isLoadTransactionProject: false
      };
    case TransactionActType.SAVE_ALL_TRANSACTION:
      return {
        ...state,
        isSaveAllTransaction: true
      };
    case TransactionActType.SAVE_ALL_TRANSACTION_FAILED:
    case TransactionActType.SAVE_ALL_TRANSACTION_SUCCESS:
      return {
        ...state,
        isSaveAllTransaction: false
      };
    case ClientScreenActType.ACT_FETCH_LIST_CLIENT:
      return {
        ...state,
        isFetchListClient: true
      };
    case ClientScreenActType.ACT_FETCH_LIST_CLIENT_FAILED:
    case ClientScreenActType.ACT_FETCH_LIST_CLIENT_NO_CONTENT:
    case ClientScreenActType.ACT_FETCH_LIST_CLIENT_SUCCESS:
      return {
        ...state,
        isFetchListClient: false
      };
    default:
      return { ...state };
  }
};

export default ui;
