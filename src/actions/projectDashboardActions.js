import axios from 'axios';
import {
  GET_PROJECT_DASHBOARD,
  SHOW_PROJECT_DASHBOARD_LOADERS,
  GET_REGION_DATA,
  GET_PROGRESS_TABLE_DATA,
  GET_SURVEY_FORM,
} from './types';

export const getProjectDashboard = id => dispatch => {
  dispatch({
    type: SHOW_PROJECT_DASHBOARD_LOADERS,
  });
  axios
    .get(`fv3/api/project/${id}/`)
    .then(res => {
      dispatch({
        type: GET_PROJECT_DASHBOARD,
        payload: res.data,
      });
    })
    .catch(err => {
      // dispatch({
      //   type: SITE_DASHBOARD_ERR
      // });
    });
};

export const getRegionData = id => dispatch => {
  dispatch({
    type: SHOW_PROJECT_DASHBOARD_LOADERS,
  });
  axios
    .get(`fv3/api/project-regions/?project=${id}`)
    .then(res => {
      dispatch({
        type: GET_REGION_DATA,
        payload: res.data,
      });
    })
    .catch(err => {});
};
export const getProgressTableData = id => dispatch => {
  dispatch({
    type: SHOW_PROJECT_DASHBOARD_LOADERS,
  });
  axios
    .get(`fv3/api/progress-table/${id}/`)
    .then(res => {
      dispatch({
        type: GET_PROGRESS_TABLE_DATA,
        payload: res.data,
      });
    })
    .catch(err => {});
};

export const getSurveyForm = id => dispatch => {
  axios
    .get(`/fv3/api/project-survey-forms/${id}/`)
    .then(res => {
      dispatch({
        type: GET_SURVEY_FORM,
        payload: res.data,
      });
    })
    .catch(err => {});
};
