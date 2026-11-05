import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  PendingLeaveData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.PENDING_LEAVE_LOADING:
      return {
        ...state,
        isLoading: true,
        PendingLeaveData: {},
        error: "",
      };
    case ACTION.PENDING_LEAVE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        PendingLeaveData: action.payload,
        error: "",
      };
    case ACTION.PENDING_LEAVE_FAILED:
      return {
        ...state,
        isLoading: false,
        PendingLeaveData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
