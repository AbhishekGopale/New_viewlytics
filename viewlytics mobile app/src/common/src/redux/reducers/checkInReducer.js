import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  CheckInDetailsData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.CHECK_IN_LOADING:
      return {
        ...state,
        isLoading: true,
        CheckInDetailsData: {},
        error: "",
      };
    case ACTION.CHECK_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        CheckInDetailsData: action.payload,
        error: "",
      };
    case ACTION.CHECK_IN_CLEAR:
      return {
        ...state,
        isLoading: false,
        CheckInDetailsData: {},
        error: "",
      };
    case ACTION.CHECK_IN_FAILED:
      return {
        ...state,
        isLoading: false,
        CheckInDetailsData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
