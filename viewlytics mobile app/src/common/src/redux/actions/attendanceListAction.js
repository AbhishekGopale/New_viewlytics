import {
  ATTENDANCE_LIST_LOADING,
  ATTENDANCE_LIST_SUCCESS,
  ATTENDANCE_LIST_FAILED,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";

export const AttendanceListAction = (token, year, month) => {
  return (dispatch) => {
    dispatch({
      type: ATTENDANCE_LIST_LOADING,
    });
    try {
      let data = JSON.stringify({
        month: month,
        year: year,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/attendance/list`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log("ATTENDANCE_LIST_SUCCESS", response);
          dispatch({
            type: ATTENDANCE_LIST_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("ATTENDANCE_LIST_FAILED", error);
      dispatch({
        type: ATTENDANCE_LIST_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
