import {
  CLOSING_LIST_FAILED,
  CLOSING_LIST_LOADING,
  CLOSING_LIST_SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";

export const ClosingStockDataAction = (
  token,
  formattedDate,
  storeId,
  navigation
) => {
  return (dispatch) => {
    dispatch({
      type: CLOSING_LIST_LOADING,
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
      console.log("CLOSING_LIST__Loading", data, token);

      axios
        .request(config)
        .then((response) => {
          console.log("CLOSING_LIST_", response.data);
          let data = response?.data?.data?.invertory;
          console.log("CLOSING_LIST_dataMp", data);
          let newArr = data.map((obj) => {
            let sku = obj.sku.map((element) => {
              return {
                ...element,
                closing_inventory_track: "",
              };
            });
            return {
              ...obj,
              isSelected: false,
              sku,
            };
          });
          // let newArr = data.map((obj) => {
          //   return {
          //     ...obj,
          //     isSelected: false,
          //   };
          // });
          console.log("newArr======>", newArr);

          let arr = [];
          newArr &&
            newArr?.forEach((item) => {
              console.log("itemarr12345", item);
              let newObject = {};
              item.sku.forEach((element) => {
                console.log("elementAction", element);
                newObject = {
                  sku_id: element.sku_id,
                  id: element.value,
                  closing_inventory: element.closing_stock,
                  closing_inventory_track: "",
                };
                arr.push(newObject);
              });
            });

          console.log("closingDataArray12345=====-----", arr);

          dispatch({
            type: CLOSING_LIST_SUCCESS,
            payload: { newArray: newArr, filteredArray: arr },
          });
          AsyncStorage.setItem(DB.CLOSING_DATA, JSON.stringify(newArr));
        })
        .catch((error) => {
          console.log("ClosingStockError", error);
          if (error.response.status == 404) {
            dispatch({
              type: CLOSING_LIST_SUCCESS,
              payload: { newArray: [], filteredArray: [] },
            });
          }
        });
    } catch (error) {
      console.log("CLOSING_LIST_FAILED", error);
      dispatch({
        type: CLOSING_LIST_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
