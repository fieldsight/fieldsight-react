import { combineReducers } from "redux";
import submissionDetailReducer from "./submissionDetailReducer";
import siteDashboardReducer from "./siteDashboardReducer";
import projectDashboardReducer from "./projectDashboardReducer";
import userDocumentReducer from "./userDocumentReducer";
import projectListReducer from "./projectListReducer"
import projectUserReducer from "./projectUserReducer"


export default combineReducers({
  submissionDetail: submissionDetailReducer,
  siteDashboard: siteDashboardReducer,
  projectDashboard: projectDashboardReducer,
  userDocument : userDocumentReducer,
  projectList:projectListReducer,
  projectUser:projectUserReducer
});
