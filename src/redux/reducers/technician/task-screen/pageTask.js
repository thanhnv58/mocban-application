import * as TaskScreenActType from "../../../../actions/technician/task-screen-action/types";
import * as MainScreenActType from "../../../../actions/common-user-action/types";
import { findIndexOfElementInArray } from "../../../../utils/arrayUtils";

const initialState = {
  totalElements: 0,
  totalPage: 0,
  currentPage: -1,
  currentTotal: -1,
  tasks: []
};

const pageTask = (state = initialState, action) => {
  switch (action.type) {
    case TaskScreenActType.GET_LIST_TASK_SUCCESS:
      let { pageTaskResponse } = action;

      return {
        ...state,
        totalElements: pageTaskResponse.totalElements,
        totalPage: pageTaskResponse.totalPage,
        currentPage: pageTaskResponse.currentPage,
        currentTotal: pageTaskResponse.elements.length,
        tasks: pageTaskResponse.elements
      };
    case TaskScreenActType.GET_LIST_TASK_NO_CONTENT:
      return {
        ...state,
        currentPage: 0,
        currentTotal: 0,
        totalElements: 0,
        totalPage: 0,
        tasks: []
      };
    case TaskScreenActType.LOAD_MORE_LIST_TASK_SUCCESS:
      let { pageLoadMoreRes } = action;

      state.tasks.push(...pageLoadMoreRes.elements);

      return {
        ...state,
        totalElements: pageLoadMoreRes.totalElements,
        totalPage: pageLoadMoreRes.totalPage,
        currentPage: pageLoadMoreRes.currentPage,
        currentTotal: state.tasks.length
      };

    case TaskScreenActType.UPDATE_PROGRESS_SUCCESS:
      let { updateProgressRes } = action;
      let { orderId } = updateProgressRes;

      if (state.tasks.length > 0) {
        let indexUpdate = findIndexOfElementInArray(state.tasks, t => {
          return t.id === orderId;
        });

        if (indexUpdate !== -1) {
          state.tasks[indexUpdate] = {
            ...state.tasks[indexUpdate],
            ...updateProgressRes
          };

          return {
            ...state,
            tasks: [...state.tasks]
          };
        } else {
          return {
            ...state
          };
        }
      } else {
        return {
          ...state
        };
      }
    case MainScreenActType.ACT_LOG_OUT:
      state = initialState;
      return {
        ...state
      };
    default:
      return { ...state };
  }
};

export default pageTask;
