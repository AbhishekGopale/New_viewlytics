import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  OFFLINE_FORM_STATUS_FAILED,
  OFFLINE_FORM_STATUS_LOADING,
  OFFLINE_FORM_STATUS_SUCCESS,
} from "../types";
import { DB } from "../../database";

export const OfflineFormStatus = (newArr) => {
  console.log("isEnable", newArr);
  return async (dispatch) => {
    dispatch({
      type: OFFLINE_FORM_STATUS_LOADING,
    });
    try {
      let offlineData = await AsyncStorage.getItem(DB.OFFLINE_FORM_STATUS);
      let parsedData = JSON.parse(offlineData);
      console.log("offlineData======>", parsedData);
      console.log("newArr", newArr.length);

      if (newArr.length == 0 && offlineData) {
        dispatch({
          type: OFFLINE_FORM_STATUS_SUCCESS,
          payload: JSON.parse(offlineData),
        });
      } else {
        await AsyncStorage.setItem(
          DB.OFFLINE_FORM_STATUS,
          JSON.stringify(newArr)
        );
        dispatch({
          type: OFFLINE_FORM_STATUS_SUCCESS,
          payload: newArr,
        });
      }
    } catch (error) {
      console.log("Notification Error", error);
      dispatch({
        type: OFFLINE_FORM_STATUS_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
