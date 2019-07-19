import axios from "axios";
import {
  GET_SUBMISSION_DETAIL,
  POST_SUBMISSION_DETAIL,
  START_SUBMISSION_LOADER,
  UPDATE_SUBMISSION_DETAIL,
  STOP_SUBMISSION_LOADER,
  SHOW_DOT_LOADER
} from "./types";
import { successToast, errorToast } from "../utils/toastHandler";

export const getSubmissionDetail = id => dispatch => {
  const splitedData = id.split("/");
  console.log("splitedData", splitedData);
  if (splitedData.length > 1) {
    console.log("if block");
    dispatch({
      type: START_SUBMISSION_LOADER
    });
    axios
      .get(`${id}`)
      .then(res => {
        dispatch({
          type: STOP_SUBMISSION_LOADER
        });
        dispatch({
          type: UPDATE_SUBMISSION_DETAIL,
          payload: res.data
        });
      })
      .catch(err => {
        console.log("err", err);
        dispatch({
          type: STOP_SUBMISSION_LOADER
        });
      });
  } else {
    console.log("else block");
    dispatch({
      type: SHOW_DOT_LOADER
    });
    axios
      .get(`fv3/api/submission/${id}/`)
      .then(res => {
        dispatch({
          type: GET_SUBMISSION_DETAIL,
          payload: res.data
        });
      })
      .catch(err => {
        console.log("err", err);
        dispatch({
          type: STOP_SUBMISSION_LOADER
        });
      });
  }
};

export const postSubmissionDetail = data => dispatch => {
  dispatch({
    type: START_SUBMISSION_LOADER
  });
  axios
    .post("fv3/api/change/submission/status/", data, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then(res => {
      dispatch({
        type: STOP_SUBMISSION_LOADER
      });
      dispatch({
        type: POST_SUBMISSION_DETAIL,
        payload: res.data
      });
      successToast("Status", "added");
    })
    .catch(err => {
      console.log("err", err);
      dispatch({
        type: STOP_SUBMISSION_LOADER
      });
      errorToast();
    });
};
