import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  NewStockData: {},
  NewStockFilteredData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.NEWSTOCK_LIST_LOADING:
      return {
        ...state,
        isLoading: true,
        NewStockData: {},
        NewStockFilteredData: {},
        error: "",
      };
    case ACTION.NEWSTOCK_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        NewStockData: action.payload.newArr,
        NewStockFilteredData: action.payload.arr,
        error: "",
      };
    case ACTION.NEWSTOCK_LIST_FAILED:
      return {
        ...state,
        isLoading: false,
        NewStockData: {},
        NewStockFilteredData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
