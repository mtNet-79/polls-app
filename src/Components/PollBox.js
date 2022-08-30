import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

const PollBox = (props) => {
  const navigate = useNavigate();
  const { poll, answered } = props;
  const showPoll = () => {
    answered
      ? navigate(`answered/questions/${poll.id}`)
      : navigate(`/questions/${poll.id}`);
  };
  return (
    <div className="poll-box">
      <div>{poll.author}</div>
      <div>{formatDate(poll.timestamp)}</div>
      <button className="btn" onClick={showPoll}>
        Show Poll
      </button>
    </div>
  );
};

const mapStateToProps = ({ polls }, { id, answered }) => {
  const poll = polls[id];

  return {
    poll,
    answered,
    
  };
};

export default connect(mapStateToProps)(PollBox);
