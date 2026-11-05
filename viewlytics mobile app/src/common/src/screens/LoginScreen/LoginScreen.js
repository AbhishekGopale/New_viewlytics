import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
  SafeAreaView,
  Platform,
  BackHandler,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import AuthViewComponent from "../../components/AuthViewComponent/AuthViewComponent";
import { styles } from "./LoginScreenStyle";
import { FontsFamily } from "../../assets/fonts/fonts";
import TextInputCustom from "../../components/TextInputCustom/TextInputCustom";
import { Images } from "../../assets/images/map";
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { UserLogin } from "../../redux/actions/loginAction";
import { SendOtpAction } from "../../redux/actions/sendOtpAction";
import { COLORS } from "../../colors/colors";
import ToastMessage from "../../components/ToastMessages/ToastMessages";
import _ from "lodash";
import { getUniqueId } from "react-native-device-info";
import { DB } from "../../database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { request, PERMISSIONS } from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";
import DeviceInfo from "react-native-device-info";

const LoginScreen = () => {
  const [locationPermission, setLocationPermission] = useState(null);
  useEffect(() => {
    requestLocationPermission();
  });
  const requestLocationPermission = async () => {
    try {
      const granted = await request(
        Platform.OS === "ios"
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );

      setLocationPermission(granted);

      if (granted === "granted") {
        // User granted the location permission, you can proceed with location-related tasks
        // getCurrentLocation();
      } else if (granted === "denied") {
        // Location permission denied, show a user-friendly message
        Alert.alert(
          "Location Permission Required",
          "Please grant location permission to use this feature.",
          [
            {
              text: "Location Permission ",
              onPress: () => {
                requestLocationPermission();
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error("Error requesting location permission: ", error);
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        BackHandler.exitApp();
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);
  const [isLoginSelected, setIsLoginSelected] = useState(true);

  const navigation = useNavigation();
  let deviceType = Platform.OS == "android" ? "0" : "1";
  const [deviceId, setDeviceId] = useState("");
  useEffect(() => {
    getUniqueId().then((uniqueId) => {
      // iOS: "FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9"
      // Android: "dd96dec43fb81c97"
      // Windows: "{2cf7cb3c-da7a-d508-0d7f-696bb51185b4}"
      setDeviceId(uniqueId);
    });
  }, []);
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
  ///currant lat long
  const [currentLatitudes, setcurrentLatitudes] = useState("");
  console.log(currentLatitudes, "currentLatitudes---");
  const [currentLongitudes, setcurrentLongitudes] = useState("");
  Geolocation.getCurrentPosition((data) => {
    setcurrentLatitudes(data.coords.latitude);
  });

  Geolocation.getCurrentPosition((data) => {
    setcurrentLongitudes(data.coords.longitude);
  });
  const [isError, setIsError] = useState(false);
  const REGEX =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mobileNo, setMobileNo] = useState();
  const [emailErr, setEmailErr] = useState("");
  const [mobileErr, setMobileErr] = useState(false);
  const [mobileError, setMobileError] = useState("");
  const dispatch = useDispatch();
  const isLoginData = useSelector((state) => state?.LoginArray?.loginData);
  const loginMessageError = useSelector((state) => state?.Login?.error?.error);
  console.log({ loginMessageError }, "======");
  const sendOtpMessageError = useSelector(
    (state) => state?.SendOtp?.error?.error
  );
  const isLoading = useSelector((state) => state?.Login?.isLoading);

  useEffect(() => {}, [isLoading]);

  useEffect(() => {
    if (!_.isEmpty(isLoginData)) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Navigation" }],
      });
    }
  }, [isLoginData]);

  // const onLoginClick = (email, password, navigation) => {
  //   let isValid = false;
  //   let isPassValid = false;
  //   if (!email) {
  //     isValid = false;
  //     setEmailError("Please enter e-mail.");
  //   } else if (!REGEX.test(email)) {
  //     isValid = false;
  //     setEmailErr("Please enter valid e-mail.");
  //   } else {
  //     isValid = true;
  //   }

  //   if (!password) {
  //     isPassValid = false;
  //     setPasswordError("Please enter password.");
  //   } else {
  //     isPassValid = true;
  //   }
  //   if (isValid && isPassValid) {
  //     dispatch(UserLogin(email, password, navigation, deviceType, deviceId));
  //   }
  // };

  const onLoginClick = () => {
    if (locationPermission !== "granted") {
      Alert.alert(
        "Location Permission Required",
        "Please grant location permission to use this feature.",
        [
          {
            text: "Open Settings",
            onPress: () => Linking.openSettings(),
          },
        ]
      );
      return;
    }
    dispatch(
      UserLogin(
        email,
        password,
        navigation,
        deviceType,
        deviceId,
        ipAddresss,
        currentLatitudes,
        currentLongitudes
      )
    );
  };

  const onOTPHandle = (mobile, navigation) => {
    let isValid = false;

    if (!mobile) {
      isValid = false;
      if (mobileErr) {
        setMobileErr(false);
        setMobileError("Please enter valid phone number");
      } else {
        setMobileErr(true);
      }
    } else {
      isValid = true;
    }
    if (isValid) {
      dispatch(SendOtpAction(mobile, navigation));
    }
  };
  const handleSubmit = () => {
    setEmailError("");
    setPasswordError("");

    if (email === "" && password === "") {
      setEmailError("Email is required.");
      setPasswordError("Password is required.");
    } else if (email === "") {
      setEmailError("Email is required.");
    } else if (password === "") {
      setPasswordError("Password is required.");
    } else {
    }
  };

  return (
    <>
      {loginMessageError ? (
        <ToastMessage
          msg={loginMessageError}
          isVisible={loginMessageError}
          isError={loginMessageError}
        />
      ) : null}
      {mobileErr ? (
        <ToastMessage
          msg={"Please Enter Valid Phone Number"}
          isVisible={true}
          isError={true}
        />
      ) : null}
      {sendOtpMessageError ? (
        <ToastMessage
          msg={sendOtpMessageError}
          isVisible={sendOtpMessageError}
          isError={sendOtpMessageError}
        />
      ) : null}
      <AuthViewComponent>
        <View style={styles.mainView}>
          <View style={styles.subView}>
            <View>
              <TouchableOpacity
                disabled={locationPermission !== "granted"}
                onPress={() => {
                  setIsLoginSelected(true);
                }}
              >
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
              <View style={isLoginSelected ? styles.enable : styles.disable} />
            </View>
            {/* <View style={styles.verticalLine} /> */}
            {/* <View> */}
            {/* <TouchableOpacity
                onPress={() => {
                  setIsLoginSelected(false);
                }}
                style={styles.disable}
              >
                <Text style={styles.loginText}>Login With OTP</Text>
              </TouchableOpacity> */}
            {/* <View style={!isLoginSelected ? styles.enable : styles.disable} /> */}
            {/* </View> */}
          </View>
          {isLoginSelected ? (
            <View style={styles.bottomView}>
              <TextInputCustom
                onChangeText={(value) => {
                  setEmail(value), setEmailErr("");
                }}
                image={Images.usericon}
                imageStyle={styles.userStyle}
                name={"Email Id"}
                password={false}
                placeholder={"Enter your email"}
                returnKeyType={"next"}
              />
              <View style={styles.passwordView}>
                <TextInputCustom
                  onChangeText={(value) => {
                    setPassword(value), setPasswordError("");
                  }}
                  image={Images.password}
                  imageStyle={styles.passwordStyle}
                  name={"Password"}
                  placeholder={"Enter your password"}
                  password={true}
                  returnKeyType={"done"}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ForgotPassword");
                }}
                style={styles.forgotPasswordButton}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 25,
                }}
              >
                {emailError !== "" || emailErr !== "" ? (
                  <Text
                    style={{
                      color: "red",
                      fontFamily: FontsFamily.NotoSansMedium,
                      fontSize: 12,
                    }}
                  >
                    {emailError}
                    {emailErr}
                  </Text>
                ) : null}
                {passwordError !== "" ? (
                  <Text
                    style={{
                      color: "red",
                      fontFamily: FontsFamily.NotoSansMedium,
                      fontSize: 12,
                    }}
                  >
                    {passwordError}
                  </Text>
                ) : null}
              </View>
            </View>
          ) : (
            <View style={styles.otpView}>
              <View style={styles.subOtpView}>
                <Text style={styles.otpText}>Your Phone!</Text>
                <View style={styles.customInput}>
                  <Text style={styles.countryCode}>+91</Text>
                  <View style={styles.line} />
                  <TextInput
                    autoFocus={true}
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="Enter Number"
                    returnKeyType={"done"}
                    style={styles.input}
                    placeholderTextColor={COLORS.white}
                    onChangeText={(text) => {
                      setMobileNo(text);
                      setMobileError("");
                    }}
                  />
                </View>
                <View style={styles.horizontalLine} />
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    //marginTop: 25,
                  }}
                >
                  {mobileError !== "" ? (
                    <Text
                      style={{
                        color: "red",
                        fontFamily: FontsFamily.NotoSansMedium,
                        fontSize: 14,
                      }}
                    >
                      {mobileError}
                    </Text>
                  ) : null}
                </View>
              </View>
            </View>
          )}
        </View>
      </AuthViewComponent>
      <View style={styles.buttonView}>
        {isLoginSelected ? (
          <ButtonCustom
            // disabled={email?.length > 0 && password?.length > 0 ? false : true}
            buttonStyle={{
              margin: 25,
            }}
            onPress={() => {
              onLoginClick(email, password, navigation, ipAddresss);
            }}
            name={"Login"}
            isLoading={isLoading}
          />
        ) : (
          <ButtonCustom
            // buttonStyle={styles.buttonStyle}
            buttonStyle={{
              margin: 25,
            }}
            onPress={() => {
              onOTPHandle(mobileNo, navigation);
            }}
            name={"Next"}
          />
        )}
      </View>
    </>
  );
};

export default LoginScreen;
