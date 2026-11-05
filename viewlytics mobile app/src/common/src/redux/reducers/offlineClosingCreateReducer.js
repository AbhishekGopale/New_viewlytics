import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  OfflineClosingData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.OFFLINE_NEW_LOADING:
      return {
        ...state,
        isLoading: true,
        OfflineClosingData: {},
        error: "",
      };
    case ACTION.OFFLINE_NEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        OfflineClosingData: action.payload,
        error: "",
      };
    case ACTION.OFFLINE_NEW_FAILED:
      return {
        ...state,
        isLoading: false,
        OfflineClosingData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
