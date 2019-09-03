import{
    GET_USER_DOCUMENT
} from "../actions/types";

const initialState ={
    users:[],
    breadcrumbs:[],
    masteruser:[]
};

export default function(state = initialState, action) {
   switch (action.type) {
      case GET_USER_DOCUMENT:
          return{
            users:[...action.payload.users],
            breadcrumbs:action.payload.breadcrumbs
          }
        default:
        return state;
    }
  }
  