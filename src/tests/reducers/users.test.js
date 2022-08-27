import users from "../../reducers/users";
import { RECEIVE_DATA } from "../../actions/shared";
import { ANSWER_POLL } from "../../actions/answerPoll";
import { ADD_POLL } from "../../actions/createPoll";
import { formatPoll } from "../../utils/helpers";

const mock_users = {
  mthornton: {
    id: "mthornton",
    password: "elephants",
    name: "Mike Thornton",
    avatarURL: "https://avatar-endpoint.herokuapp.com/api/",
    answers: {},
    polls: [],
  },
  sarahedo: {
    id: "sarahedo",
    password: "password123",
    name: "Sarah Edo",
    avatarURL: "https://tylermcginnis.com/would-you-rather/sarah.jpg",
    answers: {
      "8xf0y6ziyjabvozdd253nd": "optionOne",
      "6ni6ok3ym7mf1p33lnez": "optionOne",
      am8ehyc8byjqgar0jgpub9: "optionTwo",
      loxhs1bqm25b708cmbf3g: "optionTwo",
    },
    polls: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
  },
};

const mock_poll = {
  optionOneText: "option one text",
  optionTwoText: "option two text",
  author: "mthornton",
};

describe("users reducer", () => {
  it("should return an empty object as initial state", () => {
    expect(users(undefined, {})).toEqual({});
  });

  it("should return data slice passed to it as new state", async () => {
    expect(        
      users({}, {
          type: RECEIVE_DATA,
          users: mock_users,
        }
      )
    ).toEqual(mock_users);
  });

  it("should take three params and return new state with poll id added to user answers object", () => {
    expect.assertions(1);
    const authedUser = "mthornton";
    const pid = "xj352vofupe1dqz9emx13r";
    const answer = "optionOne";
    expect(
      users(mock_users, {
        type: ANSWER_POLL,
        authedUser,
        pid,
        answer,
      })
    ).toEqual({
      ...mock_users,
      [authedUser]: {
        ...mock_users[authedUser],
        answers: {
          ...mock_users[authedUser].answers,
          [pid]: answer,
        },
      },
    });
  });

  it("should take a new poll object and return new user state with added poll id to the user questions array", () => {
    expect.assertions(1);    
    const poll = formatPoll(mock_poll);
    const userPollsPosted = mock_users["mthornton"].polls.length;
    expect(
      users(mock_users, {
        type: ADD_POLL,
        poll,
      })["mthornton"].polls.length
    ).toEqual(userPollsPosted + 1);
  });
});
