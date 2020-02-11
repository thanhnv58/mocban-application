import * as ClientScreenActionType from "../../../../actions/sale/client-screen-action/types";
import * as MainScreenActType from "../../../../actions/auth-action/types";

const initialState = {
  totalElements: 0,
  totalPage: 0,
  currentPage: -1,
  currentTotal: -1,
  clients: []
};

const pageClient = (state = initialState, action) => {
  switch (action.type) {
    case ClientScreenActionType.ACT_FETCH_LIST_CLIENT_SUCCESS:
      let { pageClientRes } = action;

      return {
        ...state,
        totalElements: pageClientRes.totalElements,
        totalPage: pageClientRes.totalPage,
        currentPage: pageClientRes.currentPage,
        currentTotal: pageClientRes.elements.length,
        clients: pageClientRes.elements
      };
    case ClientScreenActionType.ACT_FETCH_LIST_CLIENT_NO_CONTENT:
      return {
        ...state,
        currentPage: 0,
        currentTotal: 0
      };
    case ClientScreenActionType.ACT_CREATE_CLIENT_SUCCESS:
      if (state.clients.length > 0) {
        let { newClient } = action;
        state.clients.splice(0, 0, newClient);
        return {
          ...state,
          currentTotal: state.currentTotal + 1,
          totalElements: state.totalElements + 1
        };
      } else {
        return {
          ...state
        };
      }

    case ClientScreenActionType.ACT_LOAD_MORE_CLIENT_SUCCESS:
      let { pageLoadMoreClientRes } = action;

      state.clients.push(...pageLoadMoreClientRes.elements);

      return {
        ...state,
        totalElements: pageLoadMoreClientRes.totalElements,
        totalPage: pageLoadMoreClientRes.totalPage,
        currentPage: pageLoadMoreClientRes.currentPage,
        currentTotal: state.clients.length
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

export default pageClient;
