import { call, put, takeEvery } from "redux-saga/effects";
import * as CommonUserAct from "../../actions/common-user-action/types";
import * as commonUserApis from "../../utils/api/common-user-apis";
import { helpers_SaveAuthToStorage } from "../../utils/helpers";
import { toastSuccess } from "../../utils/ToastUtils";

function* authenticate(action) {
  let { username, password } = action;

  const response = yield call(commonUserApis.authenticate, username, password);

  if (response === null) {
    yield put({
      type: CommonUserAct.ACT_AUTHENTICATE_FAILED,
    });
    return;
  }

  // Case SUCCESS
  const { data } = response;

  // Save to local storage
  yield call(helpers_SaveAuthToStorage, data);

  // Change to reducers with type ACT_AUTHENTICATE_SUCCESS
  yield put({
    type: CommonUserAct.ACT_AUTHENTICATE_SUCCESS,
    authResponse: data,
    username,
  });
}

function* validateToken(action) {
  const response = yield call(commonUserApis.validateToken);

  if (response === null) {
    yield put({
      type: CommonUserAct.VALIDATE_TOKEN_FAILED,
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: CommonUserAct.VALIDATE_TOKEN_SUCCESS,
    validateTokenRes: response.data,
  });
}

function* changePassword(action) {
  let { requestDto } = action;
  const response = yield call(commonUserApis.changePassword, requestDto);

  if (response === null) {
    yield put({
      type: CommonUserAct.CHANGE_PASSWORD_FAILED,
    });
    return;
  }

  // Case SUCCESS
  toastSuccess("Đổi mật khẩu thành công!");
  yield put({
    type: CommonUserAct.CHANGE_PASSWORD_SUCCESS,
  });
}

export const commonUserSagas = [
  takeEvery(CommonUserAct.ACT_AUTHENTICATE, authenticate),
  takeEvery(CommonUserAct.VALIDATE_TOKEN, validateToken),
  takeEvery(CommonUserAct.CHANGE_PASSWORD, changePassword),
];
