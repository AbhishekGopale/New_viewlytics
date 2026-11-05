import {
  OFFLINE_CLOSING_FAILED,
  OFFLINE_CLOSING_LOADING,
  OFFLINE_CLOSING_SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL_TWO } from "../../constants/constants";
import { DB } from "../../database";
import { ErrorAction } from "./errorAction";
import { Alert } from "react-native";

export const OfflineClosingStockAction = () => {
  return async (dispatch) => {
    dispatch({
      type: OFFLINE_CLOSING_LOADING,
    });

    try {
      const token = await AsyncStorage.getItem(DB.TOKEN);
      console.log(token, "token=======------");
      const storeId = await AsyncStorage.getItem(DB.STORE_ID);
      const remark = await AsyncStorage.getItem(
        DB.OFFLINE_CLOSING_STOCK_REMARK
      );
      const newData = await AsyncStorage.getItem(DB.OFFLINE_CLOSING_FORM_DATA);
      const peopleApproch = await AsyncStorage.getItem(DB.APPROCH_PEOPLE);

      const Datas = JSON.parse(newData);

      const data = JSON.stringify({
        remark: remark,
        closing_inventory: Datas,
        store_id: storeId,
        approach_person: peopleApproch,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL_TWO}/offline/closing_inventory`,
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
        type: OFFLINE_CLOSING_SUCCESS,
        payload: response.data,
      });
      await AsyncStorage.removeItem(DB.OFFLINE_CLOSING_FORM_DATA);
    } catch (error) {
      console.log("OFFLINE_closing_FAILED", error);
      Alert.alert("Closing Stock Data Not Sync");
      dispatch({
        type: OFFLINE_CLOSING_FAILED,
        payload: {
          error: "Something went wrong, please try again later.",
        },
      });
    }
  };
};
