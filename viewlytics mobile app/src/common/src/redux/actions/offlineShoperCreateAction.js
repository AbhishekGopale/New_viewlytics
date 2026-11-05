import {
  OFFLINE_SOPERENGAGEMENT_FAILED,
  OFFLINE_SOPERENGAGEMENT_LOADING,
  OFFLINE_SOPERENGAGEMENT_SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { ErrorAction } from "./errorAction";
import { Alert } from "react-native";
import { BASE_URL } from "../../constants/constants";

export const OfflineShoperAction = () => {
  return async (dispatch) => {
    dispatch({
      type: OFFLINE_SOPERENGAGEMENT_LOADING,
    });

    try {
      const storeName = await AsyncStorage.getItem(DB.STORE_NAME);
      const token = await AsyncStorage.getItem(DB.TOKEN);
      const storeId = await AsyncStorage.getItem(DB.STORE_ID);
      const baseUrlOne = await AsyncStorage.getItem(DB.BASE_ONE_IMAGE);
      const baseUrlTwo = await AsyncStorage.getItem(DB.BASE_TWO_IMAGE);
      const baseUrlThree = await AsyncStorage.getItem(DB.BASE_THREE_IMAGE);
      const baseUrlFour = await AsyncStorage.getItem(DB.BASE_FOUR_IMAGE);
      const baseUrlFive = await AsyncStorage.getItem(DB.BASE_FIVE_IMAGE);
      const baseUrlSix = await AsyncStorage.getItem(DB.BASE_SIX_IMAGE);

      console.log({ baseUrlOne });

      const data = JSON.stringify({
        store_id: storeId,
        store_name: storeName,
        cust_approach_image: baseUrlOne,
        any_sample_image: baseUrlTwo,
        other_image: baseUrlThree,
        cust_approach_image2: baseUrlFour,
        any_sample_image2: baseUrlFive,
        other_image2: baseUrlSix,
        long: "",
        lat: "",
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://viewlytics.in//api/v2/app/offline/shopper_engagement",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      console.log(data, "OFFLINE_SOPERENGAGEMENT_SUCCESS data");
      const response = await axios.request(config);
      console.log(response.data, "response=============------");
      dispatch({
        type: OFFLINE_SOPERENGAGEMENT_SUCCESS,
        payload: response.data,
      });
      console.log("OFFLINE_SOPERENGAGEMENT_SUCCESS");
      await AsyncStorage.removeItem(DB.BASE_ONE_IMAGE);
      await AsyncStorage.removeItem(DB.BASE_TWO_IMAGE);
      await AsyncStorage.removeItem(DB.BASE_THREE_IMAGE);
      await AsyncStorage.removeItem(DB.BASE_FOUR_IMAGE);
      await AsyncStorage.removeItem(DB.BASE_FIVE_IMAGE);
      await AsyncStorage.removeItem(DB.BASE_SIX_IMAGE);
      await AsyncStorage.removeItem(DB.SHOPPER_ENGEGMENTDATA);
    } catch (error) {
      console.log("Meeting OFFLINE_SOPERENGAGEMENT_FAILED Failed", error);
      Alert.alert("OFFLINE_SOPERENGAGEMENT_ not sync");
      dispatch({
        type: OFFLINE_SOPERENGAGEMENT_FAILED,
        payload: {
          error: "Something went wrong, please try again later.",
        },
      });
    }
  };
};
