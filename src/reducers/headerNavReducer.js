import {
  GET_MY_TASK,
  GET_OTHER_TASK,
  GET_NOTIFICATIONS,
} from "../actions/types";

const initialState = {
  myTasks: [],
  otherTasks: [],
  notifications: [],
  navLoader: true
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MY_TASK:
      return {
        ...state,
        myTasks: action.payload.results,
        navLoader: false
      };
    case GET_OTHER_TASK:
      return {
        ...state,
        otherTasks: action.payload.results,
        navLoader: false

      };
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload.results,
        navLoader: false

      };
    default:
      return state;
  }
}
