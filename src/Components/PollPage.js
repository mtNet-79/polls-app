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
  const { dispatch, authedUser, pid, polls, users, answered } = props;

  const usersChoice = users[authedUser].answers[pid];

  const classVarOne = usersChoice === "optionOne" ? "choice" : "pass";
  const classVarTwo = usersChoice === "optionTwo" ? "choice" : "pass";

  const calcStats = () => {
    const optionOneVotes = polls[pid].optionOne.votes.length;
    const optionTwoVotes = polls[pid].optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;
    const optionOnePrcnt = ((optionOneVotes / totalVotes) * 100).toFixed(0);
    const prctnOneString = `${optionOnePrcnt} % of users`;
    const optionTwoPrcnt = ((optionTwoVotes / totalVotes) * 100).toFixed(0);
    const prctnTwoString = `${optionTwoPrcnt} % of users`;
    const optionOneVotesString =
      optionOneVotes === 1
        ? `${optionOneVotes} person (${prctnOneString}) voted this option`
        : `${optionOneVotes} people (${prctnOneString}) voted this option`;
    const optionTwoVotesString =
      optionTwoVotes === 1
        ? `${optionTwoVotes} person (${prctnTwoString}) voted this option`
        : `${optionTwoVotes} people (${prctnTwoString}) voted this option`;
    return {
      optionOneVotesString,
      optionTwoVotesString,
    };
  };

  const handleChoice = (e) => {
    if (e.target.id === OPTION_ONE)
      dispatch(handleAnswerPoll(authedUser, pid, OPTION_ONE));
    else if (e.target.id === OPTION_TWO)
      dispatch(handleAnswerPoll(authedUser, pid, OPTION_TWO));
    navigate(`/answered/questions/${pid}`)
  };
  return (
    <Fragment>
      <h3>Poll by {users[polls[pid].author].name}</h3>
      <br></br>
      <img
        src={users[polls[pid].author].avatarURL}
        alt={`Avatar of ${polls[pid].author}`}
        className="avatar center"
      />
      
      <h3>Would you rather?</h3>
      <br></br>
      {answered ? (       
        <><div className="flex-row poll">
        <div className={`choice-container ${classVarOne}`}>
          {usersChoice === "optionOne"}
          <div className="center questionBox">
            {polls[pid].optionOne.text}
          </div>
          <p className="center">{calcStats().optionOneVotesString}</p>
        </div>
        <div className={`choice-container ${classVarTwo}`}>
          <div className="center questionBox">
            {polls[pid].optionTwo.text}
          </div>
          <p className="center">{calcStats().optionTwoVotesString}</p>
        </div>
      </div>
      <br></br>
      <br></br>
      <div className="colorRow">Your Choice : <span className="colorSpan"></span></div>
      </>
          
      ) : (
        <div className="flex-row poll">
          <div className="choice-container">
            <div className="center questionBox">
              {polls[pid].optionOne.text}
            </div>
            <button
              className="btn-answer"
              id="optionOne"
              onClick={handleChoice}
            >
              Click
            </button>
          </div>
          <div className="choice-container">
            <div className="center questionBox">
              {polls[pid].optionTwo.text}
            </div>
            <button
              className="btn-answer"
              id="optionTwo"
              onClick={handleChoice}
            >
              Click
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser, polls, users }, props) => {
  const { pid } = props.router.params;
  const { image, answered } = props;

  return {
    authedUser,
    pid,
    polls,
    users,
    image,
    answered,
  };
};

export default withRouter(connect(mapStateToProps)(PollPage));
