import { BASE_URL } from "../../constants/constants";
import {
  REMAINING_FORM_FAILED,
  REMAINING_FORM_LOADING,
  REMAINING_FORM_SUCCESS,
} from "../types";
import axios from "axios";
import { DB } from "../../database";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const RemainingFormAction = (token, navigation) => {
  return (dispatch) => {
    dispatch({
      type: REMAINING_FORM_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/dashboard/formcount`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          console.log(
            "RemainingForm-----------=========",
            response?.data?.data
          );
          console.log(
            "StoreId-----------=========",
            response?.data?.data?.count?.storeId
          );

          let notVerified = [];
          response?.data?.data?.store?.filter((element) => {
            console.log("element", element);
            if (element.verified == "0") {
              notVerified.push(element);
            }
          });
          console.log({ notVerified });
          dispatch({
            type: REMAINING_FORM_SUCCESS,
            payload: {
              allStore: response?.data?.data,
              notVerified: notVerified,
            },
          });
          const storeid = response?.data?.data?.count?.storeId;
          console.log(storeid, "storeid--------------");
          AsyncStorage.setItem(DB.STORE_ID, storeid.toString());
        })
        .catch(function (error) {
          console.log("REMAINING_FORM_", error);
        });
    } catch (error) {
      console.log("REMAINING_FORM_FAILED SS Error", error);
      dispatch({
        type: REMAINING_FORM_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
