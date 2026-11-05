import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import {
  CHECK_IN_OUT_FAILED,
  CHECK_IN_OUT_LOADING,
  CHECK_IN_OUT_SUCCESS,
} from "../types";
import axios from "axios";
import { DB } from "../../database";

export const CheckInOutAction = (token) => {
  return (dispatch) => {
    dispatch({
      type: CHECK_IN_OUT_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/dashboard/count`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          console.log("dashbord list", response.data);
          AsyncStorage.setItem(
            DB.USER_CHECK_IN_ID,
            JSON.stringify(response?.data?.data?.checkinId)
          );
          dispatch({
            type: CHECK_IN_OUT_SUCCESS,
            payload: response.data,
          });
          // navigation.navigate("DailyReporting");
        })
        .catch(function (error) {
          console.log("CHECK_IN_OUT_error", error);
        });
    } catch (error) {
      console.log(" CHECK_IN_OUT_FAILED", error);
      dispatch({
        type: CHECK_IN_OUT_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
