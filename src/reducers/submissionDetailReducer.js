import {
  GET_SUBMISSION_DETAIL,
  STOP_SUBMISSION_LOADER,
  START_SUBMISSION_LOADER,
  POST_SUBMISSION_DETAIL,
  SHOW_DOT_LOADER,
  UPDATE_SUBMISSION_DETAIL
} from "../actions/types";

const initialState = {
  submission_data: [],
  date_created: "",
  submitted_by: "",
  site: {},
  submission_history: [],
  status_data: {},
  form_type: {},
  form_name: "",
  fieldsight_instance: null,
  edit_url: null,
  download_url: {},
  loading: false,
  initialLoader: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    // case SHOW_DOT_LOADER:
    //   return {
    //     ...state,
    //     dotLoader: true
    //   };
    case START_SUBMISSION_LOADER:
      return {
        ...state,
        loading: true
      };
    case STOP_SUBMISSION_LOADER:
      return {
        ...state,
        loading: false
      };
    case GET_SUBMISSION_DETAIL:
      return {
        ...state,
        submission_data: [...action.payload.submission_data],
        date_created: action.payload.date_created,
        submitted_by: action.payload.submitted_by,
        site: { ...action.payload.site },
        submission_history: [...action.payload.submission_history],
        status_data: { ...action.payload.status_data },
        form_type: { ...action.payload.form_type },
        form_name: action.payload.form_name,
        fieldsight_instance: action.payload.fieldsight_instance,
        edit_url: action.payload.edit_url,
        download_url: action.payload.download_url,
        initialLoader: false
      };
    case POST_SUBMISSION_DETAIL:
      return {
        ...state,
        submission_history: [action.payload, ...state.submission_history],
        status_data: {
          ...state.status_data,
          status_display: action.payload.get_new_status_display
        }
      };

    case UPDATE_SUBMISSION_DETAIL: {
      return {
        ...state,
        submission_data: [...action.payload.submission_data],
        submitted_by: action.payload.submitted_by,
        edit_url: action.payload.edit_url,
        download_url: action.payload.download_url
      };
    }
    default:
      return state;
  }
}
