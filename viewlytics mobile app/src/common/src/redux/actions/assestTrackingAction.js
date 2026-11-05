import { BASE_URL } from "../../constants/constants";
import {
  ASSET_TRACKING_CATEGORY_LOADING,
  ASSET_TRACKING_CATEGORY_SUCCESS,
  ASSET_TRACKING_CATEGORY_FAILED,
} from "../types";
import axios from "axios";

export const AssestTrackingAction = (token) => {
  return (dispatch) => {
    dispatch({
      type: ASSET_TRACKING_CATEGORY_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}asset/category/32`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          dispatch({
            type: ASSET_TRACKING_CATEGORY_SUCCESS,
            payload: response.data,
          });
          console.log(
            " ASSET_TRACKING_CATEGORY success---*****--=======>",
            response.data
          );
        })
        .catch(function (error) {
          console.log("ASSET_TRACKING_CATEGORY Error<<<<======", error);
        });
    } catch (error) {
      console.log("ASSET_TRACKING_CATEGORY  Error", error);
      dispatch({
        type: ASSET_TRACKING_CATEGORY_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
