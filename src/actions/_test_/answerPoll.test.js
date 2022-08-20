import {
  ANSWER_POLL,
  answerPoll,
  handleAnswerPoll,
} from "../answerPoll";

import "jest-redux-thunk";
import { saveAnswerPoll } from "../../utils/api";

describe("answerPoll", () => {
  it("should create action with ANSWER_POLL type", () => {
    const authedUser = "mthornton";
    const pid = "123xyz";
    const answer = "optionOne";

    expect(answerPoll({ authedUser, pid, answer })).toEqual({
      type: ANSWER_POLL,
      authedUser,
      pid,
      answer,
    });
  });
});



describe("handleAnswerPoll", () => {
  it("should add authedUser id to votes for answered poll", async () => {
    expect.assertions(1);
    const answerObj = {
      authedUser: "mthornton",
      pid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionOne",
    };
    const saveAnswerAPI = await saveAnswerPoll(answerObj);
    expect(saveAnswerAPI).toEqual(true);
  });
  it("test error when not passed all required data", async () => {
    expect.assertions(1);
    const answerObj = {
      authedUser: "mthornton",
      pid: "8xf0y6ziyjabvozdd253nd",
    };
    await expect(saveAnswerPoll(answerObj)).rejects.toEqual(
      "Please provide authedUser, pid, and answer"
    );
  });

  it("dispatches action with type ANSWER_POLL", () => {
    const dispatchMock = jest.fn();
    handleAnswerPoll(dispatchMock(answerPoll({})));

    expect(dispatchMock).toBeDispatchedWithActionType(ANSWER_POLL);
  });

  it("dispatches ANSWER_POLL action", () => {
    const dispatchMock = jest.fn();

    handleAnswerPoll(
      dispatchMock({
        type: "ANSWER_POLL",
        payload: {
          authedUser: "mthornton",
          pid: "8xf0y6ziyjabvozdd253nd",
          answer: "optionOne",
        },
      })
    );

    expect(dispatchMock).toBeDispatchedWithAction({
      type: "ANSWER_POLL",
    });
  });
});


