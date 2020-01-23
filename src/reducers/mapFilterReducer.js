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
  const clonefilteredData = [];
  let inititalProgressData = [];
  let finalProgressData = [];
  let isSelected = false;
  let isProjectSelected = false;
  // console.log(action.payload, 'action payload');

  Object.keys(action.payload.filterByType).forEach(type => {
    // console.log(action.payload.filterByType, 'bytype');
    // console.log(type, 'type');
    // debugger;
    if (type === 'project') {
      // if (filteredData.length > 0) {
      //   filteredData = filteredData.filter(data =>
      //     action.payload.filterByType[type].includes(data[type]),
      //   );
      // } else {

      // console.log(action.payload.filterByType[type]);
      if (action.payload.filterByType[type].length > 0) {
        filteredData = state.primaryGeojson[0].features.filter(data =>
          action.payload.filterByType[type].includes(data[type]),
        );
      } else {
        isProjectSelected = true;
        filteredData = [];
      }
    }

    if (
      action.payload.filterByType[type].length > 0 &&
      isProjectSelected === false
    ) {
      // console.log(type, 'type');

      if (type === 'progress') {
        // if (filteredData.length > 0) {
        const { progress } = action.payload.filterByType;
        progress.forEach(element => {
          const splittedProgress = element.split('_');
          const progress0 = splittedProgress[0];
          const progress1 = splittedProgress[1];
          const min = parseInt(progress0, 10);
          const max = parseInt(progress1, 10);
          const progressfilter = filteredData.filter(
            data => data[type] >= min && data[type] <= max,
          );
          // console.log(min, max, 'min_max');
          // console.log(progressfilter, 'progressfilter');
          clonefilteredData.push(progressfilter);
        });
        if (clonefilteredData.length === 0) {
          filteredData = [];
        }
        // console.log(clonefilteredData, 'merged data');
        if (clonefilteredData.length > 1) {
          clonefilteredData.forEach((data, index) => {
            // console.log(index, 'index');
            if (index === 0) {
              inititalProgressData = data;
            } else {
              finalProgressData = inititalProgressData.concat(data);
              inititalProgressData = finalProgressData;
            }
          });
          // console.log(finalProgressData, 'filteredProgressdata');
          filteredData = finalProgressData;
        } else {
          // console.log('else of progress');
          // console.log(clonefilteredData);
          const a = clonefilteredData[0];
          filteredData = a;
          // console.log(filteredData, 'a=filtered');
        }
        // } else {
        // const { progress } = action.payload.filterByType;
        // progress.forEach(element => {
        //   const splittedProgress = element.split('_');
        //   const progress0 = splittedProgress[0];
        //   const progress1 = splittedProgress[1];
        //   const min = parseInt(progress0, 10);
        //   const max = parseInt(progress1, 10);
        //   const progressfilter = state.primaryGeojson[0].features.filter(
        //     data => data[type] >= min && data[type] <= max,
        //   );
        //   // console.log(min, max, 'min_max');
        //   console.log(progressfilter, 'progressfilter');
        //   clonefilteredData.push(progressfilter);
        //   if (progressfilter.length === 0) {
        //     filteredData = [];
        //   }
        // });
        // // console.log(clonefilteredData, 'merged data');
        // if (clonefilteredData.length > 1) {
        //   clonefilteredData.forEach((data, index) => {
        //     // console.log(index, 'index');
        //     if (index === 0) {
        //       inititalProgressData = data;
        //     } else {
        //       finalProgressData = inititalProgressData.concat(data);
        //       inititalProgressData = finalProgressData;
        //     }
        //   });
        //   console.log(finalProgressData, 'filteredProgressdata');
        //   filteredData = finalProgressData;
        // } else {
        //   const a = clonefilteredData[0];
        //   filteredData = a;
        // }
        // }
      }
      if (type === 'status') {
        // if (filteredData.length > 0) {
        filteredData = filteredData.filter(data =>
          action.payload.filterByType[type].includes(data[type]),
        );
        // } else {
        //   filteredData = state.primaryGeojson[0].features.filter(
        //     data =>
        //       action.payload.filterByType[type].includes(data[type]),
        //   );
        // }
      }
      if (type === 'site_type') {
        // if (filteredData.length > 0) {
        filteredData = filteredData.filter(data =>
          action.payload.filterByType[type].includes(data[type]),
        );
        // } else {
        //   filteredData = state.primaryGeojson[0].features.filter(
        //     data =>
        //       action.payload.filterByType[type].includes(data[type]),
        //   );
        // }
      }
      if (type === 'region') {
        // if (filteredData.length > 0) {
        filteredData = filteredData.filter(data =>
          action.payload.filterByType[type].includes(data[type]),
        );
        // } else {
        //   filteredData = state.primaryGeojson[0].features.filter(
        //     data =>
        //       action.payload.filterByType[type].includes(data[type]),
        //   );
        // }
      }
    }
    isSelected = true;
  });

  // Object.keys(action.payload.filterByType).forEach(type => {
  //   console.log(type, 'type');
  //   if (action.payload.filterByType[type].length > 0) {
  //     console.log('type length more than 0');
  //     if (filteredData.length > 0) {
  //       console.log('filtereddata more than 0');
  //       if (type === 'site_type') {
  //         filteredData = filteredData.filter(data =>
  //           action.payload.filterByType[type].includes(data[type]),
  //         );
  //         console.log(filteredData, 'region/site_type');
  //       }
  //       if (type === 'region') {
  //         filteredData = filteredData.filter(data =>
  //           action.payload.filterByType[type].includes(data[type]),
  //         );
  //       }
  //       if (type === 'progress') {
  //         const { progress } = action.payload.filterByType;
  //         progress.forEach(element => {
  //           const splittedProgress = element.split('_');
  //           const progress0 = splittedProgress[0];
  //           const progress1 = splittedProgress[1];
  //           const min = parseInt(progress0, 10);
  //           const max = parseInt(progress1, 10);
  //           console.log(min, max, 'min_max');
  //           // filteredData = filteredData.filter(
  //           //   data => data[type] >= min && data[type] <= max,
  //           // );
  //           if (filteredData.length > 0) {
  //             console.log('if progress ko bhitra');
  //             const filterdata = filteredData.filter(
  //               data => data[type] >= min && data[type] <= max,
  //             );
  //             // clonefilteredData.concat(filterdata);
  //             if (filterdata.length !== 0) {
  //               filteredData = [];
  //             }
  //             console.log(filterdata, 'filterdata if if progress');
  //             Array.prototype.push.apply(filteredData, filterdata);
  //             console.log(filteredData, 'filteredData');
  //           } else {
  //             console.log('else progress ko bhitra');
  //             const filterdata = state.primaryGeojson[0].features.filter(
  //               data => data[type] >= min && data[type] <= max,
  //             );
  //             // clonefilteredData.push(filterdata);
  //             if (filterdata.length !== 0) {
  //               filteredData = [];
  //             }
  //             Array.prototype.push.apply(filteredData, filterdata);
  //           }
  //           // Array.prototype.push.apply(filteredData, filteredData);
  //         });
  //       }
  //       console.log(type, 'typesssss');
  //       if (type === 'status') {
  //         console.log('status uppere');
  //         filteredData = filteredData.filter(data =>
  //           action.payload.filterByType[type].includes(data[type]),
  //         );
  //       }
  //     } else {
  //       console.log('else');
  //       // filteredData = [
  //       //   ...filteredData,
  //       //   ...state.primaryGeojson[0].features.filter(data =>
  //       //     action.payload.filterByType[type].includes(data[type]),
  //       //   ),
  //       // ];
  //       if (type === 'site_type') {
  //         console.log('sitetype of else ');
  //         filteredData = state.primaryGeojson[0].features.filter(
  //           data =>
  //             action.payload.filterByType[type].includes(data[type]),
  //         );
  //         console.log(filteredData, 'filteredData of else site_type');
  //       }
  //       if (type === 'region') {
  //         filteredData = state.primaryGeojson[0].features.filter(
  //           data =>
  //             action.payload.filterByType[type].includes(data[type]),
  //         );
  //       }
  //       if (type === 'progress') {
  //         console.log('progress');
  //         const { progress } = action.payload.filterByType;
  //         progress.forEach(element => {
  //           const splittedProgress = element.split('_');
  //           const progress0 = splittedProgress[0];
  //           const progress1 = splittedProgress[1];
  //           const min = parseInt(progress0, 10);
  //           const max = parseInt(progress1, 10);
  //           if (filteredData.length > 0) {
  //             const filterdata = state.primaryGeojson[0].features.filter(
  //               data => data[type] >= min && data[type] <= max,
  //             );
  //             // clonefilteredData.concat(filterdata);
  //             Array.prototype.push.apply(filteredData, filterdata);
  //           } else {
  //             const filterdata = state.primaryGeojson[0].features.filter(
  //               data => data[type] >= min && data[type] <= max,
  //             );
  //             // clonefilteredData.push(filterdata);
  //             Array.prototype.push.apply(filteredData, filterdata);
  //           }
  //         });

  //         // const splittedProgress = progress[0].split('_');
  //         // const progress0 = splittedProgress[0];
  //         // const progress1 = splittedProgress[1];
  //         // const min = parseInt(progress0, 10);
  //         // const max = parseInt(progress1, 10);
  //         // console.log(max, 'max');
  //         // console.log(min, 'min');
  //         // filteredData = state.primaryGeojson[0].features.filter(
  //         //   data => data[type] >= min && data[type] <= max,
  //         // );
  //         // console.log('progress');
  //       }
  //       console.log(type, 'typesssss tala ko');
  //       if (type === 'status') {
  //         console.log('status inside');
  //         filteredData = state.primaryGeojson[0].features.filter(
  //           data =>
  //             action.payload.filterByType[type].includes(data[type]),
  //         );
  //       }
  //       console.log(clonefilteredData, 'clonefilteredata');
  //     }
  //     isSelected = true;
  //   }
  // });
  // console.log(filteredData, 'filteredeData');
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
    // clonePrimaryGeojson: {
    //   0: { ...state.clonePrimaryGeojson[0], features: [] },
    // },
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
