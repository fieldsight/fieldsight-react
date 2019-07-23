import { combineReducers } from "redux";
import submissionDetailReducer from "./submissionDetailReducer";
import siteDashboardReducer from "./siteDashboardReducer";

export default combineReducers({
  submissionDetail: submissionDetailReducer,
  siteDashboard: siteDashboardReducer
});
