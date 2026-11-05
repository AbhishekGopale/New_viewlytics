import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  isError: false,
  msg: "",
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.ERROR_API_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
        error: "",
      };
    case ACTION.ERROR_API_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: action.payload.error,
        msg: action.payload.msg,
        error: "",
      };
    case ACTION.ERROR_API_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: "",
        error: action.payload,
      };
    default:
      return state;
  }
}
