import React, { useEffect } from "react";
import { PermissionsAndroid, Platform, View } from "react-native";
import messaging from "@react-native-firebase/messaging";
import PushNotification, { Importance } from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../database";

const index = (props) => {
  console.log("notification Called");
  async function requestUserPermission() {
    let authStatus = false;
    if (Platform.OS === "android") {
      console.log("ask Permission Notification");
      authStatus = await PermissionsAndroid.request(
        "android.permission.POST_NOTIFICATIONS"
      );
      console.log("authStatus", authStatus);
    } else {
      authStatus = await messaging().requestPermission();
      console.log("fcmIos====");
    }

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (Platform.OS == "android") {
      const fcmToken = await messaging().getToken();
      console.log("fcmToken", fcmToken);
      await AsyncStorage.setItem(DB.FCM_TOKEN, fcmToken);
      await PushNotification.configure({
        onNotification: function (notification) {
          onNotificationReceive(notification);

          if (Platform.OS == "ios") {
            notification.finish(PushNotificationIOS.FetchResult.NoData);
          }

          if (notification.userInteraction) {
            //When user click on notification then he is here
            onPressNotification(notification.data);
          }
          //  dispatch(vendorHome(VendorInfoParam, true, false));
        },
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
        popInitialNotification: true,
        requestPermissions: true,
      });
    } else if (enabled || authStatus == "granted") {
      const fcmToken = await messaging().getToken();
      console.log("fcmToken", fcmToken);
      await AsyncStorage.setItem(DB.FCM_TOKEN, fcmToken);
      await PushNotification.configure({
        onNotification: function (notification) {
          onNotificationReceive(notification);

          if (Platform.OS == "ios") {
            notification.finish(PushNotificationIOS.FetchResult.NoData);
          }

          if (notification.userInteraction) {
            //When user click on notification then he is here
            onPressNotification(notification.data);
          }
          //  dispatch(vendorHome(VendorInfoParam, true, false));
        },
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
        popInitialNotification: true,
        requestPermissions: true,
      });
    }
  }

  const onNotificationReceive = async (notification) => {};

  const onPressNotification = async (data) => {};

  useEffect(() => {
    requestUserPermission();

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (Platform.OS == "ios") {
        PushNotificationIOS.addNotificationRequest({
          id: remoteMessage.messageId,
          body: remoteMessage.notification.body,
          title: remoteMessage.notification.title,
          userInfo: remoteMessage.data,
        });
      } else {
        PushNotification.localNotification({
          // / Android Only Properties /
          channelId: "channel-id-idonneous", // (required) channelId, if the channel doesn't exist, notification will not trigger.
          //   ticker: 'vendor', // (optional)
          showWhen: true, // (optional) default: true
          autoCancel: true, // (optional) default: true
          smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.

          vibrate: true, // (optional) default: true
          vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
          color: "#239B56",
          ongoing: false, // (optional) set whether this is an "ongoing" notification
          priority: "high", // (optional) set notification priority, default: high
          visibility: "private", // (optional) set notification visibility, default: private
          ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
          onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false

          // / iOS only properties /
          category: "", // (optional) default: empty string

          // / iOS and Android properties /
          id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
          title: remoteMessage.notification.title, // (optional)
          message: remoteMessage.notification.body, // (required)
          userInfo: remoteMessage.data, // (optional) default: {} (using null throws a JSON value '<null>' error)
          // largeIconUrl: remoteMessage.data.image,
          // bigPictureUrl: remoteMessage.data.image,
          playSound: true, // (optional) default: true
          soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        });
      }
      return unsubscribe;
    });
    messaging().onNotificationOpenedApp((remoteMessage) => {
      //   'Notification caused app to open from background state:',
      //   remoteMessage,
      // );
      // onNotificationPress(remoteMessage);
      onPressNotification(remoteMessage.data);
      // navigation.push(remoteMessage.data.type);
    });
  }, []);

  return null;
  // return <View></View>;
};

export default index;
