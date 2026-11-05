import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  dashboardDetails: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.GET_DASHBOARD_DETAILS_LOADING:
      return {
        ...state,
        isLoading: true,
        dashboardDetails: {},
        error: "",
      };
    case ACTION.GET_DASHBOARD_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dashboardDetails: action.payload,
        error: "",
      };
    case ACTION.GET_DASHBOARD_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
        dashboardDetails: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
