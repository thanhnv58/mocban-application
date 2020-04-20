import * as OrderManagementAct from "../../../../actions/sale/order-management/types";
import * as MainScreenActType from "../../../../actions/common-user-action/types";

const initialState = null;

const orderDetail = (state = initialState, action) => {
  let order;

  switch (action.type) {
    case OrderManagementAct.ACT_GET_ORDER_DETAIL_SUCCESS:
      state = action.getOrderDetailRes;
      return {
        ...state,
      };

    case OrderManagementAct.ACT_UPDATE_ORDER_SUCCESS:
      let { updateOrderRes } = action;
      order = state.order;
      if (order.idOrder === updateOrderRes.idOrder) {
        return {
          ...state,
          order: {
            ...order,
            note: updateOrderRes.note,
          },
        };
      } else {
        return state === null ? null : { ...state };
      }
    case OrderManagementAct.ACT_PAYMENT_ORDER_SUCCESS:
      let { paymentOrderRes } = action;
      order = state.order;
      if (order.idOrder === paymentOrderRes.idOrder) {
        return {
          ...state,
          order: {
            ...order,
            status: paymentOrderRes.status,
          },
        };
      } else {
        return state === null ? null : { ...state };
      }

    case MainScreenActType.ACT_LOG_OUT:
      state = initialState;
      return state;
    default:
      return state === null ? null : { ...state };
  }
};

export default orderDetail;
