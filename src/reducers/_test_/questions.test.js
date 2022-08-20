import questions from "../questions";
import { RECEIVE_DATA } from "../../actions/shared";
import { ANSWER_POLL } from "../../actions/answerPoll";
import { ADD_POLL } from "../../actions/createPoll";
import { formatPoll } from "../../utils/helpers";

const mock_pollQuestions = {
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

  it("should return data passed to it as new state", async () => {
    // const polls = await getInitialData().then(({ polls }) => polls);
    const polls = { polls: "poll" };
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

  it("should take three params and return new state based on answer given", () => {
    expect.assertions(2);
    const authedUser = "mthornton";
    const pid = "xj352vofupe1dqz9emx13r";

    let answer = "optionOne";

    expect(
      questions(mock_pollQuestions, {
        type: ANSWER_POLL,
        authedUser,
        pid,
        answer,
      })
    ).toEqual({
      ...mock_pollQuestions,
      [pid]: {
        ...mock_pollQuestions[pid],
        optionOne: {
          ...mock_pollQuestions[pid].optionOne,
          votes: [...mock_pollQuestions[pid].optionOne.votes, authedUser],
        },
      },
    });

    answer = "optionTwo";
    expect(
      questions(mock_pollQuestions, {
        type: ANSWER_POLL,
        authedUser,
        pid,
        answer,
      })
    ).toEqual({
      ...mock_pollQuestions,
      [pid]: {
        ...mock_pollQuestions[pid],
        optionTwo: {
          ...mock_pollQuestions[pid].optionTwo,
          votes: [...mock_pollQuestions[pid].optionTwo.votes, authedUser],
        },
      },
    });
  });

  it("should NOT supply other options with users vote", () => {
    const authedUser = "mthornton";
    const pid = "xj352vofupe1dqz9emx13r";
    const answer = "optionOne";

    expect(
      questions(mock_pollQuestions, {
        type: ANSWER_POLL,
        authedUser,
        pid,
        answer,
      })
    ).not.toEqual({
      ...mock_pollQuestions,
      [pid]: {
        ...mock_pollQuestions[pid],
        optionTwo: {
          ...mock_pollQuestions[pid].optionOne,
          votes: [...mock_pollQuestions[pid].optionOne.votes, authedUser],
        },
      },
    });
  });
  it("should take a new formated poll object and returns new state with added poll", () => {
    expect.assertions(3);
    let poll = {
      optionOneText: "some text",
      optionTwoText: "some other text",
      author: "mthornton",
    }
    poll = formatPoll(poll);
    expect(
      Object.keys(
        questions(mock_pollQuestions, {
          type: ADD_POLL,
          poll,
        })
      ).length
    ).toEqual(3);

    expect(
      Object.values(questions(mock_pollQuestions, {
        type: ADD_POLL,
        poll,
      }))[2].optionOne.text
    ).toEqual("some text");

    expect(
      Object.values(questions(mock_pollQuestions, {
        type: ADD_POLL,
        poll,
      }))[2].optionTwo.text
    ).toEqual("some other text")
    

  });

  
});
