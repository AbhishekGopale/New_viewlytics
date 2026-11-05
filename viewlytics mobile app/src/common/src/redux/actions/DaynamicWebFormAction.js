import { BASE_URL_TWO } from "../../constants/constants";
import {
  DAYNAMIC_WEB_FORMS_FAILED,
  DAYNAMIC_WEB_FORMS_LOADING,
  DAYNAMIC_WEB_FORMS_SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";

export const DaynamicWebFormAction = (token) => {
  return (dispatch) => {
    dispatch({
      type: DAYNAMIC_WEB_FORMS_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL_TWO}custom_form`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          dispatch({
            type: DAYNAMIC_WEB_FORMS_SUCCESS,
            payload: response.data,
          });
          console.log(
            "DAYNAMIC_WEB_FORMS_sucess details =======-->",
            response.data,
            "forms--------"
          );
        })
        .catch(function (error) {
          console.log("DAYNAMIC_WEB_FORMS_FAILEDError<<<<======", error);
          if (error.response.status == 404) {
            dispatch({
              type: DAYNAMIC_WEB_FORMS_FAILED,
              payload: [],
            });
          }
        });
    } catch (error) {
      console.log("DAYNAMIC_WEB_FORMS_FAILED  Error", error);
      dispatch({
        type: DAYNAMIC_FORMS_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
