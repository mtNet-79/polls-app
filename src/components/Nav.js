import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";



const Nav = (props) => {
  console.log("nav props: ", props);
  const { dispatch, users, authedUser } = props;
  const user  = users[authedUser];

  const hanldeLogOutOnClick = () => {
    dispatch(setAuthedUser());
  }

  return (
    <div className="nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/leaderboard">Ledaerboard</Link>
        </li>
        <li>
          <Link to="/new">Post</Link>
        </li>
      </ul>
      <ul>
        <li>
          <img src={user.avatarURL} alt="icon" className="avatar-small" />
          <span>{user.id}</span>
        </li>
        <li>
          <Link to="/login" onClick={hanldeLogOutOnClick}>Logout</Link>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  users,
});

export default connect(mapStateToProps)(Nav);
