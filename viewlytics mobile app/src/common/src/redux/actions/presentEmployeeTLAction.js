import { BASE_URL } from "../../constants/constants";
import {
PRESENT_EMPLOYEE_LOADING,
  PRESENT_EMPLOYEE_SUCCESS,
  PRESENT_EMPLOYEE_FAILED
} from "../types";
import axios from "axios";

export const PresentEmployeeDetail = (token) => {
  return (dispatch) => {
    dispatch({
      type: PRESENT_EMPLOYEE_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}attendance/present`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          dispatch({
            type: PRESENT_EMPLOYEE_SUCCESS,
            payload: response.data,
          });
          console.log(" Present empolyee details ---=======-->", response.data);
        })
        .catch(function (error) {
          console.log(" Present detailsError<<<<======", error);
        });
    } catch (error) {
      console.log(" Present empolyee details  Error", error);
      dispatch({
        type: PRESENT_EMPLOYEE_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
