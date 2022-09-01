import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const PollBox = (props) => {
  const navigate = useNavigate();
  const { poll } = props;
  const showPoll = () => {
    navigate(`/questions/${poll.id}`);
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

PollBox.propTypes = {
  poll: PropTypes.object.isRequired,
}

const mapStateToProps = ({ polls }, { id }) => {
  const poll = polls[id];
  return {
    poll,
  };
};

export default connect(mapStateToProps)(PollBox);
