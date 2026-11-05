import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  sendOtpData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.SEND_OTP_LOADING:
      return {
        ...state,
        isLoading: true,
        sendOtpData: {},
        error: "",
      };
    case ACTION.SEND_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sendOtpData: action.payload,
        error: "",
      };
    case ACTION.SEND_OTP_FAILED:
      return {
        ...state,
        isLoading: false,
        sendOtpData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
