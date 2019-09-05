import { GET_TEAM_DASHBOARD } from "../actions/types";

const initialState = {
  id: "",
  name: "",
  address: "",
  public_desc: "",
  logo: "",
  contact: "",
  total_sites: "",
  submissions: "",
  projects: "",
  admin: "",
  breadcrumbs: "",
  teamDashboardLoader: true,
  total_projects: "",
  total_users: "",
  package_details: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TEAM_DASHBOARD:
      return {
        ...state,
        ...action.payload,
        teamDashboardLoader: false
      };
    default:
      return state;
  }
}
