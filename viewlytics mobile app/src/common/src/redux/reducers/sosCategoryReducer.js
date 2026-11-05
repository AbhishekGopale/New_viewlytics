import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  sosAllDetails: {},
  sosDataDetails: [],
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.SOS_CATEGORY_LOADING:
      return {
        ...state,
        isLoading: true,
        sosAllDetails: {},
        sosDataDetails: [],
        error: "",
      };
    case ACTION.SOS_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sosAllDetails: action.payload.newArr,
        sosDataDetails: action.payload.filteredArr,
        error: "",
      };
    case ACTION.SOS_CATEGORY_FAILED:
      return {
        ...state,
        isLoading: false,
        sosAllDetails: {},
        sosDataDetails: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
