import { BASE_URL } from "../../constants/constants";
import {
  OPENING_DATA_LOADING,
  OPENING_DATA_SUCCESS,
  OPENING_DATA_FAILED,
} from "../types";
import axios from "axios";

export const OpeningInventoryAction = (token, navigation, id) => {
  return (dispatch) => {
    dispatch({
      type: OPENING_DATA_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/inventory/skuname/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          // console.log("OPENING_DATA", response.data);
          dispatch({
            type: OPENING_DATA_SUCCESS,
            payload: response.data,
          });
        })
        .catch(function (error) {
          console.log("OPENING_DATA_ Error", error);
        });
    } catch (error) {
      console.log("OPENING_DATA_FAILED Error", error);
      dispatch({
        type: OPENING_DATA_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
