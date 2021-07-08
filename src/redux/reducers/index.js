import { combineReducers } from "redux";
import setUserDataReducer from "./setUserData.reducers";

export default combineReducers({
  UserData: setUserDataReducer,
});
