import { combineReducers } from "redux";
import submissionDetailReducer from "./submissionDetailReducer";

export default combineReducers({
  submissionDetail: submissionDetailReducer
});
