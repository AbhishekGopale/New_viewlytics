import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  DashbordListData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.CHECK_IN_OUT_LOADING:
      return {
        ...state,
        isLoading: true,
        DashbordListData: {},
        error: "",
      };
    case ACTION.CHECK_IN_OUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        DashbordListData: action.payload,
        error: "",
      };
    case ACTION.CHECK_IN_OUT_FAILED:
      return {
        ...state,
        isLoading: false,
        DashbordListData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
