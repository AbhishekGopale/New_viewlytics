import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  CompetitionDetailsData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.MARKET_INTELLIGENCE_LOADING:
      return {
        ...state,
        isLoading: true,
        CompetitionDetailsData: {},
        error: "",
      };
    case ACTION.MARKET_INTELLIGENCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        CompetitionDetailsData: action.payload,
        error: "",
      };
    case ACTION.MARKET_INTELLIGENCE_CLEAR:
      return {
        ...state,
        isLoading: false,
        CompetitionDetailsData: {},
        error: "",
      };
    case ACTION.MARKET_INTELLIGENCE_FAILED:
      return {
        ...state,
        isLoading: false,
        CompetitionDetailsData: {},
        error: action.payload,
      };

    default:
      return state;
  }
}
