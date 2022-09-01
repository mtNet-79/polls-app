// import PollBox from "./PollBox";
import { connect } from "react-redux";
import { useState } from "react";
import Switch from "./Switch";
import PollContainer from "./PollContainer";

const Dashboard = (props) => {
  const { users, authedUser, pollIds, polls } = props;

  const [toggleValue, setToggleValue] = useState(true);

  const handleToggle = (e) => {
    setToggleValue(!toggleValue);
  };

  const answeredPolls = authedUser
    ? pollIds
      ? Object.keys(users[authedUser].answers)
      : []
    : [];

  const unansweredPollsSorted =
    answeredPolls.length !== 0
      ? pollIds.filter((pid) => !answeredPolls.includes(pid))
      : pollIds;

  const answeredPollsSorted = answeredPolls.sort(
    (a, b) => polls[b].timestamp - polls[a].timestamp
  );
  return (
    <div className="dashboard">
      <div className="poll-container">
        <div className="flex-row">
          {authedUser ? (
            <>
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
            </>
          ) : (
            <h2 className="polls-header center">New Polls</h2>
          )}
        </div>
        {authedUser ? (
          toggleValue ? (
            <PollContainer polls={unansweredPollsSorted} answered={!toggleValue} />
          ) : (
            <PollContainer
              polls={answeredPollsSorted}
              answered={!toggleValue}
            />
          )
        ) : (
          <PollContainer polls={unansweredPollsSorted} answered={false} />
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
  polls,
});
export default connect(mapStateToProps)(Dashboard);
