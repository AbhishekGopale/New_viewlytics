import {
  OFFLINE_COMPETITIONDATA_LOADING,
  OFFLINE_COMPETITIONDATA__FAILED,
  OFFLINE_COMPETITIONDATA__SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL_TWO } from "../../constants/constants";
import { DB } from "../../database";
import { ErrorAction } from "./errorAction";
import { Alert } from "react-native";

export const OfflineCompetitionBrandAction = () => {
  return async (dispatch) => {
    dispatch({
      type: OFFLINE_COMPETITIONDATA_LOADING,
    });

    try {
      const token = await AsyncStorage.getItem(DB.TOKEN);
      console.log(token, "token=======------");
      const storeId = await AsyncStorage.getItem(DB.STORE_ID);
      console.log(storeId, "storeId=======------");
      const avilables = await AsyncStorage.getItem(
        DB.COMPETITION_BRAND_AVAILABLE
      );
      const avilable = JSON.parse(avilables);
      const Persons = await AsyncStorage.getItem(DB.COMPETITION_BRAND_PERSON);
      const Person = JSON.parse(Persons);

      const dropDowns = await AsyncStorage.getItem(
        DB.COMPETITION_BRAND_DROPDOWN
      );
      const dropDown = JSON.parse(dropDowns);

      const names = await AsyncStorage.getItem(DB.COMPETITION_BRAND_NAME);
      const name = JSON.parse(names);

      const visibilitys = await AsyncStorage.getItem(
        DB.COMPETITION_BRAND_VISIBILITY
      );
      const visibility = JSON.parse(visibilitys);

      const payouts = await AsyncStorage.getItem(DB.COMPETITION_BRAND_PAYOUT);
      const payout = JSON.parse(payouts);

      const data = JSON.stringify({
        store_id: storeId,
        brand_remark: name,
        brand_available: avilable,
        brand_id: dropDown,
        brand_person: Person,
        brand_visibility: visibility,
        pay_out: payout,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL_TWO}/offline/competition_brand`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      console.log(data, "data");
      const response = await axios.request(config);
      console.log(response.data, "response=============------");
      dispatch({
        type: OFFLINE_COMPETITIONDATA__SUCCESS,
        payload: response.data,
      });
      await AsyncStorage.removeItem(DB.COMPETITION_BRAND_AVAILABLE);
      await AsyncStorage.removeItem(DB.COMPETITION_BRAND_VISIBILITY);
      await AsyncStorage.removeItem(DB.COMPETITION_BRAND_PAYOUT);
      await AsyncStorage.removeItem(DB.COMPETITION_BRAND_PERSON);
      await AsyncStorage.removeItem(DB.COMPETITION_BRAND_NAME);
      await AsyncStorage.removeItem(DB.COMPETITION_BRAND_DROPDOWN);
    } catch (error) {
      console.log("OFFLINE_COMPETITIONDATA__FAILED", error);
      Alert.alert("Competition Brand not sync");
      dispatch({
        type: OFFLINE_COMPETITIONDATA__FAILED,
        payload: {
          error: "Something went wrong, please try again later.",
        },
      });
    }
  };
};
