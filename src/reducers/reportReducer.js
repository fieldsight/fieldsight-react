import { GET_METRICS_DATA } from '../actions/types';

const initialState = {
  reportTypes: [],
  metrics: [],
  metaAttributes: [],
  reportLoader: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_METRICS_DATA:
      return {
        ...state,
        reportTypes: action.payload.report_types,
        metrics: action.payload.metrics,
        metaAttributes: action.payload.meta_attributes,
        reportLoader: false,
      };
    default:
      return state;
  }
}
