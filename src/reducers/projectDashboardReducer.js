import {
  GET_PROJECT_DASHBOARD,
  GET_REGION_DATA,
  GET_SITE_LIST,
  GET_PROGRESS_TABLE_DATA,
  GET_SURVEY_FORM
} from "../actions/types";

const initialState = {
  id: "",
  name: "",
  address: "",
  public_desc: "",
  logo: "",
  contacts: "",
  project_activity: "",
  total_sites: "",
  total_users: "",
  project_managers: "",
  has_region: "",
  logs: "",
  form_submissions_chart_data: "",
  site_progress_chart_data: "",
  map: "",
  terms_and_labels: "",
  breadcrumbs: "",
  is_project_manager: "",
  projectDashboardLoader: true,
  regionData: [],
  projectRegionDataLoader: true,
  progressLoader: true,
  progressTableData: {},
  surveyData:[]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECT_DASHBOARD:
      return {
        ...state,
        ...action.payload,
        projectDashboardLoader: false
      };
    case GET_REGION_DATA:
      return {
        ...state,
        regionData: [...action.payload],
        projectRegionDataLoader: false
      };
    case GET_PROGRESS_TABLE_DATA:
      return {
        ...state,
        progressTableData: action.payload,
        progressLoader: false
      };
      case GET_SURVEY_FORM:
        return{
          ...state,
          surveyData:[...action.payload]
        }
    default:
      return state;
  }
}
