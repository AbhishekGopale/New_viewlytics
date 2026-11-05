import {
  SUPPORT_DETAILS_LOADING,
  SUPPORT_DETAILS_SUCCESS,
  SUPPORT_DETAILS_FAILED,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";
import { Alert } from "react-native";
import { ErrorAction } from "./errorAction";

export const SupportDetailsAction = (formData, token, navigation) => {
  return (dispatch) => {
    dispatch({
      type: SUPPORT_DETAILS_LOADING,
    });
    try {
      let data = JSON.stringify({
        form: formData,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/support/create`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      console.log("SupportDetailsc", data);

      axios
        .request(config)
        .then((response) => {
          console.log("SupportDetails", response.data);
          dispatch({
            type: SUPPORT_DETAILS_SUCCESS,
            payload: response.data,
          });
          Alert.alert(
            "successful",
            "Email is submitted successfully.",
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
      console.log("SupportDetailsfailed", error);
      dispatch({
        type: SUPPORT_DETAILS_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
