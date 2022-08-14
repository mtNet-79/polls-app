import { showLoading, hideLoading } from "react-redux-loading-bar";
import { saveUser } from "../utils/api";
import { handleLogIn } from "./authedUser";

export const ADD_USER = "ADD_USER";

const addUser = (user) => ({
  type: ADD_USER,
  user,
});

export const handleAddUser = (user, src, password) => {
  console.log(`user, src, password: ${user}, ${src}, ${password}` );
  
  return (dpatch) => {
    dpatch(showLoading());
    return saveUser({ user, src, password })
      .then((user) => {
        dpatch(addUser(user));
        dpatch(handleLogIn(user.id));
      })
      .then(() => dpatch(hideLoading()))
      .catch(() => {
        alert("An error occured. Try again.");
      });
  };
};


