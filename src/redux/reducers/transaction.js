import * as TransactionActType from "../../actions/transaction-action/types";
import * as arrayUtils from "./../../utils/arrayUtils";
import * as TransactionType from "./../../constants/TransactionType";

const initialState = {
  projectId: 0,
  transactionPay: [],
  transactionIncome: [],
  tmpTotalPay: 0,
  tmpTotalIncome: 0
};

const transaction = (state = initialState, action) => {
  let {
    transactionPay,
    transactionIncome,
    tmpTotalIncome,
    tmpTotalPay
  } = state;
  switch (action.type) {
    case TransactionActType.FETCH_TRANSACTION_PROJECT_SUCCESS:
      let { transactionOfProject } = action;
      return {
        projectId: transactionOfProject.projectId,
        transactionPay: [],
        transactionIncome: [],
        tmpTotalPay: 0,
        tmpTotalIncome: 0
      };
    case TransactionActType.ADD_TRANSACTION:
      let { transactionDto } = action;

      if (action.transactionType === TransactionType.INCOME) {
        return {
          ...state,
          transactionIncome: [transactionDto].concat(transactionIncome),
          tmpTotalIncome: state.tmpTotalIncome + transactionDto.amount
        };
      } else {
        return {
          ...state,
          transactionPay: [transactionDto].concat(transactionPay),
          tmpTotalPay: state.tmpTotalPay + transactionDto.amount
        };
      }

    case TransactionActType.REMOVE_TRANSACTION:
      let indexOfRemoveItem = -1;
      if (action.transactionType === TransactionType.INCOME) {
        indexOfRemoveItem = arrayUtils.findIndexOfElementInArray(
          transactionIncome,
          e => {
            return e.id === action.transactionId;
          }
        );
      } else {
        indexOfRemoveItem = arrayUtils.findIndexOfElementInArray(
          transactionPay,
          e => {
            return e.id === action.transactionId;
          }
        );
      }

      if (indexOfRemoveItem !== -1) {
        if (action.transactionType === TransactionType.INCOME) {
          tmpTotalIncome -= transactionIncome[indexOfRemoveItem].amount;

          transactionIncome.splice(indexOfRemoveItem, 1);
        } else {
          tmpTotalPay -= transactionPay[indexOfRemoveItem].amount;

          transactionPay.splice(indexOfRemoveItem, 1);
        }

        return {
          ...state,
          tmpTotalIncome,
          tmpTotalPay
        };
      } else {
        return state;
      }
    case TransactionActType.SAVE_ALL_TRANSACTION_SUCCESS:
      if (action.transactionType === TransactionType.INCOME) {
        return {
          ...state,
          transactionIncome: [],
          tmpTotalIncome: 0
        };
      } else {
        return {
          ...state,
          transactionPay: [],
          tmpTotalPay: 0
        };
      }

    default:
      return {
        ...state
      };
  }
};

export default transaction;
