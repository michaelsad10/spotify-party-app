import { combineReducers } from "redux";
import testReducer from "./testReducer";
import userReducer from "./userReducer";

export default combineReducers({
  userReducer: userReducer,
  testReducer: testReducer,
});
