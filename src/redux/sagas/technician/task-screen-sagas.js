import { call, put, takeEvery, select } from "redux-saga/effects";
import * as TaskScreenActType from "../../../actions/technician/task-screen-action/types";
import * as orderApis from "../../../utils/api/orderApis";
import { toastSuccess } from "./../../../utils/ToastUtils";

function* getListTask(action) {
  const response = yield call(orderApis.fetchListOrder, 0);

  if (response === null) {
    yield put({
      type: TaskScreenActType.GET_LIST_TASK_FAILED,
    });
    return;
  }

  // Case 204 - No content
  let { status } = response;
  if (status === 204) {
    yield put({
      type: TaskScreenActType.GET_LIST_TASK_NO_CONTENT,
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: TaskScreenActType.GET_LIST_TASK_SUCCESS,
    pageTaskResponse: response.data,
  });
}

function* loadMoreListTask(action) {
  const pageTask = yield select((state) => state.technicianReducer.pageTask);

  let { currentPage } = pageTask;

  const response = yield call(orderApis.fetchListOrder, currentPage + 1);

  if (response === null) {
    yield put({
      type: TaskScreenActType.LOAD_MORE_LIST_TASK_FAILED,
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: TaskScreenActType.LOAD_MORE_LIST_TASK_SUCCESS,
    pageLoadMoreRes: response.data,
  });
}

function* getTaskDetail(action) {
  let { orderId } = action;

  const response = yield call(orderApis.getOrderDetail, orderId);

  if (response === null) {
    yield put({
      type: TaskScreenActType.GET_TASK_DETAIL_FAILED,
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: TaskScreenActType.GET_TASK_DETAIL_SUCCESS,
    orderDetailRes: response.data,
  });
}

function* updateProgressTask(action) {
  let { requestBody } = action;

  const response = yield call(orderApis.updateProgress, requestBody);

  if (response === null) {
    yield put({
      type: TaskScreenActType.UPDATE_PROGRESS_FAILED,
    });
    return;
  }

  // Case SUCCESS
  toastSuccess("Cập nhật tiến độ thành công!");
  yield put({
    type: TaskScreenActType.UPDATE_PROGRESS_SUCCESS,
    updateProgressRes: response.data,
  });
}

function* updateItems(action) {
  let { requestBody } = action;

  const response = yield call(orderApis.updateItems, requestBody);

  if (response === null) {
    yield put({
      type: TaskScreenActType.UPDATE_ITEMS_FAILED,
    });
    return;
  }

  // Case SUCCESS
  toastSuccess("Cập nhật sản phẩm thành công!");
  yield put({
    type: TaskScreenActType.UPDATE_ITEMS_SUCCESS,
    updateItemsRes: response.data,
  });
}

export const technician_TaskScreen = [
  takeEvery(TaskScreenActType.GET_LIST_TASK, getListTask),
  takeEvery(TaskScreenActType.LOAD_MORE_LIST_TASK, loadMoreListTask),
  takeEvery(TaskScreenActType.GET_TASK_DETAIL, getTaskDetail),
  takeEvery(TaskScreenActType.UPDATE_PROGRESS, updateProgressTask),
  takeEvery(TaskScreenActType.UPDATE_ITEMS, updateItems),
];
