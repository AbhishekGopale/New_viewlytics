import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  NewStockCreatData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.NEWSTOCK_DATA_CREATE_LOADING:
      return {
        ...state,
        isLoading: true,
        NewStockCreatData: {},
        error: "",
      };
    case ACTION.NEWSTOCK_DATA_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        NewStockCreatData: action.payload,
        error: "",
      };
    case ACTION.NEWSTOCK_DATA_CREATE_FAILED:
      return {
        ...state,
        isLoading: false,
        NewStockCreatData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
