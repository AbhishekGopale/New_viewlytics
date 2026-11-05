import {
  CHECK_IN_LOADING,
  CHECK_IN_SUCCESS,
  CHECK_IN_FAILED,
  CHECK_IN_CLEAR,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";
import { IsCheckInAction } from "./isCheckinAction";
import { CheckInOutAction } from "./checkInOutAction";
import { ErrorAction } from "./errorAction";
import { Alert } from "react-native";
import { FildVisitDetail } from "./fildVisitDetaisAction";
import { competitionBrandListAction } from "./competitionBrandListAction";
import { CategoryDataAction } from "./categoryListAction";
import { NewStockDataAction } from "./newStockListAction";
import { CompationAnalysisAction } from "./competitionAnalysisAction";
import { PromoListAction } from "./promoListAction";
import { ClosingStockDataAction } from "./closingStockListAction";
import { FormDisableAction } from "./formDisableAction";
import moment from "moment";
import { AssestCategoryAction } from "./assetTrackingDataAction";
import { AssestListAction } from "./assestListAction";
import { StoreDetails } from "./storeDetailsAction";
import { DaynamicFormAction } from "./dyanamicFromAction";
import { DistanceDigitAction } from "./distanceAction";

export const CheckInAction = (
  token,
  imgObj,
  navigation,
  id,
  currentLatitude,
  currentLongitude,
  name,
  details,
  isYes,
  isValue,
  ipAddress
) => {
  const currentDate = moment();

  const formattedDate = currentDate.format("YYYY-MM-DD");
  console.log(formattedDate, "formattedDate-----");
  return async (dispatch) => {
    dispatch({
      type: CHECK_IN_LOADING,
    });
    console.log("token", { token });
    try {
      let formData = new FormData();
      formData.append("store_id", id.toString());
      formData.append("image", imgObj);
      formData.append("check_in_lang", currentLatitude);
      formData.append("check_in_long", currentLongitude);
      formData.append("store_name", name);
      formData.append("purpose", details);
      formData.append("store_status", isYes);
      formData.append("merchandising", isValue);
      formData.append("ipAddress", ipAddress);

      let config = {
        method: "POST",
        maxBodyLength: Infinity,
        url: `${BASE_URL}checkin`,
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      };
      console.log(formData, "checkin Data Loading------");

      const response = await axios.request(config);
      console.log(
        "CHECK_IN_ success------",

        response.data.data.checkInResponse
      );
      console.log(
        "CHECK_IN_ success   ooooo------",
        response.data.data.checkInResponse.store_id
      );

      dispatch({
        type: CHECK_IN_SUCCESS,
        payload: response.data,
      });
      const storeId = id;
      console.log(storeId, "storeIdstoreId----");
      dispatch(competitionBrandListAction(token, id));
      dispatch(CategoryDataAction(token, navigation, storeId, formattedDate));
      dispatch(NewStockDataAction(token, formattedDate, storeId));
      dispatch(CompationAnalysisAction(token));
      dispatch(PromoListAction(token, id));
      dispatch(ClosingStockDataAction(token, formattedDate, storeId));
      dispatch(CategoryDataAction(token, navigation, storeId, formattedDate));
      dispatch(AssestListAction(token, id));
      dispatch(competitionBrandListAction(token, id));
      dispatch(AssestCategoryAction(token, id));
      dispatch(FormDisableAction(token, id));
      dispatch(FormDisableAction(token, id));
      dispatch(FildVisitDetail(token, id));
      dispatch(StoreDetails(token, id));
      dispatch(DaynamicFormAction(token));
      dispatch(DistanceDigitAction(token));

      setTimeout(() => {
        dispatch({
          type: CHECK_IN_CLEAR,
        });
      }, 1000);

      dispatch({
        type: IsCheckInAction,
        payload: true,
      });

      AsyncStorage.setItem(
        DB.STORE_ID,
        response.data.data.checkInResponse.store_id
      );

      AsyncStorage.setItem(
        DB.STORE_NAME,
        response.data.data.checkInResponse.store_name
      );
      AsyncStorage.setItem(
        DB.CHECK_IN_ID,
        JSON.stringify(response?.data?.data?.checkInResponse?.id)
      );

      dispatch(CheckInOutAction(token));

      const profileRole = await AsyncStorage.getItem(DB.USER_ROLL);
      console.log(profileRole, "profileRole-----------");

      (profileRole == "promoter" && isValue == "2") ||
      (profileRole == "merchandiser" && isValue == "2")
        ? navigation.navigate("DailyReporting")
        : navigation.goBack();
      profileRole == "tl" ? dispatch(FildVisitDetail(token, id)) : null;
    } catch (error) {
      console.log("CHECK_IN_FAILED failed*****", error);
      dispatch(
        ErrorAction(true, "Something went wrong, please try again later.")
      );
      dispatch({
        type: CHECK_IN_FAILED,
        payload: {
          error: "Something went wrong, please try again later.",
        },
      });
    }
  };
};
