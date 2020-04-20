import { call, put, takeEvery } from "redux-saga/effects";
import * as UserManagementAct from "../../../actions/admin/user-management/types";
import * as adminApis from "../../../utils/api/adminApis";
import * as toastUtils from "../../../utils/ToastUtils";

function* createUser(action) {
  let { requestDto } = action;

  const response = yield call(adminApis.createUser, requestDto);

  if (response === null) {
    yield put({
      type: UserManagementAct.ACT_CREATE_USER_FAILED,
    });
    return;
  }

  // Case SUCCESS
  toastUtils.toastSuccess("Username: " + response.data.username);
  yield put({
    type: UserManagementAct.ACT_CREATE_USER_SUCCESS,
  });
}

function* updateUser(action) {
  let { idUser, requestDto } = action;

  const response = yield call(adminApis.updateClient, idUser, requestDto);

  if (response === null) {
    yield put({
      type: UserManagementAct.ACT_UPDATE_USER_FAILED,
    });
    return;
  }

  // Case SUCCESS
  toastUtils.toastSuccess("Cập nhật thành công!");
  yield put({
    type: UserManagementAct.ACT_UPDATE_USER_SUCCESS,
    updateUserRes: response.data,
  });
}

function* getAllUser(action) {
  let { isLoading, pageIndex, size, search, role } = action;

  const response = yield call(
    adminApis.getAllUser,
    pageIndex,
    size,
    search,
    role
  );

  if (response === null) {
    yield put({
      type: UserManagementAct.ACT_GET_ALL_USER_FAILED,
      isLoading,
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: UserManagementAct.ACT_GET_ALL_USER_SUCCESS,
    isLoading,
    getAllUserRes: response.data,
    page: pageIndex,
    size,
    search,
    role,
  });
}

function* getUserDetail(action) {
  let { idUser } = action;

  const response = yield call(adminApis.getUserDetail, idUser);

  if (response === null) {
    yield put({
      type: UserManagementAct.ACT_GET_USER_DETAIL_FAILED,
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: UserManagementAct.ACT_GET_USER_DETAIL_SUCCESS,
    getUserDetailRes: response.data,
  });
}

function* deleteUser(action) {
  let { idUser } = action;

  const response = yield call(adminApis.deleteUser, idUser);

  if (response === null) {
    yield put({
      type: UserManagementAct.ACT_DELETE_USER_FAILED,
    });
    return;
  }

  // Case SUCCESS
  toastUtils.toastSuccess("Xóa thành công!");
  yield put({
    type: UserManagementAct.ACT_DELETE_USER_SUCCESS,
  });
}

function* resetUserPass(action) {
  let { idUser } = action;

  const response = yield call(adminApis.resetUserPass, idUser);

  if (response === null) {
    yield put({
      type: UserManagementAct.ACT_RESET_USER_PASS_FAILED,
    });
    return;
  }

  // Case SUCCESS
  toastUtils.toastSuccess("Reset thành công!");
  yield put({
    type: UserManagementAct.ACT_RESET_USER_PASS_SUCCESS,
  });
}

export const userManagementSagas = [
  takeEvery(UserManagementAct.ACT_GET_ALL_USER, getAllUser),
  takeEvery(UserManagementAct.ACT_CREATE_USER, createUser),
  takeEvery(UserManagementAct.ACT_GET_USER_DETAIL, getUserDetail),
  takeEvery(UserManagementAct.ACT_UPDATE_USER, updateUser),
  takeEvery(UserManagementAct.ACT_DELETE_USER, deleteUser),
  takeEvery(UserManagementAct.ACT_RESET_USER_PASS, resetUserPass),
];
