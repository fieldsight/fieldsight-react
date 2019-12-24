import axios from 'axios';
import {
  GET_SUPERADMIN_DASHBOARD,
  SHOW_SUPERADMIN_DASHBOARD_LOADER,
} from './types';

/* eslint-disable */
export const getSuperAdminDashboard = id => dispatch => {
  axios
    .get(`/fv3/api/super-organization-lists/${id}/`)
    .then(res => {
      console.log(res, 'res');
      dispatch({
        type: GET_SUPERADMIN_DASHBOARD,
        payload: res.data,
      });
    })
    .catch(() => {});
};

// export default getSuperAdminDashboard;
