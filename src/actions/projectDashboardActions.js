import axios from 'axios';
import {
  GET_PROJECT_DASHBOARD,
  SHOW_PROJECT_DASHBOARD_LOADERS,
  GET_REGION_DATA,
  GET_PROGRESS_TABLE_DATA,
  GET_SURVEY_FORM,
  GET_CHART_DATA,
  GET_PROJECT_LOGS,
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
    .catch(() => {});
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
    .catch(() => {});
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
    .catch(() => {});
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
    .catch(() => {});
};

export const getChartData = id => dispatch => {
  axios
    .get(`/fv3/api/project-chart-data/${id}/`)
    .then(res => {
      dispatch({
        type: GET_CHART_DATA,
        payload: res.data,
      });
    })
    .catch(() => {});
};

export const getProjectLogs = id => dispatch => {
  axios
    .get(`/fv3/api/project-logs/${id}/`)
    .then(res => {
      dispatch({
        type: GET_PROJECT_LOGS,
        payload: res.data,
      });
    })
    .catch(() => {});
};
