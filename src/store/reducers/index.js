import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import logs from "./logs";
import foundLog from "./foundLog";

const rootReducer = combineReducers({
  currentUser,
  errors,
  logs,
  foundLog
});

export default rootReducer;
