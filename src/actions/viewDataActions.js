import axios from 'axios';
import { GET_PROJECT_VIEW } from './types';

export const getProjectViewData = (id, type) => dispatch => {
  axios
    .get(`/fv3/api/view-by-forms/?project=${id}&form_type=${type}`)
    .then(res => {
      dispatch({
        type: GET_PROJECT_VIEW,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
};
