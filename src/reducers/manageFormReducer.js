import {
  GET_MY_FORM_LIST,
  GET_PROJECT_FORM_LIST,
  GET_SHARED_FORM_LIST,
  GET_REGIONS_AND_TYPES,
} from '../actions/types';

const initialState = {
  formLoader: true,
  myForms: [],
  projectForms: [],
  sharedForms: [],
  regions: [],
  types: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MY_FORM_LIST:
      return {
        ...state,
        myForms: [...action.payload],
        formLoader: false,
      };
    case GET_PROJECT_FORM_LIST:
      return {
        ...state,
        projectForms: [...action.payload],
        formLoader: false,
      };
    case GET_SHARED_FORM_LIST:
      return {
        ...state,
        sharedForms: [...action.payload],
        formLoader: false,
      };
    case GET_REGIONS_AND_TYPES:
      return {
        ...state,
        regions: [action.payload && action.payload.regions],
        types: [action.payload && action.payload.site_types],
        formLoader: false,
      };

    default:
      return state;
  }
}
