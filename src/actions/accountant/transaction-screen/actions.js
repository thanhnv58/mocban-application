import * as types from "./types";

export const getTransactionOfClient = (clientUsername, transactionType) => {
  return {
    type: types.GET_TRANSACTION_OF_CLIENT,
    clientUsername,
    transactionType
  };
};

export const createAllTransactions = requestDto => {
  return {
    type: types.CREATE_ALL_TRANSACTION,
    requestDto
  };
};

export const confirmCreateSuccess = () => {
  return {
    type: types.CREATE_ALL_TRANSACTION_CONFIRM
  };
};

export const searchTransaction = (requestDto, searchOption) => {
  return {
    type: types.SEARCH_TRANSACTION,
    requestDto,
    searchOption
  };
};

export const loadMoreSearchTransaction = () => {
  return {
    type: types.LOAD_MORE_SEARCH_TRANSACTION
  };
};

export const loadMoreClientTransactionList = () => {
  return {
    type: types.LOAD_MORE_CLIENT_TRANSACTION_LIST
  };
};

export const getTransactionNeedValidate = () => {
  return {
    type: types.GET_TRANSACTION_NEED_VALIDATE
  };
};

export const loadMoreTransactionNeedValidate = () => {
  return {
    type: types.LOAD_MORE_TRANSACTION_NEED_VALIDATE
  };
};

export const validateTransactionOk = transactionId => {
  return {
    type: types.VALIDATE_TRANSACTION_OK,
    transactionId
  };
};
