import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  AttendanceData: [],
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.ATTENDANCE_LIST_LOADING:
      return {
        ...state,
        isLoading: true,
        AttendanceData: [],
        error: "",
      };
    case ACTION.ATTENDANCE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        AttendanceData: action.payload,
        error: "",
      };
    case ACTION.ATTENDANCE_LIST_FAILED:
      return {
        ...state,
        isLoading: false,
        AttendanceData: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
