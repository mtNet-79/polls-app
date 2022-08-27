import { connect } from "react-redux";
import { handleAnswerPoll } from "../actions/answerPoll";
import { Fragment } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const OPTION_ONE = "optionOne";
const OPTION_TWO = "optionTwo";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const PollPage = (props) => {
  
  const navigate = useNavigate();
  const { dispatch, authedUser, pid, polls, users } = props;

  const handleChoice = (e) => {
    if (e.target.id === OPTION_ONE)
      dispatch(handleAnswerPoll(authedUser, pid, OPTION_ONE));
    else if (e.target.id === OPTION_TWO)
      dispatch(handleAnswerPoll(authedUser, pid, OPTION_TWO));
    navigate("/leaderboard");
  };
  return (
    <Fragment>
      <h3>Poll by {polls[pid].author}</h3>
      <img
        src={users[polls[pid].author].avatarURL}
        alt={`Avatar of ${polls[pid].author}`}
        className="avatar center"
      />
      <div className="flex-row poll">
        <div className="choice-container">
          <div className="center questionBox">
            {polls[pid].optionOne.text}
          </div>
          <button className="btn-answer" id="optionOne" onClick={handleChoice}>
            Click
          </button>
        </div>
        <div className="choice-container">
          <div className="center questionBox">
            {polls[pid].optionTwo.text}
          </div>
          <button className="btn-answer" id="optionOne" onClick={handleChoice}>
            Click
          </button>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser, polls, users }, props) => {
  const { pid } = props.router.params;
  const { image } = props;

  return {
    authedUser,
    pid,
    polls,
    users,
    image,
  };
};

export default withRouter(connect(mapStateToProps)(PollPage));
