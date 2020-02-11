import * as TransactionScreenActType from "../../../../actions/accountant/transaction-screen/types";
import * as MainScreenActType from "../../../../actions/auth-action/types";

const initialState = {
  totalElements: 0,
  totalPage: 0,
  currentPage: -1,
  currentTotal: -1,
  transactions: []
};

const pageSearchTransaction = (state = initialState, action) => {
  switch (action.type) {
    case TransactionScreenActType.SEARCH_TRANSACTION_SUCCESS:
      let { pageSearchTransaction } = action;

      return {
        ...state,
        totalElements: pageSearchTransaction.totalElements,
        totalPage: pageSearchTransaction.totalPage,
        currentPage: pageSearchTransaction.currentPage,
        currentTotal: pageSearchTransaction.elements.length,
        transactions: pageSearchTransaction.elements
      };
    case TransactionScreenActType.SEARCH_TRANSACTION_NO_CONTENT:
      return {
        ...state,
        totalElements: 0,
        totalPage: 0,
        currentPage: 0,
        currentTotal: 0,
        transactions: []
      };
    case TransactionScreenActType.LOAD_MORE_SEARCH_TRANSACTION_SUCCESS:
      let { pageLoadMoreSearchTransaction } = action;

      state.transactions.push(...pageLoadMoreSearchTransaction.elements);

      return {
        ...state,
        totalElements: pageLoadMoreSearchTransaction.totalElements,
        totalPage: pageLoadMoreSearchTransaction.totalPage,
        currentPage: pageLoadMoreSearchTransaction.currentPage,
        currentTotal: state.transactions.length
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

export default pageSearchTransaction;
