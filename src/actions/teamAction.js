import axios from "axios";
import { GET_TEAMS } from "./types";

export const getTeam = id => dispatch =>{
   axios
      .get(`http://192.168.1.44:8002/fv3/api/teams/`)
       .then( res => { 
          console.log(res)
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
  