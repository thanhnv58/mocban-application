import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import users from "./users";
import ui from "./ui";
import project from "./project";
import pageProject from "./pageProject";
import projectInfo from "./projectInfo";
import transactionInfo from "./transactionInfo";
import transaction from "./transaction";
import saleReducer from "./sale/sale-reducers";

const rootReducer = combineReducers({
  form: formReducer,
  auth,
  saleReducer,

  users,
  ui,
  project,
  pageProject,
  projectInfo,
  transactionInfo,
  transaction
});

export default rootReducer;
