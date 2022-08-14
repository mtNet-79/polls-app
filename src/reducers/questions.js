import { RECEIVE_DATA } from "../actions/shared";
import { ANSWER_POLL } from "../actions/questions";
import { ADD_POLL } from "../actions/questions";

const initialState = {};

export default function questions(pollQuestions = initialState, action) {
  switch (action.type) {
    case ADD_POLL:
      const { poll } = action;
      return {
        ...pollQuestions,
        [poll.id]: poll,
      };
    case ANSWER_POLL:
      const { authedUser, pid, answer } = action;
      let optionObj = {};
      if (answer === "optionOne") {
        optionObj = {
          votes: [...pollQuestions[pid].optionOne.votes, authedUser],
          text: pollQuestions[pid].optionOne.text,
        };
      } else {
        optionObj = {
          votes: [...pollQuestions[pid].optionTwo.votes, authedUser],
          text: pollQuestions[pid].optionTwo.text,
        };
      }
      return {
        ...pollQuestions,
        [pid]: {
          ...pollQuestions[pid],
          optionOne:
            answer === "optionOne"
              ? { ...pollQuestions[pid].optionOne, optionObj }
              : { ...pollQuestions[pid].optionOne },
          optionTwo:
            answer === "optionTwo"
              ? { ...pollQuestions[pid].optionTwo, optionObj }
              : { ...pollQuestions[pid].optionTwo },
        },
      };

    case RECEIVE_DATA:
      return action.questions;
    default:
      return pollQuestions;
  }
}
