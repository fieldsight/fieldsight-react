import{
    GET_PROJECT_USER
} from "../actions/types";

const initialState ={
    users:[],
    breadcrumbs:[],
    masteruser:[]
};

export default function (state = initialState, action) {
   switch (action.type) {
      case GET_PROJECT_USER: 
          return{
            users:[...action.payload.users],
            breadcrumbs:action.payload.breadcrumbs
          }
        default:
        return state;
    }
  }