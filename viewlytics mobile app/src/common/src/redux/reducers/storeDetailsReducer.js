import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  storeDetails: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.STORE_DETAILS_LOADING:
      return {
        ...state,
        isLoading: true,
        storeDetails: {},
        error: "",
      };
    case ACTION.STORE_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        storeDetails: action.payload,
        error: "",
      };
    case ACTION.STORE_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
        storeDetails: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
