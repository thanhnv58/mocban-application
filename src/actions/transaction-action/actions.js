import * as types from "./types";

// old
export const fetchTransactionProject = projectId => {
  return {
    type: types.FETCH_TRANSACTION_PROJECT,
    projectId
  };
};

export const addTransaction = (transactionType, transactionDto) => {
  return {
    type: types.ADD_TRANSACTION,
    transactionDto,
    transactionType
  };
};

export const removeTransaction = (transactionType, transactionId) => {
  return {
    type: types.REMOVE_TRANSACTION,
    transactionId,
    transactionType
  };
};

export const saveAllTransaction = transactionType => {
  return {
    type: types.SAVE_ALL_TRANSACTION,
    transactionType
  };
};
