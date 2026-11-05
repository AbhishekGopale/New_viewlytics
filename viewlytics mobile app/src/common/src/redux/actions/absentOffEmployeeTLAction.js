import { BASE_URL } from "../../constants/constants";
import {
  ABSENT_EMPLOYEE_LOADING,
  ABSENT_EMPLOYEE_SUCCESS,
  ABSENT_EMPLOYEE_FAILED,
} from "../types";
import axios from "axios";

export const AbsentEmployeeDetail = (token) => {
  return (dispatch) => {
    dispatch({
      type: ABSENT_EMPLOYEE_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}attendance/absent`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          dispatch({
            type: ABSENT_EMPLOYEE_SUCCESS,
            payload: response.data,
          });
          console.log(" Absent empolyee details =======>", response.data.data);
        })
        .catch(function (error) {
          console.log(" Absent  empolyee detailsError<<<<======", error);
        });
    } catch (error) {
      console.log(" Absent  empolyee details  Error", error);
      dispatch({
        type: ABSENT_EMPLOYEE_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
