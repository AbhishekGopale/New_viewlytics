import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  OpeningCreatData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.OPENING_DATA_CREATE_LOADING:
      return {
        ...state,
        isLoading: true,
        OpeningCreatData: {},
        error: "",
      };
    case ACTION.OPENING_DATA_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        OpeningCreatData: action.payload,
        error: "",
      };
    case ACTION.OPENING_DATA_CREATE_FAILED:
      return {
        ...state,
        isLoading: false,
        OpeningCreatData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
