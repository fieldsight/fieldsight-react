import {
  GET_MY_TASK,
  GET_OTHER_TASK,
  GET_NOTIFICATIONS
} from "../actions/types";

const initialState = {
  myTasks: [],
  otherTasks: [],
  notifications: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MY_TASK:
      return {
        ...state,
        myTasks: action.payload.results
      };
    case GET_OTHER_TASK:
      return {
        ...state,
        otherTasks: action.payload.results
      };
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload.results
      };
    default:
      return state;
  }
}
