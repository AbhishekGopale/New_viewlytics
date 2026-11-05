import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  OfflineNewData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.OFFLINE_NEW_LOADING:
      return {
        ...state,
        isLoading: true,
        OfflineNewData: {},
        error: "",
      };
    case ACTION.OFFLINE_NEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        OfflineNewData: action.payload,
        error: "",
      };
    case ACTION.OFFLINE_NEW_FAILED:
      return {
        ...state,
        isLoading: false,
        OfflineNewData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
