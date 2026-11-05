import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  ClosingStockData: [],
  ClosingStockFilterData: [],
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.CLOSING_LIST_LOADING:
      return {
        ...state,
        isLoading: true,
        ClosingStockData: [],
        ClosingStockFilterData: [],
        error: "",
      };
    case ACTION.CLOSING_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ClosingStockData: action.payload.newArray,
        ClosingStockFilterData: action.payload.filteredArray,
        error: "",
      };
    case ACTION.CLOSING_LIST_FAILED:
      return {
        ...state,
        isLoading: false,
        ClosingStockData: [],
        ClosingStockFilterData: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
