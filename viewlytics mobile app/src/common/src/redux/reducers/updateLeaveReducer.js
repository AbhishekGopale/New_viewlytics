import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  UpdateLeaveData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.UPDATE_LEAVE_LOADING:
      return {
        ...state,
        isLoading: true,
        UpdateLeaveData: {},
        error: "",
      };
    case ACTION.UPDATE_LEAVE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        UpdateLeaveData: action.payload,
        error: "",
      };
    case ACTION.UPDATE_LEAVE_FAILED:
      return {
        ...state,
        isLoading: false,
        UpdateLeaveData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
