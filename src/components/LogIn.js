import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
// import { handleAddUser } from "../actions/users";
import { setAuthedUser } from "../actions/authedUser";
import { Link } from "react-router-dom";
// WHEN PAGE OPENS RENDER NEW USER OBJ WITH NEW RANDOM IMAGE
// IF USER SUBMITS NAME AND PASSWORD ADD TO THE OBJECT THEN SUBMIT THE OBJECT TO DISPATCH
const LogIn = (props) => {
  // const [user, setUser] = useState("");
  // const [password, setPassword] = useState("");
  const [formReady, setFormReady] = useState(false);
  const navigate = useNavigate();
  const { dispatch, image, users } = props;
  const userRef = useRef("");
  const passwordRef = useRef("");

  const checkForm = () => {
    
    if (
      userRef.current.value !== "" &&
      passwordRef.current.value !== "" &&
      passwordRef.current.value.length > 5
    )
      setFormReady(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (users[userRef.current.value]) {
      if (users[userRef.current.value].password === passwordRef.current.value) {
        // setUser(userRef.current.value);
        // setPassword(passwordRef.current.value);
        dispatch(setAuthedUser(userRef.current.value));
        navigate("/");
      } else {
        alert("Wrong password. Try again.");
      }
    } else {
      alert("This account does not exist. Add New User.");
    }

    // setUser("");
    // setPassword("");
  };
  // const toAddUserForm = () => {
  //   setFormReady(true)

  //   navigate("/add-user");
  // };
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
            // value={user}
            ref={userRef}
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
            // value={password}
            ref={passwordRef}
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

        <Link
          to="/add-user"
          className="btn add-new-btn"
          value="Add New User"
          // onClick={toAddUserForm}
        >
          Add New User
        </Link>
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
