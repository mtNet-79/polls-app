
// import * as React from 'react';
import loading from "../loading";
import { RECEIVE_DATA } from "../../actions/shared";

describe("loading reducer", () => {
  it("should return true as initial state", () => {
    expect(loading(undefined, {})).toEqual(true);
  });
  // it("should show on page load", () => {
  //   expect(loading(undefined)).toEqual(true);
  // });
  it("should hide when recieve data", () => {
    expect(loading(true, {type:RECEIVE_DATA})).toEqual(false);
  });
});
