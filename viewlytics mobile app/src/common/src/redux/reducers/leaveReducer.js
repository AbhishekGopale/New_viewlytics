import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  LeaveCreateData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.CREATE_LEAVES_LOADING:
      return {
        ...state,
        isLoading: true,
        LeaveCreateData: {},
        error: "",
      };
    case ACTION.CREATE_LEAVES__SUCCESS:
      return {
        ...state,
        isLoading: false,
        LeaveCreateData: action.payload,
        error: "",
      };
    case ACTION.CREATE_LEAVES__FAILED:
      return {
        ...state,
        isLoading: false,
        LeaveCreateData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
