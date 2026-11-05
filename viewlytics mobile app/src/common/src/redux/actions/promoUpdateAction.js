import {
  PROMO_UPDATE_LOADING,
  PROMO_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILED,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";
import { RemainingFormAction } from "./remainingFromCountAction";
import { Alert } from "react-native";
import { ErrorAction } from "./errorAction";
import { PromoListAction } from "./promoListAction";

export const PromoUpadteAction = (
  token,
  status,
  detils,
  imgObj,
  navigation,
  selectedID,
  currentLatitude,
  currentLongitude,
  storename,
  storeId
) => {
  return (dispatch) => {
    dispatch({
      type: PROMO_UPDATE_LOADING,
    });
    try {
      var FormData = require("form-data");
      let data = new FormData();
      data.append("image", imgObj);
      data.append("promo_status", status);
      data.append("promo_remark", detils);
      data.append("lat", currentLatitude);
      data.append("long", currentLongitude);
      data.append("store_name", storename);
      data.append("store_id", storeId);

      let config = {
        method: "POST",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/promo/update/${selectedID}`,
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };
      console.log("Promo_Loding=====", config);

      console.log("Promo_data=====", data);

      axios
        .request(config)
        .then((response) => {
          console.log("Promo sucesss------", response.data);
          dispatch({
            type: PROMO_UPDATE_SUCCESS,
            payload: response.data,
          });
          dispatch(RemainingFormAction(token));
          Alert.alert("Data is submitted successfully.");
          dispatch(PromoListAction(token, storeId));

          // dispatch(ErrorAction(true, "dfdfdds"));
        })
        .catch((error) => {
          console.log(error);
          dispatch(ErrorAction(true, error.message));
        });
    } catch (error) {
      console.log("PromoUPDATE_FAILED faild*****", error);
      dispatch({
        type: PROFILE_UPDATE_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
