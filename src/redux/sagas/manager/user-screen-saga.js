import { call, put, takeEvery, select } from "redux-saga/effects";
import * as UserScreenActType from "../../../actions/manager/user-screen-action/types";
import * as userApis from "../../../utils/api/userApis";
import { toastSuccess } from "../../../utils/ToastUtils";
import { findElementInArray } from "./../../../utils/arrayUtils";

function* createUser(action) {
  let { user } = action;

  const response = yield call(userApis.createUser, user);

  if (response === null) {
    yield put({
      type: UserScreenActType.CREATE_USER_FAILED,
    });
    return;
  }

  // Case SUCCESS
  toastSuccess("Tạo người dùng thành công!");
  yield put({
    type: UserScreenActType.CREATE_USER_SUCCESS,
    createUserResponse: response.data,
  });
}

function* updateUser(action) {
  let { user } = action;

  const response = yield call(userApis.updateUser, user);

  if (response === null) {
    yield put({
      type: UserScreenActType.UPDATE_USER_FAILED,
    });
    return;
  }

  // Case SUCCESS
  toastSuccess("Cập nhật thành công!");
  yield put({
    type: UserScreenActType.UPDATE_USER_SUCCESS,
    updateUserRes: response.data,
  });
}

function* getAllUser(action) {
  const response = yield call(userApis.getAllUser, 0);

  if (response === null) {
    yield put({
      type: UserScreenActType.GET_ALL_USER_FAILED,
    });
    return;
  }

  // Case 204 - No content
  let { status } = response;
  if (status === 204) {
    yield put({
      type: UserScreenActType.GET_ALL_USER_NO_CONTENT,
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: UserScreenActType.GET_ALL_USER_SUCCESS,
    pageUserRes: response.data,
  });
}

function* loadMoreUser(action) {
  const pageUser = yield select((state) => state.managerReducer.pageUser);

  let { currentPage } = pageUser;

  const response = yield call(userApis.getAllUser, currentPage + 1);

  if (response === null) {
    yield put({
      type: UserScreenActType.LOAD_MORE_LIST_USER_FAILED,
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: UserScreenActType.LOAD_MORE_LIST_USER_SUCCESS,
    pageLoadMoreUserRes: response.data,
  });
}

function* getUserDetail(action) {
  let { username } = action;

  const pageUser = yield select((state) => state.managerReducer.pageUser);

  let { users } = pageUser;

  let userRes = findElementInArray(users, (u) => {
    return u.username === username;
  });

  if (userRes) {
    // Case SUCCESS
    yield put({
      type: UserScreenActType.GET_USER_DETAIL_SUCCESS,
      userDetailRes: userRes,
    });
  } else {
    const response = yield call(userApis.getUserInfo, username);

    if (response === null) {
      yield put({
        type: UserScreenActType.GET_USER_DETAIL_FAILED,
      });
      return;
    }

    // Case SUCCESS
    yield put({
      type: UserScreenActType.GET_USER_DETAIL_SUCCESS,
      userDetailRes: response.data,
    });
  }
}

function* getPassword(action) {
  let { requestDto } = action;

  const response = yield call(userApis.getPassword, requestDto);

  if (response === null) {
    yield put({
      type: UserScreenActType.GET_PASSWORD_FAILED,
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: UserScreenActType.GET_PASSWORD_SUCCESS,
    getPasswordRes: response.data,
  });
}

export const manager_UserScreenSagas = [
  takeEvery(UserScreenActType.CREATE_USER, createUser),
  takeEvery(UserScreenActType.GET_ALL_USER, getAllUser),
  takeEvery(UserScreenActType.LOAD_MORE_LIST_USER, loadMoreUser),
  takeEvery(UserScreenActType.GET_USER_DETAIL, getUserDetail),
  takeEvery(UserScreenActType.UPDATE_USER, updateUser),
  takeEvery(UserScreenActType.GET_PASSWORD, getPassword),
];
