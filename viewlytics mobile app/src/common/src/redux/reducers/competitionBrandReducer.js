import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  allbrand: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.COMPETITION_BRAND_LOADING:
      return {
        ...state,
        isLoading: true,
        allbrand: {},
        error: "",
      };
    case ACTION.COMPETITION_BRAND_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allbrand: action.payload,
        error: "",
      };
    case ACTION.COMPETITION_BRAND_FAILED:
      return {
        ...state,
        isLoading: false,
        allbrand: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
