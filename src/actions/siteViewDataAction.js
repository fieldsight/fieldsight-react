import axios from 'axios';
import { GET_SITE_VIEW } from './types';

export const getsiteViewData = (id, type) => dispatch => {
  axios
    .get(`/fv3/api/view-by-forms/?site=${id}&form_type=${type}`)
    .then(res => {
      dispatch({
        type: GET_SITE_VIEW,
        payload: res.data,
      });
    })
    .catch(() => {
      // console.log(err);
    });
};

export default getsiteViewData;
