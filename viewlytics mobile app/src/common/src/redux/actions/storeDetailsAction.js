import { BASE_URL } from "../../constants/constants";
import {
  STORE_DETAILS_FAILED,
  STORE_DETAILS_LOADING,
  STORE_DETAILS_SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";

export const StoreDetails = (token, storeId) => {
  return (dispatch) => {
    dispatch({
      type: STORE_DETAILS_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}storedetail/${storeId}`,
        headers: {
          Authorization: token,
        },
      };

      axios
        .request(config)
        .then((response) => {
          console.log("StoreDetailsSuccess", response.data);
          dispatch({
            type: STORE_DETAILS_SUCCESS,
            payload: response.data?.data?.storeDetail,
          });
          console.log(response.data.data.storeDetail, "--------------soreeeee");
          AsyncStorage.setItem(
            DB.STORE_DETAILS,
            JSON.stringify(response.data.data.storeDetail)
          );
        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: STORE_DETAILS_FAILED,
            payload: {
              error: error,
            },
          });
        });
    } catch (error) {
      console.log("STORE_DETAILS_FAILED Error_SUCCESS Error", error);
      dispatch({
        type: STORE_DETAILS_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
