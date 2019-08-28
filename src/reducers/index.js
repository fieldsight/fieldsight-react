import { combineReducers } from "redux";
import submissionDetailReducer from "./submissionDetailReducer";
import siteDashboardReducer from "./siteDashboardReducer";
import projectDashboardReducer from "./projectDashboardReducer";
import teamDashboardReducer from "./teamDashboardReducer";

export default combineReducers({
  submissionDetail: submissionDetailReducer,
  siteDashboard: siteDashboardReducer,
  projectDashboard: projectDashboardReducer,
  teamDashboard: teamDashboardReducer
});
