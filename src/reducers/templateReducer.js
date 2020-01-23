import { GET_FORM_TYPES, GET_REPORT_LIST } from '../actions/types';

const initialState = {
  customReports: [],
  standardReports: [],
  generalData: [],
  scheduledData: [],
  surveyData: [],
  stagedData: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_REPORT_LIST:
      return {
        ...state,
        customReports: action.payload.custom_reports,
        standardReports: action.payload.standard_reports,
      };
    case GET_FORM_TYPES:
      return {
        ...state,
        generalData: action.flag === 'general' ? action.payload : [],
        scheduledData:
          action.flag === 'scheduled' ? action.payload : [],
        surveyData: action.flag === 'survey' ? action.payload : [],
        stagedData: action.flag === 'stage' ? action.payload : [],
      };
    default:
      return state;
  }
}
