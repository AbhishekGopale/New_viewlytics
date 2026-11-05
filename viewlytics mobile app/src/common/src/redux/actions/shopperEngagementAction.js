import {
  SHOPPER_ENGAGEMENT_LOADING,
  SHOPPER_ENGAGEMENT_SUCCESS,
  SHOPPER_ENGAGEMNET_FAILED,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";
import { RemainingFormAction } from "./remainingFromCountAction";
import { Alert } from "react-native";
import { ErrorAction } from "./errorAction";

export const ShopperEngagementAction = (
  token,
  storeId,
  imgObj,
  imgObj2,
  imgObj3,
  imgObj4,
  imgObj5,
  imgObj6,
  navigation,
  currentLatitude,
  currentLongitude,
  storename
) => {
  return (dispatch) => {
    dispatch({
      type: SHOPPER_ENGAGEMENT_LOADING,
    });
    try {
      var FormData = require("form-data");
      let data = new FormData();
      data.append("store_id", storeId);
      data.append("cust_approach_image", imgObj);
      data.append("any_sample_image", imgObj2);
      data.append("other_image", imgObj3);
      data.append("cust_approach_image2", imgObj4);
      data.append("any_sample_image2", imgObj5);
      data.append("other_image2", imgObj6);
      data.append("lat", currentLatitude);
      data.append("long", currentLongitude);
      data.append("store_name", storename);

      let config = {
        method: "POST",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/shopengagement/create`,
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };
      console.log("SHOPPER_ENGAGEMENT_config=====", config);

      axios
        .request(config)
        .then((response) => {
          console.log(
            "SHOPPER_ENGAGEMENT_SUCCESS sucesss------",
            response.data
          );
          dispatch({
            type: SHOPPER_ENGAGEMENT_SUCCESS,
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
          // dispatch(ErrorAction(true, "dfjjhrdhedehdehdh"));
        })
        .catch((error) => {
          console.log(error);
          dispatch(ErrorAction(true, error.message));
        });
    } catch (error) {
      console.log("SHOPPER_ENGAGEMNET_FAILED faild*****", error);
      dispatch({
        type: SHOPPER_ENGAGEMNET_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
