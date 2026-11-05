import { BASE_URL } from "../../constants/constants";
import {
  IN_APP_NOTIFICATION_LOADING,
  IN_APP_NOTIFICATION_SUCCESS,
} from "../types";
import axios from "axios";
import { IN_APP_NOTIFICATION_FAILED } from "../types/index";

export const InAppNotification = (fcmToken, msg) => {
  console.log("fcmTokenAction", fcmToken, msg);
  return (dispatch) => {
    dispatch({
      type: IN_APP_NOTIFICATION_LOADING,
    });
    try {
      let data = JSON.stringify({
        to: fcmToken,
        notification: {
          id: 1,
          sound: "default",
          body: msg,
          title: msg,
          image:
            "https://cdn.shopify.com/s/files/1/0266/6276/4597/collections/Lipstick_1920x1054_55db6ded-4f87-4a81-966b-cd8d3616ea5f.jpg?v=1618835042",
          content_available: true,
          priority: "high",
          isCollection: true,
          collectionId: 159122030645,
          isProduct: false,
          handle: "studiowest-creme-lipstick-cpr-03-4-2-gm",
          sku: 300773236001,
          productId: 4498131320885,
        },
        data: {
          id: 1,
          sound: "default",
          body: msg,
          title: msg,
          image:
            "https://cdn.shopify.com/s/files/1/0266/6276/4597/collections/Lipstick_1920x1054_55db6ded-4f87-4a81-966b-cd8d3616ea5f.jpg?v=1618835042",
          content_available: true,
          priority: "high",
          isCollection: true,
          collectionId: 159122030645,
          isProduct: false,
          handle: "studiowest-creme-lipstick-cpr-03-4-2-gm",
          sku: 300773236001,
          productId: 4498131320885,
        },
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://fcm.googleapis.com/fcm/send",
        headers: {
          Authorization:
            "key=AAAA5qUO5yE:APA91bHvus1mw-qADnhiQpjEUFtSkl9nw7gzhTLtJSxdxxh1e9DpFG35kTYbriAQtHNTjuwLHOy74LW2zDJf5ZK-Jd8n0luIsYhhepundpnhO1jlcoNBrxvwLHENe2jFZMcVm65Bqlco",
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("ASSET_LIST Error", error);
      dispatch({
        type: IN_APP_NOTIFICATION_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
