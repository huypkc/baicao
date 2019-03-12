import { combineReducers } from "redux";
import MatchReducer from "./reducers/MatchReducer";
const rootReducer = combineReducers({
  match: MatchReducer
});

export default rootReducer;