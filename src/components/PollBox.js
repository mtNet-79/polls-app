import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

const PollBox = (props) => {
  const { question } = props;
  const navigate = useNavigate();
  const showPoll = (e) => {
    navigate(`/questions/${question.id}`);
  };
  return (
    <div className="poll-box">
      <div>{props.userName}</div>
      <div>{formatDate(props.timestamp)}</div>
      <button className="btn" onClick={showPoll}>
        Show Poll
      </button>
    </div>
  );
};

const mapStateToProps = ({ questions }, { id }) => {
  const question = questions[id];
  const userName = question.id;
  const timestamp = question.timestamp;
  return {
    userName,
    timestamp,
    question,
  };
};

export default connect(mapStateToProps)(PollBox);
