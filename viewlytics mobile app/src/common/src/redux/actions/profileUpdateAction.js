import {
  PROFILE_UPDATE_LOADING,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILED,
  PROFILE_UPDATE_CLEAR,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";
import { MyProfileDetilsAction } from "./myProfileAction";

export const ProfileUpdateAction = (token, imgObj, navigation) => {
  return (dispatch) => {
    dispatch({
      type: PROFILE_UPDATE_LOADING,
    });
    try {
      var FormData = require("form-data");
      let data = new FormData();
      data.append("image", imgObj);

      let config = {
        method: "POST",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/profile/update`,
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };
      console.log("Config==========>", config);
      axios
        .request(config)
        .then((response) => {
          console.log("PROFILE_UPDATE sucesss------", response);
          dispatch(MyProfileDetilsAction(token));
          dispatch({
            type: PROFILE_UPDATE_SUCCESS,
            payload: response.data,
          });
          setTimeout(() => {
            dispatch({
              type: PROFILE_UPDATE_CLEAR,
            });
          }, 1000);
          navigation.goBack();
        })
        .catch((error) => {
          console.log("Profile upload Error", error);
        });
    } catch (error) {
      console.log("PROFILE_UPDATE_FAILED faild*****", error);
      dispatch({
        type: PROFILE_UPDATE_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
