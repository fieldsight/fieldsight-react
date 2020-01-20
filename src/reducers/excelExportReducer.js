import {
  GET_EXPORT_LIST,
  CREATE_EXPORT,
  DELETE_EXPORT,
  DOWNLOAD_EXPORT,
} from '../actions/types';

const initialState = {
  exportList: [],
  createResp: {},
  deleteResp: {},
  downloadResp: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EXPORT_LIST:
      return {
        ...state,
        exportList: action.payload,
      };
    case CREATE_EXPORT:
      return {
        ...state,
        createResp: action.payload,
      };
    case DELETE_EXPORT:
      return {
        ...state,
        deleteResp: action.payload,
      };
    case DOWNLOAD_EXPORT:
      return {
        ...state,
        downloadResp: action.payload,
      };
    default:
      return state;
  }
}
