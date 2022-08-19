import { showLoading, hideLoading } from "react-redux-loading-bar";
import { saveUser } from "../utils/api";
import { handleLogIn } from "./authedUser";

export const ADD_USER = "ADD_USER";

export const addUser = (user) => ({
  type: ADD_USER,
  user,
});

export const handleAddUser = ({fullName, image, password, userName, users}) => {
  return (dpatch) => {
    dpatch(showLoading());
    return saveUser({ fullName, image, password, userName, users })
      .then((user) => {
        dpatch(addUser(user));
        dpatch(handleLogIn(user.id));
      })
      .then(() => dpatch(hideLoading()))
      .catch((err) => {
        alert(err);
        dpatch(hideLoading())
      });
  };
};


