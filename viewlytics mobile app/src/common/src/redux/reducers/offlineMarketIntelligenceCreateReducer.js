import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  OfflineMarketData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.OFFLINE_MARKETINTELLIGENCE_LOADING:
      return {
        ...state,
        isLoading: true,
        OfflineMarketData: {},
        error: "",
      };
    case ACTION.OFFLINE_MARKETINTELLIGENCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        OfflineMarketData: action.payload,
        error: "",
      };
    case ACTION.OFFLINE_MARKETINTELLIGENCE_FAILED:
      return {
        ...state,
        isLoading: false,
        OfflineMarketData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
