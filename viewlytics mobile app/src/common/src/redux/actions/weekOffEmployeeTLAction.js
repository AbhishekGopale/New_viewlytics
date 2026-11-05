import { BASE_URL } from "../../constants/constants";
import {
  WEEKOFF_EMPLOYEE_LOADING,
  WEEKOFF_EMPLOYEE_SUCCESS,
  WEEKOFF_EMPLOYEE_FAILED,
} from "../types";
import axios from "axios";

export const WeekOffEmployeeDetail = (token) => {
  return (dispatch) => {
    dispatch({
      type: WEEKOFF_EMPLOYEE_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}attendance/weekoff`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          dispatch({
            type: WEEKOFF_EMPLOYEE_SUCCESS,
            payload: response.data,
          });
          console.log(" WeekOff empolyee details =======>", response.data.data);
        })
        .catch(function (error) {
          console.log("WeekOff empolyee detailsError<<<<======", error);
          if (error.response.status == 404) {
            dispatch({
              type: WEEKOFF_EMPLOYEE_SUCCESS,
              payload: [],
            });
          }
        });
    } catch (error) {
      console.log("WeekOff  empolyee details  Error", error);
      dispatch({
        type: WEEKOFF_EMPLOYEE_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
