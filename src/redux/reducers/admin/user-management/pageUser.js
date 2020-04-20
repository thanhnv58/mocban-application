import * as UserManagementAct from "../../../../actions/admin/user-management/types";
import * as MainScreenAct from "../../../../actions/common-user-action/types";
// import * as arrayUtils from "../../../../utils/arrayUtils";

const initialState = null;

const pageUser = (state = initialState, action) => {
  switch (action.type) {
    case UserManagementAct.ACT_GET_ALL_USER_SUCCESS:
      let { getAllUserRes, page, size, search, role } = action;
      return {
        ...state,
        totalElements: getAllUserRes.totalElements,
        elements: getAllUserRes.elements,
        page,
        size,
        search,
        role,
      };
    // case UserManagementAct.ACT_UPDATE_CLIENT_SUCCESS:
    //   if (!state) {
    //     return state;
    //   }

    //   let { updateClientRes } = action;
    //   let { elements } = state;

    //   let updateIndex = arrayUtils.findIndexOfElementInArray(
    //     elements,
    //     (e) => e.idClient === updateClientRes.idClient
    //   );

    //   elements[updateIndex] = {
    //     ...elements[updateIndex],
    //     status: updateClientRes.status,
    //   };

    //   return {
    //     ...state,
    //     elements: [...elements],
    //   };
    case MainScreenAct.ACT_LOG_OUT:
      return null;
    default:
      return state ? { ...state } : null;
  }
};

export default pageUser;
