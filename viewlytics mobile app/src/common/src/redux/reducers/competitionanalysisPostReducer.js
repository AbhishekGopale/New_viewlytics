import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  CompetitionDetailsData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.COMPETITION_DATA_LOADING:
      return {
        ...state,
        isLoading: true,
        CompetitionDetailsData: {},
        error: "",
      };
    case ACTION.COMPETITION_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        CompetitionDetailsData: action.payload,
        error: "",
      };
    case ACTION.COMPETITION_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        CompetitionDetailsData: {},
        error: action.payload,
      };
    case ACTION.COMPETITION_DATA_CLEAR:
      return {
        isLoading: false,
        CompetitionDetailsData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
