import { MAP_DATA_FAILED, MAP_DATA_LOADING, MAP_DATA_SUCCESS } from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";

export const CreateMapDetailsAction = (
  token,
  storeId,
  currentLatitude,
  currentLongitude,
  batteryPercentage,
  uniqueId,
  speed,
  navigation
) => {
  return (dispatch) => {
    dispatch({
      type: MAP_DATA_LOADING,
    });
    try {
      let data = JSON.stringify({
        store_id: storeId,
        battery: batteryPercentage,
        lat: currentLatitude,
        long: currentLongitude,
        imei_number: uniqueId,
        speed: speed,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/map/detail`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      console.log(data, "loading Data------");
      axios
        .request(config)
        .then((response) => {
          console.log("MAP_DATA_sucess......>>>>>>", response);
          dispatch({
            type: MAP_DATA_SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("MAP_DATA_FAILED", error);
      dispatch({
        type: MAP_DATA_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
