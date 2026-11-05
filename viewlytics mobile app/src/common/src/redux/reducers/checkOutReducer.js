import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  SupportDetailsData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.CHECK_OUT_LOADING:
      return {
        ...state,
        isLoading: true,
        CheckInDetailsData: {},
        error: "",
      };
    case ACTION.CHECK_OUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        CheckInDetailsData: action.payload,
        error: "",
      };
    case ACTION.CHECK_OUT_FAILED:
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
