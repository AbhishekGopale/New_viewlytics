import {
  IS_CHECKIN_DATA_LOADING,
  IS_CHECKIN_DATA_SUCCESS,
  IS_CHECKIN_DATA_FAILED,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";

export const IsCheckInAction = (data) => {
  return (dispatch) => {
    dispatch({
      type: IS_CHECKIN_DATA_LOADING,
    });
    console.log("IS_CHECKIN_DATA_LOADING respose=======>", response.data.data);

    try {
      dispatch({
        type: IS_CHECKIN_DATA_SUCCESS,
        payload: data,
      });
      AsyncStorage.setItem(DB.ISCHECKIN, JSON.stringify(data));
      console.log(
        "IS_CHECKIN_DATA_SUCCESS respose=======>",
        response.data.data
      );
    } catch (error) {
      console.log("IS_CHECKIN_DATA_FAILED faild*****", error);
      dispatch({
        type: IS_CHECKIN_DATA_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
