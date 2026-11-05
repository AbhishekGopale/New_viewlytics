import {
  OFFLINE_OPENING_FAILED,
  OFFLINE_OPENING_LOADING,
  OFFLINE_OPENING_SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL_TWO } from "../../constants/constants";
import { DB } from "../../database";
import { ErrorAction } from "./errorAction";
import { Alert } from "react-native";

export const OfflineOpeningAction = () => {
  return async (dispatch) => {
    dispatch({
      type: OFFLINE_OPENING_LOADING,
    });

    try {
      const token = await AsyncStorage.getItem(DB.TOKEN);
      const storeId = await AsyncStorage.getItem(DB.STORE_ID);
      const remark = await AsyncStorage.getItem(DB.OFFLINE_OPENING_INV_REMARK);
      const openingData = await AsyncStorage.getItem(DB.OFFLINE_OPENING);
      const Datas = JSON.parse(openingData);

      const data = JSON.stringify({
        remark: remark,
        store_id: storeId,
        opening_inventory: Datas,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL_TWO}/offline/opening_inventory`,
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
        type: OFFLINE_OPENING_SUCCESS,
        payload: response.data,
      });
      await AsyncStorage.removeItem(DB.OFFLINE_OPENING_INV_REMARK);
      await AsyncStorage.removeItem(DB.OFFLINE_OPENING);
    } catch (error) {
      Alert.alert("Opening  Data not sync");
      console.log("OFFLINE_OPENING_FAILED", error);
      dispatch({
        type: OFFLINE_OPENING_FAILED,
        payload: {
          error: "Something went wrong, please try again later.",
        },
      });
    }
  };
};
