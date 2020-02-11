import { combineReducers } from "redux";
import inOutAmountOfYear from "./inOutAmountOfYear";
import newClientOfYear from "./newClientOfYear";
import ui from "./ui";

const statisticReducer = combineReducers({
  inOutAmountOfYear,
  newClientOfYear,
  ui
});

export default statisticReducer;
