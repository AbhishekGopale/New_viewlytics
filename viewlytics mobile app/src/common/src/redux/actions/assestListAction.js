import { BASE_URL, BASE_URL_TWO } from "../../constants/constants";
import {
  ASSET_LIST_LOADING,
  ASSET_LIST_SUCCESS,
  ASSET_LIST_FAILED,
} from "../types";
import axios from "axios";
import { DB } from "../../database";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AssestListAction = (token) => {
  return (dispatch) => {
    dispatch({
      type: ASSET_LIST_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL_TWO}asset/assetlisting`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          dispatch({
            type: ASSET_LIST_SUCCESS,
            payload: response.data,
          });
          console.log(
            " ASSET_LIST sucss--------*****--=======>",
            response.data.data
          );
          AsyncStorage.setItem(
            DB.ASSETLIST_DATA,
            JSON.stringify(response.data.data)
          );
        })
        .catch(function (error) {
          console.log("ASSET_LIST_ Error<<<<======", error);
        });
    } catch (error) {
      console.log("ASSET_LIST Error", error);
      dispatch({
        type: ASSET_LIST_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
