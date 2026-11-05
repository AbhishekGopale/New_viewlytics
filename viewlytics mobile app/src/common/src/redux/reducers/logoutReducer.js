import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  logoutData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.LOGOUT_LOADING:
      return {
        ...state,
        isLoading: true,
        logoutData: {},
        error: "",
      };
    case ACTION.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        logoutData: action.payload,
        error: "",
      };
    case ACTION.LOGOUT_FAILED:
      return {
        ...state,
        isLoading: false,
        logoutData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
