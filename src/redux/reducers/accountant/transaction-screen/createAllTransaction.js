import * as TransactionScreenActType from "../../../../actions/accountant/transaction-screen/types";
import * as MainScreenActType from "../../../../actions/auth-action/types";

const initialState = {
  isSuccess: false
};

const createAllTransaction = (state = initialState, action) => {
  switch (action.type) {
    case TransactionScreenActType.CREATE_ALL_TRANSACTION_FAILED:
      return {
        ...state,
        isSuccess: false
      };
    case TransactionScreenActType.CREATE_ALL_TRANSACTION_SUCCESS:
      return {
        ...state,
        isSuccess: true
      };
    case TransactionScreenActType.CREATE_ALL_TRANSACTION_CONFIRM:
      return {
        ...state,
        isSuccess: false
      };
    case MainScreenActType.ACT_LOG_OUT:
      state = initialState;
      return {
        ...state
      };
    default:
      return { ...state };
  }
};

export default createAllTransaction;
