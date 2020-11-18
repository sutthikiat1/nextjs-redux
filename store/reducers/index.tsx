import { combineReducers } from "redux";
import counter from "./reducerA";

const rootReducer = combineReducers({
  counter,
});

export default rootReducer;
