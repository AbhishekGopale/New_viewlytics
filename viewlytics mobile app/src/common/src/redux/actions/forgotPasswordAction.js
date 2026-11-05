import {
  FORGOT_PASSWORD_LOADING,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";

export const ForgotPasswordAction = (email, navigation) => {
  return (dispatch) => {
    dispatch({
      type: FORGOT_PASSWORD_LOADING,
    });
    try {
      let data = JSON.stringify({
        email: email,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}forgotpassword`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log("ForgotPasswordData", response);
          dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("FORGOT_PASSWORD_FAILED", error);
      dispatch({
        type: FORGOT_PASSWORD_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
