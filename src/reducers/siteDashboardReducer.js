import {
  GET_SITE_DASHBOARD,
  GET_SITE_METAS,
  GET_SITE_SUBMISSIONS,
  GET_SITE_DOCUMENTS,
  GET_SITE_LOGS,
  GET_SITE_FORMS,
  GET_RECENT_PICTURES,
  GET_SUBSITES,
  SHOW_DOT_LOADER,
  SHOW_DASHBOARD_LOADERS,
  UPDATE_SITE_LOGO
} from "../actions/types";

const initialState = {
  id: "",
  name: "",
  address: "",
  location: {},
  logo: "",
  public_desc: "",
  region: null,
  total_users: "",
  users: [],
  submissions: {},
  total_subsites: null,
  form_submissions_chart_data: {
    pending_submissions: {},
    total_submissions: {},
    approved_submissions: {},
    rejected_submissions: {},
    flagged_submissions: {}
  },
  site_progress_chart_data: {},
  siteMetas: [],
  siteSubmissions: [],
  siteDocuments: [],
  siteLogs: [],
  siteForms: {},
  subSites: [],
  recentPictures: [],
  siteDashboardLoader: true,
  siteMetasLoader: true,
  siteSubmissionsLoader: true,
  siteDocumentsLoader: true,
  siteLogsLoader: true,
  sitePicturesLoader: true,
  subSitesLoader: true
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
        site_progress_chart_data: {
          ...action.payload.site_progress_chart_data
        },
        siteDashboardLoader: false
      };
    // site meta/ information
    case GET_SITE_METAS:
      return {
        ...state,
        siteMetas: [...action.payload],
        siteMetasLoader: false
      };

    case GET_SITE_SUBMISSIONS:
      return {
        ...state,
        siteSubmissions: [...action.payload.results],
        siteSubmissionsLoader: false
      };
    case GET_SITE_DOCUMENTS:
      return {
        ...state,
        siteDocuments: [...action.payload],
        siteDocumentsLoader: false
      };

    case GET_SITE_LOGS:
      return {
        ...state,
        siteLogs: [...action.payload],
        siteLogsLoader: false
      };

    case GET_SITE_FORMS:
      return {
        ...state,
        siteForms: { ...action.payload },
        showDotLoader: false
      };
    case GET_RECENT_PICTURES:
      const picturesKeyArr = Object.keys(action.payload);
      let modifiedPayload = [];
      if (picturesKeyArr.length > 0) {
        modifiedPayload = [
          action.payload.site_featured_images.photo,
          ...action.payload.recent_pictures
        ].filter(Boolean);
      }
      return {
        ...state,
        recentPictures: modifiedPayload,
        sitePicturesLoader: false
      };

    case GET_SUBSITES: {
      return {
        ...state,
        subSites: action.payload.results.data,
        subSitesLoader: false
      };
    }
    case SHOW_DOT_LOADER:
      return {
        ...state,
        showDotLoader: true
      };

    case SHOW_DASHBOARD_LOADERS:
      return {
        ...state,
        siteDashboardLoader: true,
        siteMetasLoader: true,
        siteSubmissionsLoader: true,
        siteDocumentsLoader: true,
        siteLogsLoader: true,
        sitePicturesLoader: true
      };

    case UPDATE_SITE_LOGO:
      return {
        ...state,
        logo: action.payload
      };

    default:
      return state;
  }
}
