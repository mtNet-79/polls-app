const { loadingReducer } = require("../loading.reducers")
const { show, hide } = require("../loading.actions")
const  { createAction } = require("@reduxjs/toolkit") ;

describe('loading store', () => {
    it('show', () => {
        // expect(false).toBeTruthy();
        const initState = { show: false};
        const newState = loadingReducer(initState, show);

        expect(newState).toEqual({show: true});
    })
    it('hide', () => {
        // expect(false).toBeTruthy();
        const initState = { show: true};
        const newState = loadingReducer(initState, hide);

        expect(newState).toEqual({show: false});
    })
    it('should keep state if action is unknown', () => {
        // expect(false).toBeTruthy();
        const initState = { show: true};
        const action = createAction("UNKNOWN");
        const newState = loadingReducer(initState, action);

        expect(newState).toEqual(initState);
    })
})