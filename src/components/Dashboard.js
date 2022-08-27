// import PollBox from "./PollBox";
import { connect } from "react-redux";
import { useState } from "react";
import Switch from "./Switch";
import PollContainer from "./PollContainer";

const Dashboard = (props) => {
  const { users, authedUser, pollIds } = props;
  
  const [toggleValue, setToggleValue] = useState(true);

  const handleToggle = (e) => {
    setToggleValue(!toggleValue);
    console.log("toggleValue: ", toggleValue );
  };

  const answeredPolls = pollIds ? Object.keys(users[authedUser].answers) : [];

  const unansweredPolls =
    answeredPolls.length !== 0
      ? pollIds.filter((pid) => !answeredPolls.includes(pid))
      : pollIds;

  return (
    <div className="dashboard">
      <div className="poll-container">
        <div className="flex-row">
          <div className="cell">
            <Switch isOn={toggleValue} handleToggle={handleToggle} />
          </div>
          <div className="cell">
            {toggleValue ? (
              <h2 className="polls-header center">New Polls</h2>
            ) : (
              <h2 className="polls-header center">Answered Polls</h2>
            )}
          </div>
        </div>
        {toggleValue ? (
          <PollContainer polls={unansweredPolls} answered={!toggleValue}/>
        ) : (
          <PollContainer polls={answeredPolls} answered={!toggleValue}/>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = ({ polls, authedUser, users }) => ({
  authedUser,
  pollIds: Object.keys(polls).sort(
    (a, b) => polls[b].timestamp - polls[a].timestamp
  ),
  users,
});
export default connect(mapStateToProps)(Dashboard);
