import { GET_SUBMISSION_DETAIL } from "../actions/types";

const initialState = {
  submission_data: [],
  date_created: "",
  submitted_by: "",
  site: {},
  submission_history: [],
  status_data: {},
  form_type: {},
  form_name: "",
  fieldsight_instance: null
};

export default function(state = initialState, action) {
  switch (action.type) {
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
        fieldsight_instance: action.payload.fieldsight_instance
      };
    default:
      return state;
  }
}
