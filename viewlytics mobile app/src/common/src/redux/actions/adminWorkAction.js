import {
  ADMIN_WORK_LOADING,
  ADMIN_WORK_SUCCESS,
  ADMIN_WORK_FAILED,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";
import { ErrorAction } from "./errorAction";
import { Alert } from "react-native";

export const AdminWorkAction = (
  token,
  valueMeeting,
  value,
  formattedTime,
  formattedendTime,
  durations,
  text,
  navigation
) => {
  return (dispatch) => {
    dispatch({
      type: ADMIN_WORK_LOADING,
    });
    try {
      //   let data = JSON.stringify({
      //     form: formData,
      //   });

      let data = JSON.stringify({
        work_type: valueMeeting,
        report_detailed_name: value,
        meeting_start: formattedTime,
        meeting_end: formattedendTime,
        total_hour: durations,
        what_is_done: text,
      });
      console.log("dataaaaaaa", data);
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/adminWork_meeting`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      console.log("Admin Work Detailsc", data);

      axios
        .request(config)
        .then((response) => {
          console.log("Admin Work  Details", response.data);
          dispatch({
            type: ADMIN_WORK_SUCCESS,
            payload: response.data,
          });
          Alert.alert(
            "successful",
            "Data is submitted successfully.",
            [
              {
                text: "OK",
                onPress: () => {
                  navigation.goBack();
                },
              },
            ],
            { cancelable: false }
          );
          // dispatch(ErrorAction(true, "admin work"));
        })
        .catch((error) => {
          console.log(error);
          dispatch(ErrorAction(true, error.message));
        });
    } catch (error) {
      console.log("Admin Work failed", error);
      dispatch({
        type: ADMIN_WORK_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
