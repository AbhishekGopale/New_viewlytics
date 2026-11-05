import { BASE_URL } from "../../constants/constants";
import {
  LEAVEREQUST_EMPLOYEE_LOADING,
  LEAVEREQUST_EMPLOYEE_SUCCESS,
  LEAVEREQUST_EMPLOYEE_FAILED,
} from "../types";
import axios from "axios";

export const LeaveRequstEmployeeDetail = (token) => {
  return (dispatch) => {
    dispatch({
      type: LEAVEREQUST_EMPLOYEE_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}attendance/requestleave`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          dispatch({
            type: LEAVEREQUST_EMPLOYEE_SUCCESS,
            payload: response.data,
          });
          console.log(
            " LeaveRequst  empolyee details sucess ---===----====-->",
            response.data
          );
        })
        .catch(function (error) {
          console.log(" LeaveRequst detailsError<<<<======", error);
        });
    } catch (error) {
      if (error.response.status == 404) {
        dispatch({
          type: LEAVEREQUST_EMPLOYEE_SUCCESS,
          payload: [],
        });
      }
      console.log(" LeaveRequst  empolyee details  Error", error);
      dispatch({
        type: LEAVEREQUST_EMPLOYEE_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
