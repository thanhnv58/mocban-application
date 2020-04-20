import { combineReducers } from "redux";
import pageUser from "./user-management/pageUser";
import userDetail from "./user-management/userDetail";
import ui from "./ui";

const adminReducer = combineReducers({
  pageUser,
  userDetail,

  // UI
  ui,
});

export default adminReducer;
