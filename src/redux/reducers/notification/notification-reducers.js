import { combineReducers } from "redux";
import pageNotification from "./pageNotification";
import ui from "./ui";

const notificationReducer = combineReducers({
  pageNotification,
  ui
});

export default notificationReducer;
