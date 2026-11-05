import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  OfflineOpeningData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.OFFLINE_OPENING_LOADING:
      return {
        ...state,
        isLoading: true,
        OfflineOpeningData: {},
        error: "",
      };
    case ACTION.OFFLINE_OPENING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        OfflineOpeningData: action.payload,
        error: "",
      };
    case ACTION.OFFLINE_OPENING_FAILED:
      return {
        ...state,
        isLoading: false,
        OfflineOpeningData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
