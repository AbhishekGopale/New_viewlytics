import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  msg: "",
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.TOAST_MESSAGE_LOADING:
      return {
        ...state,
        isLoading: true,
        msg: "",
        error: "",
      };
    case ACTION.TOAST_MESSAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        msg: action.payload,
        error: "",
      };
    case ACTION.TOAST_MESSAGE_FAILED:
      return {
        ...state,
        isLoading: false,
        msg: "",
        error: action.payload,
      };
    case ACTION.TOAST_MESSAGE_CLEAR:
      return {
        ...state,
        isLoading: false,
        msg: "",
        error: action.payload,
      };
    default:
      return state;
  }
}
