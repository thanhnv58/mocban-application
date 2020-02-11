import { combineReducers } from "redux";
import pageUser from "./user-screen/pageUser";
import userDetail from "./user-screen/userDetail";
import ui from "./ui";

const managerReducer = combineReducers({
  pageUser,
  userDetail,

  // UI
  ui
});

export default managerReducer;
