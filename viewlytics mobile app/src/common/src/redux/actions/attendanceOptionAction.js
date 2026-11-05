import { BASE_URL, BASE_URL_TWO } from "../../constants/constants";
import { ATTENDANCE_OPTION_FAILED, ATTENDANCE_OPTION_SUCCESS } from "../types";
import axios from "axios";
import { ATTENDANCE_OPTION_LOADING } from '../types/index';

export const AttendanceOptionAction = (token) => {
  return (dispatch) => {
    dispatch({
      type: ATTENDANCE_OPTION_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL_TWO}/list/attendance_option`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          console.log("ATTENDANCE_OPTION_ list", response.data);
         
          dispatch({
            type: ATTENDANCE_OPTION_SUCCESS,
            payload: response.data,
          });
        })
        .catch(function (error) {
          console.log("ATTENDANCE_OPTION_error", error);
        });
    } catch (error) {
      console.log(" ATTENDANCE_OPTION_FAILED", error);
      dispatch({
        type: ATTENDANCE_OPTION_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
