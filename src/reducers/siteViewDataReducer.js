import { GET_SITE_VIEW } from "../actions/types";

const initialState = {
  generals_forms: [],
  deleted_forms: [],
  breadcrumbs: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SITE_VIEW:
      return {
        generals_forms:
          action.payload.generals_forms ||
          action.payload.scheduled_forms ||
          action.payload.stage_forms,
        breadcrumbs: action.payload.breadcrumbs,
        deleted_forms: action.payload.deleted_forms,
        loading: true
      };
    default:
      return state;
  }
}
