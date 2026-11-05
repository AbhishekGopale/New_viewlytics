import {
  OFFLINE_OOS_FAILED,
  OFFLINE_OOS_LOADING,
  OFFLINE_OOS_SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL_TWO } from "../../constants/constants";
import { DB } from "../../database";
import { Alert } from "react-native";

export const OfflineOosAction = () => {
  return async (dispatch) => {
    dispatch({
      type: OFFLINE_OOS_LOADING,
    });

    try {
      const token = await AsyncStorage.getItem(DB.TOKEN);
      const storeId = await AsyncStorage.getItem(DB.STORE_ID);
      const remark = await AsyncStorage.getItem(DB.OOS_INV_REMARK);
      const openingData = await AsyncStorage.getItem(DB.OOS_DATA_OFFLINE);
      const Datas = JSON.parse(openingData);

      const data = JSON.stringify({
        remark: remark,
        store_id: storeId,
        oos: Datas,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL_TWO}/offline/out_of_stock`,
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
        type: OFFLINE_OOS_SUCCESS,
        payload: response.data,
      });
      await AsyncStorage.removeItem(DB.OOS_INV_REMARK);
      await AsyncStorage.removeItem(DB.OOS_DATA_OFFLINE);
    } catch (error) {
      console.log("OFFLINE_OOS_FAILED", error);
      Alert.alert("Oss Data not Sync");
      dispatch({
        type: OFFLINE_OOS_FAILED,
        payload: {
          error: "Something went wrong, please try again later.",
        },
      });
    }
  };
};
