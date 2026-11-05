import {
  OFFLINE_MARKETINTELLIGENCE_FAILED,
  OFFLINE_MARKETINTELLIGENCE_LOADING,
  OFFLINE_MARKETINTELLIGENCE_SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { ErrorAction } from "./errorAction";
import { Alert } from "react-native";
import { BASE_URL, BASE_URL_TWO } from "../../constants/constants";

export const OfflineMarketIntelligenceAction = () => {
  return async (dispatch) => {
    dispatch({
      type: OFFLINE_MARKETINTELLIGENCE_LOADING,
    });

    try {
      const token = await AsyncStorage.getItem(DB.TOKEN);
      const storeId = await AsyncStorage.getItem(DB.STORE_ID);
      const storeName = await AsyncStorage.getItem(DB.STORE_NAME);
      const brndname = await AsyncStorage.getItem(DB.INTELIGNCE_BRAND_NAME);
      let brndnames = JSON.parse(brndname);
      const categoryname = await AsyncStorage.getItem(
        DB.INTELIGNCE_CATEGORY_NAME
      );
      let categorynames = JSON.parse(categoryname);
      const activationtype = await AsyncStorage.getItem(
        DB.INTELIGNCE_VALUE_DROPDOWN
      );
      const compation_description = await AsyncStorage.getItem(
        DB.COMPETION_DISCRIPTION
      );
      let activationtypes = JSON.parse(activationtype);
      let compation_descriptions = JSON.parse(compation_description);
      const img1 = await AsyncStorage.getItem(DB.INTELIGNCE_BASE_IMAGE_ONE);
      const img2 = await AsyncStorage.getItem(DB.INTELIGNCE_BASE_IMAGE_TWO);
      console.log(img1, "img1");
      console.log(img2, "img2");

      const data = JSON.stringify({
        store_id: storeId,
        store_name: storeName,
        activation_type: activationtypes,
        category: brndnames,
        compation_name: categorynames,
        compation_description: compation_descriptions,
        activation_pic: img1,
        activation_pic_2: img2,
        long: "",
        lat: "",
      });
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL_TWO}/offline/com_analysis`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      // console.log(data, "OFFLINE_MARKETINTELLIGENCE_SUCCESS data");
      console.log(config, "OFFLINE_MARKETINTELLIGENCE config");
      const response = await axios.request(config);
      console.log(response.data, "response=============------");
      dispatch({
        type: OFFLINE_MARKETINTELLIGENCE_SUCCESS,
        payload: response.data,
      });
      console.log("OFFLINE_MARKETINTELLIGENCE_SUCCESS");
      await AsyncStorage.removeItem(DB.INTELIGNCE_VALUE_DROPDOWN);
      await AsyncStorage.removeItem(DB.INTELIGNCE_IMAGE);
      await AsyncStorage.removeItem(DB.INTELIGNCE_BRAND_NAME);
      await AsyncStorage.removeItem(DB.INTELIGNCE_CATEGORY_NAME);
      await AsyncStorage.removeItem(DB.COMPETION_DISCRIPTION);
      await AsyncStorage.removeItem(DB.INTELIGNCE_BASE_IMAGE_ONE);
      await AsyncStorage.removeItem(DB.INTELIGNCE_BASE_IMAGE_TWO);
    } catch (error) {
      console.log("OFFLINE_MARKETINTELLIGENCE_FAILED Failed", error);
      Alert.alert("OFFLINE_MARKETINTELLIGENCE_FAILED not sync");
      dispatch({
        type: OFFLINE_MARKETINTELLIGENCE_FAILED,
        payload: {
          error: "Something went wrong, please try again later.",
        },
      });
    }
  };
};
