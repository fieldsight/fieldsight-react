import { GET_PROJECT_VIEW } from "../actions/types";

const initialState = {
  generals_forms: [],
  deleted_forms: [],
  breadcrumbs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECT_VIEW:
      return {
        generals_forms: action.payload.generals_forms,
        breadcrumbs: action.payload.breadcrumbs,
        deleted_forms: action.payload.deleted_forms
      };
    default:
      return state;
  }
}
