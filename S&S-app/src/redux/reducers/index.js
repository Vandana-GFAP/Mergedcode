import { combineReducers } from "redux";
import loginReducer from "./login.reducer";
import userDataReducer from "./userData.reducer";
import utilReducer from "./util.reducer";

export default combineReducers({
  userDataReducer,
  loginReducer,
  utilReducer
});
