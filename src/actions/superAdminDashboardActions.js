import axios from 'axios';
import {
  GET_SUPERADMIN_DASHBOARD,
  GET_ADMIN_PROGRESS_TABLE_LIST,
  GET_ORG_EXPORT_LIST,
  CREATE_ORG_EXPORT,
  DELETE_ORG_EXPORT,
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

export const getOrgExportList = orgLibId => dispatch => {
  axios
    .get(
      `/fv3/api/kobo/organization-exports/?org_form_lib=${orgLibId}`,
    )
    .then(res => {
      dispatch({
        type: GET_ORG_EXPORT_LIST,
        payload: res.data,
      });
    })
    .catch(() => {});
};

export const createOrgExport = (orgLibId, body) => dispatch => {
  axios
    .post(
      `/fv3/api/kobo/organization-exports/?org_form_lib=${orgLibId}`,
      body,
    )
    .then(res => {
      dispatch({
        type: CREATE_ORG_EXPORT,
        payload: res.data,
      });
    })
    .catch(() => {});
};

export const deleteOrgExport = orgId => dispatch => {
  axios
    .post(`fv3/api/kobo/exports/${orgId}/`)
    .then(res => {
      dispatch({ type: DELETE_ORG_EXPORT, payload: res.data });
    })
    .catch(() => {});
};
