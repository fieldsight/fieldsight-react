import {
  GET_METRICS_DATA,
  GET_FORM,
  GET_FORM_QUESTIONS,
} from '../actions/types';

const initialState = {
  reportTypes: [],
  metrics: [],
  metaAttributes: [],
  reportLoader: true,
  formTypes: [],
  forms: [],
  formQuestions: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_METRICS_DATA:
      return {
        ...state,
        reportTypes: action.payload.report_types,
        metrics: action.payload.metrics,
        metaAttributes: action.payload.meta_attributes,
        formTypes: action.payload.form_types,
        reportLoader: false,
      };
    case GET_FORM:
      return {
        ...state,
        forms: action.payload,
        reportLoader: false,
      };
    case GET_FORM_QUESTIONS:
      return {
        ...state,
        formQuestions: action.payload,
        reportLoader: false,
      };

    default:
      return state;
  }
}
