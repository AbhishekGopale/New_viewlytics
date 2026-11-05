import { BASE_URL } from "../../constants/constants";
import {
  REMOVE_ACCOUNT_FAILED,
  REMOVE_ACCOUNT_LOADING,
  REMOVE_ACCOUNT_SUCCESS,
} from "../types";
import axios from "axios";
import { DB } from "../../database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginArray } from "./loginArrayAction";

export const RemoveAccount = (token, navigation) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_ACCOUNT_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}removeaccount`,
        headers: {
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          dispatch({
            type: REMOVE_ACCOUNT_SUCCESS,
            payload: response.data.data,
          });
          AsyncStorage.removeItem(DB.ISLOGIN);
          dispatch(LoginArray([]));
          navigation.reset({
            index: 0,
            routes: [{ name: "LoginRouter" }],
          });
          console.log("REMOVE_ACCOUNT_SUCCESS respose", response.data.data);
        })
        .catch(function (error) {
          console.log("REMOVE_ACCOUNT_SUCCESS Error", error);
        });
    } catch (error) {
      console.log("REMOVE_ACCOUNT_SUCCESS Error", error);
      dispatch({
        type: REMOVE_ACCOUNT_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
