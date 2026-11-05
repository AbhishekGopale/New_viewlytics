import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  openingNewClosingData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.OPENING_NEW_CLOSING_LOADING:
      return {
        ...state,
        isLoading: true,
        openingNewClosingData: {},
        error: "",
      };
    case ACTION.OPENING_NEW_CLOSING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        openingNewClosingData: action.payload,
        error: "",
      };
    case ACTION.OPENING_NEW_CLOSING_FAILED:
      return {
        ...state,
        isLoading: false,
        openingNewClosingData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
