import { BASE_URL } from "../../constants/constants";
import {
  DASHBOARD_COUNT_LOADING,
  DASHBOARD_COUNT_SUCCESS,
  DASHBOARD_COUNT_FAILED,
} from "../types";
import axios from "axios";

export const DashboardCountAction = (token, navigation) => {
  return (dispatch) => {
    dispatch({
      type: DASHBOARD_COUNT_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}app/dashboard`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          console.log("Dashboard Count", response.data);
          dispatch({
            type: DASHBOARD_COUNT_SUCCESS,
            payload: response.data,
          });
          // navigation.navigate("CheckInScreen")
        })
        .catch(function (error) {
          console.log("DASHBOARD_COUNT_error", error);
        });
    } catch (error) {
      console.log("Promo list Error_SUCCESS Error", error);
      dispatch({
        type: DASHBOARD_COUNT_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
