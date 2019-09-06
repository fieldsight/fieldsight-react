import { GET_TEAM_DASHBOARD, POST_PACKAGE_SUBSCRIBE } from "../actions/types";

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
  map: {},
  package_details: [],
  postCardResponse: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TEAM_DASHBOARD:
      return {
        ...state,
        ...action.payload,
        teamDashboardLoader: false
      };
    case POST_PACKAGE_SUBSCRIBE:
      return {
        ...state,
        postCardResponse: action.response
      };
    default:
      return state;
  }
}
