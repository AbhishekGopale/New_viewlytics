import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL, BASE_URL_TWO } from "../../constants/constants";
import { DB } from "../../database";
import { Alert } from "react-native";

import {
  ASSEST_TRAKING_OFFLINE_FAILED,
  ASSEST_TRAKING_OFFLINE_LOADING,
  ASSEST_TRAKING_OFFLINE_SUCCESS,
} from "../types";

export const OfflineMerAssestTrakingAction = () => {
  return async (dispatch) => {
    dispatch({
      type: ASSEST_TRAKING_OFFLINE_LOADING,
    });

    try {
      const storeName = await AsyncStorage.getItem(DB.STORE_NAME);
      const store = JSON.parse(storeName);
      const token = await AsyncStorage.getItem(DB.TOKEN);
      const storeId = await AsyncStorage.getItem(DB.STORE_ID);
      const Id = JSON.parse(storeId);
      const Datacreate = await AsyncStorage.getItem(DB.ASSET_CREATE_DATA_ARRAY);
      const arrayData = JSON.parse(Datacreate);
      console.log(arrayData, "arrayData---");

      if (!arrayData || arrayData.length === 0) {
        throw new Error("No data available for syncing.");
      }

      const promises = arrayData.map(async (element) => {
        console.log(element?.imgObj, "element_imgObj");
        console.log(
          element?.valueMeeting == "2" ? [] : element?.imgObj || [],
          "category_element_imgObj"
        );

        const data = JSON.stringify({
          store_id: Id,
          store_name: store,

          category_id: element?.category || "",
          asset_image_1:
            element?.valueMeeting == "2" ? [] : element?.imgObj || [],
          asset_type: element?.valueMeeting || "",
          asset_id: element?.valueAssets || "",
          implemented: element?.selectedValue || "",
          asset_category_image_1: element?.catimgObj || "",
          asset_category_image_2: element?.catimgObjTwo || "",
          asset_category_image_3: element?.catimgObjThree || "",
          asset_category_image_4: element?.catimgObjFour || "",
          reason: element?.reason || "",
          long: "",
          lat: "",
        });

        const config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${BASE_URL}/offline/asset/createV2`,
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          data: data,
        };
        console.log(config, "MerOffline config");
        const response = await axios.request(config);
        return response.data;
      });

      const results = await Promise.all(promises);

      dispatch({
        type: ASSEST_TRAKING_OFFLINE_SUCCESS,
        payload: results,
      });
      await AsyncStorage.removeItem(DB.ASSET_CREATE_DATA_ARRAY);
      await AsyncStorage.removeItem(DB.MERCHANDISING_ASSEST_TYPE);
      console.log("ASSEST_TRAKING_OFFLINE_SUCCESS");
    } catch (error) {
      console.log("ASSEST_TRAKING_OFFLINE_FAILED Failed", error);
      Alert.alert("ASSEST_TRAKING_OFFLINE_FAILED not sync", error.message);
      dispatch({
        type: ASSEST_TRAKING_OFFLINE_FAILED,
        payload: {
          error: "Something went wrong, please try again later.",
        },
      });
    }
  };
};
