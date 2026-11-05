import { BASE_URL } from "../../constants/constants";
import {
  DISTANCE_DIGIT_FAILED,
  DISTANCE_DIGIT_LOADING,
  DISTANCE_DIGIT_SUCCESS,
} from "../types";
import axios from "axios";
import { DB } from "../../database";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const DistanceDigitAction = () => {
  return (dispatch) => {
    dispatch({
      type: DISTANCE_DIGIT_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/dynamicdigit`,
        headers: {
          "Content-Type": "application/json",
          //  Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          console.log(
            response.data.data,
            "responsere--------------------------------------"
          );
          dispatch({
            type: DISTANCE_DIGIT_SUCCESS,
            payload: response.data.data,
          });
          console.log(
            "DISTANCE_DIGIT_Sucess respose",
            response?.data?.data[0]?.offline_switch
          );
          AsyncStorage.setItem(
            DB.OFFLINE_ON_OFF,
            JSON.stringify(response?.data?.data[0]?.offline_switch)
          );
        })
        .catch(function (error) {
          console.log("DISTANCE_DIGIT_FAILED Error", error);
        });
    } catch (error) {
      console.log("DISTANCE_DIGIT_ Error", error);
      dispatch({
        type: DISTANCE_DIGIT_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
