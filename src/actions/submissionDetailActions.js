import axios from 'axios';
import {
  GET_SUBMISSION_DETAIL,
  POST_SUBMISSION_DETAIL,
  START_SUBMISSION_LOADER,
  UPDATE_SUBMISSION_DETAIL,
  STOP_SUBMISSION_LOADER,
  TOGGLE_NULL_SUBMISSIONS_ANSWER,
  SHOW_SUBMISSION_ERR_MSG,
} from './types';
import { successToast, errorToast } from '../utils/toastHandler';

export const getSubmissionDetail = id => dispatch => {
  dispatch({
    type: START_SUBMISSION_LOADER,
  });

  const splitedData = id.toString().split('/');
  if (splitedData.length > 1) {
    axios
      .get(`${id}`)
      .then(res => {
        dispatch({
          type: STOP_SUBMISSION_LOADER,
        });
        dispatch({
          type: UPDATE_SUBMISSION_DETAIL,
          payload: res.data,
        });
      })
      .catch(() => {
        dispatch({
          type: STOP_SUBMISSION_LOADER,
        });
      });
  } else {
    axios
      .get(`fv3/api/submission/${id}/`)

      .then(res => {
        // console.log(res, 'submission');

        dispatch({
          type: STOP_SUBMISSION_LOADER,
        });
        dispatch({
          type: GET_SUBMISSION_DETAIL,
          payload: res.data,
        });
      })
      .catch(err => {
        dispatch({
          type: SHOW_SUBMISSION_ERR_MSG,
          err: {
            msg: err.response.data.detail,
            status: err.response.status,
          },
        });
        dispatch({
          type: STOP_SUBMISSION_LOADER,
        });
      });
  }
};

export const postSubmissionDetail = data => dispatch => {
  dispatch({
    type: START_SUBMISSION_LOADER,
  });
  axios
    .post('fv3/api/change/submission/status/', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(res => {
      dispatch({
        type: STOP_SUBMISSION_LOADER,
      });
      dispatch({
        type: POST_SUBMISSION_DETAIL,
        payload: res.data,
      });
      successToast('Status', 'added');
    })
    .catch(() => {
      dispatch({
        type: STOP_SUBMISSION_LOADER,
      });
      errorToast();
    });
};

export const toggleSubmission = () => ({
  type: TOGGLE_NULL_SUBMISSIONS_ANSWER,
});
