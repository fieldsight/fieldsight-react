import axios from 'axios';

import {
  FORM_LOADER,
  GET_MY_FORM_LIST,
  GET_PROJECT_FORM_LIST,
  GET_SHARED_FORM_LIST,
  GET_REGIONS_AND_TYPES,
} from './types';

export const getRegionsAndTypes = id => dispatch => {
  dispatch({
    type: FORM_LOADER,
  });
  axios
    .get(`fv3/api/project-regions-types/${id}/`)
    .then(res => {
      dispatch({
        type: GET_REGIONS_AND_TYPES,
        payload: res.data,
      });
    })
    .catch(() => {
      // dispatch({
      //   type: SITE_DASHBOARD_ERR
      // });
    });
};

export const getMyFormList = () => dispatch => {
  dispatch({
    type: FORM_LOADER,
  });
  axios
    .get(`fv3/api/myforms/`)
    .then(res => {
      dispatch({
        type: GET_MY_FORM_LIST,
        payload: res.data,
      });
    })
    .catch(() => {});
};

export const getProjectFormList = () => dispatch => {
  dispatch({
    type: FORM_LOADER,
  });
  axios
    .get(`fv3/api/myforms/`)
    .then(res => {
      dispatch({
        type: GET_PROJECT_FORM_LIST,
        payload: res.data,
      });
    })
    .catch(() => {});
};

export const getSharedFormList = () => dispatch => {
  dispatch({
    type: FORM_LOADER,
  });
  axios
    .get(`fv3/api/myforms/`)
    .then(res => {
      dispatch({
        type: GET_SHARED_FORM_LIST,
        payload: res.data,
      });
    })
    .catch(() => {});
};
