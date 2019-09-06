import {GET_LOGS} from "../actions/types";

const initialState={
    siteLogs:[],
    siteLogsLoader:true
}

export default function(state=initialState , action){
    switch(action.type){
        case GET_LOGS:
            return{
                siteLogs:[...action.payload],
                siteLogsLoader:false
            }
    }
}