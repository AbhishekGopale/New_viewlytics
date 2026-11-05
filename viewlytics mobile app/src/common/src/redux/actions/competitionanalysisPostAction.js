import {
  COMPETITION_DATA_LOADING,
  COMPETITION_DATA_SUCCESS,
  COMPETITION_DATA_FAILED,
  COMPETITION_DATA_CLEAR,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";
import { RemainingFormAction } from "./remainingFromCountAction";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const CompetitionDataAction = (
  valueActivation,
  name,
  brand,
  token,
  detils,
  imgObj,
  imgObj2,
  storeId,
  currentLatitude,
  currentLongitude,
  storename,
  navigation
) => {
  return (dispatch) => {
    dispatch({
      type: COMPETITION_DATA_LOADING,
    });
    try {
      var FormData = require("form-data");
      let data = new FormData();
      data.append("store_id", storeId);
      data.append("activation_type", valueActivation);
      data.append("category", name);
      data.append("compation_name", brand);
      data.append("compation_description", detils);
      data.append("activation_pic", imgObj);
      data.append("activation_pic_2", imgObj2);
      data.append("lat", currentLatitude);
      data.append("long", currentLongitude);
      data.append("store_name", storename);

      let config = {
        method: "POST",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/com_analysis`,
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };

      console.log("COMPETITION_ Config------", config);
      axios
        .request(config)
        .then((response) => {
          console.log("COMPETITION_ sucesss------", response.data);
          dispatch({
            type: COMPETITION_DATA_SUCCESS,
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
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("COMPETITION_DATA_FAILED faild*****", error);
      dispatch({
        type: COMPETITION_DATA_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
      dispatch({
        type: COMPETITION_DATA_CLEAR,
        payload: "",
      });
    }
  };
};
