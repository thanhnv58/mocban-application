import { combineReducers } from "redux";
import statisticOfMonth from "./main-screen/statisticOfMonth";
import statisticOfYear from "./main-screen/statisticOfYear";
import newOrder from "./order-screen/newOrder";
import pageClient from "./client-screen/pageClient";
import pageClientOrder from "./order-screen/pageClientOrder";
import pageOrder from "./order-screen/pageOrder";
import orderDetail from "./order-screen/orderDetail";
import pageTransactionIncomeDetail from "./order-screen/pageTransactionIncomeDetail";
import ui from "./ui";

const saleReducer = combineReducers({
  // Main-screen
  statisticOfMonth,
  statisticOfYear,

  // Client-screen
  pageClient,

  // Order-Screen
  newOrder,
  pageOrder,
  pageClientOrder,
  orderDetail,
  pageTransactionIncomeDetail,

  // UI
  ui
});

export default saleReducer;
