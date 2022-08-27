import { SET_AUTHED_USER } from "../../actions/authedUser";
import authedUser from "../../reducers/authedUser";

describe("authedUser", () => {
  it("should return null as the initial default state", () => {
    expect(authedUser(undefined, {})).toBeNull();
  });
  it("should return the id passed in the action object as the new state", () => {
    const id = "mthornton";
    expect(authedUser(undefined, { type: SET_AUTHED_USER, id })).toEqual(id);
  });
  it("should log out user by returning null", () => {
    expect(authedUser(undefined, { type: SET_AUTHED_USER })).toBeNull();
  });
});
