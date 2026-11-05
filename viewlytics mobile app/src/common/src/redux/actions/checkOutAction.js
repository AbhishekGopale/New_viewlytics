import {
  CHECK_OUT_SUCCESS,
  CHECK_OUT_LOADING,
  CHECK_OUT_FAILED,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";
import { CheckInOutAction } from "./checkInOutAction";
import { InAppNotification } from "./InAppNotification";

export const CheckOutAction = (
  checkInId,
  token,
  formattedTime,
  currentLatitudes,
  currentLongitudes,
  // currentAddress,
  ipAddresss
) => {
  console.log("CheckoutAction=====", checkInId, formattedTime, token);
  return (dispatch) => {
    dispatch({
      type: CHECK_OUT_LOADING,
    });
    try {
      let data = JSON.stringify({
        check_out_time: formattedTime,
        check_out_lang: currentLatitudes,
        check_out_long: currentLongitudes,
        // check_out_address: currentAddress,
        ipAddress: ipAddresss,
      });
      console.log("time", data);
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/checkout/${checkInId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      console.log("checkout data===>", config);
      axios
        .request(config)
        .then((response) => {
          console.log("check out data ===>", response.data);
          dispatch(CheckInOutAction(token));

          // let msg = response?.data?.message;
          console.log(token, "tokennnnnnn==============================0-----");
          AsyncStorage.removeItem(DB.USER_CHECK_IN_ID);
          dispatch({
            type: CHECK_OUT_SUCCESS,
            payload: response.data,
          });
          AsyncStorage.removeItem(DB.STORE_ID);
          AsyncStorage.removeItem(DB.CHECK_IN_TIME);
          AsyncStorage.removeItem(DB.STORE_DETAILS);
          AsyncStorage.removeItem(DB.CATEGORY_DATA);
          AsyncStorage.removeItem(DB.NEWSTOCK_DATA);
          AsyncStorage.removeItem(DB.NEWSTOCK_DATA_FILTERED);
          AsyncStorage.removeItem(DB.INELIGINCE_DATA);
          AsyncStorage.removeItem(DB.PROMO_DATA);
          AsyncStorage.removeItem(DB.CLOSING_DATA);
          AsyncStorage.removeItem(DB.OOSREPORT_DATA);
          AsyncStorage.removeItem(DB.ASSETLIST_DATA);
          AsyncStorage.removeItem(DB.OFFLINE_OPENING_INV);
          AsyncStorage.removeItem(DB.OFFLINE_OPENING_INV_FILTERED_ARR);
          AsyncStorage.removeItem(DB.OFFLINE_OPENING_INV_REMARK);
          AsyncStorage.removeItem(DB.OFFLINE_FORM_STATUS);
          AsyncStorage.removeItem(DB.OPENING_STOCK_FORM);
          AsyncStorage.removeItem(DB.CLOSING_STOCK_FORM);
          AsyncStorage.removeItem(DB.ALL_STOCK_FORM);
          AsyncStorage.removeItem(DB.OFFLINE_NEW_STOCK_REMARK);
          AsyncStorage.removeItem(DB.OFFLINE_CLOSING_STOCK_REMARK);
          AsyncStorage.removeItem(DB.CREATE_ASSEST);
          AsyncStorage.removeItem(DB.SHOPPER_ENGEGMENTDATA);
          AsyncStorage.removeItem(DB.APPROCH_PEOPLE);
          AsyncStorage.removeItem(DB.INTELIGNCE_CATEGORY_NAME);
          AsyncStorage.removeItem(DB.INTELIGNCE_BRAND_NAME);
          AsyncStorage.removeItem(DB.INTELIGNCE_COMPETION_NAME);
          AsyncStorage.removeItem(DB.INTELIGNCE_IMAGE);
          AsyncStorage.removeItem(DB.INTELIGNCE_VALUE_DROPDOWN);
          AsyncStorage.removeItem(DB.SOS_OFFLINE_DATA);
          AsyncStorage.removeItem(DB.OOS_DATA_OFFLINE);
          AsyncStorage.removeItem(DB.OOS_INV_REMARK);
          AsyncStorage.removeItem(DB.PROMO_OFFLINE_DATA);
          AsyncStorage.removeItem(DB.OFFLINE_CLOSING_FORM_DATA);
          AsyncStorage.removeItem(DB.OFFLINE_OPENING);
          AsyncStorage.removeItem(DB.OFFLINE_NEWSTOCK);
          AsyncStorage.removeItem(DB.COMPETION_DISCRIPTION);

          AsyncStorage.removeItem(DB.COMPETITION_BRAND_LIST);
          AsyncStorage.removeItem(DB.COMPETITION_BRAND_AVAILABLE);
          AsyncStorage.removeItem(DB.COMPETITION_BRAND_PERSON);
          AsyncStorage.removeItem(DB.COMPETITION_BRAND_VISIBILITY);
          AsyncStorage.removeItem(DB.COMPETITION_BRAND_PAYOUT);
          AsyncStorage.removeItem(DB.COMPETITION_BRAND_DROPDOWN);
          AsyncStorage.removeItem(DB.COMPETITION_BRAND_NAME);
          AsyncStorage.removeItem(DB.FILD_VISIT_LIST);
          AsyncStorage.removeItem(DB.MEETING_DROPDOWN);
          AsyncStorage.removeItem(DB.MEETING_DETALIED_NAME);
          AsyncStorage.removeItem(DB.MEETING_TIME_FRIST);
          AsyncStorage.removeItem(DB.MEETING_TIME_SECOND);
          AsyncStorage.removeItem(DB.MEETING_TIME_DURATION);
          AsyncStorage.removeItem(DB.MEETING_DESCRIPTION_DATA);
          AsyncStorage.removeItem(DB.ADMINWORK_DROPDOWN);
          AsyncStorage.removeItem(DB.ADMINWORK_DETALIED_NAME);
          AsyncStorage.removeItem(DB.ADMINWORK_TIME_FRIST);
          AsyncStorage.removeItem(DB.ADMINWORK_TIME_SECOND);
          AsyncStorage.removeItem(DB.ADMINWORK_TIME_DURATION);
          AsyncStorage.removeItem(DB.ADMINWORK_DESCRIPTION_DATA);
          AsyncStorage.removeItem(DB.FIELD_VISIT_CREATE_DATA);
          AsyncStorage.removeItem(DB.MERCHANDISING_CATEGORY);
          AsyncStorage.removeItem(DB.MERCHANDISING_CATIMG_ONE);
          AsyncStorage.removeItem(DB.MERCHANDISING_CATIMG_TWO);
          AsyncStorage.removeItem(DB.MERCHANDISING_CATIMG_THREE);
          AsyncStorage.removeItem(DB.MERCHANDISING_CATIMG_FOUR);
          AsyncStorage.removeItem(DB.MERCHANDISING_ASSEST_TYPE);
          AsyncStorage.removeItem(DB.MERCHANDISING_ASSEST_LIST);
          AsyncStorage.removeItem(DB.MERCHANDISING_ASSEST_IMPLEMENTED);
          AsyncStorage.removeItem(DB.MERCHANDISING_IMPLEMENTED_IMAGES);
          AsyncStorage.removeItem(DB.MERCHANDISING_IMPLEMENTED_REMARK);
          AsyncStorage.removeItem(DB.STORE_NAME);
          AsyncStorage.removeItem(DB.ASSET_CATEGORY_LIST);
          AsyncStorage.removeItem(DB.ASSET_CREATE_DATA_ARRAY);
        })
        .catch((error) => {
          console.log("Failed=====checkout", error);
        });
    } catch (error) {
      console.log("check Out  fail===>", error);
      dispatch({
        type: CHECK_OUT_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
