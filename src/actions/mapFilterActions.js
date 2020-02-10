import axios from 'axios';
import {
  GET_PRIMARY_MARKER_GEOJSON,
  GET_SECONDARY_MARKER_GEOJSON,
  GET_PROJECTS_LIST,
  GET_PROJECTS_REGION_TYPES,
  FILTER_PRIMARYGEOJSON,
  SEARCH_PRIMARYGEOJSON,
  REFRESH_GEOJSONDATA,
  GET_GEOLAYERS_LIST,
} from './types';
import worker from '../components/mapfilter/webWorker/worker';
import WebWorker from '../components/mapfilter/webWorker/workerSetup';

export const getProjectsList = id => dispatch => {
  axios
    .get(`/fieldsight/api/organization/project/${id}/`) // 137
    .then(res => {
      dispatch({
        type: GET_PROJECTS_LIST,
        payload: res.data,
      });
    })
    .catch(() => {});
};
export const getPrimaryMarkerGeojson = url => dispatch => {
  //   dispatch({
  //     type: SHOW_PROJECT_DASHBOARD_LOADERS,
  //   });
  axios
    .get(url) // 154
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
    .get(`fieldsight/api/project/${id}/sites/geoJSON/`) // 137
    .then(res => {
      dispatch({
        type: GET_SECONDARY_MARKER_GEOJSON,
        payload: res.data,
      });
    })
    .catch(() => {});
};

export const getProjectsRegionTypes = id => dispatch => {
  axios
    .get(`/fv3/api/project-regions-types/${id}/`)
    .then(res => {
      dispatch({
        type: GET_PROJECTS_REGION_TYPES,
        payload: res.data,
      });
    })
    .catch(() => {});
};
export const getFilteredPrimaryGeojson = payload => async (
  dispatch,
  getState,
) => {
  const {
    mapFilterReducer: { clonePrimaryGeojson, primaryGeojson },
  } = getState();
  const workers = new WebWorker(worker);

  workers.postMessage({
    state: { clonePrimaryGeojson, primaryGeojson },
    action: { payload },
  });

  workers.addEventListener('message', event => {
    dispatch({
      type: FILTER_PRIMARYGEOJSON,
      payload: event.data,
    });
  });
};
export const getSearchPrimaryGeojson = payload => dispatch => {
  dispatch({
    type: SEARCH_PRIMARYGEOJSON,
    payload,
  });
};
export const refreshGeojsonData = payload => dispatch => {
  dispatch({
    type: REFRESH_GEOJSONDATA,
  });
};
export const getGeolayersList = id => dispatch => {
  axios
    .get(`/fieldsight/api/project/geolayers/${id}/`)
    .then(res => {
      dispatch({
        type: GET_GEOLAYERS_LIST,
        payload: res.data,
      });
    })
    .catch(() => {});
};
