import { call, put, takeEvery } from "redux-saga/effects";
import * as AuthActType from "./../../actions/auth-action/types";
import * as authApis from "./../../utils/api/authApis";
import { saveAuthToStorage } from "./../../utils/helpers";

function* authenticate(action) {
  let { username, password } = action;

  const response = yield call(authApis.authenticate, username, password);

  if (response === null) {
    yield put({
      type: AuthActType.ACT_AUTHENTICATE_FAILED
    });
    return;
  }

  // Case SUCCESS
  const { data } = response;

  yield call(saveAuthToStorage, data);

  yield put({
    type: AuthActType.ACT_AUTHENTICATE_SUCCESS,
    authResponse: data,
    username
  });
}

function* validateToken(action) {
  const response = yield call(authApis.validateToken);

  if (response === null) {
    yield put({
      type: AuthActType.VALIDATE_TOKEN_FAILED
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: AuthActType.VALIDATE_TOKEN_SUCCESS,
    validateUser: response.data
  });
}

export const authSagas = [
  takeEvery(AuthActType.ACT_AUTHENTICATE, authenticate),
  takeEvery(AuthActType.VALIDATE_TOKEN, validateToken)
];
