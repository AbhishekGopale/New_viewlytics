import { ISLOGIN_LOADING, ISLOGIN_SUCCESS, ISLOGIN_FAILED } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";

export const IsUserLogin = (isLogin) => {
  console.log("IsLogin Dispatched", isLogin);
  return (dispatch) => {
    dispatch({
      type: ISLOGIN_LOADING,
    });
    try {
      dispatch({
        type: ISLOGIN_SUCCESS,
        payload: isLogin,
      });

      AsyncStorage.setItem(DB.ISLOGIN, JSON.stringify(isLogin));
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: ISLOGIN_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
