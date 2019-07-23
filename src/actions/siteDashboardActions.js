import axios from "axios";

import {
  GET_SITE_DASHBOARD,
  GET_SITE_METAS,
  GET_SITE_SUBMISSIONS,
  GET_SITE_DOCUMENTS,
  GET_SITE_LOGS
} from "./types";

export const getSiteDashboard = id => dispatch => {
  axios
    .get(`fv3/api/site/${id}/`)
    .then(res => {
      dispatch({
        type: GET_SITE_DASHBOARD,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("Err ", err);
    });
};

// site metas/ information
export const getSiteMetas = id => dispatch => {
  axios
    .get(`fieldsight/api/siteallmetas/${id}/`)
    .then(res => {
      dispatch({
        type: GET_SITE_METAS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("Err ", err);
    });
};

export const getSiteSubmissions = id => dispatch => {
  axios
    .get(`fv3/api/site-submissions/?site=${id}`)
    .then(res => {
      dispatch({
        type: GET_SITE_SUBMISSIONS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("Err ", err);
    });
};

export const getSiteDocuments = id => dispatch => {
  axios
    .get(`fv3/api/site/documents/?site_id=${id}`)
    .then(res => {
      dispatch({
        type: GET_SITE_DOCUMENTS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("Err", err);
    });
};

export const getSiteLogs = id => dispatch => {
  axios
    .get(`/events/api/site_logs/${id}/`)
    .then(res => {
      console.log("getSiteLogs", res.data);
      dispatch({
        type: GET_SITE_LOGS,
        payload: res.data.results
      });
    })
    .catch(err => {
      console.log("Err", err);
    });
};
