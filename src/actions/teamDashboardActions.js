import axios from "axios";
import {
  GET_TEAM_DASHBOARD,
  SHOW_TEAM_DASHBOARD_LOADERS,
  POST_PACKAGE_SUBSCRIBE
} from "./types";
import { successToast, errorToast } from "../utils/toastHandler";

export const getTeamDashboard = id => dispatch => {
  dispatch({
    type: SHOW_TEAM_DASHBOARD_LOADERS
  });
  axios
    .get(`fv3/api/team/${id}/`)
    .then(res => {
      dispatch({
        type: GET_TEAM_DASHBOARD,
        payload: res.data
      });
    })
    .catch(err => {
      // dispatch({
      //   type: SITE_DASHBOARD_ERR
      // });
    });
};

export const postPackageSubscribe = (id, payload) => dispatch => {
  dispatch({
    type: SHOW_TEAM_DASHBOARD_LOADERS
  });
  axios
    .post(`fv3/api/subscriptions/${id}/`, payload)
    .then(res => {
      dispatch({
        type: POST_PACKAGE_SUBSCRIBE,
        response: res.data
      });
    })
    .catch(err => {
      // console.log("error", err);
    });
};
