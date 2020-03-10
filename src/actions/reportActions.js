import axios from 'axios';
import {
  GET_METRICS_DATA,
  REPORT_LOADER,
  GET_FORM,
  GET_FORM_QUESTIONS,
  GET_REPORTS_LIST,
  APPLY_ACTION_TO_REPORT,
  GET_REPORT_DATA,
  GET_CUSTOM_REPORT_TABLE_DATA,
  GET_TO_FILTER_DATA,
} from './types';
/* eslint-disable */
// custom report actions

export const getMetricsData = projectId => dispatch => {
  dispatch({ type: REPORT_LOADER });
  axios
    .get(`v4/api/reporting/metrics-data/${projectId}/`)
    .then(res => {
      dispatch({ type: GET_METRICS_DATA, payload: res.data });
    })
    .catch(() => {});
};

export const getForms = (projectId, type) => dispatch => {
  dispatch({ type: REPORT_LOADER });
  axios
    .get(
      `v4/api/reporting/project-form-data/${projectId}/?form_type=${type}`,
    )
    .then(res => {
      dispatch({ type: GET_FORM, payload: res.data });
    })
    .catch(() => {});
};

export const getFormQuestions = (projectId, id) => dispatch => {
  dispatch({ type: REPORT_LOADER });
  axios
    .get(`fieldsight/api/project/forms/${projectId}/?id=${id}`)
    .then(res => {
      dispatch({ type: GET_FORM_QUESTIONS, payload: res.data });
    })
    .catch(() => {});
};

export const getReportsList = (id, type) => dispatch => {
  dispatch({ type: REPORT_LOADER });
  axios
    .get(`v4/api/reporting/reports-list/${id}/?type=${type}`)
    .then(res => {
      dispatch({ type: GET_REPORTS_LIST, payload: res.data });
    })
    .catch(() => {});
};

export const applyActionToReport = (reportId, type) => dispatch => {
  dispatch({ type: REPORT_LOADER });
  axios
    .get(`v4/api/reporting/export/${reportId}/?export_type=${type}`)
    .then(res => {
      dispatch({ type: APPLY_ACTION_TO_REPORT, payload: res.data });
    })
    .catch(() => {});
};

export const getReportData = reportId => dispatch => {
  dispatch({ type: REPORT_LOADER });
  axios
    .get(`/v4/api/reporting/report/${reportId}/`)
    .then(res => {
      dispatch({ type: GET_REPORT_DATA, payload: res.data });
    })
    .catch(() => {});
};

export const getCustomReportTableData = reportId => dispatch => {
  dispatch({ type: REPORT_LOADER });
  axios
    .get(`/v4/api/reporting/preview-custom-report/${reportId}/`)
    .then(res => {
      dispatch({
        type: GET_CUSTOM_REPORT_TABLE_DATA,
        payload: res.data,
      });
    })
    .catch(() => {});
};

export const getToFilterData = projectId => dispatch => {
  dispatch({ type: REPORT_LOADER });
  axios
    .get(`/v4/api/reporting/project-report-filter/${projectId}/`)
    .then(res => {
      dispatch({
        type: GET_TO_FILTER_DATA,
        payload: res.data,
      });
    })
    .catch(() => {});
};
