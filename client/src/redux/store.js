import { createStore, applyMiddleware } from "redux";
import formsReducer from "./forms/formReducers";

const thunkMiddleware = require("redux-thunk").default;
const store = createStore(formsReducer, applyMiddleware(thunkMiddleware));
export default store;
