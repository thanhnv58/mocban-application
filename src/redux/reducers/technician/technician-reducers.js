import { combineReducers } from "redux";
import pageTask from "./task-screen/pageTask";
import taskDetail from "./task-screen/taskDetail";
import notificationTechnician from "./main-screen/notificationTechnician";
import ui from "./ui";

const technicianReducer = combineReducers({
  // Task-list-screen
  pageTask,
  taskDetail,
  notificationTechnician,

  // UI
  ui
});

export default technicianReducer;
