import axios from "axios";

import {
  GET_SITE_DASHBOARD,
  GET_SITE_METAS,
  GET_SITE_SUBMISSIONS,
  GET_SITE_DOCUMENTS,
  GET_SITE_LOGS,
  GET_SITE_FORMS,
  GET_RECENT_PICTURES,
  GET_SUBSITES,
  SHOW_DOT_LOADER,
  SHOW_DASHBOARD_LOADERS
} from "./types";

export const getSiteDashboard = id => dispatch => {
  dispatch({
    type: SHOW_DASHBOARD_LOADERS
  });
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
  dispatch({
    type: SHOW_DASHBOARD_LOADERS
  });
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
  dispatch({
    type: SHOW_DASHBOARD_LOADERS
  });
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
  dispatch({
    type: SHOW_DASHBOARD_LOADERS
  });
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
  dispatch({
    type: SHOW_DASHBOARD_LOADERS
  });
  axios
    .get(`events/api/site_logs/${id}/`)
    .then(res => {
      dispatch({
        type: GET_SITE_LOGS,
        payload: res.data.results
      });
    })
    .catch(err => {
      console.log("Err", err);
    });
};

export const getSiteForms = (id, formType) => dispatch => {
  dispatch({
    type: SHOW_DOT_LOADER
  });
  axios
    .get(`fv3/api/site-forms/${id}/?type=${formType}`)
    .then(res => {
      dispatch({
        type: GET_SITE_FORMS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("Err", err);
    });
};

export const getRecentPictures = id => dispatch => {
  dispatch({
    type: SHOW_DASHBOARD_LOADERS
  });
  axios
    .get(`/fv3/api/site-recent-pictures/?site=${id}`)
    .then(res => {
      dispatch({
        type: GET_RECENT_PICTURES,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("err", err);
    });
};

export const getSubsites = id => dispatch => {
  axios
    .get(`fv3/api/sub-site-list/?site=${id}`)
    .then(res => {
      dispatch({
        type: GET_SUBSITES,
        payload: res.data
      });
    })
    .catch(err => console.log("ERr", err));
};
