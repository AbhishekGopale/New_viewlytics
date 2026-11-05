import {
  LOGOUT_CHECKOUT_FAILED,
  LOGOUT_CHECKOUT_LOADING,
  LOGOUT_CHECKOUT_SUCCESS,
} from "../types";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import { GetAllLeavesAction } from "./getAllLeavesAction";
export const LogoutCheckoutAction = (
  token,
  currentLatitudes,
  currentLongitudes,
  navigation,
  ipAddresss
) => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_CHECKOUT_LOADING,
    });
    try {
      let data = JSON.stringify({
        check_out_lang: currentLatitudes,
        check_out_long: currentLongitudes,
        ipAddress: ipAddresss,
      });
      console.log("<=====LOGOUT_CHECKOUT_DATA=====>", data);
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}logout`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      console.log("LogoutCheckoutData ", data);

      axios
        .request(config)
        .then((response) => {
          console.log("LogoutCheckoutData sucesss===>", response.data);
          dispatch({
            type: LOGOUT_CHECKOUT_SUCCESS,
            payload: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("LogoutCheckoutData  failed", error);
      dispatch({
        type: LOGOUT_CHECKOUT_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
