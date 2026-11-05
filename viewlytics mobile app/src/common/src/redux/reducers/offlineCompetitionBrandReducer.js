import * as ACTION from "../types";
import { OFFLINE_COMPETITIONDATA__FAILED } from "../types/index";

const initialState = {
  isLoading: false,
  OfflineCompetitionData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.OFFLINE_COMPETITIONDATA_LOADING:
      return {
        ...state,
        isLoading: true,
        OfflineCompetitionData: {},
        error: "",
      };
    case ACTION.OFFLINE_COMPETITIONDATA__SUCCESS:
      return {
        ...state,
        isLoading: false,
        OfflineCompetitionData: action.payload,
        error: "",
      };
    case ACTION.OFFLINE_COMPETITIONDATA__FAILED:
      return {
        ...state,
        isLoading: false,
        OfflineCompetitionData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
