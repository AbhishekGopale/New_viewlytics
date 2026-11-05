import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  SupportDetailsData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.SUPPORT_DETAILS_LOADING:
      return {
        ...state,
        isLoading: true,
        SupportDetailsData: {},
        error: "",
      };
    case ACTION.SUPPORT_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        SupportDetailsData: action.payload,
        error: "",
      };
    case ACTION.SUPPORT_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
        SupportDetailsData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
