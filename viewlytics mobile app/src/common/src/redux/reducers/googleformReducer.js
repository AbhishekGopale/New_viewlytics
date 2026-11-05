import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  allNotification: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.GOOGLE_FORM_LOADING:
      return {
        ...state,
        isLoading: true,
        allform: {},
        error: "",
      };
    case ACTION.GOOGLE_FORM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allform :action.payload,
        error: "",
      };
    case ACTION.GOOGLE_FORM_FAILED:
      return {
        ...state,
        isLoading: false,
        allform: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
