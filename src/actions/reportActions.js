import axios from 'axios';
import { GET_METRICS_DATA, REPORT_LOADER } from './types';
/* eslint-disable */

export const getMetricsData = () => dispatch => {
  dispatch({ type: REPORT_LOADER });
  axios
    .get('v4/api/reporting/metrics-data/')
    .then(res => {
      dispatch({ type: GET_METRICS_DATA, payload: res.data });
    })
    .catch(() => {});
};
