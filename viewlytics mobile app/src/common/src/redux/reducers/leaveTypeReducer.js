import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  LeaveTypeData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.LEAVE_TYPE_LOADING:
      return {
        ...state,
        isLoading: true,
        LeaveTypeData: {},
        error: "",
      };
    case ACTION.LEAVE_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        LeaveTypeData: action.payload,
        error: "",
      };
    case ACTION.LEAVE_TYPE_FAILED:
      return {
        ...state,
        isLoading: false,
        LeaveTypeData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
