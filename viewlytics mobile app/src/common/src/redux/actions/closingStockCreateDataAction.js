import {
  CLOSINGSTOCK_DATA_CREATE_FAILED,
  CLOSINGSTOCK_DATA_CREATE_LOADING,
  CLOSINGSTOCK_DATA_CREATE_SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";
import { RemainingFormAction } from "./remainingFromCountAction";
import { Alert } from "react-native";
import { ErrorAction } from "./errorAction";

export const ClosingCreateDataAction = (
  token,
  note,
  finalResult,
  navigation,
  approch,
  storeId
) => {
  return (dispatch) => {
    dispatch({
      type: CLOSINGSTOCK_DATA_CREATE_LOADING,
    });
    try {
      let data = JSON.stringify({
        remark: note,
        closing_inventory: finalResult,
        approach_person: approch,
        store_id: storeId,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/inventory/closing`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      console.log("CLOSINGSTOCK_DATA_CREATE_loading", data);

      axios
        .request(config)
        .then((response) => {
          console.log("CLOSINGSTOCK_DATA_CREATE_succss", response);
          dispatch({
            type: CLOSINGSTOCK_DATA_CREATE_SUCCESS,
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
          // dispatch(ErrorAction(true, "Dfffgbhtgf"));
        })
        .catch((error) => {
          console.log(error);
          dispatch(ErrorAction(true, error.message));
        });
    } catch (error) {
      console.log("CLOSINGSTOCK_DATA_CREATE_FAILED", error);
      dispatch({
        type: CLOSINGSTOCK_DATA_CREATE_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
