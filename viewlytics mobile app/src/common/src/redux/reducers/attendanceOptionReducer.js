import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  AttendanceOptionList: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.ATTENDANCE_OPTION_LOADING:
      return {
        ...state,
        isLoading: true,
        AttendanceOptionList: {},
        error: "",
      };
    case ACTION.ATTENDANCE_OPTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        AttendanceOptionList: action.payload,
        error: "",
      };
    case ACTION.ATTENDANCE_OPTION_FAILED:
      return {
        ...state,
        isLoading: false,
        AttendanceOptionList: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
