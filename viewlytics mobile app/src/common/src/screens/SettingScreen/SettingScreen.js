import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import { settingData } from "../../data/settingData";
import { styles } from "./SettingScreenStyle";
import { COLORS } from "../../colors/colors";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { useDispatch, useSelector } from "react-redux";
import { HandleNotification } from "../../redux/actions/notificationAction";
import ToastMessage from "../../components/ToastMessages/ToastMessages";
import { RemoveAccount } from "../../redux/actions/removeAccountAction";
import { LoginArray } from "../../redux/actions/loginArrayAction";
import Geolocation from "@react-native-community/geolocation";
import { CheckOutAction } from "../../redux/actions/checkOutAction";
import { LogoutCheckoutAction } from "../../redux/actions/logoutcheckoutAction";
import DeviceInfo from "react-native-device-info";
const SettingScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const removeAccount = useSelector(
    (state) => state?.RemoveAccount?.removeAccountData
  );
  const [isOn, setIsOn] = useState(false);
  const [token, setTokens] = useState("");
  console.log({ token });
  const [checkInId, setCheckinId] = useState("");

  //getIP address
  const [ipAddresss, setIpAddress] = useState("");
  console.log(ipAddresss, "ipAddress--------");
  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const ipAddress = await DeviceInfo.getIpAddress();
        setIpAddress(ipAddress);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchIpAddress();
  }, []);
  //let data = checkinId;

  const getusercheckinId = async () => {
    AsyncStorage.getItem(DB.USER_CHECK_IN_ID)
      .then((data) => {
        //  token = data;
        setCheckinId(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getFcmTokens = async () => {
    try {
      const data = await AsyncStorage.getItem(DB.FCM_TOKEN);
      setFcmToken(data);
    } catch (error) {
      console.log(error);
    }
  };
  const [formattedTime, setFormetedTime] = useState();
  console.log({ formattedTime }, "formattedTime========");
  const gettime = () => {
    const currentDate = new Date();

    // Extract hours, minutes, and seconds
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");

    // Construct the formatted time string
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    setFormetedTime(formattedTime);
  };
  // let token;
  const getToken = async () => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        //  token = data;
        setTokens(data);
        getusercheckinId();
        getFcmTokens();
        gettime();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {}, []);

  const deleteMyAccount = () => {
    dispatch(RemoveAccount(token, navigation));
    // logout();
  };

  const notificationMessage = useSelector(
    (state) => state?.Notification?.notificationData?.message
  );
  const logout = async () => {
    await AsyncStorage.removeItem(DB.ISLOGIN);
    dispatch(LoginArray([]));
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginRouter" }],
    });
  };
  const createTwoLogout = () =>
    Alert.alert("Are you sure you want to Logout your account ?", "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          // checkout();
          logoutCheckout();
          logout();
        },
      },
    ]);
  const createTwoButtonAlert = () =>
    Alert.alert("Are you sure you want to delete your account ?", "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => deleteMyAccount() },
    ]);

  // const notificationOffAlert = () =>
  //   Alert.alert("Are you sure you want to turn off your notification ?", "", [
  //     {
  //       text: "Cancel",
  //       style: "cancel",
  //     },
  //     {
  //       text: "OK",
  //       onPress: () => {
  //         dispatch(HandleNotification(isOn)), setIsOn(false);
  //       },
  //     },
  //   ]);

  const checkInID = useSelector(
    (state) => state?.checkInOutReducer?.DashbordListData?.data?.checkinId
  );
  const [currentDate, setCurrentDate] = useState("");

  const [currentLatitudes, setcurrentLatitudes] = useState("");
  const [currentLongitudes, setcurrentLongitudes] = useState("");
  Geolocation.getCurrentPosition((data) => {
    setcurrentLatitudes(data.coords.latitude);
  });

  Geolocation.getCurrentPosition((data) => {
    setcurrentLongitudes(data.coords.longitude);
  });
  const [fcmToken, setFcmToken] = useState("");
  const getFcmToken = async () => {
    AsyncStorage.getItem(DB.FCM_TOKEN)
      .then((data) => {
        let fcmToken = data;
        console.log({ fcmToken });
        setFcmToken(fcmToken);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getFcmToken();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    setCurrentDate(hours + ":" + min);
  }, []);

  // const getUserCheckInId = async (token) => {
  //   console.log(token, "tokentokentokentokentokentoken");
  //   const currentDate = new Date();

  //   // Extract hours, minutes, and seconds
  //   const hours = currentDate.getHours().toString().padStart(2, "0");
  //   const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  //   const seconds = currentDate.getSeconds().toString().padStart(2, "0");

  //   // Construct the formatted time string
  //   const formattedTime = `${hours}:${minutes}:${seconds}`;
  //   await AsyncStorage.getItem(DB.USER_CHECK_IN_ID)
  //     .then((data) => {
  //       console.log("userCheckInID", data);
  //       dispatch(
  //         CheckOutAction(
  //           data,
  //           token,
  //           formattedTime,
  //           currentLatitudes,
  //           currentLongitudes
  //         )
  //       );
  //       setCheckInStatus("CheckIn");
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };
  const checkout = () => {
    dispatch(
      CheckOutAction(
        checkInId,
        token,
        formattedTime,
        currentLatitudes,
        currentLongitudes,
        ipAddress
      )
    );
  };
  const logoutCheckout = () => {
    dispatch(
      LogoutCheckoutAction(
        token,
        currentLatitudes,
        currentLongitudes,
        navigation,
        ipAddresss
      )
    );
  };
  // const checkoutHandle = () => {
  //   getCheckInId();
  // };
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage cleared successfully.");
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          disabled={item.title == "Notification" ? true : false}
          onPress={
            item.isIcon
              ? () => {
                  navigation.navigate(item.onPress);
                }
              : // : item.title == "Notification"
              // ? () => {
              //     isOn == true
              //       ? notificationOffAlert()
              //       : (dispatch(HandleNotification(isOn)), setIsOn(true));
              //   }
              item.title == "Logout"
              ? () => {
                  createTwoLogout();
                }
              : item.title == "Delete My Account"
              ? () => {
                  createTwoButtonAlert();
                }
              : null
          }
          style={styles.cardView}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={item.Fristicon}
              style={[styles.Iconstyle, { tintColor: item.tintcolor }]}
            />
            <Text style={[styles.title, { color: item.backcolor }]}>
              {item.title}
            </Text>
          </View>
          {item.isIcon ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(item.onPress);
              }}
              style={{ justifyContent: "center", alignItems: "flex-end" }}
            >
              <Image
                source={item.icon}
                style={{
                  height: item.height,
                  width: item.width,
                  tintColor: item.tint,
                  alignSelf: "flex-end",
                }}
              />
            </TouchableOpacity>
          ) : null}
          {/* {item.title == "Notification" ? (
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => {
                isOn == true
                  ? notificationOffAlert()
                  : (dispatch(HandleNotification(isOn)), setIsOn(true));
              }}
            >
              {isOn ? (
                <>
                  <Text style={styles.onText}>on</Text>
                  <View style={styles.round} />
                </>
              ) : (
                <>
                  <View style={styles.round} />
                  <Text style={styles.onText}>off</Text>
                </>
              )}
            </TouchableOpacity>
          ) : null} */}
          {item.title == "Logout" ? (
            <TouchableOpacity
              onPress={() => {
                //  checkout();
                //  clearAsyncStorage();
                logoutCheckout();
                logout();
              }}
            >
              <Image
                source={item.icon}
                style={{
                  height: item.height,
                  width: item.width,
                  tintColor: "red",
                }}
              />
            </TouchableOpacity>
          ) : null}
        </TouchableOpacity>
        <View style={styles.line} />
      </>
    );
  };
  return (
    <>
      {notificationMessage ? (
        <ToastMessage
          msg={notificationMessage}
          isVisible={notificationMessage}
          isError={notificationMessage}
        />
      ) : null}
      <View style={styles.mainView}>
        <Header header={"Settings"} />

        <View style={styles.mainView}>
          <FlatList renderItem={renderItem} data={settingData} />
        </View>
      </View>
    </>
  );
};

export default SettingScreen;
