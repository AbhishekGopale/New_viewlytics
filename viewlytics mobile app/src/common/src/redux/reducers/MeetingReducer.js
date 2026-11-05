import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  MeetingData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.MEETING_DATA_LOADING:
      return {
        ...state,
        isLoading: true,
        MeetingData: {},
        error: "",
      };
    case ACTION.MEETING_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        MeetingData: action.payload,
        error: "",
      };
    case ACTION.MEETING_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        MeetingData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
