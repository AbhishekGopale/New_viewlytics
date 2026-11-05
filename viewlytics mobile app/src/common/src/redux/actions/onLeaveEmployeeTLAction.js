import { BASE_URL } from "../../constants/constants";
import {
  LEAVE_EMPLOYEE_LOADING,
  LEAVE_EMPLOYEE_SUCCESS,
  LEAVE_EMPLOYEE_FAILED,
} from "../types";
import axios from "axios";

export const OnLeaveEmployeeDetail = (token) => {
  return (dispatch) => {
    dispatch({
      type: LEAVE_EMPLOYEE_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}attendance/onleave`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          dispatch({
            type: LEAVE_EMPLOYEE_SUCCESS,
            payload: response.data,
          });
          console.log("OnLeave empolyee details =======-->", response.data);
        })
        .catch(function (error) {
          console.log("OnLeave detailsError<<<<======", error);
          if (error.response.status == 404) {
            dispatch({
              type: LEAVE_EMPLOYEE_SUCCESS,
              payload: [],
            });
          }
        });
    } catch (error) {
      console.log("OnLeave empolyee details  Error", error);
      dispatch({
        type: LEAVE_EMPLOYEE_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
