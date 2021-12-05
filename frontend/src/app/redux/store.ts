import { createStore } from "redux";
import { authReducer } from "./auth-state";

const reducer = authReducer;

const store = createStore(reducer);

export default store;