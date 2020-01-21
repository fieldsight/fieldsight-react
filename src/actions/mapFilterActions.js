import axios from 'axios';
import {
  GET_PRIMARY_MARKER_GEOJSON,
  GET_SECONDARY_MARKER_GEOJSON,
  GET_PROJECTS_LIST,
  GET_PROJECTS_REGION_TYPES,
  FILTER_PRIMARYGEOJSON,
} from './types';

export const getPrimaryMarkerGeojson = id => dispatch => {
  //   dispatch({
  //     type: SHOW_PROJECT_DASHBOARD_LOADERS,
  //   });
  axios
    .get(`fieldsight/getGeoJson/213/`)
    .then(res => {
      dispatch({
        type: GET_PRIMARY_MARKER_GEOJSON,
        payload: res.data,
      });
    })
    .catch(() => {});
};

export const getSecondaryMarkerGeojson = id => dispatch => {
  axios
    .get(`fieldsight/api/project/269/sites/geoJSON/`)
    .then(res => {
      dispatch({
        type: GET_SECONDARY_MARKER_GEOJSON,
        payload: res.data,
      });
    })
    .catch(() => {});
};
export const getProjectsList = id => dispatch => {
  axios
    .get(`/fieldsight/api/organization/project/269/`)
    .then(res => {
      dispatch({
        type: GET_PROJECTS_LIST,
        payload: res.data,
      });
    })
    .catch(() => {});
};
export const getProjectsRegionTypes = id => dispatch => {
  axios
    .get(`/fv3/api/project-regions-types/269/`)
    .then(res => {
      dispatch({
        type: GET_PROJECTS_REGION_TYPES,
        payload: res.data,
      });
    })
    .catch(() => {});
};
export const getFilteredPrimaryGeojson = payload => dispatch => {
  dispatch({
    type: FILTER_PRIMARYGEOJSON,
    payload,
  });
};
