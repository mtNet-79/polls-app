import { showLoading, hideLoading } from "react-redux-loading-bar";
import { savePoll, saveAnswerPoll } from "../utils/api";

export const ANSWER_POLL = "ANSWER_POLL";
export const ADD_POLL = "ADD_POLL";

const answerPoll = ({ authedUser, pid, answer }) => {
  return {
    type: ANSWER_POLL,
    authedUser,
    pid,
    answer,
  };
};

const addPoll = (poll) => ({
  type: ADD_POLL,
  poll,
});

export function handleAnswerPoll(authedUser, pid, answer) {
  return (dpatch) => {
    dpatch(showLoading());
    return saveAnswerPoll({ authedUser, pid, answer })
      .then((obj) => {
        console.log("what up: ", obj);
        dpatch(
          answerPoll({
            authedUser,
            pid,
            answer,
          })
        );
      })
      .then(() => dpatch(hideLoading()))
      .catch((obj) => {
        console.log("not good: ", obj);
        alert("An error occured. Try again.");
        dpatch(hideLoading());
      });
  };
}

export const handleAddPoll = (poll) => {
  return (dpatch) => {
    dpatch(showLoading());
    return (
      savePoll(poll)
        .then((formattedPoll) => {
          console.log("formattedPoll: ", formattedPoll)
          dpatch(addPoll(formattedPoll));
        })
        .then(() => dpatch(hideLoading()))
        .catch(() => {
          alert("An error occured. Try again.");
        })
    );
  };
};
