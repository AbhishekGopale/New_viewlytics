import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  allDetails: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.ASSET_DATA_LOADING:
      return {
        ...state,
        isLoading: true,
        allDetails: {},
        error: "",
      };
    case ACTION.ASSET_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allDetails: action.payload,
        error: "",
      };
    case ACTION.ASSET_DATA_FAILED:
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
