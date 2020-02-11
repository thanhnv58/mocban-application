import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import accountantReducer from "./accountant/accountant-reducers";
import auth from "./auth";
import notificationReducer from "./notification/notification-reducers";
import saleReducer from "./sale/sale-reducers";
import statisticReducer from "./statistic/statistic-reducers";
import technicianReducer from "./technician/technician-reducers";
import managerReducer from "./manager/manager-reducers";

const rootReducer = combineReducers({
  form: formReducer,
  auth,
  saleReducer,
  accountantReducer,
  notificationReducer,
  statisticReducer,
  technicianReducer,
  managerReducer
});

export default rootReducer;
