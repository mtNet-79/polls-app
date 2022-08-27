import { RECEIVE_DATA, recieveData, handleInitialData } from "../../actions/shared";

import { getInitialData } from "../../utils/api";
import "jest-redux-thunk";

describe("recieveData", () => {
  it("should create action with ADD_USER type", () => {
    let users = {};
    expect(recieveData(users)).toEqual({
      type: RECEIVE_DATA,
      users,
    });
  });

  it("dispatches action with type RECEIVE_DATA", () => {
    const dispatchMock = jest.fn();
    handleInitialData(dispatchMock(recieveData({})));
    expect(dispatchMock).toBeDispatchedWithActionType(RECEIVE_DATA);
  });

  it("should get all data", async () => {
    const data = await getInitialData();
    expect(Object.keys(data)[0]).toEqual("users");
  });
});
