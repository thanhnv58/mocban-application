import * as ClientManagementAct from "../../../actions/sale/client-management/types";
import * as OrderManagementAct from "./../../../actions/sale/order-management/types";
import * as MainScreenActionType from "./../../../actions/sale/main-screen-action/types";
import * as PaymentStep from "../../../constants/PaymentStep";

const initialState = {
  isLoading1: false,
  isLoading2: false,
  isLoading3: false,
  isLoading4: false,
  isLoading5: false,
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    case MainScreenActionType.GET_STATISTIC_OF_MONTH:
      return {
        ...state,
        isLoading1: true,
      };
    case MainScreenActionType.GET_STATISTIC_OF_MONTH_FAILED:
    case MainScreenActionType.GET_STATISTIC_OF_MONTH_SUCCESS:
      return {
        ...state,
        isLoading1: false,
      };
    case MainScreenActionType.GET_STATISTIC_OF_YEAR:
      return {
        ...state,
        isLoading2: true,
      };
    case MainScreenActionType.GET_STATISTIC_OF_YEAR_FAILED:
    case MainScreenActionType.GET_STATISTIC_OF_YEAR_SUCCESS:
      return {
        ...state,
        isLoading2: false,
      };

    // ataaaaaaaaaaaaaa
    case ClientManagementAct.ACT_CREATE_CLIENT:
      return {
        ...state,
        isLoading1: true,
      };
    case ClientManagementAct.ACT_CREATE_CLIENT_FAILED:
    case ClientManagementAct.ACT_CREATE_CLIENT_SUCCESS:
      return {
        ...state,
        isLoading1: false,
      };

    case ClientManagementAct.ACT_GET_ALL_CLIENT:
      if (action.isLoading === 1) {
        return {
          ...state,
          isLoading1: true,
        };
      } else {
        return {
          ...state,
          isLoading2: true,
        };
      }

    case ClientManagementAct.ACT_GET_ALL_CLIENT_FAILED:
    case ClientManagementAct.ACT_GET_ALL_CLIENT_SUCCESS:
      if (action.isLoading === 1) {
        return {
          ...state,
          isLoading1: false,
        };
      } else {
        return {
          ...state,
          isLoading2: false,
        };
      }

    case ClientManagementAct.ACT_GET_CLIENT_DETAIL:
      return {
        ...state,
        isLoading1: true,
      };

    case ClientManagementAct.ACT_GET_CLIENT_DETAIL_FAILED:
    case ClientManagementAct.ACT_GET_CLIENT_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading1: false,
      };

    case ClientManagementAct.ACT_UPDATE_CLIENT:
      return {
        ...state,
        isLoading2: true,
      };

    case ClientManagementAct.ACT_UPDATE_CLIENT_FAILED:
    case ClientManagementAct.ACT_UPDATE_CLIENT_SUCCESS:
      return {
        ...state,
        isLoading2: false,
      };

    case OrderManagementAct.ACT_GET_ALL_ORDER:
      if (action.isLoading === 1) {
        return {
          ...state,
          isLoading1: true,
        };
      } else {
        return {
          ...state,
          isLoading2: true,
        };
      }

    case OrderManagementAct.ACT_GET_ALL_ORDER_FAILED:
    case OrderManagementAct.ACT_GET_ALL_ORDER_SUCCESS:
      if (action.isLoading === 1) {
        return {
          ...state,
          isLoading1: false,
        };
      } else {
        return {
          ...state,
          isLoading2: false,
        };
      }
    case OrderManagementAct.ACT_CREATE_ORDER:
      return {
        ...state,
        isLoading1: true,
      };
    case OrderManagementAct.ACT_CREATE_ORDER_FAILED:
    case OrderManagementAct.ACT_CREATE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading1: false,
      };

    case OrderManagementAct.ACT_GET_ORDER_DETAIL:
      return {
        ...state,
        isLoading1: true,
      };
    case OrderManagementAct.ACT_GET_ORDER_DETAIL_FAILED:
    case OrderManagementAct.ACT_GET_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading1: false,
      };

    case OrderManagementAct.ACT_UPDATE_ORDER:
      return {
        ...state,
        isLoading4: true,
      };
    case OrderManagementAct.ACT_UPDATE_ORDER_FAILED:
    case OrderManagementAct.ACT_UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading4: false,
      };
    case OrderManagementAct.ACT_PAYMENT_ORDER:
      let name =
        action.step === PaymentStep.PAYMENT_1
          ? "isLoading2"
          : action.step === PaymentStep.PAYMENT_2
          ? "isLoading3"
          : "isLoading5";

      return {
        ...state,
        [name]: true,
      };
    case OrderManagementAct.ACT_PAYMENT_ORDER_FAILED:
    case OrderManagementAct.ACT_PAYMENT_ORDER_SUCCESS:
      let name2 =
        action.step === PaymentStep.PAYMENT_1
          ? "isLoading2"
          : action.step === PaymentStep.PAYMENT_2
          ? "isLoading3"
          : "isLoading5";

      return {
        ...state,
        [name2]: false,
      };
    default:
      return { ...state };
  }
};

export default ui;
