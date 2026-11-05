import { BASE_URL } from "../../constants/constants";
import {
  COMPETITION_ANALYSIS_LOADING,
  COMPETITION_ANALYSIS_SUCCESS,
  COMPETITION_ANALYSIS_FAILED,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";

export const CompationAnalysisAction = (token, navigation) => {
  return (dispatch) => {
    dispatch({
      type: COMPETITION_ANALYSIS_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}activation/list`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          dispatch({
            type: COMPETITION_ANALYSIS_SUCCESS,
            payload: response.data,
          });
          console.log(
            " Compation Anlisis Details success---*****--=======>",
            response.data.data
          );
          AsyncStorage.setItem(
            DB.INELIGINCE_DATA,
            JSON.stringify(response.data.data)
          );
        })
        .catch(function (error) {
          console.log("Compation AnlisisDetails Error<<<<======", error);
        });
    } catch (error) {
      console.log("Compation Anlisis  Error", error);
      dispatch({
        type: COMPETITION_ANALYSIS_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
