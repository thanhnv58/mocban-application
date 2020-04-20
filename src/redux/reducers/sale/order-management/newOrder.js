import * as OrderScreenActType from "../../../../actions/sale/order-management/types";

const initialState = null;

const newOrder = (state = initialState, action) => {
  switch (action.type) {
    case OrderScreenActType.ACT_CREATE_ORDER_SUCCESS:
      let { createOrderRes } = action;
      state = createOrderRes;

      return {
        ...state,
      };
    case OrderScreenActType.ACT_REMOVE_NEW_ORDER:
      state = null;
      return state;
    default:
      return state === null ? null : { ...state };
  }
};

export default newOrder;
