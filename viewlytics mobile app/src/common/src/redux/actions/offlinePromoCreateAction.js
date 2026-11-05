import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL_TWO } from "../../constants/constants";
import { DB } from "../../database";
import {
  OFFLINE_PROMO_FAILED,
  OFFLINE_PROMO_LOADING,
  OFFLINE_PROMO_SUCCESS,
} from "../types";
import { Alert } from "react-native";
export const OfflinePromoAction = () => {
  return async (dispatch) => {
    dispatch({
      type: OFFLINE_PROMO_LOADING,
    });

    try {
      const token = await AsyncStorage.getItem(DB.TOKEN);
      const storeId = await AsyncStorage.getItem(DB.STORE_ID);
      const openingData = await AsyncStorage.getItem(DB.PROMO_OFFLINE_DATA);
      const Datas = JSON.parse(openingData);
      console.log(Datas, "PromoDatas==========");

      if (!Datas || Datas.length === 0) {
        throw new Error("No data available for syncing.");
      }

      const promises = Datas.map(async (element) => {
        console.log(element, "element_imgObj_Promo");

        const data = JSON.stringify({
          store_id: storeId,
          image: element?.image || "",
          promo_status: element?.promo_status || "",
          promo_remark: element?.promo_remark || "",
          id: element?.selectedID || "",
        });

        const config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${BASE_URL_TWO}/offline/promo/update`,
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          data: data,
        };
        console.log(config, "promo config");
        const response = await axios.request(config);
        return response.data;
      });

      const results = await Promise.all(promises);

      dispatch({
        type: OFFLINE_PROMO_SUCCESS,
        payload: results,
      });
      await AsyncStorage.removeItem(DB.PROMO_OFFLINE_DATA);
      console.log("OFFLINE_PROMO_SUCCESS");
    } catch (error) {
      console.log("OFFLINE_PROMO_FAILED Failed", error);
      Alert.alert("OFFLINE_PROMO_FAILED not sync", error.message);
      dispatch({
        type: OFFLINE_PROMO_FAILED,
        payload: {
          error: "Something went wrong, please try again later.",
        },
      });
    }
  };
};
