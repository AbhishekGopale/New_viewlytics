import {
  MARKET_INTELLIGENCE_CLEAR,
  MARKET_INTELLIGENCE_FAILED,
  MARKET_INTELLIGENCE_LOADING,
  MARKET_INTELLIGENCE_SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";
import { RemainingFormAction } from "./remainingFromCountAction";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ErrorAction } from "./errorAction";

export const MarketIntelligenceAction = (
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
      type: MARKET_INTELLIGENCE_LOADING,
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
      console.log("MARKET_INTELLIGENCE_loding=====", data);

      axios
        .request(config)
        .then((response) => {
          console.log("MARKET_INTELLIGENCE sucesss------", response.data);
          dispatch({
            type: MARKET_INTELLIGENCE_SUCCESS,
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
                  dispatch({
                    type: MARKET_INTELLIGENCE_CLEAR,
                    payload: {},
                  });
                },
              },
            ],
            { cancelable: false }
          );
          // dispatch(ErrorAction(true, "sffsffs"));
        })
        .catch((error) => {
          console.log(error);
          dispatch(ErrorAction(true, error.message));
        });
    } catch (error) {
      console.log("MARKET_INTELLIGENCE_FAILED faild*****", error);
      dispatch({
        type: MARKET_INTELLIGENCE_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
