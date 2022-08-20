import {
  ADD_POLL,
  addPoll,
  handleAddPoll,
} from "../createPoll";

import "jest-redux-thunk";
import { savePoll } from "../../utils/api";

describe("addPoll", () => {
    it("should  create action object with new poll obj", () => {
      const poll = {};
      expect(addPoll(poll)).toEqual({
        type: ADD_POLL,
        poll,
      });
    });
  });

describe("handleAddPoll", () => {
  it("should add new poll and return formatted object", async () => {
    const poll = {
      optionOneText: "some text",
      optionTwoText: "option two text",
      author: "mthornton",
    };
    const savePollAPI = await savePoll(poll);
    expect(savePollAPI.author).toEqual("mthornton");
  });

  it("tests error mesage", async () => {
    expect.assertions(1);
    await expect(savePoll("some useless text")).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
  it("dispatches action with type ADD_POLL", () => {
    const dispatchMock = jest.fn();
    handleAddPoll(dispatchMock(addPoll({})));

    expect(dispatchMock).toBeDispatchedWithActionType(ADD_POLL);
  });

  it("dispatches ADD_POLL action", () => {
    const dispatchMock = jest.fn();

    handleAddPoll(
      dispatchMock({
        type: "ADD_POLL",
        payload: {
          authedUser: "mthornton",
          pid: "8xf0y6ziyjabvozdd253nd",
          answer: "optionOne",
        },
      })
    );

    expect(dispatchMock).toBeDispatchedWithAction({
      type: "ADD_POLL",
    });
  });

  
});
