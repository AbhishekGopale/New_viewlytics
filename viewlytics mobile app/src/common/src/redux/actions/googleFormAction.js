import { BASE_URL } from "../../constants/constants";
import {
  GOOGLE_FORM_LOADING,
  GOOGLE_FORM_SUCCESS,
  GOOGLE_FORM_FAILED,
} from "../types";
import axios from "axios";

export const GoogleEFormAction = (token) => {
  return (dispatch) => {
    dispatch({
      type: GOOGLE_FORM_LOADING,
    });
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}v2/google_form`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          dispatch({
            type: GOOGLE_FORM_SUCCESS,
            payload: response.data.data,
          });
          console.log(
            "GOOGLE_FORM_SUCCESS respose=======>",
            response.data.data
          );
        })
        .catch(function (error) {
          console.log("GOOGLE_FORM_SUCCESS Error<<<<======", error);
        });
    } catch (error) {
      console.log("GOOGLE_FORM_SUCCESS Error", error);
      dispatch({
        type: GOOGLE_FORM_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
