import {
  OFFLINE_ADMINWORK_FAILED,
  OFFLINE_ADMINWORK_LOADING,
  OFFLINE_ADMINWORK_SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { DB } from "../../database";
import { ErrorAction } from "./errorAction";
import { Alert } from "react-native";
import { BASE_URL } from "../../constants/constants";

export const OfflineAdminWorkAction = () => {
  return async (dispatch) => {
    dispatch({
      type: OFFLINE_ADMINWORK_LOADING,
    });

    try {
      const token = await AsyncStorage.getItem(DB.TOKEN);
      console.log(token, "token=======------");
      const storeId = await AsyncStorage.getItem(DB.STORE_ID);
      console.log(storeId, "storeId=======------");
      const dropdown = await AsyncStorage.getItem(DB.ADMINWORK_DROPDOWN);
      const details = await AsyncStorage.getItem(DB.ADMINWORK_DETALIED_NAME);
      const fristtime = await AsyncStorage.getItem(DB.ADMINWORK_TIME_FRIST);
      const secondTime = await AsyncStorage.getItem(DB.ADMINWORK_TIME_SECOND);
      const duration = await AsyncStorage.getItem(DB.ADMINWORK_TIME_DURATION);
      const description = await AsyncStorage.getItem(
        DB.ADMINWORK_DESCRIPTION_DATA
      );

      const data = JSON.stringify({
        work_type: dropdown,
        report_detailed_name: details,
        meeting_start: fristtime,
        meeting_end: secondTime,
        total_hour: duration,
        what_is_done: description,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/adminWork_meeting`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      console.log(data, "data");
      const response = await axios.request(config);
      console.log(response.data, "response=============------");
      dispatch({
        type: OFFLINE_ADMINWORK_SUCCESS,
        payload: response.data,
      });
      console.log("OFFLINE_ADMINWORK_SUCCESS");

      await AsyncStorage.removeItem(DB.ADMINWORK_DROPDOWN);
      await AsyncStorage.removeItem(DB.ADMINWORK_DETALIED_NAME);
      await AsyncStorage.removeItem(DB.ADMINWORK_TIME_FRIST);
      await AsyncStorage.removeItem(DB.ADMINWORK_TIME_SECOND);
      await AsyncStorage.removeItem(DB.ADMINWORK_TIME_DURATION);
      await AsyncStorage.removeItem(DB.ADMINWORK_DESCRIPTION_DATA);
    } catch (error) {
      console.log("OFFLINE_AddminWork__FAILED", error);
      Alert.alert("Addmin work data not sync");
      dispatch({
        type: OFFLINE_ADMINWORK_FAILED,
        payload: {
          error: "Something went wrong, please try again later.",
        },
      });
    }
  };
};
