import { showLoading, hideLoading } from "react-redux-loading-bar";
import { saveAnswerPoll } from "../utils/api";

export const ANSWER_POLL = "ANSWER_POLL";

export const answerPoll = ({ authedUser, pid, answer }) => {
  return {
    type: ANSWER_POLL,
    authedUser,
    pid,
    answer,
  };
};

export function handleAnswerPoll(authedUser, pid, answer) {
  return (dispatch) => {
    dispatch(showLoading());
    return saveAnswerPoll({ authedUser, pid, answer })
      .then((obj) => {
        dispatch(
          answerPoll({
            authedUser,
            pid,
            answer,
          })
        );
      })
      .then(() => dispatch(hideLoading()))
      .catch((err) => {
        alert(err.message);
        dispatch(hideLoading());
      });
  };
}
