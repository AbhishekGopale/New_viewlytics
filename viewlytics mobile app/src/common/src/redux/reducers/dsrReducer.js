import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  DsrData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.DSR_LIST_LOADING:
      return {
        ...state,
        isLoading: true,
        DsrData: {},
        error: "",
      };
    case ACTION.DSR_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        DsrData: action.payload,
        error: "",
      };
    case ACTION.DSR_LIST_FAILED:
      return {
        ...state,
        isLoading: false,
        DsrData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
