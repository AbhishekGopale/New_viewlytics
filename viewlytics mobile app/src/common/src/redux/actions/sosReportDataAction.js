import {
  SOS_REPORT_DATA_FAILED,
  SOS_REPORT_DATA_LOADING,
  SOS_REPORT_DATA_SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";

export const SosDataAction = (token, formattedDate, storeId) => {
  return (dispatch) => {
    dispatch({
      type: SOS_REPORT_DATA_LOADING,
    });
    try {
      let data = JSON.stringify({
        store_id: storeId,
        date: formattedDate,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/sos/get`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      console.log("SOS_REPORT_DATA_Loading", data, token);

      axios
        .request(config)
        .then((response) => {
          console.log("SOS_REPORT_DATA__sucess", response.data);
          let data = response?.data?.data;
          console.log("dataMp", data);
          let newArr = data.map((obj) => {
            return {
              ...obj,
              isSelected: false,
            };
          });
          console.log("newArr", newArr);
          dispatch({
            type: SOS_REPORT_DATA_SUCCESS,
            payload: newArr,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("SOS_REPORT_DATA_FAILED", error);
      dispatch({
        type: SOS_REPORT_DATA_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
