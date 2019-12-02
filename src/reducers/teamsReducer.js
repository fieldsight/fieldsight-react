import { GET_TEAMS } from '../actions/types';

const initialState={
    teams:[],
    count:""
};

export default function (state = initialState, action){
    switch(action.type){
        
        
        case GET_TEAMS:
            console.log(action.payload.count);
            
            return{
                teams:[...action.payload.results],
                count:action.payload.count
               
            }
            default:
                return state;
    }
}