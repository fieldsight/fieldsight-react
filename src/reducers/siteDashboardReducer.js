import {
  GET_SITE_DASHBOARD,
  GET_SITE_METAS,
  GET_SITE_SUBMISSIONS,
  GET_SITE_DOCUMENTS,
  GET_SITE_LOGS
} from "../actions/types";

const initialState = {
  id: "",
  name: "",
  address: "",
  location: {},
  logo: "",
  public_desc: "",
  region: "",
  total_users: "",
  users: [],
  submissions: {},
  form_submissions_chart_data: {
    pending_submissions: {},
    total_submissions: {},
    approved_submissions: {},
    rejected_submissions: {},
    flagged_submissions: {}
  },
  site_progress_chart_data: {},
  siteMetas: [],
  siteSubmissions: {},
  siteDocuments: [],
  siteLogs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SITE_DASHBOARD:
      return {
        ...state,
        ...action.payload,
        form_submissions_chart_data: {
          pending_submissions: {
            ...action.payload.form_submissions_chart_data.pending_submissions
          },
          total_submissions: {
            ...action.payload.form_submissions_chart_data.total_submissions
          },
          approved_submissions: {
            ...action.payload.form_submissions_chart_data.approved_submissions
          },
          rejected_submissions: {
            ...action.payload.form_submissions_chart_data.rejected_submissions
          },
          flagged_submissions: {
            ...action.payload.form_submissions_chart_data.flagged_submissions
          }
        },
        site_progress_chart_data: { ...action.payload.site_progress_chart_data }
      };

    case GET_SITE_METAS:
      return {
        ...state,
        siteMetas: [...action.payload]
      };

    case GET_SITE_SUBMISSIONS:
      return {
        ...state,
        siteSubmissions: {
          ...action.payload
        }
      };
    case GET_SITE_DOCUMENTS:
      return {
        ...state,
        siteDocuments: [...action.payload]
      };

    case GET_SITE_LOGS:
      return {
        ...state,
        siteLogs: [...action.payload]
      };

    default:
      return state;
  }
}
