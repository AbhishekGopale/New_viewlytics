import {
  MEETING_DATA_LOADING,
  MEETING_DATA_SUCCESS,
  MEETING_DATA_FAILED,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";
import { Alert } from "react-native";
import { ErrorAction } from "./errorAction";

export const MeetingAction = (
  token,
  valueMeeting,
  value,
  formattedTime,
  formattedendTime,
  duration,
  text,
  navigation
) => {
  return (dispatch) => {
    dispatch({
      type: MEETING_DATA_LOADING,
    });
    try {
      //   let data = JSON.stringify({
      //     form: formData,
      //   });
      let data = JSON.stringify({
        meeting_type: valueMeeting,
        meeting_agenda: value,
        meeting_start: formattedTime,
        meeting_end: formattedendTime,
        total_hour: duration,
        meeting_minutes: text,
      });
      console.log("dataaaaaaa", data);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/meeting`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      console.log("Meeting --------====>Data", data);

      axios
        .request(config)
        .then((response) => {
          console.log("Meeting Data<<<<<<<=====>", response.data);
          dispatch({
            type: MEETING_DATA_SUCCESS,
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
          // dispatch(ErrorAction(true, "meeting work"));
        })
        .catch((error) => {
          console.log("Meeting Data failed", error);
          dispatch(ErrorAction(true, error.message));
        });
    } catch (error) {
      console.log("Meeting Data failed", error);
      dispatch({
        type: MEETING_DATA_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
