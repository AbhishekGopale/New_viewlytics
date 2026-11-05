import {
  OFFLINE_MEETING_FAILED,
  OFFLINE_MEETING_LOADING,
  OFFLINE_MEETING_SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { ErrorAction } from "./errorAction";
import { Alert } from "react-native";
import { BASE_URL } from "../../constants/constants";

export const OfflineMeetingAction = () => {
  return async (dispatch) => {
    dispatch({
      type: OFFLINE_MEETING_LOADING,
    });

    try {
      const token = await AsyncStorage.getItem(DB.TOKEN);
      console.log(token, "token=======------");
      const storeId = await AsyncStorage.getItem(DB.STORE_ID);
      console.log(storeId, "storeId=======------");
      const dropdown = await AsyncStorage.getItem(DB.MEETING_DROPDOWN);
      const details = await AsyncStorage.getItem(DB.MEETING_DETALIED_NAME);
      const fristtime = await AsyncStorage.getItem(DB.MEETING_TIME_FRIST);
      const secondTime = await AsyncStorage.getItem(DB.MEETING_TIME_SECOND);
      const duration = await AsyncStorage.getItem(DB.MEETING_TIME_DURATION);
      const description = await AsyncStorage.getItem(
        DB.MEETING_DESCRIPTION_DATA
      );

      const data = JSON.stringify({
        meeting_type: dropdown,
        meeting_agenda: details,
        meeting_start: fristtime,
        meeting_end: secondTime,
        total_hour: duration,
        meeting_minutes: description,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/meeting`,
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
        type: OFFLINE_MEETING_SUCCESS,
        payload: response.data,
      });
      console.log("OFFLINE_MEETING_SUCCESS");
      await AsyncStorage.removeItem(DB.MEETING_DETALIED_NAME);
      await AsyncStorage.removeItem(DB.MEETING_DROPDOWN);
      await AsyncStorage.removeItem(DB.MEETING_TIME_FRIST);
      await AsyncStorage.removeItem(DB.MEETING_TIME_SECOND);
      await AsyncStorage.removeItem(DB.MEETING_TIME_DURATION);
      await AsyncStorage.removeItem(DB.MEETING_DESCRIPTION_DATA);
    } catch (error) {
      console.log("Meeting Data Failed", error);
      Alert.alert("Meeting Data not sync");
      dispatch({
        type: OFFLINE_MEETING_FAILED,
        payload: {
          error: "Something went wrong, please try again later.",
        },
      });
    }
  };
};
