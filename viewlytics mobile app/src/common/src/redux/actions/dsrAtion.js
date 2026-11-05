import { DSR_LIST_FAILED, DSR_LIST_LOADING, DSR_LIST_SUCCESS } from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";

export const DsrDataAction = (token, formattedDate, storeId, navigation) => {
  return (dispatch) => {
    dispatch({
      type: DSR_LIST_LOADING,
    });
    try {
      let data = JSON.stringify({
        store_id: parseInt(storeId),
        date: formattedDate,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/inventory/dsr`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      console.log("DSR_LIST_loading", data, token);

      axios
        .request(config)
        .then((response) => {
          console.log("DSR_LIST_", response.data);
          let data = response?.data?.data?.dsr;
          let ApprochData = response?.data;
          console.log("dataMp-------------------------------", data);
          let newArr = data.map((obj) => {
            return {
              ...obj,
              isSelected: false,
            };
          });
          console.log("newArr", newArr);
          dispatch({
            type: DSR_LIST_SUCCESS,
            payload: { newArr, ApprochData },
          });
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 404) {
            dispatch({
              type: DSR_LIST_SUCCESS,
              payload: [],
            });
          }
        });
    } catch (error) {
      console.log("DSR_LIST_FAILED", error);
      dispatch({
        type: DSR_LIST_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
