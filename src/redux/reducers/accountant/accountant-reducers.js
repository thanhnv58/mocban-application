import { combineReducers } from "redux";
import pageClient from "./client-screen/pageClient";
import transactionOfClient from "./transaction-screen/transactionOfClient";
import createAllTransaction from "./transaction-screen/createAllTransaction";
import pageSearchTransaction from "./transaction-screen/pageSearchTransaction";
import pageTransactionNeedValidate from "./transaction-screen/pageTransactionNeedValidate";
import notificationAccountant from "./main-screen/notificationAccountant";
import ui from "./ui";

const accountantReducer = combineReducers({
  // Client-screen
  pageClient,

  // Transaction-screen
  transactionOfClient,
  createAllTransaction,
  pageSearchTransaction,
  pageTransactionNeedValidate,
  notificationAccountant,

  // UI
  ui
});

export default accountantReducer;
