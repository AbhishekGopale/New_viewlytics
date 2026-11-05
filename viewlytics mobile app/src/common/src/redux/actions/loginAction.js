import { LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_FAILED } from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";
import { IsUserLogin } from "./isLoginAction";
import { LoginArray } from "./loginArrayAction";
import { PushNotificationAction } from "./pushNotificationAction";

export const UserLogin = (
  email,
  password,
  navigation,
  deviceType,
  deviceId,
  ipAddresss,
  currentLatitudes,
  currentLongitudes
) => {
  console.log("deviceIdAction====", deviceId);
  return (dispatch) => {
    dispatch({
      type: LOGIN_LOADING,
    });
    try {
      let data = JSON.stringify({
        email: email.toLowerCase(),
        password: password,
        ipAddress: ipAddresss,
        check_out_lang: currentLatitudes,
        check_out_long: currentLongitudes,
      });
      console.log("Data", data);
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log("login Done !!!!", response.data.data);
          let data = response?.data?.data;
          let token = data?.token;
          let userId = data?.id;
          let ProfileRoll = data?.role_name;
          console.log({ ProfileRoll }, "----------");
          AsyncStorage.setItem(DB.USER_ROLL, ProfileRoll);
          AsyncStorage.setItem(DB.TOKEN, response.data.data.token);
          // AsyncStorage.setItem(DB.TOKEN, response.data.data.token);
          dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data,
          });
          dispatch(LoginArray(response.data));
          dispatch(IsUserLogin(true));
          //  dispatch(setToken(`Bearer ${response.data.token}`));
          AsyncStorage.setItem(DB.ISLOGIN, "true");

          const getFcmToken = async () => {
            AsyncStorage.getItem(DB.FCM_TOKEN)
              .then((data) => {
                AsyncStorage.setItem(DB.data);
                let fcmToken = data;
                console.log({ fcmToken }, "------");
                dispatch(
                  PushNotificationAction(
                    token,
                    fcmToken,
                    userId,
                    deviceType,
                    deviceId
                  )
                );
              })
              .catch((e) => {
                console.log(e);
              });
          };
          getFcmToken();

          // setTimeout(() => {
          //   navigation.navigate("HomeScreen");
          // }, 100);
        })
        .catch((error) => {
          console.log("LoginError", error.response.data.errors.error);
          dispatch({
            type: LOGIN_FAILED,
            payload: {
              error: error.response.data.errors.error,
            },
          });
        });
    } catch (error) {
      console.log("loginError", error);
      dispatch({
        type: LOGIN_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
