import { BASE_URL } from "../../constants/constants";
import {
  CLEAR_NOTIFICATION_FAILED,
  CLEAR_NOTIFICATION_LOADING,
  CLEAR_NOTIFICATION_SUCCESS,
} from "../types";
import axios from "axios";
import { GetAllNotificationAction } from "./getAllNotificationAction";

export const ClearAllNotification = (token) => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_NOTIFICATION_LOADING,
    });
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/deletemany`,
        headers: {
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          dispatch({
            type: CLEAR_NOTIFICATION_SUCCESS,
            payload: response.data.data,
          });
          dispatch(GetAllNotificationAction(token));
          console.log("CLEAR_NOTIFICATION_SUCCESS respose", response);
        })
        .catch(function (error) {
          console.log("CLEAR_NOTIFICATION_SUCCESS Error", error);
        });
    } catch (error) {
      console.log("CLEAR_NOTIFICATION_SUCCESS Error", error);
      dispatch({
        type: CLEAR_NOTIFICATION_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
