import * as OrderScreenActionType from "../../../../actions/sale/order-screen-action/types";
import * as MainScreenActType from "../../../../actions/common-user-action/types";

const initialState = {
  orderId: -1,
  totalElements: 0,
  totalPage: 0,
  currentPage: -1,
  currentTotal: -1,
  transactions: []
};

const pageTransactionIncomeDetail = (state = initialState, action) => {
  switch (action.type) {
    case OrderScreenActionType.GET_TRANSACTION_INCOME_OF_ORDER_SUCCESS:
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
    case OrderScreenActionType.GET_TRANSACTION_INCOME_OF_ORDER_NO_CONTENT:
      return {
        ...state,
        orderId: action.orderId,
        totalElements: 0,
        totalPage: 0,
        currentPage: 0,
        currentTotal: 0,
        transactions: []
      };
    case OrderScreenActionType.ACT_DO_TRANSACTION_SUCCESS:
      let { transactionResponse } = action;
      let { orderId, transactions } = transactionResponse;

      if (orderId === -1 || orderId !== state.orderId) {
        return {
          ...state
        };
      } else {
        state.transactions.push(...transactions);

        return {
          ...state,
          totalElements: state.totalElements + transactions.length,
          currentTotal: state.transactions.length
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

export default pageTransactionIncomeDetail;
