import{
    GET_PROJECT_LIST
} from "../actions/types";

const initialState ={
    breadcrumbs:[],
    projects:[]
};

export default function (state = initialState, action) {
   switch (action.type) {
      case GET_PROJECT_LIST: 
          return{
            projects:[...action.payload.projects],
            breadcrumbs:action.payload.breadcrumbs
          }
        default:
        return state;
    }
  }