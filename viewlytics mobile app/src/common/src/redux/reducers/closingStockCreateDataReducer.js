import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  ClosingStockCreatData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.CLOSINGSTOCK_DATA_CREATE_LOADING:
      return {
        ...state,
        isLoading: true,
        ClosingStockCreatData: {},
        error: "",
      };
    case ACTION.CLOSINGSTOCK_DATA_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ClosingStockCreatData: action.payload,
        error: "",
      };
    case ACTION.CLOSINGSTOCK_DATA_CREATE_FAILED:
      return {
        ...state,
        isLoading: false,
        ClosingStockCreatData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
