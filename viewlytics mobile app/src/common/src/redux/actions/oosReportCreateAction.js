import {
  OOS_REPORT_CREATE_FAILED,
  OOS_REPORT_CREATE_LOADING,
  OOS_REPORT_CREATE_SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";
import { RemainingFormAction } from "./remainingFromCountAction";
import { Alert } from "react-native";
import { ErrorAction } from "./errorAction";
import { CategoryDataAction } from "./categoryListAction";

export const OosReportCreateAction = (
  token,
  note,
  filteredArray,
  navigation,
  storeId
) => {
  return (dispatch) => {
    dispatch({
      type: OOS_REPORT_CREATE_LOADING,
    });
    try {
      let data = JSON.stringify({
        remark: note,
        oos: filteredArray,
        store_id: storeId,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/oos/create`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      console.log("OOS_REPORT_CREATE_", data);

      axios
        .request(config)
        .then((response) => {
          console.log("OOS_REPORT_CREATE_succss", response.data);
          dispatch({
            type: OOS_REPORT_CREATE_SUCCESS,
            payload: response.data,
          });
          dispatch(RemainingFormAction(token));
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
          // dispatch(ErrorAction(true, "sfdfiduefhrfkyhceclihiowd"));
        })
        .catch((error) => {
          console.log(error);
          dispatch(ErrorAction(true, error.message));
        });
    } catch (error) {
      console.log("OOS_REPORT_CREATE_FAILED", error);
      dispatch({
        type: OOS_REPORT_CREATE_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
