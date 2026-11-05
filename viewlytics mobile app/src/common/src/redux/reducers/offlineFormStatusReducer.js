import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  offlineStatus: [],
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.OFFLINE_FORM_STATUS_LOADING:
      return {
        ...state,
        isLoading: true,
        offlineStatus: [],
        error: "",
      };
    case ACTION.OFFLINE_FORM_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        offlineStatus: action.payload,
        error: "",
      };
    case ACTION.OFFLINE_FORM_STATUS_FAILED:
      return {
        ...state,
        isLoading: false,
        offlineStatus: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
