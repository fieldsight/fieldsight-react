import axios from "axios";
import { GET_MY_TASK, GET_OTHER_TASK, GET_NOTIFICATIONS, NAV_LOADER } from "./types";

export const getMyTask = () => dispatch => {
  dispatch({
    type: NAV_LOADER
  });
  axios
    .get(`events/api/mytasks/`)
    .then(res => {
      dispatch({
        type: GET_MY_TASK,
        payload: res.data
      });
    })
    .catch(() => { });
};

export const getOtherTask = () => dispatch => {
  dispatch({
    type: NAV_LOADER
  });
  axios
    .get(`events/api/othertasks/`)
    .then(res => {
      dispatch({
        type: GET_OTHER_TASK,
        payload: res.data
      });
    })
    .catch(() => { });
};

export const getNotifications = () => dispatch => {
  dispatch({
    type: NAV_LOADER
  });
  axios
    .get(`events/api/notification/`)
    .then(res => {
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: res.data
      });
    })
    .catch(() => { });
};
