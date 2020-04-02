import * as OrderScreenActType from "../../../../actions/sale/order-screen-action/types";
import * as MainScreenActType from "../../../../actions/common-user-action/types";

const initialState = {
  totalElements: 0,
  totalPage: 0,
  currentPage: -1,
  currentTotal: -1,
  orders: [],
  clientUsername: null
};

const pageOrder = (state = initialState, action) => {
  let { currentTotal, currentPage, orders, totalElements } = state;
  let { pageOrderRes, clientUsername } = action;

  switch (action.type) {
    case OrderScreenActType.GET_ORDER_OF_CLIENT_SUCCESS:
      return {
        ...state,
        totalElements: pageOrderRes.totalElements,
        totalPage: pageOrderRes.totalPage,
        currentPage: pageOrderRes.currentPage,
        currentTotal: pageOrderRes.elements.length,
        orders: pageOrderRes.elements,
        clientUsername
      };
    case OrderScreenActType.ACT_FETCH_LIST_ORDER_SUCCESS:
      return {
        ...state,
        totalElements: pageOrderRes.totalElements,
        totalPage: pageOrderRes.totalPage,
        currentPage: pageOrderRes.currentPage,
        currentTotal: pageOrderRes.elements.length,
        orders: pageOrderRes.elements,
        clientUsername: null
      };
    case OrderScreenActType.LOAD_MORE_LIST_ORDER_SUCCESS:
      let { pageLoadMoreOrderRes } = action;

      state.orders.push(...pageLoadMoreOrderRes.elements);

      return {
        ...state,
        totalElements: pageLoadMoreOrderRes.totalElements,
        totalPage: pageLoadMoreOrderRes.totalPage,
        currentPage: pageLoadMoreOrderRes.currentPage,
        currentTotal: state.orders.length
      };
    case OrderScreenActType.GET_ORDER_OF_CLIENT_NO_CONTENT:
      return {
        ...state,
        currentPage: 0,
        currentTotal: 0,
        totalElements: 0,
        totalPage: 0,
        orders: [],
        clientUsername: clientUsername
      };
    case OrderScreenActType.ACT_FETCH_LIST_ORDER_NO_CONTENT:
      return {
        ...state,
        currentPage: 0,
        currentTotal: 0,
        totalElements: 0,
        totalPage: 0,
        orders: [],
        clientUsername: null
      };
    case OrderScreenActType.ACT_CREATE_ORDER_SUCCESS:
      if (currentPage === -1) {
        return { ...state };
      } else {
        let { newOrder } = action;
        let { client } = newOrder;

        if (
          client.username === state.clientUsername ||
          state.clientUsername === null
        ) {
          orders.splice(0, 0, newOrder);
          return {
            ...state,
            currentTotal: currentTotal + 1,
            totalElements: totalElements + 1
          };
        } else {
          return { ...state };
        }
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

export default pageOrder;
