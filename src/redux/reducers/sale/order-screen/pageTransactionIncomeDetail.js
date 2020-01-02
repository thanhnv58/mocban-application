import * as SaleOrderScreenActionType from "../../../../actions/sale/order-screen-action/types";
import * as MainScreenActType from "../../../../actions/auth-action/types";

const initialState = {
  orderId: -1,
  totalElements: 0,
  totalPage: 0,
  currentPage: -1,
  currentTotal: -1,
  transactions: []
};

const pageTransactionIncomeDetail = (state = initialState, action) => {
  let {
    currentPage,
    currentTotal,
    transactions,
    orderId,
    totalElements
  } = state;

  switch (action.type) {
    case SaleOrderScreenActionType.GET_TRANSACTION_INCOME_OF_ORDER_SUCCESS:
      let { pageTransactionRes } = action;
      return {
        ...state,
        orderId: action.orderId,
        totalElements: pageTransactionRes.totalElements,
        totalPage: pageTransactionRes.totalPage,
        currentPage: pageTransactionRes.currentPage,
        currentTotal: pageTransactionRes.elements.length,
        transactions: pageTransactionRes.elements
      };
    case SaleOrderScreenActionType.GET_TRANSACTION_INCOME_OF_ORDER_NO_CONTENT:
      return {
        ...state,
        orderId: action.orderId,
        totalElements: 0,
        totalPage: 0,
        currentPage: 0,
        currentTotal: 0,
        transactions: []
      };
    case SaleOrderScreenActionType.ACT_DO_TRANSACTION_SUCCESS:
      let { transactionResponse } = action;

      if (currentPage !== -1 && currentTotal !== -1) {
        if (transactionResponse.orderId === orderId) {
          transactions = transactionResponse.transactions.concat(transactions);
          totalElements += 1;
          currentTotal += 1;
        }
      }
      return {
        ...state,
        transactions: [...transactions],
        totalElements: totalElements,
        currentTotal: currentTotal
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

export default pageTransactionIncomeDetail;
