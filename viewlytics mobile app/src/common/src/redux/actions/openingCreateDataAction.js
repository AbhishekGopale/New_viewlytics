import {
  OPENING_DATA_CREATE_FAILED,
  OPENING_DATA_CREATE_LOADING,
  OPENING_DATA_CREATE_SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";
import { RemainingFormAction } from "./remainingFromCountAction";
import { Alert } from "react-native";
import { ErrorAction } from "./errorAction";
import { CategoryDataAction } from "./categoryListAction";
import moment from "moment";

export const OpeningCreateDataAction = (
  token,
  value,
  finalResult,
  navigation,
  storeId
) => {
  const currentDate = moment();

  const formattedDate = currentDate.format("YYYY-MM-DD");
  console.log(formattedDate, "formattedDate-----");
  return (dispatch) => {
    dispatch({
      type: OPENING_DATA_CREATE_LOADING,
    });
    try {
      let data = JSON.stringify({
        remark: value,
        opening_inventory: finalResult,
        store_id: storeId,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/inventory/open`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      console.log("OPENING_DATA_CREATE_", data);

      axios
        .request(config)
        .then((response) => {
          console.log("OPENING_DATA_CREATE_", response.data);
          dispatch({
            type: OPENING_DATA_CREATE_SUCCESS,
            payload: response.data,
          });
          dispatch(RemainingFormAction(token));
          dispatch(
            CategoryDataAction(token, navigation, storeId, formattedDate)
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
        })
        .catch((error) => {
          console.log(error);
          dispatch(ErrorAction(true, error.message));
        });
    } catch (error) {
      console.log("OPENING_DATA_CREATE_FAILED", error);
      dispatch({
        type: OPENING_DATA_CREATE_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
