import * as TransactionScreenActType from "../../../../actions/accountant/transaction-screen/types";
import * as MainScreenActType from "../../../../actions/common-user-action/types";
import { findIndexOfElementInArray } from "./../../../../utils/arrayUtils";

const initialState = {
  totalElements: 0,
  totalPage: 0,
  currentPage: -1,
  currentTotal: -1,
  transactions: []
};

const pageTransactionNeedValidate = (state = initialState, action) => {
  switch (action.type) {
    case TransactionScreenActType.GET_TRANSACTION_NEED_VALIDATE_SUCCESS:
      let { pageTransactionNeedValidateRes } = action;

      return {
        ...state,
        totalElements: pageTransactionNeedValidateRes.totalElements,
        totalPage: pageTransactionNeedValidateRes.totalPage,
        currentPage: pageTransactionNeedValidateRes.currentPage,
        currentTotal: pageTransactionNeedValidateRes.elements.length,
        transactions: pageTransactionNeedValidateRes.elements
      };
    case TransactionScreenActType.GET_TRANSACTION_NEED_VALIDATE_NO_CONTENT:
      return {
        ...state,
        totalElements: 0,
        totalPage: 0,
        currentPage: 0,
        currentTotal: 0,
        transactions: []
      };
    case TransactionScreenActType.LOAD_MORE_TRANSACTION_NEED_VALIDATE_SUCCESS:
      let { pageLoadMoreTransactionNeedValidate } = action;

      state.transactions.push(...pageLoadMoreTransactionNeedValidate.elements);

      return {
        ...state,
        totalElements: pageLoadMoreTransactionNeedValidate.totalElements,
        totalPage: pageLoadMoreTransactionNeedValidate.totalPage,
        currentPage: pageLoadMoreTransactionNeedValidate.currentPage,
        currentTotal: state.transactions.length
      };

    case TransactionScreenActType.VALIDATE_TRANSACTION_OK_SUCCESS:
      let { validateRes } = action;

      let index = findIndexOfElementInArray(state.transactions, t => {
        return t.id === validateRes.id;
      });

      if (index !== -1) {
        state.transactions.splice(index, 1);

        return {
          ...state,
          totalElements: state.totalElements - 1,
          totalPage: state.totalPage,
          currentPage: state.currentPage,
          currentTotal: state.transactions.length
        };
      } else {
        return {
          ...state
        };
      }
    case MainScreenActType.ACT_LOG_OUT:
      state = initialState;
      return {
        ...state
      };
    default:
      return { ...state };
  }
};

export default pageTransactionNeedValidate;
