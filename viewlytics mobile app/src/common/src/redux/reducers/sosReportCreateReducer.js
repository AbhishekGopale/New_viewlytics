import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  SosReportCreatData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.SOS_REPORT_CREATE_LOADING:
      return {
        ...state,
        isLoading: true,
        SosReportCreatData: {},
        error: "",
      };
    case ACTION.SOS_REPORT_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        SosReportCreatData: action.payload,
        error: "",
      };
    case ACTION.SOS_REPORT_CREATE_FAILED:
      return {
        ...state,
        isLoading: false,
        SosReportCreatData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
