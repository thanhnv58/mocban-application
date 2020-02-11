import { call, put, takeEvery, select } from "redux-saga/effects";
import * as TransactionScreenType from "../../../actions/accountant/transaction-screen/types";
import * as transactionApi from "../../../utils/api/transactionApi";
import * as toastUtils from "./../../../utils/toastUtils";
import { parseDateTime2 } from "./../../../utils/timeUtils";
import * as TransactionOwner from "./../../../constants/TransactionOwner";
import * as TransactionType from "./../../../constants/TransactionType";

function* getTransactionOfClient(action) {
  let { clientUsername, transactionType } = action;

  const response = yield call(
    transactionApi.getTransactionOfClient,
    clientUsername,
    transactionType,
    0
  );

  if (response === null) {
    yield put({
      type: TransactionScreenType.GET_TRANSACTION_OF_CLIENT_FALIED
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: TransactionScreenType.GET_TRANSACTION_OF_CLIENT_SUCCESS,
    transactionOfClient: response.data
  });
}

function* createAllTransactions(action) {
  let { requestDto } = action;

  const response = yield call(transactionApi.createTransaction, requestDto);

  if (response === null) {
    yield put({
      type: TransactionScreenType.CREATE_ALL_TRANSACTION_FAILED
    });
    return;
  }

  // Case SUCCESS
  toastUtils.toastSuccess("Lưu tất cả giao dịch thành công!");
  yield put({
    type: TransactionScreenType.CREATE_ALL_TRANSACTION_SUCCESS,
    createAllRes: response.data
  });
}

function* searchTransaction(action) {
  let { requestDto } = action;
  const response = yield call(transactionApi.searchTransaction, requestDto, 0);

  if (response === null) {
    yield put({
      type: TransactionScreenType.SEARCH_TRANSACTION_FAILED
    });
    return;
  }

  // Case 204 - No content
  let { status } = response;
  if (status === 204) {
    yield put({
      type: TransactionScreenType.SEARCH_TRANSACTION_NO_CONTENT
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: TransactionScreenType.SEARCH_TRANSACTION_SUCCESS,
    pageSearchTransaction: response.data
  });
}

function* getTransactionNeedValidate(action) {
  const response = yield call(transactionApi.getTransactionNeedValidate, 0);

  if (response === null) {
    yield put({
      type: TransactionScreenType.GET_TRANSACTION_NEED_VALIDATE_FAILED
    });
    return;
  }

  // Case 204 - No content
  let { status } = response;
  if (status === 204) {
    yield put({
      type: TransactionScreenType.GET_TRANSACTION_NEED_VALIDATE_NO_CONTENT
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: TransactionScreenType.GET_TRANSACTION_NEED_VALIDATE_SUCCESS,
    pageTransactionNeedValidateRes: response.data
  });
}

function* loadMoreSearchTransaction(action) {
  const pageSearchTransaction = yield select(
    state => state.accountantReducer.pageSearchTransaction
  );
  const searchTransactionOption = yield select(
    state => state.accountantReducer.ui.searchTransactionOption
  );

  let {
    radioSearchByTime,
    radioSearchByOwner,
    radioSearchByType,
    byMonth,
    byYear,
    startDate,
    endDate
  } = searchTransactionOption;

  let owner =
    radioSearchByOwner === 0
      ? TransactionOwner.ALL
      : radioSearchByOwner === 1
      ? TransactionOwner.COMPANY
      : TransactionOwner.CLIENT;

  let type =
    radioSearchByType === 0
      ? null
      : radioSearchByType === 1
      ? TransactionType.INCOME
      : TransactionType.PAY;

  let requestDto = {
    owner,
    type,
    startDate: radioSearchByTime === 1 ? parseDateTime2(startDate) : null,
    endDate: radioSearchByTime === 1 ? parseDateTime2(endDate) : null,
    month: radioSearchByTime === 0 ? `${byMonth}-${byYear}` : null
  };

  let { currentPage } = pageSearchTransaction;

  const response = yield call(
    transactionApi.searchTransaction,
    requestDto,
    currentPage + 1
  );

  if (response === null) {
    yield put({
      type: TransactionScreenType.LOAD_MORE_SEARCH_TRANSACTION_FAILED
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: TransactionScreenType.LOAD_MORE_SEARCH_TRANSACTION_SUCCESS,
    pageLoadMoreSearchTransaction: response.data
  });
}

function* loadMoreClientTransactionList(action) {
  const transactionOfClient = yield select(
    state => state.accountantReducer.transactionOfClient
  );

  let { client, transactions } = transactionOfClient;
  let { currentPage } = transactions;

  const response = yield call(
    transactionApi.getTransactionOfClient,
    client.username,
    null,
    currentPage + 1
  );

  if (response === null) {
    yield put({
      type: TransactionScreenType.LOAD_MORE_CLIENT_TRANSACTION_LIST_FAILED
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: TransactionScreenType.LOAD_MORE_CLIENT_TRANSACTION_LIST_SUCCESS,
    pageLoadMoreClientTransaction: response.data
  });
}

function* loadMoreTransactionNeedValidate(action) {
  const pageTransactionNeedValidate = yield select(
    state => state.accountantReducer.pageTransactionNeedValidate
  );

  let { currentPage } = pageTransactionNeedValidate;

  const response = yield call(
    transactionApi.getTransactionNeedValidate,
    currentPage + 1
  );

  if (response === null) {
    yield put({
      type: TransactionScreenType.LOAD_MORE_TRANSACTION_NEED_VALIDATE_FAILED
    });
    return;
  }

  // Case SUCCESS
  yield put({
    type: TransactionScreenType.LOAD_MORE_TRANSACTION_NEED_VALIDATE_SUCCESS,
    pageLoadMoreTransactionNeedValidate: response.data
  });
}

function* validateTransactionOk(action) {
  let { transactionId } = action;

  const response = yield call(
    transactionApi.validateTransactionOk,
    transactionId
  );

  if (response === null) {
    yield put({
      type: TransactionScreenType.VALIDATE_TRANSACTION_OK_FAILED
    });
    return;
  }

  // Case SUCCESS
  toastUtils.toastSuccess("Xác nhận thành công!");
  yield put({
    type: TransactionScreenType.VALIDATE_TRANSACTION_OK_SUCCESS,
    validateRes: response.data
  });
}

export const accountant_TransactionScreenSagas = [
  takeEvery(
    TransactionScreenType.GET_TRANSACTION_OF_CLIENT,
    getTransactionOfClient
  ),

  takeEvery(
    TransactionScreenType.CREATE_ALL_TRANSACTION,
    createAllTransactions
  ),
  takeEvery(TransactionScreenType.SEARCH_TRANSACTION, searchTransaction),
  takeEvery(
    TransactionScreenType.LOAD_MORE_SEARCH_TRANSACTION,
    loadMoreSearchTransaction
  ),
  takeEvery(
    TransactionScreenType.LOAD_MORE_CLIENT_TRANSACTION_LIST,
    loadMoreClientTransactionList
  ),
  takeEvery(
    TransactionScreenType.GET_TRANSACTION_NEED_VALIDATE,
    getTransactionNeedValidate
  ),
  takeEvery(
    TransactionScreenType.LOAD_MORE_TRANSACTION_NEED_VALIDATE,
    loadMoreTransactionNeedValidate
  ),
  takeEvery(
    TransactionScreenType.VALIDATE_TRANSACTION_OK,
    validateTransactionOk
  )
];
