import * as ClientManagementAct from "../../../../actions/sale/client-management/types";
import * as MainScreenAct from "../../../../actions/common-user-action/types";

const initialState = null;
// {
//   "clientInfo": {
//       "idClient": 3,
//       "fullName": "Nguyễn Văn Minh",
//       "phoneNumber": "0982017123",
//       "address": "Số 4, tổ 10, Ba Đình, Hà Nội",
//       "email": "minhnguyen13@gmail.com",
//       "status": "HAVE_DEMAND",
//       "note": "Xương mềm",
//       "code": "MinhNV1",
//       "createdId": 1,
//       "createdDate": "2020-04-01T11:33:33"
//   }
// }

const clientDetail = (state = initialState, action) => {
  switch (action.type) {
    case ClientManagementAct.ACT_GET_CLIENT_DETAIL_SUCCESS:
      let { getClientDetailRes } = action;
      state = getClientDetailRes;
      return {
        ...state,
      };
    case ClientManagementAct.ACT_UPDATE_CLIENT_SUCCESS:
      let { updateClientRes } = action;
      let { clientInfo } = state;
      return {
        ...state,
        clientInfo: {
          ...clientInfo,
          status: updateClientRes.status,
          note: updateClientRes.note,
        },
      };
    case MainScreenAct.ACT_LOG_OUT:
      return null;
    default:
      return state ? { ...state } : null;
  }
};

export default clientDetail;
