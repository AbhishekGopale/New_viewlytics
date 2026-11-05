import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  DashboardCountList: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.DASHBOARD_COUNT_LOADING:
      return {
        ...state,
        isLoading: true,
        DashboardCountList: {},
        error: "",
      };
    case ACTION.DASHBOARD_COUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        DashboardCountList: action.payload,
        error: "",
      };
    case ACTION.DASHBOARD_COUNT_FAILED:
      return {
        ...state,
        isLoading: false,
        DashboardCountList: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
