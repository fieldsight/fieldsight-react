import axios from 'axios';
import {
  GET_FORM_TYPES,
  GET_REPORT_LIST,
  GET_PROJECT_BREADCRUMB,
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
