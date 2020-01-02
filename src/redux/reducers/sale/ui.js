import * as ClientScreenActionType from "./../../../actions/sale/client-screen-action/types";
import * as OrderScreenActionType from "./../../../actions/sale/order-screen-action/types";
import * as MainScreenActionType from "./../../../actions/sale/main-screen-action/types";

const initialState = {
  isLoading1: false,
  isLoading2: false,
  isLoading3: false,
  isLoading4: false,
  isLoading5: false,
  needConfirm1: false
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    case MainScreenActionType.GET_STATISTIC_OF_MONTH:
      return {
        ...state,
        isLoading1: true
      };
    case MainScreenActionType.GET_STATISTIC_OF_MONTH_FAILED:
    case MainScreenActionType.GET_STATISTIC_OF_MONTH_SUCCESS:
      return {
        ...state,
        isLoading1: false
      };
    case MainScreenActionType.GET_STATISTIC_OF_YEAR:
      return {
        ...state,
        isLoading2: true
      };
    case MainScreenActionType.GET_STATISTIC_OF_YEAR_FAILED:
    case MainScreenActionType.GET_STATISTIC_OF_YEAR_SUCCESS:
      return {
        ...state,
        isLoading2: false
      };

    case ClientScreenActionType.ACT_CREATE_CLIENT:
      return {
        ...state,
        isLoading1: true
      };
    case ClientScreenActionType.ACT_CREATE_CLIENT_FAILED:
    case ClientScreenActionType.ACT_CREATE_CLIENT_SUCCESS:
      return {
        ...state,
        isLoading1: false
      };

    case ClientScreenActionType.ACT_FETCH_LIST_CLIENT:
      return {
        ...state,
        isLoading1: true
      };
    case ClientScreenActionType.ACT_FETCH_LIST_CLIENT_FAILED:
    case ClientScreenActionType.ACT_FETCH_LIST_CLIENT_NO_CONTENT:
    case ClientScreenActionType.ACT_FETCH_LIST_CLIENT_SUCCESS:
      return {
        ...state,
        isLoading1: false
      };

    case OrderScreenActionType.ACT_CREATE_ORDER:
      return {
        ...state,
        isLoading1: true
      };
    case OrderScreenActionType.ACT_CREATE_ORDER_FAILED:
      return {
        ...state,
        isLoading1: false
      };
    case OrderScreenActionType.ACT_CREATE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading1: false,
        needConfirm1: true
      };
    case OrderScreenActionType.ACT_CONFIRM_CREATE_ORDER_SUCCESS:
      return {
        needConfirm1: false
      };

    case OrderScreenActionType.ACT_SEARCH_BY_CLIENT_ID:
      return {
        ...state,
        isLoading1: true
      };
    case OrderScreenActionType.ACT_SEARCH_BY_CLIENT_ID_FAILED:
    case OrderScreenActionType.ACT_SEARCH_BY_CLIENT_ID_NO_CONTENT:
    case OrderScreenActionType.ACT_SEARCH_BY_CLIENT_ID_SUCCESS:
      return {
        ...state,
        isLoading1: false
      };

    case OrderScreenActionType.ACT_FETCH_LIST_ORDER:
      return {
        ...state,
        isLoading1: true
      };
    case OrderScreenActionType.ACT_FETCH_LIST_ORDER_FAILED:
    case OrderScreenActionType.ACT_FETCH_LIST_ORDER_NO_CONTENT:
    case OrderScreenActionType.ACT_FETCH_LIST_ORDER_SUCCESS:
      return {
        ...state,
        isLoading1: false
      };

    case OrderScreenActionType.ACT_GET_ORDER_DETAIL:
      return {
        ...state,
        isLoading2: true
      };
    case OrderScreenActionType.ACT_GET_ORDER_DETAIL_FAILED:
    case OrderScreenActionType.ACT_GET_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading2: false
      };

    case OrderScreenActionType.GET_TRANSACTION_INCOME_OF_ORDER:
      return {
        ...state,
        isLoading3: true
      };
    case OrderScreenActionType.GET_TRANSACTION_INCOME_OF_ORDER_FAILED:
    case OrderScreenActionType.GET_TRANSACTION_INCOME_OF_ORDER_NO_CONTENT:
    case OrderScreenActionType.GET_TRANSACTION_INCOME_OF_ORDER_SUCCESS:
      return {
        ...state,
        isLoading3: false
      };

    case OrderScreenActionType.ACT_DO_TRANSACTION:
      return {
        ...state,
        isLoading4: true
      };
    case OrderScreenActionType.ACT_DO_TRANSACTION_FAILED:
    case OrderScreenActionType.ACT_DO_TRANSACTION_SUCCESS:
      return {
        ...state,
        isLoading4: false
      };
    default:
      return { ...state };
  }
};

export default ui;
