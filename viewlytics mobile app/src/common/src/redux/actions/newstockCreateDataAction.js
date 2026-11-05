import {
  NEWSTOCK_DATA_CREATE_FAILED,
  NEWSTOCK_DATA_CREATE_LOADING,
  NEWSTOCK_DATA_CREATE_SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";
import { RemainingFormAction } from "./remainingFromCountAction";
import { Alert } from "react-native";
import { ErrorAction } from "./errorAction";
import { NewStockDataAction } from "./newStockListAction";
import moment from "moment";

export const NewStockCreateDataAction = (
  token,
  note,
  finalResult,
  navigation,
  storeId
) => {
  const currentDate = moment();

  const formattedDate = currentDate.format("YYYY-MM-DD");
  console.log(formattedDate, "formattedDate-----");
  return (dispatch) => {
    dispatch({
      type: NEWSTOCK_DATA_CREATE_LOADING,
    });
    try {
      let data = JSON.stringify({
        remark: note,
        new_inventory: finalResult,
        store_id: storeId,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/inventory/newinventory`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      console.log("NEWSTOCK_DATA_CREATE", data);

      axios
        .request(config)
        .then((response) => {
          console.log("NEWSTOCK_DATA_CREATE_succss", response.data);
          dispatch({
            type: NEWSTOCK_DATA_CREATE_SUCCESS,
            payload: response.data,
          });
          dispatch(RemainingFormAction(token));
          dispatch(
            NewStockDataAction(token, formattedDate, storeId, navigation)
          );

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
          // dispatch(ErrorAction(true, "dfhfhrhf"));
        })
        .catch((error) => {
          console.log(error);
          dispatch(ErrorAction(true, error.message));
        });
    } catch (error) {
      console.log("NEWSTOCK_DATA_CREATE_FAILED", error);
      dispatch({
        type: NEWSTOCK_DATA_CREATE_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
