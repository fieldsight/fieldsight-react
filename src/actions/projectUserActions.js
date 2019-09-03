import axios from "axios";
import { GET_PROJECT_USER } from "./types";

export const getProjectUser = id => dispatch =>{
   axios
      .get(`fv3/api/users/?project=${id}`)
       .then( res => {
        
         dispatch({
           type: GET_PROJECT_USER,
           payload: res.data
          })
      })
      .catch(err => {
        console.log(err)
      });
  };