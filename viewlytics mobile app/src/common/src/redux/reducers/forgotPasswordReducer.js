import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  forgotData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.FORGOT_PASSWORD_LOADING:
      return {
        ...state,
        isLoading: true,
        forgotData: {},
        error: "",
      };
    case ACTION.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        forgotData: action.payload,
        error: "",
      };
    case ACTION.FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        isLoading: false,
        forgotData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
