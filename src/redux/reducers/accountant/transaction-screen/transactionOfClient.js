import * as TransactionScreenActType from "../../../../actions/accountant/transaction-screen/types";
import * as MainScreenActType from "../../../../actions/common-user-action/types";

const initialState = {
  client: null,
  transactions: null
};

const transactionOfClient = (state = initialState, action) => {
  switch (action.type) {
    case TransactionScreenActType.GET_TRANSACTION_OF_CLIENT_SUCCESS:
      let { transactionOfClient } = action;
      return {
        ...state,
        client: transactionOfClient.client,
        transactions: transactionOfClient.transactions
      };
    case TransactionScreenActType.CREATE_ALL_TRANSACTION_SUCCESS:
      if (state.client === null) {
        return {
          ...state
        };
      }

      let { createAllRes } = action;
      let { clientUsername } = createAllRes;
      if (clientUsername === state.client.username) {
        state = initialState;
      }

      return {
        ...state
      };
    case TransactionScreenActType.LOAD_MORE_CLIENT_TRANSACTION_LIST_SUCCESS:
      let { pageLoadMoreClientTransaction } = action;

      let { transactions } = pageLoadMoreClientTransaction;
      state.transactions.elements.push(...transactions.elements);

      return {
        ...state,
        transactions: {
          ...state.transactions,
          totalElements: transactions.totalElements,
          totalPage: transactions.totalPage,
          currentPage: transactions.currentPage,
          currentTotal: state.transactions.elements.length
        }
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

export default transactionOfClient;
