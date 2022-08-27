
// import * as React from 'react';
import loading from "../../reducers/loading";
import { RECEIVE_DATA } from "../../actions/shared";



describe("loading reducer", () => {
  it("should return true as initial state", () => {
    expect(loading(undefined, {})).toEqual(true);
  });
  
  it("should hide when recieve data", () => {
    expect(loading(true, {type:RECEIVE_DATA})).toEqual(false);
  });
  


});
