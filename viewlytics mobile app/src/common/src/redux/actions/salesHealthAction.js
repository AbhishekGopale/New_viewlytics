import { BASE_URL } from "../../constants/constants";
import {
  SALES_HEALTH_FAILED,
  SALES_HEALTH_LOADING,
  SALES_HEALTH_SUCCESS,
} from "../types";
import axios from "axios";

export const SalesHelthAction = (token) => {
  return (dispatch) => {
    dispatch({
      type: SALES_HEALTH_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/target/achieve`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          console.log("SALES_HEALTH__sucess", response.data.data);
          let data = response?.data?.data;
          const Target = [
            parseInt(data.weeklyTarget),
            parseInt(data.monthlyTarget),
            parseInt(data.quarterTarget),
          ];
          const Achieved = [
            data.weekAchieved,
            data.monthlyAchieved,
            data.quarterAchieved,
          ];

          console.log("Target====", Target, Achieved);
          dispatch({
            type: SALES_HEALTH_SUCCESS,
            payload: {
              data: response.data,
              target: Target,
              achieved: Achieved,
            },
          });
        })
        .catch(function (error) {
          console.log("SALES_HEALTH_FAILED_error", error);
        });
    } catch (error) {
      console.log("SALES_HEALTH_FAILED Error", error);
      dispatch({
        type: SALES_HEALTH_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
