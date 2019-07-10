import axios from "axios";
import { GET_SUBMISSION_DETAIL, POST_SUBMISSION_DETAIL } from "./types";

export const getSubmissionDetail = id => dispatch => {
  axios
    .get(`fv3/api/submission/${id}/`)
    .then(res => {
      dispatch({
        type: GET_SUBMISSION_DETAIL,
        payload: res.data
      });
    })
    .catch(err => console.log("err", err));
};

export const postSubmissionDetail = data => dispatch => {
  axios
    .post("fv3/api/change/submission/status/", data, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then(res => {
      console.log("res", res);
    })
    .catch(err => {
      console.log("err", err, err.response);
    });
};
