import axios from "axios";
import {GET_LOGS} from "./types";

export  const getProjectLogs = id =>dispatch=>{
    axios
    .get(`/events/api/project_logs/${id}/`)
    .then(res => {
      dispatch({
        type: GET_LOGS,
        payload: res.data.results
      });
    })
    .catch(err => {
      // dispatch({
      //   type: SITE_LOGS_ERR
      // });
    });
}