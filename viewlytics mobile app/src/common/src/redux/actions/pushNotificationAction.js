import {
  PUSH_NOTIFICATION_FAILED,
  PUSH_NOTIFICATION_LOADING,
  PUSH_NOTIFICATION_SUCCESS,
} from "../types";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";

export const PushNotificationAction = (
  token,
  fcmToken,
  userId,
  deviceType,
  deviceId
) => {
  return (dispatch) => {
    dispatch({
      type: PUSH_NOTIFICATION_LOADING,
    });
    try {
      let data = JSON.stringify({
        user_id: userId,
        device_id: deviceId,
        fcm_token: fcmToken,
        device_type: deviceType,
        notification_allow: "0",
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}user-device-detail/create`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      // let config = {
      //   method: "POST",
      //   maxBodyLength: Infinity,
      //   url: `${BASE_URL}/user-device-detail/create`,
      //   headers: {
      //     Authorization: token,
      //     "Content-Type": "multipart/form-data",
      //   },
      //   data: data,
      // };
      console.log("Promo_Loding=====", config);

      axios
        .request(config)
        .then((response) => {
          console.log("inRes123");
          console.log("PUSH_NOTIFICATION_SUCCESS------", response);
          dispatch({
            type: PUSH_NOTIFICATION_SUCCESS,
            payload: response.data,
          });
        })
        .catch((error) => {
          console.log("PromoUPDATE_FAILED faild*****", error);
        });
    } catch (error) {
      console.log("PromoUPDATE_FAILED faild*****", error);
      dispatch({
        type: PUSH_NOTIFICATION_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
