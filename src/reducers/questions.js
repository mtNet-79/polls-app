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
      let votes = [];
      if (answer === "optionOne") {
        votes = [...pollQuestions[pid].optionOne.votes, authedUser];
      } else if (answer === "optionTwo"){       
        votes = [...pollQuestions[pid].optionTwo.votes, authedUser];
      }
      return {
        ...pollQuestions,
        [pid]: {
          ...pollQuestions[pid],
          optionOne:
            answer === "optionOne"
              ? {
                  ...pollQuestions[pid].optionOne,
                  votes: votes,                  
                }
              : { ...pollQuestions[pid].optionOne },
          optionTwo:
            answer === "optionTwo"
              ? {
                ...pollQuestions[pid].optionTwo,
                votes: votes,                  
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
