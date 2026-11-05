import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  allDetails: {},
  filteredDetails: [],
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.CATEGORY_DATA_LOADING:
      return {
        ...state,
        isLoading: true,
        allDetails: {},
        filteredDetails: [],
        error: "",
      };
    case ACTION.CATEGORY_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allDetails: action.payload.newArr,
        filteredDetails: action.payload.filteredArr,
        error: "",
      };
    case ACTION.CATEGORY_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        allDetails: {},
        filteredDetails: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
