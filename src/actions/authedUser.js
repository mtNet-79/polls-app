import { showLoading, hideLoading } from "react-redux-loading-bar";

export const SET_AUTHED_USER = "SET_AUTHED_USER";

export const setAuthedUser = (id) => ({
  type: SET_AUTHED_USER,
  id,
});

export const handleLogIn = (user) => {  
    return (dpatch) => {
      // dpatch(showLoading());
      
        dpatch(setAuthedUser(user))
    

    }
    // return saveUser({ user, src, password })
    //   .then((user) => {
    //     dpatch(addUser(user));
    //   })
    //   .then(() => dpatch(hideLoading()))
    //   .catch(() => {
    //     alert("An error occured. Try again.");
    //   });
 
};
