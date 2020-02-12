import {
  GET_FORM_TYPES,
  GET_REPORT_LIST,
  GET_PROJECT_BREADCRUMB,
  GET_TYPES,
  GET_REGIONS,
  GENERATE_DATA_EXPORT,
} from '../actions/types';

const initialState = {
  customReports: [],
  standardReports: [],
  generalData: [],
  scheduledData: [],
  surveyData: [],
  stagedData: [],
  loader: false,
  formLoader: false,
  scheduledLoader: false,
  stagedLoader: false,
  surveyLoader: false,
  projectCreatedOn: '',
  breadcrumb: {},
  regions: [],
  types: [],
  dataExportResponse: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_REPORT_LIST:
      return {
        ...state,
        customReports: action.payload.custom_reports,
        standardReports: action.payload.standard_reports,
        projectCreatedOn: action.payload.created_date,
        loader: true,
      };

    case GET_FORM_TYPES:
      if (action.flag === 'general') {
        return {
          ...state,
          generalData: action.payload,
          formLoader: true,
        };
      }
      if (action.flag === 'survey') {
        return {
          ...state,
          surveyData: action.payload,
          surveyLoader: true,
        };
      }
      if (action.flag === 'stage') {
        return {
          ...state,
          stagedData: action.payload,
          stagedLoader: true,
        };
      }
      if (action.flag === 'scheduled') {
        return {
          ...state,
          scheduledData: action.payload,
          scheduledLoader: true,
        };
      }
      return { ...state };

    case GET_PROJECT_BREADCRUMB:
      return {
        ...state,
        breadcrumb: action.payload,
      };
    case GET_REGIONS:
      return {
        ...state,
        regions: action.payload,
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case GENERATE_DATA_EXPORT:
      return {
        ...state,
        dataExportResponse: action.payload.message,
      };
    default:
      return state;
  }
}
