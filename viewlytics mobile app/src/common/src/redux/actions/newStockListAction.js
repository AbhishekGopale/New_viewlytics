import {
  NEWSTOCK_LIST_FAILED,
  NEWSTOCK_LIST_LOADING,
  NEWSTOCK_LIST_SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";

export const NewStockDataAction = (
  token,
  formattedDate,
  storeId,
  navigation
) => {
  return (dispatch) => {
    dispatch({
      type: NEWSTOCK_LIST_LOADING,
    });
    try {
      let data = JSON.stringify({
        store_id: parseInt(storeId),
        date: formattedDate,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/inventory/getinventory`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      console.log("NEWSTOCK_LIST_Loading", data, token);

      axios
        .request(config)
        .then((response) => {
          console.log("NEWSTOCK_LIST_sucess", response.data);
          let data = response?.data?.data?.invertory;
          console.log("dataMp", data);
          let newArr = data.map((obj) => {
            return {
              ...obj,
              isSelected: false,
            };
          });
          let arr = [];
          newArr &&
            newArr?.forEach((item) => {
              console.log("itemarr12345", item);
              let newObject = {};
              item.sku.forEach((element) => {
                newObject = {
                  sku_id: element.sku_id,
                  new_inventory: element.new_stock,
                  id: element.value,
                };
                arr.push(newObject);
              });
            });

          console.log("newArray12345=========", arr);

          console.log("newStock====", newArr);
          AsyncStorage.setItem(DB.NEWSTOCK_DATA, JSON.stringify(newArr));
          AsyncStorage.setItem(DB.NEWSTOCK_DATA_FILTERED, JSON.stringify(arr));
          dispatch({
            type: NEWSTOCK_LIST_SUCCESS,
            payload: { newArr, arr },
          });
        })
        .catch((error) => {
          if (error.response.status == 404) {
            dispatch({
              type: NEWSTOCK_LIST_SUCCESS,
              payload: { newArray: [], filteredArray: [] },
            });
          }
        });
    } catch (error) {
      console.log("NEWSTOCK_LIST_FAILED", error);
      dispatch({
        type: NEWSTOCK_LIST_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
