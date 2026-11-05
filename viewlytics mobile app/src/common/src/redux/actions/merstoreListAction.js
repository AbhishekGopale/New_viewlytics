import { BASE_URL, BASE_URL_TWO } from "../../constants/constants";
import {
  MERSTORE_LIST_FAILED,
  MERSTORE_LIST_LOADING,
  MERSTORE_LIST_SUCCESS,
} from "../types";
import axios from "axios";

export const MerStoreListAction = (token, navigation) => {
  return (dispatch) => {
    dispatch({
      type: MERSTORE_LIST_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL_TWO}/checkin/storelist`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          console.log("StoreList", response.data.data);
          let notVerified = [];
          response?.data?.data?.store?.plannedStore?.filter((element) => {
            console.log("element", element);
            if (element.verified == "0") {
              notVerified.push(element);
            }
          });
          response?.data?.data?.store?.unPlannedStores?.filter((element) => {
            console.log("element", element);
            if (element.verified == "0") {
              notVerified.push(element);
            }
          });
          console.log({ notVerified });
          dispatch({
            type: MERSTORE_LIST_SUCCESS,
            payload: {
              allStore: response.data.data,
              notVerified: notVerified,
            },
          });
        })
        .catch(function (error) {
          console.log("store list Error", error);
        });
    } catch (error) {
      console.log("store list Error_SUCCESS Error", error);
      dispatch({
        type: MERSTORE_LIST_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
