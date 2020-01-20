import axios from 'axios';
import {
  GET_EXPORT_LIST,
  CREATE_EXPORT,
  DELETE_EXPORT,
  DOWNLOAD_EXPORT,
} from './types';
/* eslint-disable */

export const getExportList = (
  isProject,
  formId,
  projectId,
) => dispatch => {
  axios
    .get(
      `fv3/api/kobo/exports/?is_project=${isProject}&fsxf=${formId}&id=${projectId}/`,
    )
    .then(res => {
      dispatch({ type: GET_EXPORT_LIST, payload: res.data });
    })
    .catch(() => {});
};

export const createExport = (
  isProject,
  formId,
  projectId,
  body,
) => dispatch => {
  axios
    .post(
      `fv3/api/kobo/exports/?is_project=${isProject}&fsxf=${formId}&id=${projectId}`,
      body,
    )
    .then(res => {
      dispatch({ type: CREATE_EXPORT, payload: res.data });
    })
    .catch(() => {});
};

export const deleteExport = formId => dispatch => {
  axios
    .post(`fv3/api/kobo/exports/${formId}/`)
    .then(res => {
      dispatch({ type: DELETE_EXPORT, payload: res.data });
    })
    .catch(() => {});
};

export const downloadExport = exportId => dispatch => {
  axios
    .get(`fv3/api/kobo/exports/${exportId}/`)
    .then(res => {
      dispatch({ type: DOWNLOAD_EXPORT, payload: res.data });
    })
    .catch(() => {});
};
