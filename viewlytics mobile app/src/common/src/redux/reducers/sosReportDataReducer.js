import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  SosReportData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.SOS_REPORT_DATA_LOADING:
      return {
        ...state,
        isLoading: true,
        SosReportData: {},
        error: "",
      };
    case ACTION.SOS_REPORT_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        SosReportData: action.payload,
        error: "",
      };
    case ACTION.SOS_REPORT_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        SosReportData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
