import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import {
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_LOADING,
  CHANGE_PASSWORD_SUCCESS,
} from "../types";
import axios from "axios";
import { DB } from "../../database";

export const changePassword = (
  old_password,
  new_password,
  confirm_password,
  navigation,
  token
) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_PASSWORD_LOADING,
    });
    try {
      let data = JSON.stringify({
        current_password: old_password,
        password: new_password,
        confirmPassword: confirm_password,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/profileresetpass`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };

      console.log("ChangePasswordData", data, token);

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          dispatch({
            type: CHANGE_PASSWORD_SUCCESS,
            payload: response.data,
          });
          AsyncStorage.removeItem(DB.ISLOGIN);
          navigation.reset({
            index: 0,
            routes: [{ name: "LoginRouter" }],
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: CHANGE_PASSWORD_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
