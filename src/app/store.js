import reducer from "../reducers";
import middleware from "../middleware";
import { legacy_createStore as createStore } from "redux";


export const store = createStore(reducer, middleware);

