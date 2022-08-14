import { createReducer } from "@reduxjs/toolkit";
import { hide, show } from "./loading.actions";

export const loadingReducer = createReducer({}, builder => {
    builder.addCase(show, () => {
        return { show: true };
    })
    builder.addCase(hide, () => {
        return { show: false }
    })
})
