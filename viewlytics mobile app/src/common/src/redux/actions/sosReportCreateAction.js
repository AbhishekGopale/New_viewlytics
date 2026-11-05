import {
  SOS_REPORT_CREATE_FAILED,
  SOS_REPORT_CREATE_LOADING,
  SOS_REPORT_CREATE_SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";
import { Alert } from "react-native";
import { ErrorAction } from "./errorAction";
import { CategoryDataAction } from "./categoryListAction";

export const SosReportCreateAction = (token, result, navigation, storeId) => {
  return (dispatch) => {
    dispatch({
      type: SOS_REPORT_CREATE_LOADING,
    });
    try {
      let data = JSON.stringify({
        sos: result,
        store_id: storeId,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/sos/create`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      console.log("SOS_REPORT_CREATE_", data);

      axios
        .request(config)
        .then((response) => {
          console.log("SOS_REPORT_CREATE_succss", response.data);
          dispatch({
            type: SOS_REPORT_CREATE_SUCCESS,
            payload: response.data,
          });
          dispatch(CategoryDataAction(token, navigation, storeId));

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
          // dispatch(ErrorAction(true, "jehfjrfjrn"));
        })
        .catch((error) => {
          console.log(error);
          dispatch(ErrorAction(true, error.message));
        });
    } catch (error) {
      console.log("SOS_REPORT_CREATE_FAILED", error);
      dispatch({
        type: SOS_REPORT_CREATE_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
