import {
    ANSWER_POLL,
    ADD_POLL,
    answerPoll,
    addPoll,
    handleAnswerPoll,
    handleAddPoll,
  } from "../questions";


import "jest-redux-thunk";
import { savePoll } from "../../utils/api";

describe("handleAddPoll", () => {
    it("should add new poll and return formatted object", async () => {
      
      const poll = {
            optionOneText: "some text",
            optionTwoText: "option two text",
            author: "mthornton",
          };
      const savePollAPI = await savePoll(poll);
      console.log("THIS CANTBE WRONG: ", savePollAPI.author)
      expect(savePollAPI.author).toEqual('mthornton')
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
  
      handleAnswerPoll(
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