import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
// import { handleAddUser } from "../actions/users";
import { setAuthedUser } from "../actions/authedUser";
// WHEN PAGE OPENS RENDER NEW USER OBJ WITH NEW RANDOM IMAGE
// IF USER SUBMITS NAME AND PASSWORD ADD TO THE OBJECT THEN SUBMIT THE OBJECT TO DISPATCH
const LogIn = (props) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [formReady, setFormReady] = useState(false);
  const navigate = useNavigate();
  const { dispatch, image, users } = props;

  const checkForm = (e) => {
    if (e.target.id === "userName") setUser(e.target.value);
    else if (e.target.id === "password") setPassword(e.target.value);
    if (user !== "" && password !== "" && password.length > 5)
      setFormReady(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (users[user]) {
      if (users[user].password === password) {
        dispatch(setAuthedUser(user));
        navigate("/");
      } else {
        alert("Wrong password. Try again.");
      }
    } else {
      alert("This account does not exist. Add New User.")
    }

    setUser("");
    setPassword("");
  };
  const toAddUserForm = () => {
    navigate("/add-user");
  };
  //TODO: create random image

  return (
    <div className="container">
      <img src={image} alt="description" className="avatar" />
      <div className="add-new">
        <form onSubmit={handleSubmit} className="add-new">
          <label htmlFor="userName" className="form-label center">
            User
          </label>
          <input
            placeholder="User Name"
            type="text"
            name="userName"
            id="userName"
            value={user}
            onChange={checkForm}
          />
          <label htmlFor="password" className="form-label center">
            Password
          </label>
          <input
            placeholder="Password"
            type="text"
            name="password"
            id="password"
            value={password}
            onChange={checkForm}
          />
          <button
            type="submit"
            className="btn log-in-button"
            disabled={!formReady}
          >
            Log In
          </button>
        </form>

        <input
          type="button"
          className="btn add-new-btn"
          value="Add New User"
          onClick={toAddUserForm}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }, { image }) => ({
  authedUser,
  image,
  users,
});
export default connect(mapStateToProps)(LogIn);
