import axios from 'axios';
import {
  GET_FORM_TYPES,
  GET_REPORT_LIST,
  GET_PROJECT_BREADCRUMB,
  GET_TYPES,
  GET_REGIONS,
  GENERATE_DATA_EXPORT,
} from './types';

export const getReportList = id => dispatch => {
  axios
    .get(`/v4/api/reporting/reports-list/${id}/?type=custom`)
    .then(res => {
      dispatch({
        type: GET_REPORT_LIST,
        payload: res.data,
      });
    })
    .catch();
};

export const getFormType = (id, types) => dispatch => {
  axios
    .get(
      `/v4/api/reporting/project-form-data/${id}/?form_type=${types}`,
    )
    .then(res => {
      dispatch({
        type: GET_FORM_TYPES,
        payload: res.data,
        flag: types,
      });
    })
    .catch();
};

export const getProjectBreadcrumb = projectId => dispatch => {
  axios
    .get(`/fv3/api/settings-breadcrumbs/${projectId}/?type=project`)
    .then(res => {
      dispatch({
        type: GET_PROJECT_BREADCRUMB,
        payload: res.data,
      });
    })
    .catch();
};

export const getRegionList = projectId => dispatch => {
  axios
    .get(`/fieldsight/api/site-types/${projectId}/`)
    .then(res => {
      dispatch({
        type: GET_REGIONS,
        payload: res.data,
      });
    })
    .catch();
};

export const getTypeList = projectId => dispatch => {
  axios
    .get(`/fieldsight/api/project-regions/${projectId}/`)
    .then(res => {
      dispatch({
        type: GET_TYPES,
        payload: res.data,
      });
    })
    .catch();
};
export const generateDataExport = (projectId, body) => dispatch => {
  axios
    .post(
      `fieldsight/export/xls/project/responses/${projectId}/`,
      body,
    )
    .then(res => {
      dispatch({
        type: GENERATE_DATA_EXPORT,
        payload: res.data,
      });
    })
    .catch();
};
