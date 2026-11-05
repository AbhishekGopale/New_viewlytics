import { BASE_URL } from "../../constants/constants";
import { LOGOUT_LOADING, LOGOUT_SUCCESS, LOGOUT_FAILED } from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";

export const UserLogout = (token, navigation) => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_LOADING,
    });
    try {
      var config = {
        method: "get",
        url: `${BASE_URL}logout`,
        headers: {
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          dispatch({
            type: LOGOUT_SUCCESS,
            payload: response.data,
          });
          navigation.reset({
            index: 0,
            routes: [{ name: "LoginRouter" }],
          });
          AsyncStorage.removeItem(DB.STORE_ID);
        })
        .catch(function (error) {
          console.log("Logout Error", error);
        });
    } catch (error) {
      console.log("Logout Error", error);
      dispatch({
        type: LOGOUT_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
