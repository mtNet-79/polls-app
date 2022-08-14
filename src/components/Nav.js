import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Nav = (props) => {
  const user = props.users[props.authedUser];
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
          <Link to="/login">Logout</Link>
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
