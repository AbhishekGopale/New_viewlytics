import { BASE_URL } from "../../constants/constants";
import {
  GET_ALL_NOTIFICATION_FAILED,
  GET_ALL_NOTIFICATION_LOADING,
  GET_ALL_NOTIFICATION_SUCCESS,
} from "../types";
import axios from "axios";

export const GetAllNotificationAction = (token) => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_NOTIFICATION_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}notification`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          dispatch({
            type: GET_ALL_NOTIFICATION_SUCCESS,
            payload: response.data.data,
          });
          console.log(
            "GET_ALL_NOTIFICATION_SUCCESS respose",
            response.data.data
          );
        })
        .catch(function (error) {
          console.log("GET_ALL_NOTIFICATION_SUCCESS Error", error);
        });
    } catch (error) {
      console.log("GET_ALL_NOTIFICATION_SUCCESS Error", error);
      dispatch({
        type: GET_ALL_NOTIFICATION_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
