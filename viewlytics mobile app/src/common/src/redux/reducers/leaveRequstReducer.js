import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  LeaveRequstData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.LEAVE_CREATE_LOADING:
      return {
        ...state,
        isLoading: true,
        LeaveRequstData: {},
        error: "",
      };
    case ACTION.LEAVE_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        LeaveRequstData: action.payload,
        error: "",
      };
    case ACTION.LEAVE_CREATE_FAILED:
      return {
        ...state,
        isLoading: false,
        LeaveRequstData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
