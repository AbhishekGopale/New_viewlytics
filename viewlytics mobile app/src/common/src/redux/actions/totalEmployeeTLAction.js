import { BASE_URL } from "../../constants/constants";
import {
 TOTAL_EMPLOYEE__LOADING,
  TOTAL_EMPLOYEE_SUCCESS,
  TOTAL_EMPLOYEE_FAILED
} from "../types";
import axios from "axios";

export const TotalEmployeeDetail = (token) => {
  return (dispatch) => {
    dispatch({
      type: TOTAL_EMPLOYEE__LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}attendance/total`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          dispatch({
            type: TOTAL_EMPLOYEE_SUCCESS,
            payload: response.data,
          });
          console.log(" Total empolyee details =======>", response.data.data);
        })
        .catch(function (error) {
          console.log("Total empolyee detailsError<<<<======", error);
        });
    } catch (error) {
      console.log("Total empolyee details  Error", error);
      dispatch({
        type: TOTAL_EMPLOYEE_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
