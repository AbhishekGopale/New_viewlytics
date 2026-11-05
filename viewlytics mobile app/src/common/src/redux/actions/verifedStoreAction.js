import {
  VERIFIED_STORE_DETAILS_LOADING,
  VERIFIED_STORE_DETAILS_SUCCESS,
  VERIFIED_STORE_DETAILS_FAILED,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";

export const VerifiedStoreAction = (
  token,
  verified,
  id,
  currentLatitude,
  currentLongitude,
  navigation
) => {
  return (dispatch) => {
    dispatch({
      type: VERIFIED_STORE_DETAILS_LOADING,
    });
    try {
      let data = JSON.stringify({
        verified: verified,
        lat: currentLatitude,
        long: currentLongitude,
      });
      console.log("<=====dataaaaaaa=====>", data);
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}store/verified/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      console.log("VERIFIED_STORE_DETAILS_loading", data);

      axios
        .request(config)
        .then((response) => {
          console.log("VERIFIED_STORE_DETAILS_SUCCESS===>", response.data);
          dispatch({
            type: VERIFIED_STORE_DETAILS_SUCCESS,
            payload: response.data,
          });

          navigation.goBack();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("VERIFIED_STORE_DETAILS_FAILED", error);
      dispatch({
        type: VERIFIED_STORE_DETAILS_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
