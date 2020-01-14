import axios from "axios";
import { GET_USER_DOCUMENT } from "./types";

export const getSiteUser = id => dispatch =>{
   axios
      .get(`fv3/api/users/?site=${id}`)
       .then( res => {
         dispatch({
           type: GET_USER_DOCUMENT,
           payload: res.data
          })
      })
      .catch(err => {
        // dispatch({
        //   type: SITE_DASHBOARD_ERR
        // });
      });
  };
  
 