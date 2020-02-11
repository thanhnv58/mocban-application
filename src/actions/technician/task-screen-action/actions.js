import * as types from "./types";

export const getListTask = () => {
  return {
    type: types.GET_LIST_TASK
  };
};

export const loadMoreListTask = () => {
  return {
    type: types.LOAD_MORE_LIST_TASK
  };
};

export const getTaskDetail = orderId => {
  return {
    type: types.GET_TASK_DETAIL,
    orderId
  };
};

export const updateProgressTask = requestBody => {
  return {
    type: types.UPDATE_PROGRESS,
    requestBody
  };
};

export const updateItems = requestBody => {
  return {
    type: types.UPDATE_ITEMS,
    requestBody
  };
};
