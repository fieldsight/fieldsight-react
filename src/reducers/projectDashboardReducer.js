import { GET_PROJECT_DASHBOARD } from "../actions/types";

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
  projectDashboardLoader: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECT_DASHBOARD:
      return {
        ...state,
        ...action.payload,
        projectDashboardLoader: false
      };
    default:
      return state;
  }
}
