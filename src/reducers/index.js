import questions from "./questions";
import users from "./users";
import authedUser from "./authedUser";
import loading from "./loading";
import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";

export default combineReducers({
  users,
  questions,
  authedUser,
  loading,
  loadingBar: loadingBarReducer,
});
