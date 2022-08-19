
import {
  SET_AUTHED_USER,
  setAuthedUser,
} from "../authedUser";

describe("setAuthedUser", () => {
  it("should take an id string create an action based on that id", () => {
    const id = "mthornton";
    expect(setAuthedUser(id)).toEqual({
      type: SET_AUTHED_USER,
      id,
    });
  });

  it("should take an id string create an action based on that id", () => {    
    expect(setAuthedUser()).toEqual({
      type: SET_AUTHED_USER,
    });
  });
});

