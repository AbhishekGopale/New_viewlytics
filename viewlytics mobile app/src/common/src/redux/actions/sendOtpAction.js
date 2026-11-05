import { SEND_OTP_LOADING, SEND_OTP_FAILED, SEND_OTP_SUCCESS } from "../types";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";

export const SendOtpAction = (mobileNo, navigation) => {
  return (dispatch) => {
    dispatch({
      type: SEND_OTP_LOADING,
    });
    try {
      let data = JSON.stringify({
        mobile: mobileNo,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}sendotp`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log("SendOtpLogs", response);
          navigation.navigate("OTPVerification", {
            data: response.data.data,
          });
          dispatch({
            type: SEND_OTP_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          console.log("SendOtpError", error);
          dispatch({
            type: SEND_OTP_FAILED,
            payload: {
              error: error.response.data.message,
            },
          });
        });
    } catch (error) {
      console.log("FORGOT_PASSWORD_FAILED", error);
      dispatch({
        type: SEND_OTP_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
