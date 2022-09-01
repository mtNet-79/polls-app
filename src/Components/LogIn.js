import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Link } from "react-router-dom";
import { autoComplete } from "../utils/helpers";
import PropTypes from 'prop-types';

const LogIn = (props) => {
  const [formReady, setFormReady] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const redirectedFrom = state?.from;
  const { dispatch, image, users, authedUser } = props;
  const userRef = useRef("");
  const passwordRef = useRef("");

  useEffect(() => {
    if(authedUser) {
      const { from } = redirectedFrom || { from: { pathname: "/" } };
      console.log("from : ", from);
      navigate(from);
    }
  });

  const checkForm = (e) => {
    if (e.target.id === "userName") autoComplete(e.target, users);

    if (
      userRef.current.value !== "" &&
      passwordRef.current.value !== "" &&
      passwordRef.current.value.length > 5
    )
      setFormReady(true);
  };

  const showUsers = (e) => {
    autoComplete(e.target, users);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
    if (users[userRef.current.value]) {
      if (users[userRef.current.value].password === passwordRef.current.value) {
        dispatch(setAuthedUser(userRef.current.value));
        redirectedFrom ? navigate(redirectedFrom) : navigate("/");
      } else {
        alert("Wrong password. Try again.");
      }
    } else {
      alert("This account does not exist. Add New User.");
    }
  };

  return (
    <div className="container">
      <img src={image} alt="description" className="avatar" />
      <div className="add-new">
        <form onSubmit={handleSubmit} className="add-new">
          <label htmlFor="userName" className="form-label center">
            User
          </label>
          <div className="autocomplete" style={{ width: "300px" }}>
            <input
              placeholder="User Name"
              type="text"
              name="userName"
              id="userName"
              ref={userRef}
              onChange={checkForm}
              onClick={showUsers}
              autoComplete="off"
            />
          </div>

          <label htmlFor="password" className="form-label center">
            Password
          </label>
          <input
            placeholder="Password"
            type="text"
            name="password"
            id="password"
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

        <Link to="/add-user" className="btn add-new-btn" value="Add New User">
          Add New User
        </Link>
      </div>
    </div>
  );
};

LogIn.propTypes = {
  authedUser: PropTypes.string,
  image: PropTypes.string.isRequired,
  users: PropTypes.object.isRequired,
}

const mapStateToProps = ({ authedUser, users }, { image }) => ({
  authedUser,
  image,
  users,
});

export default connect(mapStateToProps)(LogIn);
