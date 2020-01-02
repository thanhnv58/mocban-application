import * as OrderScreenActType from "../../../../actions/sale/order-screen-action/types";
import * as MainScreenActType from "../../../../actions/auth-action/types";

const initialState = {
  totalElements: 0,
  totalPage: 0,
  currentPage: -1,
  currentTotal: -1,
  orders: []
};

const pageClient = (state = initialState, action) => {
  let { currentPage, currentTotal, orders, totalElements } = state;

  switch (action.type) {
    case OrderScreenActType.ACT_FETCH_LIST_ORDER_SUCCESS:
      let { pageOrderRes } = action;

      return {
        ...state,
        totalElements: pageOrderRes.totalElements,
        totalPage: pageOrderRes.totalPage,
        currentPage: pageOrderRes.currentPage,
        currentTotal: pageOrderRes.elements.length,
        orders: pageOrderRes.elements
      };
    case OrderScreenActType.ACT_FETCH_LIST_ORDER_NO_CONTENT:
      return {
        ...state,
        currentPage: 0,
        currentTotal: 0
      };
    case OrderScreenActType.ACT_CREATE_ORDER_SUCCESS:
      if (currentPage === -1 && currentTotal === -1) {
        return { ...state };
      } else {
        let { newOrder } = action;

        orders.splice(0, 0, newOrder);
        return {
          ...state,
          currentTotal: orders.length,
          totalElements: totalElements + 1
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

export default pageClient;
