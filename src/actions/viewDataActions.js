import axios from "axios";
import { GET_PROJECT_VIEW } from "./types";

export const getProjectViewData = id => dispatch => {
  axios
    .get(`/fv3/api/view-by-forms/?project=${id}&form_type=general`)
    .then(res => {
      dispatch({
        type: GET_PROJECT_VIEW,
        payload: res.data
      });
    })
    .catch(err => {
      // dispatch({
      //   type: SITE_DASHBOARD_ERR
      // });
    });
};
