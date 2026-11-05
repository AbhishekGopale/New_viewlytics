import * as ACTION from "../types";
const initialState = {
  isLoading: false,
  allDetails: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.FILD_VISIT_OFFLINE_LOADING:
      return {
        ...state,
        isLoading: true,
        allDetails: {},
        error: "",
      };
    case ACTION.FILD_VISIT_OFFLINE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allDetails: action.payload,
        error: "",
      };
    case ACTION.FILD_VISIT_OFFLINE_FAILED:
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
