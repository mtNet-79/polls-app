import {RECEIVE_DATA, recieveData, handleInitialData } from "../shared";

import { getInitialData } from "../../utils/api";



describe("recieveData", () => {
    it("should create action with ADD_USER type", () => {
        let users = {};  
      expect(recieveData(users)).toEqual({
        type: RECEIVE_DATA,
        users,
      });
    });
  });