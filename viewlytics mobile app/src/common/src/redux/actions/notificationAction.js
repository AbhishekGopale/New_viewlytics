import { BASE_URL } from "../../constants/constants";
import {
  NOTIFICATION_FAILED,
  NOTIFICATION_LOADING,
  NOTIFICATION_SUCCESS,
} from "../types";
import axios from "axios";

export const HandleNotification = (notificationStatus, navigation) => {
  console.log("notificationStatus", notificationStatus);
  return (dispatch) => {
    dispatch({
      type: NOTIFICATION_LOADING,
    });
    try {
      let data = JSON.stringify({
        notifications_status: notificationStatus,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}notificationstatus`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          dispatch({
            type: NOTIFICATION_SUCCESS,
            payload: response.data,
          });
          console.log("Notification respose", response.data);
        })
        .catch(function (error) {
          console.log("Notification Error", error);
        });
    } catch (error) {
      console.log("Notification Error", error);
      dispatch({
        type: NOTIFICATION_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
