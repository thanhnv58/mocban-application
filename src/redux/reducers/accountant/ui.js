import * as ClientScreenActType from "../../../actions/accountant/client-screen-action/types";
import * as TransactionScreenActType from "../../../actions/accountant/transaction-screen/types";
import * as MainScreenActType from "../../../actions/accountant/main-screen-action/types";

const initialState = {
  isLoading1: false,
  isLoading2: false,
  searchTransactionOption: null
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    case ClientScreenActType.GET_ALL_CLIENT:
      return {
        ...state,
        isLoading1: true
      };
    case ClientScreenActType.GET_ALL_CLIENT_FAILED:
    case ClientScreenActType.GET_ALL_CLIENT_NO_CONTENT:
    case ClientScreenActType.GET_ALL_CLIENT_SUCCESS:
      return {
        ...state,
        isLoading1: false
      };

    case ClientScreenActType.LOAD_MORE_CLIENT:
      return {
        ...state,
        isLoading2: true
      };
    case ClientScreenActType.LOAD_MORE_CLIENT_FAILED:
    case ClientScreenActType.LOAD_MORE_CLIENT_SUCCESS:
      return {
        ...state,
        isLoading2: false
      };

    case TransactionScreenActType.GET_TRANSACTION_OF_CLIENT:
      return {
        ...state,
        isLoading1: true
      };
    case TransactionScreenActType.GET_TRANSACTION_OF_CLIENT_FALIED:
    case TransactionScreenActType.GET_TRANSACTION_OF_CLIENT_SUCCESS:
      return {
        ...state,
        isLoading1: false
      };

    case TransactionScreenActType.CREATE_ALL_TRANSACTION:
      return {
        ...state,
        isLoading1: true
      };
    case TransactionScreenActType.CREATE_ALL_TRANSACTION_FAILED:
    case TransactionScreenActType.CREATE_ALL_TRANSACTION_SUCCESS:
      return {
        ...state,
        isLoading1: false
      };

    case TransactionScreenActType.SEARCH_TRANSACTION:
      let { searchOption } = action;
      return {
        ...state,
        isLoading1: true,
        searchTransactionOption: {
          ...searchOption
        }
      };
    case TransactionScreenActType.SEARCH_TRANSACTION_FAILED:
    case TransactionScreenActType.SEARCH_TRANSACTION_NO_CONTENT:
    case TransactionScreenActType.SEARCH_TRANSACTION_SUCCESS:
      return {
        ...state,
        isLoading1: false
      };
    case TransactionScreenActType.LOAD_MORE_SEARCH_TRANSACTION:
      return {
        ...state,
        isLoading2: true
      };
    case TransactionScreenActType.LOAD_MORE_SEARCH_TRANSACTION_FAILED:
    case TransactionScreenActType.LOAD_MORE_SEARCH_TRANSACTION_SUCCESS:
      return {
        ...state,
        isLoading2: false
      };
    case TransactionScreenActType.LOAD_MORE_CLIENT_TRANSACTION_LIST:
      return {
        ...state,
        isLoading2: true
      };
    case TransactionScreenActType.LOAD_MORE_CLIENT_TRANSACTION_LIST_FAILED:
    case TransactionScreenActType.LOAD_MORE_CLIENT_TRANSACTION_LIST_SUCCESS:
      return {
        ...state,
        isLoading2: false
      };
    case TransactionScreenActType.GET_TRANSACTION_NEED_VALIDATE:
      return {
        ...state,
        isLoading1: true
      };
    case TransactionScreenActType.GET_TRANSACTION_NEED_VALIDATE_FAILED:
    case TransactionScreenActType.GET_TRANSACTION_NEED_VALIDATE_NO_CONTENT:
    case TransactionScreenActType.GET_TRANSACTION_NEED_VALIDATE_SUCCESS:
      return {
        ...state,
        isLoading1: false
      };

    case TransactionScreenActType.LOAD_MORE_TRANSACTION_NEED_VALIDATE:
      return {
        ...state,
        isLoading2: true
      };
    case TransactionScreenActType.LOAD_MORE_TRANSACTION_NEED_VALIDATE_FAILED:
    case TransactionScreenActType.LOAD_MORE_TRANSACTION_NEED_VALIDATE_SUCCESS:
      return {
        ...state,
        isLoading2: false
      };
    case TransactionScreenActType.VALIDATE_TRANSACTION_OK:
      return {
        ...state,
        isLoading3: true
      };
    case TransactionScreenActType.VALIDATE_TRANSACTION_OK_FAILED:
    case TransactionScreenActType.VALIDATE_TRANSACTION_OK_SUCCESS:
      return {
        ...state,
        isLoading3: false
      };
    case MainScreenActType.GET_NOTIFICATION_ACCOUNTANT:
      return {
        ...state,
        isLoading1: true
      };
    case MainScreenActType.GET_NOTIFICATION_ACCOUNTANT_FAILED:
    case MainScreenActType.GET_NOTIFICATION_ACCOUNTANT_SUCCESS:
      return {
        ...state,
        isLoading1: false
      };
    default:
      return { ...state };
  }
};

export default ui;
