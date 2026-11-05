import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  OfflineOssData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.OFFLINE_OOS_LOADING:
      return {
        ...state,
        isLoading: true,
        OfflineOssData: {},
        error: "",
      };
    case ACTION.OFFLINE_OOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        OfflineOssData: action.payload,
        error: "",
      };
    case ACTION.OFFLINE_OOS_FAILED:
      return {
        ...state,
        isLoading: false,
        OfflineOssData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
