import { BASE_URL } from "../../constants/constants";
import {
  GET_DASHBOARD_DETAILS_FAILED,
  GET_DASHBOARD_DETAILS_LOADING,
  GET_DASHBOARD_DETAILS_SUCCESS,
} from "../types";
import axios from "axios";
import { ErrorAction } from "./errorAction";

export const GetDashboardDetails = (token) => {
  return (dispatch) => {
    dispatch({
      type: GET_DASHBOARD_DETAILS_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/dashboard`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          dispatch({
            type: GET_DASHBOARD_DETAILS_SUCCESS,
            payload: response.data.data,
          });
          console.log("GET_DASHBOARD_DETAILS_SUCCESS respose", response);
        })
        .catch(function (error) {
          dispatch(ErrorAction(true, error.message));
          console.log("GET_DASHBOARD_DETAILS_SUCCESS Error", error);
        });
    } catch (error) {
      console.log("GET_DASHBOARD_DETAILS_SUCCESS Error", error);
      dispatch({
        type: GET_DASHBOARD_DETAILS_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
