import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_ARRAY_LOADING,
  LOGIN_ARRAY_SUCCESS,
  LOGIN_ARRAY_FAILED,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";
import { IsUserLogin } from "./isLoginAction";

export const LoginArray = (data) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_ARRAY_LOADING,
    });
    try {
      dispatch({
        type: LOGIN_ARRAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log("loginError", error);
      dispatch({
        type: LOGIN_ARRAY_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
