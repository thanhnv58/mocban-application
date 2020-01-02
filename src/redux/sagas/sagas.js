import { all, call, delay, put, select, takeEvery } from "redux-saga/effects";
import * as transactionApi from "../../utils/api/transactionApi";
import * as ProjectScreenActType from "./../../actions/project-screen-action/types";
import * as TransactionActType from "./../../actions/transaction-action/types";
import * as UserScreenType from "./../../actions/user-screen-action/types";
import * as TransactionType from "./../../constants/TransactionType";
import * as projectApis from "./../../utils/api/projectApis";
import * as userApis from "./../../utils/api/userApis";
import * as toastUtils from "./../../utils/toastUtils";
import { authSagas } from "./auth-sagas";
import { sale_ClientScreenSagas } from "./sale/client-screen-sagas";
import { sale_OrderScreenSagas } from "./sale/order-screen-sagas";
import { sale_MainScreenSagas } from "./sale/main-screen-sagas";

function* fetchUser(action) {
  let { page } = action;
  const response = yield call(userApis.getAllUser, page);

  if (response === null) {
    yield put({
      type: UserScreenType.ACT_FETCH_USER_FAILED
    });
    return;
  }

  // Case 204 - No content
  let { status } = response;
  if (status === 204) {
    yield put({
      type: UserScreenType.ACT_FETCH_USER_SUCCESS,
      pageUser: null
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: UserScreenType.ACT_FETCH_USER_SUCCESS,
    pageUser: response.data
  });
}

function* getUserInfo(action) {
  let { username, phoneNumber, email } = action;
  const response = yield call(
    userApis.getUserInfo,
    username,
    phoneNumber,
    email
  );

  if (response === null) {
    yield put({
      type: ProjectScreenActType.GET_USER_INFO_FAILED
    });
    return;
  }

  // Case 204 - No content
  let { status } = response;
  if (status === 204) {
    toastUtils.toastWarning("Người dùng này không tồn tại!");
    yield put({
      type: ProjectScreenActType.GET_USER_INFO_FAILED
    });
    return;
  }

  // Case SUCCESS
  toastUtils.toastSuccess("Xác thực thành công!");
  yield put({
    type: ProjectScreenActType.GET_USER_INFO_SUCCES,
    client: response.data
  });
}

function* createProject(action) {
  let { requestDto } = action;
  const response = yield call(projectApis.createProject, requestDto);
  yield delay(10);

  if (response === null) {
    yield put({
      type: ProjectScreenActType.CREATE_PROJECT_FAILED
    });
    return;
  }

  // Case SUCCESS
  toastUtils.toastSuccess("Tạo dự án thành công!");
  yield put({
    type: ProjectScreenActType.CREATE_PROJECT_SUCCESS,
    project: response.data
  });
}

function* fetchProjectDetail(action) {
  let { projectId } = action;

  const response = yield call(projectApis.fetchProjectDetail, projectId);

  if (response === null) {
    yield put({
      type: ProjectScreenActType.FETCH_PROJECT_DETAIL_FAILED,
      notFound: false
    });
    return;
  }

  // Case 204 - No content
  let { status } = response;
  if (status === 204) {
    yield put({
      type: ProjectScreenActType.FETCH_PROJECT_DETAIL_NOT_FOUND
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: ProjectScreenActType.FETCH_PROJECT_DETAIL_SUCCESS,
    projectDetailRes: response.data
  });
}

function* updateProjectInfo(action) {
  let { requestDto } = action;
  const response = yield call(projectApis.updateProjectInfo, requestDto);

  if (response === null) {
    yield put({
      type: ProjectScreenActType.UPDATE_PROJECT_INFO_FAILED
    });
    return;
  }

  // Case SUCCESS
  toastUtils.toastSuccess("Cập nhật thông tin thành công!");
  yield put({
    type: ProjectScreenActType.UPDATE_PROJECT_INFO_SUCCESS,
    updateProjectRes: response.data
  });
}

function* changePhase(action) {
  let { requestDto } = action;

  const response = yield call(projectApis.changePhase, requestDto);

  if (response === null) {
    yield put({
      type: ProjectScreenActType.CHANGE_PHASE_FAILED
    });
    return;
  }

  // Case SUCCESS
  toastUtils.toastSuccess("Gửi yêu cầu thành công!");
  yield put({
    type: ProjectScreenActType.CHANGE_PHASE_SUCCESS,
    changePhaseRes: response.data
  });
}

function* confirmWork(action) {
  let { requestDto, phase } = action;
  const response = yield call(projectApis.confirmWork, requestDto);

  if (response === null) {
    yield put({
      type: ProjectScreenActType.CONFIRM_WORK_FAILED
    });
    return;
  }

  // Case SUCCESS
  toastUtils.toastSuccess("Xác thực công việc thành công!");
  yield put({
    type: ProjectScreenActType.CONFIRM_WORK_SUCCESS,
    confirmWorkRes: response.data,
    phase
  });
}

function* updateProjectDetail(action) {
  let { requestDto } = action;

  const response = yield call(projectApis.updateProjectDetail, requestDto);

  if (response === null) {
    yield put({
      type: ProjectScreenActType.UPDATE_PROJECT_DETAIL_FAILED
    });
    return;
  }

  // Case SUCCESS
  toastUtils.toastSuccess("Cập nhật thành công!");
  yield put({
    type: ProjectScreenActType.UPDATE_PROJECT_DETAIL_SUCCESS,
    updateProjectDetailRes: response.data
  });
}

function* closeProject(action) {
  let { requestDto } = action;

  const response = yield call(projectApis.closeProject, requestDto);

  if (response === null) {
    yield put({
      type: ProjectScreenActType.CLOSE_PROJECT_FAILED
    });
    return;
  }

  // Case SUCCESS
  toastUtils.toastSuccess("Đóng dự án thành công thành công!");
  yield put({
    type: ProjectScreenActType.CLOSE_PROJECT_SUCCESS,
    closeProjectRes: response.data
  });
}

function* fetchListProject(action) {
  const response = yield call(projectApis.fetchListProject, 0);

  if (response === null) {
    yield put({
      type: ProjectScreenActType.FETCH_LIST_PROJECT_FAILED
    });
    return;
  }

  // Case 204 - No content
  let { status } = response;
  if (status === 204) {
    yield put({
      type: ProjectScreenActType.FETCH_LIST_PROJECT_NO_CONTENT
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: ProjectScreenActType.FETCH_LIST_PROJECT_SUCCESS,
    pageProject: response.data
  });
}

function* fetchListProjectOfUser(action) {
  let { userId } = action;

  const response = yield call(projectApis.fetchListProjectOfUser, 0, userId);
  if (response === null) {
    yield put({
      type: ProjectScreenActType.FETCH_LIST_PROJECT_OF_USER_FAILED
    });
    return;
  }

  // Case 204 - No content
  let { status } = response;
  if (status === 204) {
    yield put({
      type: ProjectScreenActType.FETCH_LIST_PROJECT_OF_USER_NO_CONTENT,
      userId: userId
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: ProjectScreenActType.FETCH_LIST_PROJECT_OF_USER_SUCCESS,
    pageProjectOfUser: response.data,
    userId: userId
  });
}

function* fetchTransactionProject(action) {
  let { projectId } = action;

  const response = yield call(
    transactionApi.fetchTransactionProject,
    projectId
  );

  if (response === null) {
    yield put({
      type: TransactionActType.FETCH_TRANSACTION_PROJECT_FAILED
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: TransactionActType.FETCH_TRANSACTION_PROJECT_SUCCESS,
    transactionOfProject: response.data
  });
}

function* saveAllTransaction(action) {
  let { transactionType } = action;
  let transaction = yield select(state => state.transaction);
  let totalAmountSave = 0;
  let tmpList = [];

  if (transactionType === TransactionType.INCOME) {
    tmpList = transaction.transactionIncome;
    totalAmountSave = transaction.tmpTotalIncome;
  } else {
    tmpList = transaction.transactionPay;
    totalAmountSave = transaction.tmpTotalPay;
  }

  let listTransaction = tmpList.map(t => {
    return {
      name: t.name,
      amount: t.amount,
      createdDate: t.createdDate
    };
  });

  let requestDto = {
    projectId: transaction.projectId,
    transactions: listTransaction
  };

  const response = yield call(
    transactionApi.saveAllTransaction,
    transactionType,
    requestDto
  );

  if (response === null) {
    yield put({
      type: TransactionActType.SAVE_ALL_TRANSACTION_FAILED
    });
    return;
  }

  // Case SUCCESS
  toastUtils.toastSuccess("Lưu giao dịch thành công!");
  yield put({
    type: TransactionActType.SAVE_ALL_TRANSACTION_SUCCESS,
    createTransactionRes: response.data,
    transactionType,
    totalAmountSave
  });
}

function* rootSaga() {
  yield all([
    ...authSagas,
    ...sale_ClientScreenSagas,
    ...sale_OrderScreenSagas,
    ...sale_MainScreenSagas
  ]);

  // OLD
  yield takeEvery(UserScreenType.ACT_FETCH_USER, fetchUser);
  yield takeEvery(ProjectScreenActType.GET_USER_INFO, getUserInfo);
  yield takeEvery(ProjectScreenActType.CREATE_PROJECT, createProject);
  yield takeEvery(
    ProjectScreenActType.FETCH_PROJECT_DETAIL,
    fetchProjectDetail
  );

  yield takeEvery(ProjectScreenActType.UPDATE_PROJECT_INFO, updateProjectInfo);
  yield takeEvery(ProjectScreenActType.CHANGE_PHASE, changePhase);
  yield takeEvery(ProjectScreenActType.CONFIRM_WORK, confirmWork);
  yield takeEvery(
    ProjectScreenActType.UPDATE_PROJECT_DETAIL,
    updateProjectDetail
  );

  yield takeEvery(ProjectScreenActType.CLOSE_PROJECT, closeProject);
  yield takeEvery(ProjectScreenActType.FETCH_LIST_PROJECT, fetchListProject);
  yield takeEvery(
    ProjectScreenActType.FETCH_LIST_PROJECT_OF_USER,
    fetchListProjectOfUser
  );

  yield takeEvery(
    TransactionActType.FETCH_TRANSACTION_PROJECT,
    fetchTransactionProject
  );

  yield takeEvery(TransactionActType.SAVE_ALL_TRANSACTION, saveAllTransaction);
}

export default rootSaga;
