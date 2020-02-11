import * as TaskScreenActType from "../../../../actions/technician/task-screen-action/types";
import * as MainScreenActType from "../../../../actions/auth-action/types";

const initialState = null;

const taskDetail = (state = initialState, action) => {
  switch (action.type) {
    case TaskScreenActType.GET_TASK_DETAIL_SUCCESS:
      state = action.orderDetailRes;

      return {
        ...state
      };

    case TaskScreenActType.UPDATE_PROGRESS_SUCCESS:
      let { updateProgressRes } = action;
      let { orderId } = updateProgressRes;

      if (orderId === state.id) {
        return {
          ...state,
          ...updateProgressRes
        };
      } else {
        return {
          ...state
        };
      }

    case TaskScreenActType.UPDATE_ITEMS_SUCCESS:
      let { updateItemsRes } = action;

      if (updateItemsRes.orderId === state.id) {
        return {
          ...state,
          ...updateItemsRes
        };
      } else {
        return {
          ...state
        };
      }

    case MainScreenActType.ACT_LOG_OUT:
      state = initialState;
      return state;
    default:
      return state === null ? null : { ...state };
  }
};

export default taskDetail;
