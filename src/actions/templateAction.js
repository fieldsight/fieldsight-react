import axios from 'axios';
import { GET_FORM_TYPES, GET_REPORT_LIST } from './types';

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
