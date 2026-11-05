import {
  OFFLINE_NEW_FAILED,
  OFFLINE_NEW_LOADING,
  OFFLINE_NEW_SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL_TWO } from "../../constants/constants";
import { DB } from "../../database";
import { ErrorAction } from "./errorAction";
import { Alert } from "react-native";

export const OfflineNewStockAction = () => {
  return async (dispatch) => {
    dispatch({
      type: OFFLINE_NEW_LOADING,
    });

    try {
      const token = await AsyncStorage.getItem(DB.TOKEN);
      console.log(token, "token=======------");
      const storeId = await AsyncStorage.getItem(DB.STORE_ID);
      console.log(storeId, "storeId=======------");
      const remark = await AsyncStorage.getItem(DB.OFFLINE_NEW_STOCK_REMARK);
      console.log(remark, "remark=======------");
      const newData = await AsyncStorage.getItem(DB.OFFLINE_NEWSTOCK);
      const Datas = JSON.parse(newData);
      console.log(Datas, "NewData=======-------");

      const data = JSON.stringify({
        remark: remark,
        new_inventory: Datas,
        store_id: storeId,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL_TWO}/offline/new_inventory`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      console.log(data, config, "configdata");
      const response = await axios.request(config);
      console.log(response.data, "response=============------");
      dispatch({
        type: OFFLINE_NEW_SUCCESS,
        payload: response.data,
      });
      await AsyncStorage.removeItem(DB.OFFLINE_NEW_STOCK_REMARK);
      await AsyncStorage.removeItem(DB.OFFLINE_NEWSTOCK);
    } catch (error) {
      console.log("OFFLINE_newStock_FAILED", error);
      Alert.alert("NewStock Data not sync");
      dispatch({
        type: OFFLINE_NEW_FAILED,
        payload: {
          error: "Something went wrong, please try again later.",
        },
      });
    }
  };
};
