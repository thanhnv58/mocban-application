import * as ClientScreenActionType from "../../../../actions/accountant/client-screen-action/types";
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
    case ClientScreenActionType.GET_ALL_CLIENT_SUCCESS:
      let { pageClientRes } = action;

      return {
        ...state,
        totalElements: pageClientRes.totalElements,
        totalPage: pageClientRes.totalPage,
        currentPage: pageClientRes.currentPage,
        currentTotal: pageClientRes.elements.length,
        clients: pageClientRes.elements
      };
    case ClientScreenActionType.GET_ALL_CLIENT_NO_CONTENT:
      return {
        ...state,
        currentPage: 0,
        currentTotal: 0
      };

    case ClientScreenActionType.LOAD_MORE_CLIENT_SUCCESS:
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
