import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  Modal,
  RefreshControl,
  Linking,
  AppState,
  Platform,
  Button,
  Share,
  NativeModules,
} from "react-native";

import Header from "../../components/Header/Header";
import { COLORS } from "../../colors/colors";
import { styles } from "./HomeScreenStyle";
import { Images } from "../../assets/images/map";
import DATA, { TLDATA } from "./Data";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { GetDashboardDetails } from "../../redux/actions/dashboardDetailsAction";
import { useDispatch, useSelector } from "react-redux";
import { CheckInOutAction } from "../../redux/actions/checkInOutAction";
import { RemainingFormAction } from "../../redux/actions/remainingFromCountAction";
import { MyProfileDetilsAction } from "../../redux/actions/myProfileAction";
import PrmotorDashboard from "../../components/Prmotor/PrmotorDashboard";
import TlDashboard from "../../components/Tl/TlDashboard";
import MerchandiserDashboard from "../../components/Merchandiser/MerchandiserDashboard";
import Geolocation from "@react-native-community/geolocation";
import { StoreListAction } from "../../redux/actions/storeListAction";
import { PromoterTlAction } from "../../redux/actions/promoterTlDashbordAction";
import { MerDashbordAction } from "../../redux/actions/merDashbordAction";
import { CheckOutAction } from "../../redux/actions/checkOutAction";
import haversine from "haversine";
import BackgroundTimer from "react-native-background-timer";
import { request, PERMISSIONS } from "react-native-permissions";
import { DistanceDigitAction } from "../../redux/actions/distanceAction";
import ServerScreen from "../ServerScreen/ServerScreen";
import { ErrorAction } from "../../redux/actions/errorAction";
import AttendanceButtons from "./AttendanceButoon";
import CustomCheckbox from "./checkBox";
import { LeaveTypeAction } from "../../redux/actions/leaveTypeAction";
import moment from "moment";
import { AttendanceOptionAction } from "../../redux/actions/attendanceOptionAction";
import DeviceInfo from "react-native-device-info";
//offline
import { StoreDetails } from "../../redux/actions/storeDetailsAction";
import { OfflineOpeningAction } from "../../redux/actions/offlineOpeningCreateAction";
import { OfflineNewStockAction } from "../../redux/actions/offlineNewCreateAction";
import { OfflineClosingStockAction } from "../../redux/actions/offlineClosingCreateAction";
import { OfflineSosAction } from "../../redux/actions/offlineSosCreateAction";
import { OfflineOosAction } from "../../redux/actions/offlineOosCreateAction";
import { OfflinePromoAction } from "../../redux/actions/offlinePromoCreateAction";
import { OfflineShoperAction } from "../../redux/actions/offlineShoperCreateAction";
import { OfflineMarketIntelligenceAction } from "../../redux/actions/offlineMarketIntelligenceCreateAction";
import { FormDisableAction } from "../../redux/actions/formDisableAction";
import { OfflineCompetitionBrandAction } from "../../redux/actions/offlineCompetitionBrandCreateAction";
import { AdminWorkAction } from "../../redux/actions/adminWorkAction";
import { MeetingAction } from "../../redux/actions/meetingAction";
import { OfflineMeetingAction } from "../../redux/actions/offlineMeetingAction";
import { OfflineAdminWorkAction } from "../../redux/actions/offlineAdminWorkAction";
import { OfflineFieldVisitAction } from "../../redux/actions/offlineFildVisitAction";
import { LoginArray } from "../../redux/actions/loginArrayAction";
import { FildVisitDetail } from "../../redux/actions/fildVisitDetaisAction";
import { OfflineMerAssestTrakingAction } from "../../redux/actions/offlineMerAssestAction";
import { AssestCategoryAction } from "../../redux/actions/assetTrackingDataAction";
import { offlineOpeningClosingNewAction } from "../../redux/actions/offlineOpeningClosingNewAction";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [answer, setAnswer] = useState("");
  const [attendanceType, setAttendanceType] = useState("");
  // console.log(attendanceType, "attendanceType");
  // console.log(answer, "answer");
  const [type, setType] = useState("");
  // console.log({ type });
  // console.log(answer, "answer========----");
  const [selectedId, setSelectedId] = useState("");
  const [storeId, setStoreId] = useState("");
  // const handleAttendanceChange = (status, type) => {
  //   setAnswer(status);
  //   setType(type);
  // };
  const [isChecked, setIsChecked] = useState(false);

  const userProfile = useSelector(
    (state) => state?.MyProfile?.myProfileData?.data?.userProfile
  );
  // const userStatus = useSelector(
  //   (state) => state.MyProfile.myProfileData?.data?.userProfile?.status
  // );

  // const logout = async () => {
  //   await AsyncStorage.removeItem(DB.ISLOGIN);
  //   dispatch(LoginArray([]));
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: "LoginRouter" }],
  //   });
  // };

  // useEffect(() => {
  //   console.log("logout useeffect called");
  //   if (userStatus !== 0) {
  //     logout();
  //   }
  // }, [userStatus]);
  // console.log(isChecked, "isChecked");
  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };

  const [locationPermission, setLocationPermission] = useState(null);
  useEffect(() => {
    requestLocationPermission();
  }, []);
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

  const handleCheckIn = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        // Location is available, navigate to CheckInScreen
        setModalVisible(true);
      },
      (error) => {
        // Location is not available, show an alert and provide the option to open location settings
        Alert.alert(
          "Location Services",
          "Location services are disabled. Please enable them to check-in.",
          [
            {
              text: "Open Settings",
              onPress: () => {
                Linking.openSettings(); // Open device settings
              },
            },
            {
              text: "Cancel",
              onPress: () => {
                // Handle the cancel button press if needed
              },
              style: "cancel",
            },
          ]
        );
      }
    );
  };

  const handleCheckOut = () => {
    navigation.navigate("TodayActivityScreen");
  };

  // function startBackgroundTask() {
  //   // fetchAndUpdateData(); // Perform the initial fetch
  //   BackgroundTimer.runBackgroundTimer(() => {
  //     getOneTimeLocation();
  //   }, 15000);
  // }
  // useEffect(() => {
  //   startBackgroundTask();
  //   return () => {
  //     BackgroundTimer.stopBackgroundTimer();
  //   };
  // }, []);
  const [checkInStatus, setCheckInStatus] = useState("None");

  // function startBackgroundTask() {
  //   // fetchAndUpdateData(); // Perform the initial fetch
  //   BackgroundTimer.runBackgroundTimer(() => {
  //     getOneTimeLocation();
  //   }, 15000);
  // }
  // useEffect(() => {
  //   startBackgroundTask();
  //   return () => {
  //     BackgroundTimer.stopBackgroundTimer();
  //   };
  // }, []);

  const [token, setToken] = useState("");
  // console.log(token);
  //

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === "active") {
        // The app has come to the foreground from the background.
        // You can trigger a refresh or perform any necessary actions here.
        refreshApp();
      }
    };

    // Add an event listener for app state changes
    AppState.addEventListener("change", handleAppStateChange);

    return () => {
      handleAppStateChange.remove();
    };
  }, []);

  const refreshApp = () => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        dispatch(GetDashboardDetails(data));
        dispatch(MyProfileDetilsAction(data));
        dispatch(CheckInOutAction(data));
        dispatch(RemainingFormAction(data));
        dispatch(PromoterTlAction(data));
        dispatch(MerDashbordAction(data));
        dispatch(DistanceDigitAction());
        setToken(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const [isError, setIsError] = useState(isErrorVisible);
  useEffect(() => {
    console.log("isErrorInEffect", isErrorVisible);
    setIsError(isErrorVisible);
  }, [isErrorVisible]);

  //
  const closeModal = () => {
    setModalVisible(false);
    setAnswer("");
    setType("");
    setAttendanceType("");
    setIsChecked(false);
    setSelectedId("");
  };
  const closeModalsss = () => {
    dispatch(ErrorAction(false, ""));
    setIsError(false);
  };

  const [isDay, setIsDay] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getToken();
    clearOfflineData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const dispatch = useDispatch();

  const isLoading = useSelector(
    (state) => state?.GetDashboardDetails?.isLoading
  );

  const isErrorVisible = useSelector((state) => state?.errorReducer?.isError);
  const isErrorVisibleMsg = useSelector((state) => state?.errorReducer?.msg);

  const getStoreId = async (token) => {
    AsyncStorage.getItem(DB.STORE_ID)
      .then((data) => {
        setStoreId(data);
        dispatch(AssestCategoryAction(token, data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getToken = async () => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        dispatch(GetDashboardDetails(data));
        dispatch(MyProfileDetilsAction(data));
        dispatch(CheckInOutAction(data));
        dispatch(RemainingFormAction(data));
        dispatch(PromoterTlAction(data));
        dispatch(MerDashbordAction(data));
        dispatch(DistanceDigitAction());
        dispatch(AttendanceOptionAction(data));
        DistanceDigitAction();
        // dispatch(StoreDetails(data, storeId));

        getStoreId();
        setToken(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getToken();
    dispatch(FildVisitDetail(token, storeId));
  }, []);

  //getIP address
  const [ipAddresss, setIpAddress] = useState("");
  // console.log(ipAddresss, "ipAddress--------");
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

  const Profilerole = useSelector(
    (state) => state?.MyProfile?.myProfileData?.data?.userProfile?.role_name
  );
  // console.log({ Profilerole });

  ///AttendanceOpetionData
  const AttendanceOpetionData = useSelector(
    (state) => state?.attendanceOptionReducer?.AttendanceOptionList?.data
  );

  // console.log(AttendanceOpetionData, "AttendancePop========");

  const [leave, setLeave] = useState(AttendanceOpetionData || []);

  const newArr = leave.map((ele) => {
    return ele?.attendance_popup;
  });
  // console.log(newArr, "newArr=====");

  const attendance_popup = newArr[0];
  // console.log(attendance_popup, "attendance_popup---------");

  const check_in_out = useSelector(
    (state) => state?.checkInOutReducer?.DashbordListData?.data
  );
  //checkin checkout
  const checkinData = useSelector(
    (state) => state?.checkInOutReducer?.DashbordListData?.data?.checkInStatus
  );
  // console.log(checkinData, "checkinData------");
  /////
  const FristCheckinData = useSelector(
    (state) =>
      state?.checkInOutReducer?.DashbordListData?.data?.firstCheckInStatus
  );
  const FristCheckinDataType = useSelector(
    (state) => state?.checkInOutReducer?.DashbordListData?.data?.checkInName
  );
  // console.log(FristCheckinDataType, "FristCheckinDataType=======---");

  // console.log(FristCheckinData, "FristCheckinData=======---");
  //////
  const checkInID = useSelector(
    (state) => state?.checkInOutReducer?.DashbordListData?.data?.checkinId
  );
  const storelat = useSelector((state) => state?.checkInOutReducer);
  let remainingFormData = useSelector(
    (state) =>
      state?.remainingFromCountReducer?.allDetails?.allStore?.count
        ?.remainingForm
  );
  let remainingForm = useSelector(
    (state) =>
      state?.remainingFromCountReducer?.allDetails?.allStore?.count
        ?.remainingFoirmName
  );
  const isLoadings = useSelector(
    (state) => state?.checkInOutReducer?.isLoading
  );

  const [currentLatitudes, setcurrentLatitudes] = useState("");

  const [currentLongitudes, setcurrentLongitudes] = useState("");
  Geolocation.getCurrentPosition((data) => {
    setcurrentLatitudes(data.coords.latitude);
  });

  Geolocation.getCurrentPosition((data) => {
    setcurrentLongitudes(data.coords.longitude);
  });
  const location = [currentLatitudes, ",", currentLongitudes];

  const [currentDate, setCurrentDate] = useState("");
  // console.log(currentDate, "currentDate======");
  const currentDatsss = moment().format("YYYY/MM/DD");
  // console.log(currentDatsss, "currentDatsss");
  useEffect(() => {
    checkinData;
  }, [checkinData]);
  const [offlineOpeningData, setOfflineOpeningData] = useState("");
  const [offlineNewData, setOfflineNewData] = useState("");
  const [offlineClosingData, setOfflineClosingData] = useState("");
  const [offlinesosData, setOfflineSosData] = useState("");
  const [offlineOosData, setOfflineOosData] = useState("");
  const [offlineShopperData, setOfflineShopperData] = useState("");
  const [offlinePromoData, setOfflinePromoData] = useState("");
  const [offlineIntelliganceData, setOfflineIntelliganceData] = useState("");
  const [offlineCompetitionBrandData, setOfflineCompetitionBrandData] =
    useState("");
  // console.log(offlineCompetitionBrandData, "offlineCompetitionBrandData------");
  const [offlineMeetingData, setOfflineMeetingData] = useState("");
  const [offlineAddminWorkData, setOfflineAddminWorkData] = useState("");
  const [offlineFieldVisitData, setOfflineFieldVisitData] = useState("");
  const [merAssestType, setMerAssestType] = useState("");

  const [anyDataNotEmpty, setAnyDataNotEmpty] = useState(false);
  // console.log({ anyDataNotEmpty });

  const getOfflineData = async (key, setData) => {
    try {
      const data = await AsyncStorage.getItem(key);

      if (data !== null) {
        const parsedData = JSON.parse(data);

        setData(parsedData);
        // Update state when any data is not empty
        setAnyDataNotEmpty(true);
      }
    } catch (error) {
      console.log("Error retrieving data from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    getOfflineData(DB.OFFLINE_OPENING, setOfflineOpeningData);
    getOfflineData(DB.OFFLINE_NEWSTOCK, setOfflineNewData);
    getOfflineData(DB.OFFLINE_CLOSING_FORM_DATA, setOfflineClosingData);
    getOfflineData(DB.SOS_OFFLINE_DATA, setOfflineSosData);
    getOfflineData(DB.OOS_DATA_OFFLINE, setOfflineOosData);
    getOfflineData(DB.SHOPPER_ENGEGMENTDATA, setOfflineShopperData);
    getOfflineData(DB.PROMO_OFFLINE_DATA, setOfflinePromoData);
    getOfflineData(DB.INTELIGNCE_IMAGE, setOfflineIntelliganceData);
    getOfflineData(
      DB.COMPETITION_BRAND_AVAILABLE,
      setOfflineCompetitionBrandData
    );
    getOfflineData(DB.MEETING_DROPDOWN, setOfflineMeetingData);
    getOfflineData(DB.ADMINWORK_DROPDOWN, setOfflineAddminWorkData);
    getOfflineData(DB.FIELD_VISIT_CREATE_DATA, setOfflineFieldVisitData);
    getOfflineData(DB.MERCHANDISING_ASSEST_TYPE, setMerAssestType);
  }, []);
  useEffect(() => {
    getFcmToken();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    setCurrentDate(hours + ":" + min);
  }, []);

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

  const getUserCheckInId = async (token) => {
    const currentDate = new Date();

    // Extract hours, minutes, and seconds
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");

    // Construct the formatted time string
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    await AsyncStorage.getItem(DB.USER_CHECK_IN_ID)
      .then((data) => {
        dispatch(
          CheckOutAction(
            data,
            token,
            formattedTime,
            currentLatitudes,
            currentLongitudes,
            // currentAddress,
            ipAddresss
          )
        );
        setCheckInStatus("CheckIn");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getCheckInId = async () => {
    let checkInId = checkInID;
    console.log("fcmTokenAction======>", fcmToken);

    await AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        getUserCheckInId(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const checkoutHandle = () => {
    getCheckInId();
  };

  const LeaveTypeFlag = useSelector(
    (state) => state?.MyProfile?.myProfileData?.data?.userProfile?.check_in
  );
  const ModalPermission = useSelector(
    (state) =>
      state?.MyProfile?.myProfileData?.data?.userProfile?.attendance_popup
  );
  // console.log(ModalPermission, "ModalPermission====");
  // console.log(LeaveTypeFlag, "LeaveTypeFlag====");

  const LeaveTypeHandle = () => {
    dispatch(
      LeaveTypeAction(
        token,
        answer,
        currentDatsss,
        currentLatitudes.toString(),
        currentLongitudes.toString(),
        // currentAddress,
        attendanceType
      )
    );
  };

  const showAlert = (message) => {
    Alert.alert(message);
  };
  const [isLoadingsss, setLoadingsss] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (!isLoadingsss && success) {
      clearOfflineData();
    }
  }, [isLoadingsss, success]);

  const offline = async () => {
    console.log(
      "offline---*********************************************************"
    );

    try {
      let dataDispatched = false;
      if (offlineOpeningData !== "") {
        dispatch(OfflineOpeningAction());
        dataDispatched = true;
      }
      // if (offlineClosingData !== "") {
      //   dispatch(OfflineClosingStockAction());
      //   dataDispatched = true;
      // }
      if (offlinesosData !== "") {
        dispatch(OfflineSosAction());
        dataDispatched = true;
      }
      if (offlineOosData !== "") {
        dispatch(OfflineOosAction());
        dataDispatched = true;
      }
      if (offlineNewData !== "") {
        dispatch(offlineOpeningClosingNewAction());
        dataDispatched = true;
      }
      if (offlinePromoData !== "") {
        dispatch(OfflinePromoAction());
        dataDispatched = true;
      }
      if (offlineShopperData !== "") {
        dispatch(OfflineShoperAction());
        dataDispatched = true;
      }
      if (offlineIntelliganceData !== "") {
        dispatch(OfflineMarketIntelligenceAction());
        dataDispatched = true;
      }
      if (
        offlineCompetitionBrandData !== null &&
        offlineCompetitionBrandData !== ""
      ) {
        dispatch(OfflineCompetitionBrandAction());
        dataDispatched = true;
      }
      if (offlineMeetingData !== null && offlineMeetingData !== "") {
        dispatch(OfflineMeetingAction());
        dataDispatched = true;
      }
      if (offlineAddminWorkData !== null && offlineAddminWorkData !== "") {
        dispatch(OfflineAdminWorkAction());
        dataDispatched = true;
      }

      if (offlineFieldVisitData !== null && offlineFieldVisitData !== "") {
        dispatch(OfflineFieldVisitAction());
        dataDispatched = true;
      }
      if (merAssestType !== null && merAssestType !== "") {
        dispatch(OfflineMerAssestTrakingAction());
        dataDispatched = true;
      }
      if (dataDispatched) {
        setLoadingsss(true);

        await Promise.all([]).catch((error) => {
          setLoadingsss(false);

          let errorMessage = "An error occurred while dispatching data.";
          if (error.action === "OfflineOpeningAction") {
            errorMessage =
              "An error occurred while dispatching OfflineOpeningAction.";
          } else if (error.action === "OfflineClosingStockAction") {
            errorMessage =
              "An error occurred while dispatching OfflineClosingStockAction.";
          } else if (error.action === "OfflineSosAction") {
            errorMessage =
              "An error occurred while dispatching OfflineSosAction.";
          } else if (error.action === "OfflineOosAction") {
            errorMessage =
              "An error occurred while dispatching OfflineOosAction.";
          } else if (error.action === "OfflineNewStockAction") {
            errorMessage =
              "An error occurred while dispatching OfflineNewStockAction.";
          } else if (error.action === "OfflinePromoAction") {
            errorMessage =
              "An error occurred while dispatching OfflinePromoAction.";
          } else if (error.action === "OfflineShoperAction") {
            errorMessage =
              "An error occurred while dispatching OfflineShoperAction.";
          } else if (error.action === "OfflineCompetitionBrandAction") {
            errorMessage =
              "An error occurred while dispatching OfflineCompetitionBrandAction.";
          } else if (error.action === "OfflineMeetingAction") {
            errorMessage =
              "An error occurred while dispatching OfflineMeetingAction.";
          } else if (error.action === "OfflineAdminWorkAction") {
            errorMessage =
              "An error occurred while dispatching OfflineAdminWorkAction.";
          } else if (error.action === "OfflineFieldVisitAction") {
            errorMessage =
              "An error occurred while dispatching OfflineFieldVisitAction.";
          }
          showAlert(errorMessage);
          console.error(error);
        });
        setLoadingsss(false);
        setSuccess(true);
        // clearOfflineData();
        // showAlert("All data dispatched!");
        console.log("All data dispatched!");

        onRefresh();
      } else {
        // showAlert("No data Found.");
        console.log("No data Found.");
      }
    } catch (error) {
      setLoadingsss(false);
      showAlert("An error occurred while dispatching data.");
      console.error(error);
    }
  };
  // await AsyncStorage.removeItem(DB.OFFLINE_NEW_STOCK_REMARK);
  // await AsyncStorage.removeItem(DB.OFFLINE_NEWSTOCK);
  // await AsyncStorage.removeItem(DB.OFFLINE_OPENING_INV_REMARK);
  // await AsyncStorage.removeItem(DB.OFFLINE_OPENING_INV_FILTERED_ARR);
  // await AsyncStorage.removeItem(DB.OFFLINE_CLOSING_FORM_DATA);
  // await AsyncStorage.removeItem(DB.OFFLINE_CLOSING_STOCK_REMARK);
  // await AsyncStorage.removeItem(DB.OFFLINE_OPENING);
  // const offlineTwo = async () => {
  //   try {
  //     let dataDispatched = false;

  //     if (offlineNewData !== "") {
  //       console.log(
  //         "offlineTwo***********************************************************"
  //       );
  //       dispatch(offlineOpeningClosingNewAction());
  //       dataDispatched = true;
  //     }

  //     if (dataDispatched) {
  //       setLoadingsss(true);

  //       await Promise.all([]).catch((error) => {
  //         setLoadingsss(false);

  //         let errorMessage = "An error occurred while dispatching data.";
  //         if (error.action === "OfflineClosingStockAction") {
  //           errorMessage =
  //             "An error occurred while dispatching OfflineClosingStockAction.";
  //         } else if (error.action === "OfflineNewStockAction") {
  //           errorMessage =
  //             "An error occurred while dispatching OfflineNewStockAction.";
  //         }
  //         showAlert(errorMessage);
  //         console.error(error);
  //       });
  //       setLoadingsss(false);
  //       setSuccess(true);
  //       // clearOfflineData();
  //       console.log("All data dispatched!");
  //       // showAlert("All data dispatched!");
  //       onRefresh();
  //     } else {
  //       // showAlert("No data Found.");
  //       console.log("No data Found.");
  //     }
  //   } catch (error) {
  //     setLoadingsss(false);
  //     showAlert("An error occurred while dispatching data.");
  //     console.error(error);
  //   }
  // };

  // const offlineThree = async () => {
  //   try {
  //     let dataDispatched = false;

  //     if (offlineClosingData !== "") {
  //       console.log("offlineThree********************************************");
  //       dispatch(OfflineClosingStockAction());
  //       dataDispatched = true;
  //     }

  //     if (dataDispatched) {
  //       setLoadingsss(true);

  //       await Promise.all([]).catch((error) => {
  //         setLoadingsss(false);

  //         let errorMessage = "An error occurred while dispatching data.";
  //         if (error.action === "OfflineClosingStockAction") {
  //           errorMessage =
  //             "An error occurred while dispatching OfflineClosingStockAction.";
  //         } else if (error.action === "OfflineNewStockAction") {
  //           errorMessage =
  //             "An error occurred while dispatching OfflineNewStockAction.";
  //         }
  //         showAlert(errorMessage);
  //         console.error(error);
  //       });
  //       setLoadingsss(false);
  //       setSuccess(true);
  //       // clearOfflineData();
  //       // showAlert("All data dispatched!");
  //       console.log("All data dispatched!");

  //       onRefresh();
  //     } else {
  //       // showAlert("No data Found.");
  //       console.log("No data Found.");
  //     }
  //   } catch (error) {
  //     setLoadingsss(false);
  //     showAlert("An error occurred while dispatching data.");
  //     console.error(error);
  //   }
  // };

  const clearOfflineData = () => {
    if (!isLoadingsss && success) {
      setSuccess(false);
      setOfflineClosingData("");
      setOfflineNewData("");
      setOfflineOpeningData("");
      setOfflineSosData("");
      setOfflineOosData("");
      setOfflineShopperData("");
      setOfflinePromoData("");
      setOfflineIntelliganceData("");
      setOfflineCompetitionBrandData("");
      setOfflineMeetingData("");
      setOfflineAddminWorkData("");
      setOfflineFieldVisitData("");
      setMerAssestType("");
      setAnyDataNotEmpty(false);
    } else {
      console.log("Some data failed to sync. Please try again later.");
      // showAlert("Some data failed to sync. Please try again later.");
    }
  };

  // const sync = () => {
  //   dispatch(offlineOpeningClosingNewAction());
  // };
  const sync = async () => {
    await offline();
    // await offlineTwo();
    // await offlineThree();
  };

  return (
    <View>
      <Header header={"Dashboard"} />
      <ServerScreen
        title={isErrorVisibleMsg}
        subtitle="Your Subtitle"
        message="Your Message"
        modalVisible={isErrorVisible}
        closeModal={closeModalsss}
      />

      <>
        <View style={styles.SelectButtonView}>
          <View style={styles.ButtonView}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setIsDay(false);
                }}
                style={styles.SummaryToch}
              >
                <Text style={styles.subHeaderText}>My Summary</Text>
              </TouchableOpacity>
              {!isDay ? (
                <View style={styles.barStyle} />
              ) : (
                <View style={styles.emptyBarStyle} />
              )}
            </View>
            <View>
              <TouchableOpacity
                style={styles.StartTouch}
                onPress={() => {
                  setIsDay(true);
                }}
              >
                <Text style={styles.subHeaderText}>Start Your Day</Text>
              </TouchableOpacity>
              {isDay ? (
                <View style={styles.barStyle} />
              ) : (
                <View style={styles.emptyBarStyle} />
              )}
            </View>
          </View>
        </View>
        {isDay ? (
          <View>
            {isLoadings && isLoading ? (
              <View style={styles.loader}>
                <ActivityIndicator size={"large"} color={COLORS.primary} />
              </View>
            ) : (
              <View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.GroupMainView}>
                    {checkinData == "1" ? (
                      <TouchableOpacity
                        onPress={() => {
                          //setModalVisible(true);
                          handleCheckIn();
                        }}
                      >
                        <View style={styles.imgTextContainer}>
                          <Image
                            style={styles.ImgGroup}
                            source={Images.TimerGroup}
                          />

                          <View style={styles.textView}>
                            <Text style={styles.timeText}>{currentDate}</Text>
                            <Text style={[styles.fonttext]}>Check in</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          handleCheckOut();
                        }}
                      >
                        <View style={styles.imgTextContainer}>
                          <Image
                            style={styles.ImgGroup}
                            source={Images.TimerGroup}
                          />

                          <View style={styles.textView}>
                            <Text style={styles.timeText}>{currentDate}</Text>
                            <Text
                              style={[styles.fonttext, { color: COLORS.red }]}
                            >
                              Check out
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}

                    <View style={styles.imgTextContainer}>
                      <View>
                        <Image
                          style={styles.ImgGroup}
                          source={Images.LocationGroup}
                        />
                      </View>
                      <View style={styles.textView}>
                        <Text style={styles.timeText}>
                          {check_in_out?.place}
                        </Text>
                        <Text style={styles.fonttext}>Places</Text>
                      </View>
                    </View>
                    <View style={styles.imgTextContainer}>
                      <View>
                        <Image
                          style={styles.ImgGroup}
                          source={Images.FromGroup}
                        />
                      </View>
                      <View style={styles.textView}>
                        <Text style={styles.timeText}>
                          {check_in_out?.form}
                        </Text>
                        <Text style={styles.fonttext}>Forms</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.menutopView}>
                    <FlatList
                      scrollEnabled={false}
                      contentContainerStyle={{ paddingBottom: 250 }}
                      // showsVerticalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      numColumns={3}
                      keyExtractor={(item) => item.id}
                      data={Profilerole == "tl" ? TLDATA : DATA}
                      renderItem={({ item }) => {
                        return (
                          <View>
                            <View style={styles.FlatlistView}>
                              <View style={styles.DashbordView}>
                                <TouchableOpacity
                                  style={styles.touchbutton}
                                  // disabled={

                                  //   item.title === "Sync" && offlineData == null

                                  // }
                                  onPress={async () => {
                                    if (
                                      item.screen === "DailyReporting" ||
                                      item.screen === "FildVisitScreen" ||
                                      item.screen === "Meeting" ||
                                      item.screen === "AdminWork" ||
                                      item.screen === "TlReporting"
                                    ) {
                                      if (checkinData !== 1) {
                                        navigation.navigate(item.screen);
                                      } else {
                                        Alert.alert("Please CheckIn First!");
                                      }
                                    } else if (item.title === "Sync") {
                                      Alert.alert(
                                        "Sync Confirmation",
                                        "If any data is filled in offline mode, press the OK button",
                                        [
                                          {
                                            text: "Cancel",
                                            onPress: () =>
                                              console.log("Sync canceled"),
                                            style: "cancel",
                                          },
                                          { text: "OK", onPress: () => sync() },
                                        ],
                                        { cancelable: false }
                                      );
                                    } else {
                                      navigation.navigate(item.screen);
                                    }
                                  }}
                                >
                                  <Image
                                    style={styles.imgs}
                                    source={
                                      item.title == "Sync"
                                        ? anyDataNotEmpty
                                          ? Images.outputsync
                                          : item.img
                                        : item.img
                                    }
                                  />

                                  {item.screen == "DailyReporting" &&
                                  remainingFormData > 0 ? (
                                    <View style={styles.notificationView}>
                                      <Text style={styles.notificationText}>
                                        {remainingFormData}
                                      </Text>
                                    </View>
                                  ) : null}
                                </TouchableOpacity>
                                <View>
                                  <Text style={styles.text}>{item.title}</Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        );
                      }}
                    />
                  </View>
                </ScrollView>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View
                    style={styles.ModalBackTouch}
                    // onPress={closeModal}
                  >
                    <View style={styles.modalView}>
                      <View style={styles.logoBackground}>
                        <Image
                          source={Images.mainicon}
                          style={styles.idoLogo}
                        />
                      </View>
                      <View style={styles.subModalview}>
                        {/* <Text style={styles.nametext}>Store ONE</Text> */}
                        <Text style={styles.textstyle}>
                          Check in {currentDate}
                        </Text>

                        <Text style={styles.textstyle}> Are you sure!!!</Text>
                        <Text style={styles.textstyle}>
                          {/* {currentAddress ? ( */}
                          <>
                            {/* <Text>{currentAddress}</Text> */}
                            <Text> Location {location}</Text>
                          </>
                          {/* ) : (
                            <Text>Loading...</Text>
                          )} */}
                        </Text>

                        {LeaveTypeFlag == "0" && ModalPermission == "1" ? (
                          <View
                            style={{
                              height: 120,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <FlatList
                              data={AttendanceOpetionData}
                              numColumns={5}
                              keyExtractor={(item) => item.id}
                              showsVerticalScrollIndicator={false}
                              renderItem={({ item }) => (
                                <View
                                  style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: 5,
                                    //marginBottom: 0,
                                  }}
                                >
                                  <TouchableOpacity
                                    style={[
                                      styles.SelectButtonsss,
                                      item.id === selectedId
                                        ? styles.buttonSelected
                                        : {},
                                    ]}
                                    onPress={() => {
                                      setAnswer(item?.id),
                                        setType(item?.type_name),
                                        setAttendanceType(
                                          item?.attendance_popup
                                        ),
                                        setSelectedId(item.id);
                                    }}
                                  >
                                    <Text style={{ color: "black" }}>
                                      {item.sort_name}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              )}
                            />

                            <View style={styles.checkBox}>
                              <CustomCheckbox
                                isChecked={isChecked}
                                onPress={handleCheckboxToggle}
                                disabled={type == "" ? true : false}
                              />
                              <Text
                                style={{ alignSelf: "center", color: "black" }}
                              >
                                You have marked yourself on {type}
                              </Text>
                            </View>
                            {type.length != "" && isChecked == false ? (
                              <Text style={styles.NoteText}>
                                Please click on the checkbox and confirm.
                              </Text>
                            ) : (
                              <Text></Text>
                            )}
                          </View>
                        ) : (
                          <View></View>
                        )}
                      </View>
                      {LeaveTypeFlag == "0" && ModalPermission == "1" ? (
                        <View
                          style={[styles.modalbuttonView, { marginTop: 0 }]}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              closeModal();
                            }}
                            style={[
                              styles.modalTouchble,
                              { borderLeftWidth: 0 },
                            ]}
                          >
                            <Text
                              style={[
                                styles.textstyleone,
                                { color: COLORS.red },
                              ]}
                            >
                              CANCEL
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            disabled={isChecked == false ? true : false}
                            style={styles.modalTouchble}
                            onPress={() => {
                              type == "Present"
                                ? (LeaveTypeHandle(),
                                  dispatch(StoreListAction(token, navigation)),
                                  navigation.navigate("CheckInScreen"),
                                  closeModal())
                                : LeaveTypeHandle(),
                                closeModal();
                            }}
                          >
                            <Text
                              style={[
                                styles.textstyleone,
                                { color: COLORS.green },
                              ]}
                            >
                              OK
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View
                          style={[styles.modalbuttonView, { marginTop: 30 }]}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              closeModal();
                            }}
                            style={[
                              styles.modalTouchble,
                              { borderLeftWidth: 0 },
                            ]}
                          >
                            <Text
                              style={[
                                styles.textstyleone,
                                { color: COLORS.red },
                              ]}
                            >
                              CANCEL
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.modalTouchble}
                            onPress={() => {
                              // getOneTimeLocation();
                              dispatch(StoreListAction(token, navigation));
                              navigation.navigate("CheckInScreen");
                              closeModal();
                            }}
                          >
                            <Text
                              style={[
                                styles.textstyleone,
                                { color: COLORS.green },
                              ]}
                            >
                              OK
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>
                </Modal>
              </View>
            )}
          </View>
        ) : isLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator size={"large"} color={COLORS.primary} />
          </View>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
          >
            {Profilerole == "tl" ? (
              <TlDashboard />
            ) : Profilerole == "merchandiser" ? (
              <MerchandiserDashboard />
            ) : Profilerole == "promoter" ? (
              <PrmotorDashboard />
            ) : (
              <View></View>
            )}
          </ScrollView>
        )}

      </>
    </View>
  );
};

export default HomeScreen;