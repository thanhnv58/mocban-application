import * as OrderManagementAct from "../../../../actions/sale/order-management/types";
import * as MainScreenAct from "../../../../actions/common-user-action/types";
import * as arrayUtils from "../../../../utils/arrayUtils";

const initialState = null;

const pageOrder = (state = initialState, action) => {
  switch (action.type) {
    case OrderManagementAct.ACT_GET_ALL_ORDER_SUCCESS:
      let { getAllOrderRes, page, size, status } = action;
      return {
        ...state,
        totalElements: getAllOrderRes.totalElements,
        elements: getAllOrderRes.elements,
        page,
        size,
        status,
      };
    case OrderManagementAct.ACT_PAYMENT_ORDER_SUCCESS:
      if (!state) {
        return state;
      }

      let { paymentOrderRes } = action;
      let { elements } = state;

      let updateIndex = arrayUtils.findIndexOfElementInArray(
        elements,
        (e) => e.idOrder === paymentOrderRes.idOrder
      );

      elements[updateIndex] = {
        ...elements[updateIndex],
        status: paymentOrderRes.status,
      };

      return {
        ...state,
        elements: [...elements],
      };
    case MainScreenAct.ACT_LOG_OUT:
      return null;
    default:
      return state ? { ...state } : null;
  }
};

export default pageOrder;
