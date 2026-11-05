import {
  OFFLINE_SOS_FAILED,
  OFFLINE_SOS_LOADING,
  OFFLINE_SOS_SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL_TWO } from "../../constants/constants";
import { DB } from "../../database";
import { Alert } from "react-native";

export const OfflineSosAction = () => {
  return async (dispatch) => {
    dispatch({
      type: OFFLINE_SOS_LOADING,
    });

    try {
      const token = await AsyncStorage.getItem(DB.TOKEN);
      const storeId = await AsyncStorage.getItem(DB.STORE_ID);
      const openingData = await AsyncStorage.getItem(DB.SOS_OFFLINE_DATA);
      const Datas = JSON.parse(openingData);

      const data = JSON.stringify({
        sos: Datas,
        store_id: storeId,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL_TWO}/offline/share_of_shelf`,
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
        type: OFFLINE_SOS_SUCCESS,
        payload: response.data,
      });
      await AsyncStorage.removeItem(DB.SOS_OFFLINE_DATA);
    } catch (error) {
      console.log("OFFLINE_Sos_FAILED", error);
      Alert.alert(" SOS data not sync");
      dispatch({
        type: OFFLINE_SOS_FAILED,
        payload: {
          error: "Something went wrong, please try again later.",
        },
      });
    }
  };
};
