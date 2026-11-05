import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  OfflineMeetingData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.OFFLINE_MEETING_LOADING:
      return {
        ...state,
        isLoading: true,
        OfflineMeetingData: {},
        error: "",
      };
    case ACTION.OFFLINE_MEETING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        OfflineMeetingData: action.payload,
        error: "",
      };
    case ACTION.OFFLINE_MEETING_FAILED:
      return {
        ...state,
        isLoading: false,
        OfflineMeetingData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
