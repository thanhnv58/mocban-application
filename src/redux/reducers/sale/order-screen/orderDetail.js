import * as OrderScreenActType from "../../../../actions/sale/order-screen-action/types";
import * as MainScreenActType from "../../../../actions/auth-action/types";

const initialState = null;

const orderDetail = (state = initialState, action) => {
  switch (action.type) {
    case OrderScreenActType.ACT_GET_ORDER_DETAIL_SUCCESS:
      state = action.orderDetail;

      return {
        ...state
      };
    case OrderScreenActType.UPDATE_CLIENT_REQUEST_SUCCESS:
      let { updateClientRequestRes } = action;

      if (state.id === updateClientRequestRes.orderId) {
        return {
          ...state,
          note: updateClientRequestRes.clientRequest
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
