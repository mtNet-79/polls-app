import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

const Nav = (props) => {
  // console.log("nav props: ", props);
  const { dispatch, users, authedUser } = props;
  const user = users[authedUser];

  const hanldeLogOutOnClick = () => {
    dispatch(setAuthedUser());
  };

  return (
    <div className="nav">
      {authedUser ? (
        <>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/leaderboard">Leaderboard</NavLink>
            </li>
            <li>
              <NavLink to="/add">Post</NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <img src={user.avatarURL} alt="icon" className="avatar-small" />
              <span>{user.id}</span>
            </li>
            <li>
              <Link to="/" onClick={hanldeLogOutOnClick}>
                Log out
              </Link>
            </li>
          </ul>
        </>
      ) : (
        <>
          <div></div>
          <div style={{margin:"12px"}}>
            <Link to="/login" style={{color:"blue"}}>
                Sign In
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  users,
});

export default connect(mapStateToProps)(Nav);
