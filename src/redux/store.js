import { applyMiddleware, createStore } from "redux";
import reducer, { middleware } from "./reducers/reducer";

const store = createStore(reducer, applyMiddleware(middleware));

export default store;
