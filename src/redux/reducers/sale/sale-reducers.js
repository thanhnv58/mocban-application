import { combineReducers } from "redux";
import statisticOfMonth from "./main-screen/statisticOfMonth";
import statisticOfYear from "./main-screen/statisticOfYear";
import newOrder from "./order-management/newOrder";
import pageClient from "./client-management/pageClient";
import clientDetail from "./client-management/clientDetail";
import pageOrder from "./order-management/pageOrder";
import orderDetail from "./order-management/orderDetail";
import ui from "./ui";

const saleReducer = combineReducers({
  // Main-screen
  statisticOfMonth,
  statisticOfYear,

  // Client-screen
  pageClient,
  clientDetail,

  // Order-Screen
  newOrder,
  pageOrder,
  orderDetail,

  // UI
  ui,
});

export default saleReducer;
