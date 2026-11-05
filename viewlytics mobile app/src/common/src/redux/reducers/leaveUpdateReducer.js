import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  LeaveUpdateData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.LEAVE_UPDATE_LOADING:
      return {
        ...state,
        isLoading: true,
        LeaveUpdateData: {},
        error: "",
      };
    case ACTION.LEAVE_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        LeaveUpdateData: action.payload,
        error: "",
      };
    case ACTION.LEAVE_UPDATE_FAILED:
      return {
        ...state,
        isLoading: false,
        LeaveUpdateData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
