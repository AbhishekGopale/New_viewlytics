import { BASE_URL } from "../../constants/constants";
import {
  ASSET_DATALIST_FAILED,
  ASSET_DATALIST_LOADING,
  ASSET_DATALIST_SUCCESS,
} from "../types";
import axios from "axios";

export const AssestListAction = (token) => {
  return (dispatch) => {
    dispatch({
      type: ASSET_DATALIST_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}asset/assetlisting`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          dispatch({
            type: ASSET_DATALIST_SUCCESS,
            payload: response.data,
          });
          navigation.goBack();
          console.log(
            "ASSET_DATALIST__success---*****--=======>",
            response.data
          );
        })
        .catch(function (error) {
          console.log("AASSET_DATALIST__ Error<<<<======", error);
        });
    } catch (error) {
      console.log("ASSET_DATALIST_FAILED Error", error);
      dispatch({
        type: ASSET_DATALIST_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
