import { BASE_URL } from "../../constants/constants";
import { timeCalculate } from "../../utilities/utilities";
import {
  GET_ALL_LEAVES_FAILED,
  GET_ALL_LEAVES_LOADING,
  GET_ALL_LEAVES_SUCCESS,
} from "../types";
import axios from "axios";

export const GetAllLeavesAction = (token) => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_LEAVES_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/leave/get`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          let leaves = response.data.data.Leaves;

          let newArray = [];
          leaves?.forEach((element) => {
            let data = timeCalculate(element?.created_at);
            console.log("element=====Data", element, data);
            element["displayTime"] = data;
            newArray.push({
              ...element,
            });
          });
          console.log("newArray=========>", newArray);
          dispatch({
            type: GET_ALL_LEAVES_SUCCESS,
            payload: newArray,
          });

          console.log("GET_ALL_Leave_SUCCESS respose", response.data.data);
        })
        .catch(function (error) {
          console.log("GET_ALL_NOTIFICATION_SUCCESS Error", error);
        });
    } catch (error) {
      console.log("GET_ALL_NOTIFICATION_SUCCESS Error", error);
      dispatch({
        type: GET_ALL_LEAVES_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
