import {
  TRACKING_ASSET_LOADING,
  TRACKING_ASSET_SUCCESS,
  TRACKING_ASSET_FAILED,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL, BASE_URL_TWO } from "../../constants/constants";
import { DB } from "../../database";
import { RemainingFormAction } from "./remainingFromCountAction";
import { Alert } from "react-native";
import { ErrorAction } from "./errorAction";

export const TrackingAssestAction = (
  category,
  storeId,
  valueAssets,
  valueMeeting,
  token,
  selectedValue,
  imgObj,
  detils,
  navigation,
  catimgObj,
  catimgObjTwo,
  catimgObjThree,
  catimgObjFour,
  currentLatitude,
  currentLongitude,
  storename
) => {
  return (dispatch) => {
    dispatch({
      type: TRACKING_ASSET_LOADING,
    });
    try {
      var FormData = require("form-data");
      let data = new FormData();
      // {
      //   valueMeeting == 2
      //     ? data.append("asset_image_1", "")
      //     : data.append("asset_image_1", imgObj);
      // }
      selectedValue == 0
        ? data.append("asset_image_1", "")
        : valueMeeting == 2
        ? data.append("asset_image_1", "")
        : imgObj?.forEach((element, index) => {
            const key = `asset_image_${index + 1}`;
            data.append(key, element);
          });
      data.append("store_id", storeId);
      data.append("category_id", category);
      data.append("asset_type", valueMeeting);
      data.append("asset_id", valueAssets);
      data.append("implemented", selectedValue);
      data.append("asset_category_image_1", catimgObj);
      data.append("asset_category_image_2", catimgObjTwo);
      data.append("asset_category_image_3", catimgObjThree);
      data.append("asset_category_image_4", catimgObjFour);
      data.append("lat", currentLatitude);
      data.append("long", currentLongitude);
      data.append("reason", detils);
      data.append("store_name", storename);

      let config = {
        method: "POST",
        maxBodyLength: Infinity,
        url: `${BASE_URL_TWO}/asset/create`,
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };
      console.log(config, "config");
      console.log("TRACKING_ASSET_loding=====", { data });

      axios
        .request(config)
        .then((response) => {
          console.log("TRACKING_ASSETsucesss------", response.data);
          dispatch({
            type: TRACKING_ASSET_SUCCESS,
            payload: response.data,
          });
          dispatch(RemainingFormAction(token));

          Alert.alert(
            "successful",
            "Data is submitted successfully.",
            [
              {
                text: "OK",
                onPress: () => {
                  navigation.goBack();
                },
              },
            ],
            { cancelable: false }
          );
          // dispatch(ErrorAction(true, "dnjfnjd"));
        })
        .catch((error) => {
          console.log(error);
          dispatch(ErrorAction(true, error.message));
        });
    } catch (error) {
      console.log("TRACKING_ASSET_FAILEDfaild*****", error);
      dispatch({
        type: TRACKING_ASSET_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
