import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import {
  MY_PROFILE_FAILED,
  MY_PROFILE_LOADING,
  MY_PROFILE_SUCCESS,
} from "../types";
import axios from "axios";
import { DB } from "../../database";

export const MyProfileDetilsAction = (token) => {
  return (dispatch) => {
    dispatch({
      type: MY_PROFILE_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}profile`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          dispatch({
            type: MY_PROFILE_SUCCESS,
            payload: response.data,
          });
          console.log("MY_PROFILE_SUCCESS respose", response.data);
          AsyncStorage.setItem(
            DB.USERID,
            response.data.data?.userProfile?.id.toString()
          );
        })
        .catch(function (error) {
          console.log("MY_PROFILE_SUCCESS Error", error);
        });
    } catch (error) {
      console.log("MY_PROFILE_SUCCESS Error", error);
      dispatch({
        type: MY_PROFILE_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
