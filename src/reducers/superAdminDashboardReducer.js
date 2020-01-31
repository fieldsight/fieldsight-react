import {
  GET_SUPERADMIN_DASHBOARD,
  GET_ADMIN_PROGRESS_TABLE_LIST,
  GET_ORG_EXPORT_LIST,
  CREATE_ORG_EXPORT,
  DELETE_ORG_EXPORT,
} from '../actions/types';

const initialState = {
  id: '',
  name: '',
  phone: '',
  country: '',
  additional_desc: 'kathmandu',
  logo: '',
  total_teams: '',
  email: '',
  total_sites: '',
  total_projects: '',
  total_users: '',
  submissions: {},
  contact: {},
  projects: [],
  breadcrumbs: {},
  teams: [],
  map: {},
  showContentLoader: false,
  organizationDashboardLoader: true,
  admins: [],
  progressTable: [],
  total_submissions: '',
  exportOrgList: [],
  createExportResp: '',
  deleteResp: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SUPERADMIN_DASHBOARD:
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        phone: action.payload.phone,
        country: action.payload.country,
        additional_desc: action.payload.additional_desc,
        logo: action.payload.logo,
        total_teams: action.payload.total_teams,
        email: action.payload.email,
        total_sites: action.payload.total_sites,
        total_projects: action.payload.total_projects,
        total_users: action.payload.total_users,
        submissions: action.payload.submissions,
        contact: action.payload.contact,
        projects: action.payload.projects,
        breadcrumbs: action.payload.breadcrumbs,
        teams: action.payload.teams,
        map: action.payload.map,
        showContentLoader: true,
        admins: action.payload.admins,
        organizationDashboardLoader: false,
        total_submissions: action.payload.total_submissions,
      };
    case GET_ADMIN_PROGRESS_TABLE_LIST:
      return {
        ...state,
        progressTable: action.payload,
      };
    case GET_ORG_EXPORT_LIST:
      return {
        ...state,
        exportOrgList: action.payload,
      };
    case CREATE_ORG_EXPORT:
      return {
        ...state,
        createExportResp: action.payload.message,
      };
    case DELETE_ORG_EXPORT:
      return {
        ...state,
        deleteResp: action.payload.message,
      };
    default:
      return state;
  }
}
