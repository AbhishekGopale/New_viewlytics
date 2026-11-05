import { BASE_URL } from "../../constants/constants";
import axios from "axios";
import { DB } from "../../database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  COMPETITION_BRAND_FAILED,
  COMPETITION_BRAND_LOADING,
  COMPETITION_BRAND_SUCCESS,
} from "../types";

export const competitionBrandListAction = (token) => {
  return (dispatch) => {
    dispatch({
      type: COMPETITION_BRAND_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/com_analysis/list`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          dispatch({
            type: COMPETITION_BRAND_SUCCESS,
            payload: response.data,
          });
          console.log(
            " Competion brand List sucss--------*****--=======>",
            response.data
          );
          AsyncStorage.setItem(
            DB.COMPETITION_BRAND_LIST,
            JSON.stringify(response.data.data)
          );
        })
        .catch(function (error) {
          console.log("Competion brand  Error<<<<======", error);
        });
    } catch (error) {
      console.log("Competion brand  Error", error);
      dispatch({
        type: COMPETITION_BRAND_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
