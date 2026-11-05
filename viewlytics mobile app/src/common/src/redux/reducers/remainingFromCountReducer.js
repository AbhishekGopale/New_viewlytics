import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  allDetails: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.REMAINING_FORM_LOADING:
      return {
        ...state,
        isLoading: true,
        allDetails: {},
        error: "",
      };
    case ACTION.REMAINING_FORM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allDetails: action.payload,
        error: "",
      };
    case ACTION.REMAINING_FORM_FAILED:
      return {
        ...state,
        isLoading: false,
        allDetails: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
