import { BASE_URL } from "../../constants/constants";
import {
  ASSET_DATA_LOADING,
  ASSET_DATA_SUCCESS,
  ASSET_DATA_FAILED,
} from "../types";
import axios from "axios";
import { DB } from "../../database";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AssestCategoryAction = (token, storeId, navigation) => {
  return (dispatch) => {
    dispatch({
      type: ASSET_DATA_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}asset/category/${storeId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          let data = response?.data?.data;
          let newArr = data?.map((obj) => {
            return {
              ...obj,
              value: obj.category_name,
              label: obj.category_name,
            };
          });
          dispatch({
            type: ASSET_DATA_SUCCESS,
            payload: newArr,
          });
          AsyncStorage.setItem(DB.ASSET_CATEGORY_LIST, JSON.stringify(newArr));
          console.log(
            "ASSET_data_success---*****--=======>",
            response.data,
            newArr
          );
        })

        .catch(function (error) {
          console.log("ASSET_data_ Error<<<<======", error);
        });
    } catch (error) {
      console.log("ASSET_data Error", error);
      dispatch({
        type: ASSET_DATA_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
