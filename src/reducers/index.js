import polls from "./polls";
import users from "./users";
import authedUser from "./authedUser";
import loading from "./loading";
import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";

export default combineReducers({
  users,
  polls,
  authedUser,
  loading,
  loadingBar: loadingBarReducer, 
});
