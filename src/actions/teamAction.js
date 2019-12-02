import axios from "axios";
import { GET_TEAMS } from "./types";

export const getTeam = id => dispatch =>{
   axios
      .get(`/fv3/api/teams/`)
       .then( res => { 
          dispatch({
           type: GET_TEAMS,
           payload: res.data
          })
      })
      .catch(err => {
        // dispatch({
        //   type: SITE_DASHBOARD_ERR
        // });
      });
  };
  