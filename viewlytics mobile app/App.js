import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Alert,
  Linking,
  AppState,
  LogBox,
} from "react-native";
LogBox.ignoreAllLogs(true);
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { store } from "./src/common/src/redux/store";
import LoginRouter from "./src/common/src/routes/LoginRouter/LoginRoute";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS } from "./src/common/src/colors/colors";
import Notification from "./src/common/src/Notification/index";
const Stack = createNativeStackNavigator();
import NetInfo from "@react-native-community/netinfo";
import { checkVersion } from "react-native-check-version";
import messaging from "@react-native-firebase/messaging";
import PushNotification, { Importance } from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import OfflineScreen from "./src/common/src/components/OfflineScreen/OfflineScreen";
import OfflineDashboard from "./src/common/src/screens/OfflineDashboard/OfflineDashboard";
import OfflineRouter from "./src/common/src/routes/OfflineRouter/OfflineRouter";
PushNotification.createChannel({
  channelId: "channel-id-idonneous", // (required)
  channelName: "My channel", // (required)
  channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
  playSound: false, // (optional) default: true
  soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
  importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
  vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
});
PushNotification.configure({
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    if (Platform.OS == "ios") {
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    }
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
  popInitialNotification: true,
  requestPermissions: true,
});

messaging().setBackgroundMessageHandler(async (remoteMessage) => {});

const App = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

  const handleAppStateChange = (nextAppState) => {
    if (appState.match(/inactive|background/) && nextAppState === "active") {
      checkForUpdates();
    }

    setAppState(nextAppState);
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", handleAppStateChange);

    checkForUpdates();

    return () => {
      subscription?.remove();
    };
  }, []);

  const openPlayStore = (url) => {
    Alert.alert(
      "New version is now available",
      "The latest version of the application is now available. Please proceed to install the updates and commence utilizing the application",
      [
        // {
        //   text: "Cancel",
        //   style: "cancel",
        // },
        {
          text: "Open",
          onPress: () => {
            Linking.canOpenURL(url)
              .then((supported) => {
                if (supported) {
                  return Linking.openURL(url);
                } else {
                  console.warn("Cannot open Play Store");
                }
              })
              .catch((error) =>
                console.error("Error opening Play Store:", error)
              );
          },
        },
      ]
    );
  };

  const checkForUpdates = async () => {
    const version = await checkVersion();
    console.log("Got version info:", version);
    if (version.needsUpdate) {
      console.log(`App has a ${version.updateType} update pending.`);
      openPlayStore(version.url);
    }
    console.log(`App has a ${version.updateType} update pending.`);
  };
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected);
      if (state.isConnected == false) {
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  window.saveAllData = () => {
    console.log("Data saved successfully!");
  };

  return (
    <>
      <Notification />
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <StatusBar backgroundColor={COLORS.primary} barStyle="default" />
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              {isOnline ? (
                <Stack.Screen name="LoginRouter" component={LoginRouter} />
              ) : (
                <Stack.Screen name="OfflineRouter" component={OfflineRouter} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </SafeAreaView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
