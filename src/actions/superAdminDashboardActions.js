import axios from 'axios';
import {
  GET_SUPERADMIN_DASHBOARD,
  GET_ADMIN_PROGRESS_TABLE_LIST,
} from './types';

/* eslint-disable */
export const getSuperAdminDashboard = id => dispatch => {
  axios
    .get(`/fv3/api/super-organization-lists/${id}/`)
    .then(res => {
      dispatch({
        type: GET_SUPERADMIN_DASHBOARD,
        payload: res.data,
      });
    })
    .catch(() => {});
};

export const getProgressTable = id => dispatch => {
  axios
    .get(`/fv3/api/organization-forms/${id}/`)
    .then(res => {
      dispatch({
        type: GET_ADMIN_PROGRESS_TABLE_LIST,
        payload: res.data,
      });
    })
    .catch(() => {});
};
// export default getSuperAdminDashboard;
