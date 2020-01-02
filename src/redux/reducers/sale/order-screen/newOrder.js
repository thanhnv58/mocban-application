import * as OrderScreenActType from "../../../../actions/sale/order-screen-action/types";

const initialState = null;

const newOrder = (state = initialState, action) => {
  switch (action.type) {
    case OrderScreenActType.ACT_CREATE_ORDER_SUCCESS:
      let { newOrder } = action;
      state = newOrder;

      return {
        ...state
      };
    default:
      return state === null ? null : { ...state };
  }
};

export default newOrder;
