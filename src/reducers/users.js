import { RECEIVE_DATA } from "../actions/shared";
import { ADD_USER } from "../actions/addUser";
import { ADD_POLL } from "../actions/createPoll";
import { ANSWER_POLL } from "../actions/answerPoll";

export default function users(state = {}, action) {
  switch (action.type) {
    case ADD_USER:
      const { user } = action;
      return {
        ...state,
        [user.id]: user,
      };
    case ANSWER_POLL:
      const { pid, answer, authedUser } = action;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: { ...state[authedUser].answers, [pid]: answer },
        },
      };
    case ADD_POLL:
      const { poll } = action;
      return {
        ...state,
        [poll.author]: {
          ...state[poll.author],
          polls: [...state[poll.author].polls, poll.id],
        },
      };
    case RECEIVE_DATA:
      return action.users;
    default:
      return state;
  }
}
