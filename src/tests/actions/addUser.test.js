import { ADD_USER, addUser } from "../../actions/addUser";
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
  it("should generate a username/id, ping API for insert, then return a formatted object", async () => {
    expect.assertions(7);
   
    const saveUserAPI = await saveUser(user);

    expect(saveUserAPI).toEqual(formatUser(user));
    expect(saveUserAPI.id).toEqual("mthornton");
    expect(saveUserAPI.password).toEqual("elephants123");
    expect(saveUserAPI.avatarURL).toEqual(image);
    expect(saveUserAPI.name).toEqual(fullName);
    expect(saveUserAPI.answers).toEqual({});
    expect(saveUserAPI.polls).toEqual([]);
  });

  it("should use first char of first name and last name to generate username", async () => {
    const newUser = {
      ...user,
      fullName: "Stephen Dedalus",
    }    
    const saveUserAPI = await saveUser(newUser);
    expect(saveUserAPI.id).toEqual("sdedalus");
  });

  it("should take user provided user name/id, when provided", async () => {
    const newUser = {
      ...user,
      users: {mthornton: {id: 'mthornton'}},
      userName: 'myUniqueName'
    }    
    const saveUserAPI = await saveUser(newUser);
    expect(saveUserAPI.id).toEqual("myUniqueName");
  });


  it("should reject when user provided username/id is already taken", async () => {
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

describe("formatUser", () => {
  it("should generate user name / id from full name", () => {
    const newUser = {
      ...user,
      fullName: "Stephen Dedalus",
    }    
    expect(formatUser(newUser).id).toEqual("sdedalus");
  });
  it("should generate user name / id with first two chars from full name when username already taken", () => {
    const userObj = {
      ...user,
      users: {mthornton: {id: 'mthornton'}}
    }    
    expect(formatUser(userObj).id).toEqual("mithornton");
  });

  it("should return null if both username with first char and username with first two chars from first name are taken", () => {
    const userObj = {
      ...user,
      users: {mthornton: {id: 'mthornton'}, mithornton: {id: 'mithornton'}}
    }   
    expect(formatUser(userObj)).toEqual(null);
  });
  it("should take user provided user name/id, when provided", async () => {
    const userObj = {
      ...user,
      users: {mthornton: {id: 'mthornton'}},
      userName: 'myUniqueName'
    }    
    expect(formatUser(userObj).id).toEqual('myUniqueName');
  });
  it("should reject when user provided username/id is already taken", async () => {
    const userObj = {
      ...user,
      users: {myUniqueName: {id: 'myUniqueName'}},
      userName: 'myUniqueName'
    }    
    expect(formatUser(userObj)).toEqual(null);
  });
})
