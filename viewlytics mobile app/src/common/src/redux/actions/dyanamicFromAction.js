import { BASE_URL_TWO } from "../../constants/constants";
import {
  DAYNAMIC_FORMS_FAILED,
  DAYNAMIC_FORMS_LOADING,
  DAYNAMIC_FORMS_SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";

export const DaynamicFormAction = (token) => {
  return (dispatch) => {
    dispatch({
      type: DAYNAMIC_FORMS_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL_TWO}project_settings_id`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          dispatch({
            type: DAYNAMIC_FORMS_SUCCESS,
            payload: response.data,
          });
          console.log(
            "DAYNAMIC_FORMS_sucess details =======-->",
            response.data,
            "forms--------"
          );
          AsyncStorage.setItem(
            DB.DAYNAMIC_FORMS_PRAMOTER_MER,
            JSON.stringify(response.data.data.report_names)
          );
        })
        .catch(function (error) {
          console.log("DAYNAMIC_FORMS_FAILEDError<<<<======", error);
          if (error.response.status == 404) {
            dispatch({
              type: DAYNAMIC_FORMS_SUCCESS,
              payload: [],
            });
          }
        });
    } catch (error) {
      console.log("DAYNAMIC_FORMS_FAILED  Error", error);
      dispatch({
        type: DAYNAMIC_FORMS_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
