import {
  GET_PRIMARY_MARKER_GEOJSON,
  GET_SECONDARY_MARKER_GEOJSON,
  GET_PROJECTS_LIST,
  GET_PROJECTS_REGION_TYPES,
  FILTER_PRIMARYGEOJSON,
} from '../actions/types';

const initialState = {
  primaryGeojson: [],
  clonePrimaryGeojson: [],
  secondaryGeojson: [],
  projectsList: [],
  projectsRegionTypes: [],
  types: [],
};

const getVisibleTodos = (state, action) => {
  let filteredData = [];
  let isSelected = false;
  Object.keys(action.payload.filterByType).forEach(type => {
    if (action.payload.filterByType[type].length > 0) {
      if (filteredData.length > 0) {
        filteredData = filteredData.filter(data =>
          action.payload.filterByType[type].includes(data[type]),
        );
      } else {
        // filteredData = [
        //   ...filteredData,
        //   ...state.primaryGeojson[0].features.filter(data =>
        //     action.payload.filterByType[type].includes(data[type]),
        //   ),
        // ];
        filteredData = state.primaryGeojson[0].features.filter(data =>
          action.payload.filterByType[type].includes(data[type]),
        );
      }
      isSelected = true;
    }
  });
  console.log(filteredData, 'filteredeData');
  return {
    ...state,
    ...(filteredData.length > 0 && isSelected === true
      ? {
          clonePrimaryGeojson: {
            0: {
              ...state.primaryGeojson[0],
              features: filteredData,
            },
          },
        }
      : filteredData.length === 0 && isSelected === false
      ? { clonePrimaryGeojson: state.primaryGeojson }
      : { clonePrimaryGeojson: [] }),
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRIMARY_MARKER_GEOJSON:
      return {
        ...state,
        primaryGeojson: [action.payload],
        clonePrimaryGeojson: [action.payload],
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
    case FILTER_PRIMARYGEOJSON:
      return getVisibleTodos(state, action);
    // return {
    //   ...state,
    //   clonePrimaryGeojson: {
    //     0: {
    //       ...state.clonePrimaryGeojson[0],
    //       features: state.clonePrimaryGeojson[0].features.filter(
    //         data => action.payload.includes(data.region),
    //       ),
    //     },
    //   },
    // };
    default:
      return state;
  }
}
