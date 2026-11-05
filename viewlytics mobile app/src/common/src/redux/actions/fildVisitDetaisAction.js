import { BASE_URL } from "../../constants/constants";
import {
  FILD_VISIT_DATA_LOADING,
  FILD_VISIT_DATA_SUCCESS,
  FILD_VISIT_DATA_FAILED,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";

export const FildVisitDetail = (token, storeId) => {
  return (dispatch) => {
    dispatch({
      type: FILD_VISIT_DATA_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}fieldvisit/listing/${storeId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          let data = response.data.data;
          console.log(
            "Correct Spelling : fieldVisitDetailsAction replace this ",
            response
          );
          let newArr = data.map((obj) => {
            return {
              ...obj,
              isSelected: false,
            };
          });
          dispatch({
            type: FILD_VISIT_DATA_SUCCESS,
            payload: newArr,
          });
          AsyncStorage.setItem(
            DB.FILD_VISIT_LIST,
            JSON.stringify(response?.data)
          );
          console.log("FILD_VISIT_DATA_ details ---=======-->", response.data);
        })
        .catch(function (error) {
          console.log("FILD_VISIT_DATA_errror<<<<======", error);
        });
    } catch (error) {
      console.log(" Present empolyee details  Error", error);
      dispatch({
        type: FILD_VISIT_DATA_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
