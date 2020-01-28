import { GET_FORM_TYPES, GET_REPORT_LIST } from '../actions/types';

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
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_REPORT_LIST:
      return {
        ...state,
        customReports: action.payload.custom_reports,
        standardReports: action.payload.standard_reports,
        loader: true,
      };

    case GET_FORM_TYPES:
      return {
        ...state,
        generalData: action.flag === 'general' ? action.payload : [],
        scheduledData:
          action.flag === 'scheduled' ? action.payload : [],
        surveyData: action.flag === 'survey' ? action.payload : [],
        stagedData: action.flag === 'stage' ? action.payload : [],
        formLoader: action.flag === 'general' ? true : false,
        scheduledLoader: action.flag === 'scheduled' ? true : false,
        stagedLoader: action.flag === 'stage' ? true : false,
        surveyLoader: action.flag === 'survey' ? true : false,
      };
    default:
      return state;
  }
}
