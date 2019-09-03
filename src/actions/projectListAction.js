import axios from "axios";
import { GET_PROJECT_LIST } from "./types";

export const getProjectList = id => dispatch =>{
   axios
      .get(`fv3/api/team-projects/${id}/`)
       .then( res => { 
          dispatch({
           type: GET_PROJECT_LIST,
           payload: res.data
          })
      })
      .catch(err => {
        // dispatch({
        //   type: SITE_DASHBOARD_ERR
        // });
      });
  };
  