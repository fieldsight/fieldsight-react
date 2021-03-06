import axios from 'axios';
import { GET_TEAMS, GET_TRANSLATION } from './types';

export const getTeam = () => dispatch => {
  axios
    .get(`/fv3/api/teams/`)
    .then(res => {
      dispatch({
        type: GET_TEAMS,
        payload: res.data,
      });
    })
    .catch(() => {
      // dispatch({
      //   type: SITE_DASHBOARD_ERR
      // });
    });
};

export const getTranslate = value => dispatch => {
  dispatch({
    type: GET_TRANSLATION,
    payload: value,
  });
};
