import {
  OPENING_NEW_CLOSING_FAILED,
  OPENING_NEW_CLOSING_LOADING,
  OPENING_NEW_CLOSING_SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL_TWO } from "../../constants/constants";
import { DB } from "../../database";
import { Alert } from "react-native";
import moment from "moment";

export const offlineOpeningClosingNewAction = () => {
  return async (dispatch) => {
    dispatch({
      type: OPENING_NEW_CLOSING_LOADING,
    });

    try {
      const token = await AsyncStorage.getItem(DB.TOKEN);
      const storeId = await AsyncStorage.getItem(DB.STORE_ID);
      const currentDate = moment();
      const formattedDate = currentDate.format("YYYY-MM-DD");

      const Openingremark = await AsyncStorage.getItem(
        DB.OFFLINE_OPENING_INV_REMARK
      );
      const storeopening = await AsyncStorage.getItem(
        DB.OFFLINE_OPENING_INV_FILTERED_ARR
      );
      const storeopeningData = JSON.parse(storeopening || "[]");
      const OpeningStarting = storeopeningData.map((item) => ({
        ...item,
        status: "openingStock",
      }));

      const openingData = await AsyncStorage.getItem(DB.OFFLINE_OPENING);
      const OpDatas = JSON.parse(openingData || "[]");
      const OpeningStockData = OpDatas.map((item) => ({
        ...item,
        status: "openingStock",
      }));

      console.log(OpeningStockData, "OpeningStockData----");

      const newremark = await AsyncStorage.getItem(DB.OFFLINE_NEW_STOCK_REMARK);
      const newData = await AsyncStorage.getItem(DB.OFFLINE_NEWSTOCK);
      const parsedData = JSON.parse(newData || "[]");

      const NewStockData = parsedData.map((item) => ({
        ...item,
        status: "newStock",
        store_id: storeId,
        date: formattedDate,
      }));

      console.log(NewStockData, "NewStockData----");

      const closingRemark = await AsyncStorage.getItem(
        DB.OFFLINE_CLOSING_STOCK_REMARK
      );
      const peopleApprochData = await AsyncStorage.getItem(DB.APPROCH_PEOPLE);
      const peopleApproch = JSON.parse(peopleApprochData || "[]");

      const closingData = await AsyncStorage.getItem(
        DB.OFFLINE_CLOSING_FORM_DATA
      );
      const CloDatas = JSON.parse(closingData || "[]");
      const ClosingStockData = CloDatas.map((item) => ({
        ...item,
        status: "closingStock",
        store_id: storeId,
        date: formattedDate,
      }));

      console.log(ClosingStockData, "ClosingStockData----");

      const data = JSON.stringify({
        store_id: storeId,
        Opening_remark: Openingremark,

        Opening_Data:
          OpeningStockData.length > 0 ? OpeningStockData : OpeningStarting,

        New_remark: newremark,
        New_Data: NewStockData,
        Closing_Remark: closingRemark,
        ClosingData: ClosingStockData,
        ApprochPerson: peopleApproch,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL_TWO}/offline/inventory`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };

      console.log(config, "inventor_configdata__________");

      const response = await axios.request(config);
      console.log(response.data, "response=============------");

      dispatch({
        type: OPENING_NEW_CLOSING_SUCCESS,
        payload: response.data,
      });

      await AsyncStorage.removeItem(DB.OFFLINE_NEW_STOCK_REMARK);
      await AsyncStorage.removeItem(DB.OFFLINE_NEWSTOCK);
      await AsyncStorage.removeItem(DB.OFFLINE_OPENING_INV_REMARK);
      await AsyncStorage.removeItem(DB.OFFLINE_OPENING_INV_FILTERED_ARR);
      await AsyncStorage.removeItem(DB.OFFLINE_CLOSING_FORM_DATA);
      await AsyncStorage.removeItem(DB.OFFLINE_CLOSING_STOCK_REMARK);
      await AsyncStorage.removeItem(DB.OFFLINE_OPENING);
    } catch (error) {
      console.log("OPENING_NEW_CLOSING_FAILED", error);
      Alert.alert("Opening closing new not synced", error.message);

      dispatch({
        type: OPENING_NEW_CLOSING_FAILED,
        payload: {
          error:
            error.message || "Something went wrong, please try again later.",
        },
      });
    }
  };
};
