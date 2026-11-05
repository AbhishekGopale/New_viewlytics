import { BASE_URL } from "../../constants/constants";
import {
  DELETE_NOTIFICATION_FAILED,
  DELETE_NOTIFICATION_LOADING,
  DELETE_NOTIFICATION_SUCCESS,
} from "../types";
import axios from "axios";
import { GetAllNotificationAction } from "./getAllNotificationAction";

export const DeleteNotificationAction = (token, id) => {
  console.log("itemId", id);
  return (dispatch) => {
    dispatch({
      type: DELETE_NOTIFICATION_LOADING,
    });
    try {
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/delete/${id}`,
        headers: {
          Authorization: token,
        },
      };
      console.log("config", config);
      axios(config)
        .then(function (response) {
          dispatch({
            type: DELETE_NOTIFICATION_SUCCESS,
            payload: response.data.data,
          });
          dispatch(GetAllNotificationAction(token));
          console.log("DELETE_NOTIFICATION_SUCCESS respose", response);
        })
        .catch(function (error) {
          console.log("DELETE_NOTIFICATION_SUCCESS Error", error);
        });
    } catch (error) {
      console.log("DELETE_NOTIFICATION_SUCCESS Error", error);
      dispatch({
        type: DELETE_NOTIFICATION_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
