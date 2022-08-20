import { ADD_USER, addUser } from "../addUser";
import { saveUser } from "../../utils/api";
import { formatUser } from "../../utils/helpers";
import "jest-redux-thunk";

const fullName = 'Michael Thornton';
const image = "https://avatar-endpoint.herokuapp.com/api/";
const password = "elephants123";
const users = {};

const user = {
  fullName,
  image,
  password,
  users,
}


describe("addUser", () => {
  it("should create action with ADD_USER type", () => {
    expect(addUser(user)).toEqual({
      type: ADD_USER,
      user,
    });
  });
});

describe("handleAddUser", () => {
  it("should add user with generated username and return a formatted object", async () => {
    expect.assertions(2);
   
    const saveUserAPI = await saveUser(user);
    expect(saveUserAPI).toEqual(formatUser(user));
    expect(saveUserAPI.id).toEqual("mthornton");
  });

  it("should take a user provided user name/id rather than creating one, when provided", async () => {
    
    expect.assertions(1);
    const newUser = {
      ...user,
      users: {mthornton: {id: 'mthornton'}},
      userName: 'myUniqueName'
    }    
    const saveUserAPI = await saveUser(newUser);
    expect(saveUserAPI.id).toEqual("myUniqueName");
  });


  it("should reject when user provided user name is taken", async () => {
    
    // expect.assertions(1);
    const newUser = {
      ...user,
      users: {myUniqueName: {id: 'myUniqueName'}},
      userName: 'myUniqueName'
    }    
    await expect(saveUser(newUser)).rejects.toMatch(
      "Please provide a unique user name"
    );
  });

  it("should create a user name from first two chars of first name when initial derived user name is taken", async () => {
    
    expect.assertions(1);
    const newUser = {
      ...user,
      users: {mthornton: {id: 'mthornton'}}
    }
    
    const saveUserAPI = await saveUser(newUser);
    expect(saveUserAPI.id).toEqual("mithornton");
  });
  
  it("tests error mesage if two attempts at deriving username fail due to current usernames", async () => {
    
    expect.assertions(1);
    const newUser = {
      ...user,
      users: {mthornton: {id: 'mthornton'}, mithornton: {id: 'mithornton'}}
    }
    
    await expect(saveUser(newUser)).rejects.toEqual(
      "Please provide a unique user name"
    );
  });
 
});
