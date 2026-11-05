import { BASE_URL } from "../../constants/constants";
import {
  PROMO_LIST_LOADING,
  PROMO_LIST_SUCCESS,
  PROMO_LIST_FAILED,
} from "../types";
import axios from "axios";
import { DB } from "../../database";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const PromoListAction = (token, data) => {
  return (dispatch) => {
    dispatch({
      type: PROMO_LIST_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/promos/promoList/${data}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          console.log("PromoList", response.data.data.promo);
          dispatch({
            type: PROMO_LIST_SUCCESS,
            payload: response.data,
          });

          console.log(
            response.data.data.promo,
            "promodataofffline=======-----"
          );
          AsyncStorage.setItem(
            DB.PROMO_DATA,
            JSON.stringify(response.data.data.promo)
          );
        })
        .catch(function (error) {
          console.log("Promo list Error", error);
        });
    } catch (error) {
      console.log("Promo list Error_SUCCESS Error", error);
      dispatch({
        type: PROMO_LIST_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
