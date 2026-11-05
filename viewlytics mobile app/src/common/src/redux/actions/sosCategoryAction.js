import { BASE_URL, BASE_URL_TWO } from "../../constants/constants";
import {
  SOS_CATEGORY_FAILED,
  SOS_CATEGORY_LOADING,
  SOS_CATEGORY_SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";

export const SOSCategoryAction = (token, storeId) => {
  return (dispatch) => {
    dispatch({
      type: SOS_CATEGORY_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        // url: `${BASE_URL}inventory/skuname/${storeId}`,
        url: `${BASE_URL_TWO}asset/category/${storeId}`,

        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          let data = response?.data?.data;
          console.log("dataMp", data);
          let newArr = data.map((obj) => {
            let sku = obj.sku.map((element) => {
              return {
                ...element,
                openingStock: element?.open_inve.toString(),
                oos_status: element?.oos_count.toString(),
                opening_inventory_track:
                  element?.open_inve > 0 ? element?.open_inve.toString() : "",
              };
            });
            return {
              ...obj,
              isSelected: false,
              sku,
            };
          });

          let arr = [];
          newArr &&
            newArr?.forEach((item) => {
              console.log("itemarr12345", item);
              let newObject = {};
              item.sku.forEach((element) => {
                console.log("elementAction", element);
                newObject = {
                  store_id: storeId,
                  sku_id: element.value,
                  opening_inventory: element.openingStock,
                  opening_inventory_track:
                    element.openingStock > 0 ? element.openingStock : "",
                  category_id: item.id,
                  date: formattedDate,
                };
                arr.push(newObject);
              });
            });
          // let newDataArr = newArr;
          // let popLastElement = newDataArr.pop();
          // let newDataArray = newDataArr.unshift(popLastElement);
          // console.log("newArray12345", newArr, newDataArray);

          dispatch({
            type: SOS_CATEGORY_SUCCESS,
            payload: { newArr: newArr, filteredArr: arr },
          });
          console.log(config, "------------config");
          console.log(" SOS_CATEGORY_SUCCESS---*****--=======>", response.data);
          //   AsyncStorage.setItem(DB.OFFLINE_OPENING_INV, JSON.stringify(newArr));
          //   AsyncStorage.setItem(
          //     DB.CATEGORY_DATA,
          //     JSON.stringify(response.data.data)
          //   );
          //   AsyncStorage.setItem(
          //     DB.OFFLINE_OPENING_INV_FILTERED_ARR,
          //     JSON.stringify(arr)
          //   );
          //   console.log(" SOS_CATEGORY_SUCCESS---*****--=======>", response.data);
          //   AsyncStorage.setItem(
          //     DB.OOSREPORT_DATA,
          //     JSON.stringify(response.data.data)
          //   );
        })
        .catch((error) => {
          if (error.response.status == 404) {
            dispatch({
              type: SOS_CATEGORY_SUCCESS,
              payload: [],
            });
          }
        });
    } catch (error) {
      console.log("SOS_CATEGORY  Error", error);
      dispatch({
        type: SOS_CATEGORY_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
