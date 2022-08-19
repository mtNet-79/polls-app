import questions from "../questions";
import { RECEIVE_DATA } from "../../actions/shared";
import { ANSWER_POLL, ADD_POLL } from "../../actions/questions";
import { getInitialData } from "../../utils/api";


const pollQuestions = {
  xj352vofupe1dqz9emx13r: {
    id: "xj352vofupe1dqz9emx13r",
    author: "mtsamis",
    timestamp: 1493579767190,
    optionOne: {
      votes: ["mtsamis", "zoshikanlu"],
      text: "deploy to production once every two weeks",
    },
    optionTwo: {
      votes: ["tylermcginnis"],
      text: "deploy to production once every month",
    },
  },
  vthrdm985a262al8qx3do: {
    id: "vthrdm985a262al8qx3do",
    author: "tylermcginnis",
    timestamp: 1489579767190,
    optionOne: {
      votes: ["tylermcginnis"],
      text: "take a course on ReactJS",
    },
    optionTwo: {
      votes: ["mtsamis"],
      text: "take a course on unit testing with Jest",
    },
  },
};

describe("questions reducer", () => {
  it("should return an empty object as initial state", () => {
    expect(questions(undefined, {})).toEqual({});
  });
  // it("should show on page load", () => {
  //   expect(loading(undefined)).toEqual(true);
  // });
  it("should return all polls from api", async () => {
    const polls = await getInitialData().then(({ polls }) => polls);
    expect(
      questions(
        {},
        {
          type: RECEIVE_DATA,
          polls,
        }
      )
    ).toEqual(polls);
  });

  it("should have case to answer poll for option one", () => {
    const authedUser = "mthornton";
    const pid = "xj352vofupe1dqz9emx13r";
    const answer = "optionOne";

    expect(
      questions(
        pollQuestions,
        {
          type: ANSWER_POLL,
          authedUser,
          pid,
          answer,
        }
      )
    ).toEqual({
      ...pollQuestions,
      [pid]: {
        ...pollQuestions[pid],
        optionOne: {
          ...pollQuestions[pid].optionOne,
          votes: [...pollQuestions[pid].optionOne.votes, authedUser],
        },
      },
    });
  });

  it("should have case to answer poll for option two", () => {
    const authedUser = "mthornton";
    const pid = "xj352vofupe1dqz9emx13r";
    const answer = "optionTwo";
    
    expect(
      questions(
        pollQuestions,
        {
          type: ANSWER_POLL,
          authedUser,
          pid,
          answer,
        }
      )
    ).toEqual({
      ...pollQuestions,
      [pid]: {
        ...pollQuestions[pid],
        optionTwo: {
          ...pollQuestions[pid].optionTwo,
          votes: [...pollQuestions[pid].optionTwo.votes, authedUser],
        },
      },
    });
  });
});
