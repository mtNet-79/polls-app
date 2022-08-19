export const SET_AUTHED_USER = "SET_AUTHED_USER";

export const setAuthedUser = (id) => ({
  type: SET_AUTHED_USER,
  id,
});

export const handleLogIn = (user) => {
  return (dpatch) => {
    dpatch(setAuthedUser(user));
  };
};

export const handleLogOut = () => {
  return (dpatch) => {
    dpatch(setAuthedUser());
  };
};
