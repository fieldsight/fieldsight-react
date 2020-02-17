import {
  GET_PRIMARY_MARKER_GEOJSON,
  GET_SECONDARY_MARKER_GEOJSON,
  GET_PROJECTS_LIST,
  GET_PROJECTS_REGION_TYPES,
  FILTER_PRIMARYGEOJSON,
  SEARCH_PRIMARYGEOJSON,
  REFRESH_GEOJSONDATA,
  GET_GEOLAYERS_LIST,
} from '../actions/types';

const initialState = {
  primaryGeojson: [],
  clonePrimaryGeojson: [],
  secondaryGeojson: [],
  projectPrimaryGeojsonUrl: '',
  projectsList: [],
  projectsRegionTypes: [],
  types: [],
  geolayersList: [],
};

const getSearchPrimaryGeojson = (state, action) => {
  const filteredData = state.primaryGeojson[0].features.filter(
    data => {
      const projectname = data.properties.name.toLowerCase();
      const keyword = action.payload.keyword.toLowerCase();
      return projectname.match(keyword);
    },
  );
  return {
    ...state,
    ...(filteredData.length > 0
      ? {
          clonePrimaryGeojson: {
            0: {
              ...state.primaryGeojson[0],
              features: filteredData,
            },
          },
        }
      : {
          clonePrimaryGeojson: {
            0: {
              ...state.primaryGeojson[0],
              features: [],
            },
          },
        }),
  };
};
const getVisibleTodos = (state, action) => {
  // let filteredData = [];
  // const clonefilteredData = [];
  // let inititalProgressData = [];
  // let finalProgressData = [];
  // let isSelected = false;
  // let isProjectSelected = false;
  // const a = { state, action };
  // workers.postMessage(a);
  // Object.keys(action.payload.filterByType).forEach(type => {
  //   if (type === 'project') {
  //     if (action.payload.filterByType[type].length > 0) {
  //       filteredData = state.primaryGeojson[0].features.filter(data =>
  //         action.payload.filterByType[type].includes(data[type]),
  //       );
  //     } else {
  //       isProjectSelected = true;
  //       filteredData = [];
  //     }
  //   }
  //   if (
  //     action.payload.filterByType[type].length > 0 &&
  //     isProjectSelected === false
  //   ) {
  //     if (type === 'progress') {
  //       const { progress } = action.payload.filterByType;
  //       progress.forEach(element => {
  //         const splittedProgress = element.split('_');
  //         const progress0 = splittedProgress[0];
  //         const progress1 = splittedProgress[1];
  //         const min = parseInt(progress0, 10);
  //         const max = parseInt(progress1, 10);
  //         const progressfilter = filteredData.filter(
  //           data => data[type] >= min && data[type] <= max,
  //         );
  //         clonefilteredData.push(progressfilter);
  //       });
  //       if (clonefilteredData.length === 0) {
  //         filteredData = [];
  //       }
  //       if (clonefilteredData.length > 1) {
  //         clonefilteredData.forEach((data, index) => {
  //           if (index === 0) {
  //             inititalProgressData = data;
  //           } else {
  //             finalProgressData = inititalProgressData.concat(data);
  //             inititalProgressData = finalProgressData;
  //           }
  //         });
  //         filteredData = finalProgressData;
  //       } else {
  //         const a = clonefilteredData[0];
  //         filteredData = a;
  //       }
  //     }
  //     if (type === 'status') {
  //       filteredData = filteredData.filter(data =>
  //         action.payload.filterByType[type].includes(data[type]),
  //       );
  //     }
  //     if (type === 'site_type') {
  //       filteredData = filteredData.filter(data =>
  //         action.payload.filterByType[type].includes(data[type]),
  //       );
  //     }
  //     if (type === 'region') {
  //       filteredData = filteredData.filter(data =>
  //         action.payload.filterByType[type].includes(data[type]),
  //       );
  //     }
  //   }
  //   isSelected = true;
  // });
  // workers.addEventListener('message', event => {
  //   console.log('worker function clicked');
  //   console.log(event.data);
  const { filteredData, isSelected } = action.payload;
  return {
    ...state,
    ...(filteredData.length > 0 && isSelected === true
      ? {
          clonePrimaryGeojson: [
            {
              ...state.primaryGeojson[0],
              features: filteredData,
            },
          ],
        }
      : filteredData.length === 0 && isSelected === false
      ? { clonePrimaryGeojson: state.primaryGeojson }
      : { clonePrimaryGeojson: [] }),
    // clonePrimaryGeojson: {
    //   0: { ...state.clonePrimaryGeojson[0], features: [] },
    // },
  };
  // });
};

export default function(state = initialState, action) {
  let allProjectsUrl = [];
  switch (action.type) {
    case GET_PROJECTS_LIST:
      action.payload.forEach((element, key) => {
        allProjectsUrl = allProjectsUrl.concat(
          element.primary_geojson,
        );
      });
      // return console.log(allProjectsUrl, 'reducer ');
      return {
        ...state,
        projectsList: [...action.payload],
        projectPrimaryGeojsonUrl: allProjectsUrl,
      };
    case GET_PRIMARY_MARKER_GEOJSON:
      return {
        ...state,
        primaryGeojson: action.payload,
        clonePrimaryGeojson: action.payload,
      };
    case GET_SECONDARY_MARKER_GEOJSON:
      return {
        ...state,
        secondaryGeojson: [action.payload],
      };

    case GET_PROJECTS_REGION_TYPES:
      return {
        ...state,
        projectsRegionTypes: [action.payload],
      };
    case FILTER_PRIMARYGEOJSON:
      return getVisibleTodos(state, action);
    case SEARCH_PRIMARYGEOJSON:
      return getSearchPrimaryGeojson(state, action);
    case REFRESH_GEOJSONDATA:
      return {
        ...state,
        clonePrimaryGeojson: [...state.primaryGeojson],
      };
    case GET_GEOLAYERS_LIST:
      return {
        ...state,
        geolayersList: action.payload,
      };
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
