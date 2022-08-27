import { RECEIVE_DATA } from "../actions/shared";
import { ANSWER_POLL } from "../actions/answerPoll";
import { ADD_POLL } from "../actions/createPoll";

const initialState = {};

export default function polls(pollQuestions = initialState, action) {
  switch (action.type) {
    case ADD_POLL:
      const { poll } = action;
      return {
        ...pollQuestions,
        [poll.id]: poll,
      };
    case ANSWER_POLL:
      const { authedUser, pid, answer } = action;    
      let votes = [];
      answer === "optionOne"
        ? (votes = [...pollQuestions[pid].optionOne.votes, authedUser])
        : (votes = [...pollQuestions[pid].optionTwo.votes, authedUser]);

      return {
        ...pollQuestions,
        [pid]: {
          ...pollQuestions[pid],
          optionOne:
            answer === "optionOne"
              ? {
                  ...pollQuestions[pid].optionOne,
                  votes,
                }
              : { ...pollQuestions[pid].optionOne },
          optionTwo:
            answer === "optionTwo"
              ? {
                  ...pollQuestions[pid].optionTwo,
                  votes,
                }
              : { ...pollQuestions[pid].optionTwo },
        },
      };

    case RECEIVE_DATA:
      return action.polls;
    default:
      return pollQuestions;
  }
}
