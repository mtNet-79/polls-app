import { showLoading, hideLoading } from "react-redux-loading-bar";
import { savePoll } from "../utils/api";

export const ADD_POLL = "ADD_POLL";

export const addPoll = (poll) => ({
  type: ADD_POLL,
  poll,
});

export const handleAddPoll = (poll) => {
  return (dpatch) => {
    dpatch(showLoading());
    return savePoll(poll)
      .then((formattedPoll) => {
        dpatch(addPoll(formattedPoll));
      })
      .then(() => dpatch(hideLoading()))
      .catch(() => {
        alert("An error occured. Try again.");
      });
  };
};
