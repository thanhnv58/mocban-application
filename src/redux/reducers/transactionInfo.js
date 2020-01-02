import * as TransactionActType from "../../actions/transaction-action/types";
import * as TransactionType from "./../../constants/TransactionType";

const initialState = null;

const transactionInfo = (state = initialState, action) => {
  switch (action.type) {
    case TransactionActType.FETCH_TRANSACTION_PROJECT_SUCCESS:
      let { transactionOfProject } = action;
      state = transactionOfProject;
      return {
        ...state
      };
    case TransactionActType.SAVE_ALL_TRANSACTION_SUCCESS:
      let { incomeTransactions, payTransactions } = state;
      let createdTransactions = action.createTransactionRes.transactions;

      let tmpTotal = 0;
      let tmpProfit = 0;

      if (action.transactionType === TransactionType.INCOME) {
        tmpTotal = state.totalIncome + action.totalAmountSave;
        tmpProfit = tmpTotal - state.totalPay;
        return {
          ...state,
          incomeTransactions: incomeTransactions.concat(createdTransactions),
          totalIncome: tmpTotal,
          profit: tmpProfit
        };
      } else {
        tmpTotal = state.totalPay + action.totalAmountSave;
        tmpProfit = state.totalIncome - tmpTotal;

        return {
          ...state,
          payTransactions: payTransactions.concat(createdTransactions),
          totalPay: tmpTotal,
          profit: tmpProfit
        };
      }

    default:
      return state ? { ...state } : null;
  }
};

export default transactionInfo;
