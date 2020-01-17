import {
  GET_PRIMARY_MARKER_GEOJSON,
  GET_SECONDARY_MARKER_GEOJSON,
  GET_PROJECTS_LIST,
  GET_PROJECTS_REGION_TYPES,
} from '../actions/types';

const initialState = {
  primaryGeojson: [],
  secondaryGeojson: [],
  projectsList: [],
  projectsRegionTypes: [],
  types: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRIMARY_MARKER_GEOJSON:
      return {
        ...state,
        primaryGeojson: [action.payload],
      };
    case GET_SECONDARY_MARKER_GEOJSON:
      return {
        ...state,
        secondaryGeojson: [action.payload],
      };
    case GET_PROJECTS_LIST:
      return {
        ...state,
        projectsList: [...action.payload],
      };
    case GET_PROJECTS_REGION_TYPES:
      return {
        ...state,
        projectsRegionTypes: [action.payload],
      };
    default:
      return state;
  }
}
