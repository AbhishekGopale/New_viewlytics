import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  CategoryList: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.OPENING_DATA_LOADING:
      return {
        ...state,
        isLoading: true,
        CategoryList: {},
        error: "",
      };
    case ACTION.OPENING_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        CategoryList: action.payload,
        error: "",
      };
    case ACTION.OPENING_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        CategoryList: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
