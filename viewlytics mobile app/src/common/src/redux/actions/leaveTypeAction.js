import {
  LEAVE_TYPE_FAILED,
  LEAVE_TYPE_LOADING,
  LEAVE_TYPE_SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL_TWO } from "../../constants/constants";
import { DB } from "../../database";

export const LeaveTypeAction = (
  token,
  answer,
  currentDatsss,
  currentLatitudes,
  currentLongitudes,
  // currentAddress,
  attendanceType
) => {
  return (dispatch) => {
    dispatch({
      type: LEAVE_TYPE_LOADING,
    });
    try {
      let data = JSON.stringify({
        leave_type: answer.toString(),
        date: currentDatsss,
        latitude: currentLatitudes.toString(),
        longitude: currentLongitudes.toString(),
        // address: currentAddress,
        attendance_type: attendanceType.toString(),
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL_TWO}/home_check_in`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      console.log("Leave type data------>", data);

      axios
        .request(config)
        .then((response) => {
          console.log("Leave type sucess=====>", response.data);
          dispatch({
            type: LEAVE_TYPE_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("Leave type Failed", error);
      dispatch({
        type: LEAVE_TYPE_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
