import { combineReducers } from "redux";
import testReducer from "./testReducer";
import userReducer from "./userReducer";
import playlistReducer from "./playlistReducer";
import modalReducer from "./modalReducer";

export default combineReducers({
  userReducer: userReducer,
  testReducer: testReducer,
  playlistReducer: playlistReducer,
  modalReducer: modalReducer,
});
