import { BASE_URL } from "../../constants/constants";
import {
  STORE_LIST_LOADING,
  STORE_LIST_SUCCESS,
  STORE_LIST_FAILED,
} from "../types";
import axios from "axios";

export const StoreListAction = (token, navigation) => {
  return (dispatch) => {
    dispatch({
      type: STORE_LIST_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/checkin/storelist`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          console.log("StoreList", response.data.data);
          let notVerified = [];
          response?.data?.data?.store?.filter((element) => {
            console.log("element", element);
            if (element.verified == "0") {
              notVerified.push(element);
            }
          });
          console.log({ notVerified });
          dispatch({
            type: STORE_LIST_SUCCESS,
            payload: {
              allStore: response.data.data,
              notVerified: notVerified,
            },
          });
          // navigation.navigate("CheckInScreen");
        })
        .catch(function (error) {
          console.log("store list Error", error);
        });
    } catch (error) {
      console.log("store list Error_SUCCESS Error", error);
      dispatch({
        type: STORE_LIST_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
