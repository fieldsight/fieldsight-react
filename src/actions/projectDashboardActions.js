import axios from "axios";
import {
  GET_PROJECT_DASHBOARD,
  GET_PROJECT_METAS,
  GET_PROJECT_SUBMISSIONS,
  GET_PROJECT_DOCUMENTS,
  GET_PROJECT_LOGS,
  SHOW_PROJECT_DASHBOARD_LOADERS,
  GET_REGION_DATA,
  UPDATE_PROJECT_LOGO
} from "./types";
import { successToast, errorToast } from "../utils/toastHandler";

export const getProjectDashboard = id => dispatch => {
  dispatch({
    type: SHOW_PROJECT_DASHBOARD_LOADERS
  });
  axios
    .get(`fv3/api/project/${id}/`)
    .then(res => {
      dispatch({
        type: GET_PROJECT_DASHBOARD,
        payload: res.data
      });
    })
    .catch(err => {
      // dispatch({
      //   type: SITE_DASHBOARD_ERR
      // });
    });
};
