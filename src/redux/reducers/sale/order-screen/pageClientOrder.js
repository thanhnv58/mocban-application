import * as OrderScreenActType from "../../../../actions/sale/order-screen-action/types";
import * as MainScreenActType from "../../../../actions/common-user-action/types";

const initialState = {
  totalElements: 0,
  totalPage: 0,
  currentPage: -1,
  currentTotal: -1,
  orders: []
};

const pageClientOrder = (state = initialState, action) => {
  switch (action.type) {
    case OrderScreenActType.GET_ORDER_OF_CLIENT_SUCCESS:
      let { pageOrderRes } = action;
      return {
        ...state,
        totalElements: pageOrderRes.totalElements,
        totalPage: pageOrderRes.totalPage,
        currentPage: pageOrderRes.currentPage,
        currentTotal: pageOrderRes.elements.length,
        orders: pageOrderRes.elements
      };
    case OrderScreenActType.GET_ORDER_OF_CLIENT_NO_CONTENT:
      return {
        ...state,
        totalElements: 0,
        totalPage: 0,
        currentPage: 0,
        currentTotal: 0,
        orders: []
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

export default pageClientOrder;
