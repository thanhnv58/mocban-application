import * as ClientManagementAct from "../../../../actions/sale/client-management/types";
import * as MainScreenAct from "../../../../actions/common-user-action/types";
import * as arrayUtils from "../../../../utils/arrayUtils";

const initialState = null;
// {
//   totalElements: 0,
//   totalPage: 0,
//   currentPage: -1,
//   currentTotal: -1,
//   clients: []
// };

const pageClient = (state = initialState, action) => {
  switch (action.type) {
    case ClientManagementAct.ACT_GET_ALL_CLIENT_SUCCESS:
      let { getAllClientRes, page, size, search, status } = action;
      return {
        ...state,
        totalElements: getAllClientRes.totalElements,
        elements: getAllClientRes.elements,
        page,
        size,
        search,
        status,
      };
    case ClientManagementAct.ACT_UPDATE_CLIENT_SUCCESS:
      if (!state) {
        return state;
      }

      let { updateClientRes } = action;
      let { elements } = state;

      let updateIndex = arrayUtils.findIndexOfElementInArray(
        elements,
        (e) => e.idClient === updateClientRes.idClient
      );

      elements[updateIndex] = {
        ...elements[updateIndex],
        status: updateClientRes.status,
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

export default pageClient;
