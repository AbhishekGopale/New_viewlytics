import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";
import {
  CREATE_COMPETITION_FAILED,
  CREATE_COMPETITION_LOADING,
  CREATE_COMPETITION_SUCCESS,
} from "../types";
import { Alert } from "react-native";

export const CreateCompetitionDataAction = (
  storeId,
  token,
  isYes,
  valueMeeting,
  isVisibility,
  isPerson,
  isPayOut,
  brandName,
  navigation
) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_COMPETITION_LOADING,
    });
    try {
      let data = JSON.stringify({
        store_id: storeId,
        brand_remark: brandName,
        brand_available: isYes,
        brand_id: valueMeeting,
        brand_person: isPerson,
        brand_visibility: isVisibility,
        pay_out: isPayOut,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/competition_brand`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      console.log("CREATE_COMPETITION_Loading------>", data);

      axios
        .request(config)
        .then((response) => {
          console.log("CREATE_COMPETITION_sucess=====>", response.data);
          dispatch({
            type: CREATE_COMPETITION_SUCCESS,
            payload: response.data.data,
          });
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
        });
    } catch (error) {
      console.log("CREATE_COMPETITION_FAILED", error);
      dispatch({
        type: CREATE_COMPETITION_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
