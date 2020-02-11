import * as TaskScreenActType from "../../../actions/technician/task-screen-action/types";
import * as MainScreenActType from "../../../actions/technician/main-screen-action/types";

const initialState = {
  isLoading1: false,
  isLoading2: false,
  isLoading3: false
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    case TaskScreenActType.GET_LIST_TASK:
      return {
        ...state,
        isLoading1: true
      };
    case TaskScreenActType.GET_LIST_TASK_FAILED:
    case TaskScreenActType.GET_LIST_TASK_NO_CONTENT:
    case TaskScreenActType.GET_LIST_TASK_SUCCESS:
      return {
        ...state,
        isLoading1: false
      };
    case TaskScreenActType.LOAD_MORE_LIST_TASK:
      return {
        ...state,
        isLoading2: true
      };
    case TaskScreenActType.LOAD_MORE_LIST_TASK_FAILED:
    case TaskScreenActType.LOAD_MORE_LIST_TASK_SUCCESS:
      return {
        ...state,
        isLoading2: false
      };
    case TaskScreenActType.GET_TASK_DETAIL:
      return {
        ...state,
        isLoading1: true
      };
    case TaskScreenActType.GET_TASK_DETAIL_FAILED:
    case TaskScreenActType.GET_TASK_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading1: false
      };
    case TaskScreenActType.UPDATE_PROGRESS:
      return {
        ...state,
        isLoading2: true
      };
    case TaskScreenActType.UPDATE_PROGRESS_FAILED:
    case TaskScreenActType.UPDATE_PROGRESS_SUCCESS:
      return {
        ...state,
        isLoading2: false
      };
    case TaskScreenActType.UPDATE_ITEMS:
      return {
        ...state,
        isLoading3: true
      };
    case TaskScreenActType.UPDATE_ITEMS_FAILED:
    case TaskScreenActType.UPDATE_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading3: false
      };

    case MainScreenActType.GET_NOTIFICATION_TECHNICIAN:
      return {
        ...state,
        isLoading1: true
      };
    case MainScreenActType.GET_NOTIFICATION_TECHNICIAN_FAILED:
    case MainScreenActType.GET_NOTIFICATION_TECHNICIAN_SUCCESS:
      return {
        ...state,
        isLoading1: false
      };
    default:
      return { ...state };
  }
};

export default ui;
