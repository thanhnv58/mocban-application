import * as UserManagementAct from "../../../../actions/admin/user-management/types";
import * as MainScreenAct from "../../../../actions/common-user-action/types";

const initialState = null;
// {
//   "idUser": 1,
//   "fullName": "Nguyễn Văn Thành",
//   "phoneNumber": "0963682736",
//   "address": "Hà Nội",
//   "email": "thanhnv@mocban.com.vn",
//   "username": "thanh",
//   "createdId": 0,
//   "createdDate": "2019-12-10T09:37:41",
//   "roles": [
//       "ADMIN",
//       "MANAGER",
//       "SALE"
//   ]
// }

const userDetail = (state = initialState, action) => {
  switch (action.type) {
    case UserManagementAct.ACT_GET_USER_DETAIL_SUCCESS:
      let { getUserDetailRes } = action;
      state = getUserDetailRes;
      return {
        ...state,
      };
    case UserManagementAct.ACT_UPDATE_USER_SUCCESS:
      let { updateUserRes } = action;
      state = updateUserRes;
      return {
        ...state,
      };
    case UserManagementAct.ACT_DELETE_USER_SUCCESS:
      return {
        ...state,
        roles: [],
      };
    case MainScreenAct.ACT_LOG_OUT:
      return null;
    default:
      return state ? { ...state } : null;
  }
};

export default userDetail;
