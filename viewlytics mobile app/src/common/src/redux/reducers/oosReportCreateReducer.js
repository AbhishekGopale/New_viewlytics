import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  OosReportCreatData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.OOS_REPORT_CREATE_LOADING:
      return {
        ...state,
        isLoading: true,
        OosReportCreatData: {},
        error: "",
      };
    case ACTION.OOS_REPORT_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        OosReportCreatData: action.payload,
        error: "",
      };
    case ACTION.OOS_REPORT_CREATE_FAILED:
      return {
        ...state,
        isLoading: false,
        OosReportCreatData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
