import { showLoading, hideLoading } from "react-redux-loading-bar";
import { getInitialData } from "../utils/api";
// import { setAuthedUser } from "./authedUser";

export const RECEIVE_DATA = "RECIVE_DATA";
// const AUTHED_ID = "mthornton";

export const recieveData = (users, polls) => ({
    type: RECEIVE_DATA,
    users,
    polls,
});

export const handleInitialData = () => {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, polls }) => {
      // dispatch(setAuthedUser(AUTHED_ID));
      dispatch(recieveData(users, polls));
      dispatch(hideLoading());
    });
  };
};
