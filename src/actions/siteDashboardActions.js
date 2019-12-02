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
  SHOW_DASHBOARD_LOADERS,
  UPDATE_SITE_LOGO
  // SITE_DASHBOARD_ERR,
  // SITE_METAS_ERR,
  // SITE_SUBMISSIONS_ERR,
  // SITE_DOCUMENTS_ERR,
  // SITE_PICTURES_ERR,
  // SITE_LOGS_ERR
} from "./types";

import { successToast, errorToast } from "../utils/toastHandler";

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
      // dispatch({
      //   type: SITE_DASHBOARD_ERR
      // });
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
      // dispatch({
      //   type: SITE_METAS_ERR
      // });
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
      // dispatch({
      //   type: SITE_SUBMISSIONS_ERR
      // });
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
      console.log("err", err);
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
      // dispatch({
      //   type: SITE_LOGS_ERR
      // });
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
      // dispatch({
      //   type: SITE_PICTURES_ERR
      // });
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

export const putCropImage = (id, cropImage) => dispatch => {
  const formData = new FormData();
  formData.append("logo", cropImage);
  axios
    .put(`fv3/api/site-crop-image/${id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then(res => {
      dispatch({
        type: UPDATE_SITE_LOGO,
        payload: cropImage
      });

      successToast("Logo", "updated");
    })
    .catch(err => {
      console.log("err", err);
    });
};
