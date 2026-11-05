import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  Alert,
  Image,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Share,
  NativeModules,
  ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import styles from "./CheckInScreenStyle";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { CheckInAction } from "../../redux/actions/checkInAction";
import { StoreListAction } from "../../redux/actions/storeListAction";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { VerifiedStoreAction } from "../../redux/actions/verifedStoreAction";
import { COLORS } from "../../colors/colors";
import { CreateMapDetailsAction } from "../../redux/actions/mapDataCreateAction";
import DeviceInfo from "react-native-device-info";
import { RNCamera } from "react-native-camera";
import DropDownPicker from "react-native-dropdown-picker";
import ServerScreen from "../ServerScreen/ServerScreen";
import { ErrorAction } from "../../redux/actions/errorAction";
import { MerStoreListAction } from "../../redux/actions/merstoreListAction";
import YesNo from "./YesNoButton";
import ImageWithText from "../../components/ImageWithText/ImageWithText";
import VisitProofCard from "../../components/VisitProofCard/VisitProofCard";
import { captureRef } from "react-native-view-shot";
import { StoreDetails } from "../../redux/actions/storeDetailsAction";
import OpenClose from "./Attendance/OpenClose";
import { DaynamicFormAction } from "../../redux/actions/dyanamicFromAction";

const { NativeShare } = NativeModules;

const CheckInScreen = () => {
  const navigation = useNavigation();
  const proofCardRef = useRef();
  const [isYes, setIsYes] = useState("");
  const [isValue, setIsValue] = useState("");
  const [selfiImage, setSelfiImage] = useState("");
  console.log({ selfiImage });
  const [camera, setCamera] = useState(null);
  const [modalSelfi, setModalSelfi] = useState(false);
  console.log({ isValue }, "=====-----");
  console.log(isYes, "isYes====");
  const handleYesClick = (value) => {
    setIsYes(value);
  };
  const handleNoClick = (value) => {
    setIsYes(value);
  };
  const handleYClick = (value) => {
    setIsValue(value);
  };

  const handleNClick = (value) => {
    setIsValue(value);
  };
  const [pressed, setPressed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [showOtherModal, setShowOtherModal] = useState(false);
  const [showNewView, setShowNewView] = useState(false);

  const [id, setId] = useState("");
  const storeId = id.toString();
  const [storeData, setStoreData] = useState([]);
  const [selectedImage, setSelectedIMage] = useState(null);
  const [storelatitude, setStoreLatitude] = useState("");
  const [storelongitude, setStoreLongitude] = useState("");
  const [status, setStatus] = useState("");
  console.log({ status }, "********");
  const [num, setNum] = useState("");
  const [detils, setDetails] = useState("");
  //battry
  const [batteryPercentage, setBatteryPercentage] = useState(null);
  useEffect(() => {
    DeviceInfo.getBatteryLevel()
      .then((batteryPercent) => {
        setBatteryPercentage(Math.round(batteryPercent * 100));
      })
      .catch((error) => {
        console.error("Error getting battery percentage:", error);
      });
  }, []);
  //uniq id
  const [uniqueId, setUniqueId] = useState(null);
  useEffect(() => {
    DeviceInfo.getUniqueId()
      .then((id) => {
        setUniqueId(id);
      })
      .catch((error) => {
        console.error("Error getting unique ID:", error);
      });
  }, []);
  const [speed, setSpeed] = useState(0);
  useEffect(() => {
    const watchPositionId = Geolocation.watchPosition(
      (position) => {
        const currentSpeed = position.coords.speed;
        if (currentSpeed !== null) {
          setSpeed(currentSpeed);
        } else {
          setSpeed("Speed data not available");
        }
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );

    return () => {
      Geolocation.clearWatch(watchPositionId);
    };
  }, []);

  const [token, setToken] = useState("");
  const [empId, setEmpId] = useState("");

  const dispatch = useDispatch();

  const getToken = async () => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        setToken(data);
        dispatch(StoreListAction(data, navigation));
        dispatch(MerStoreListAction(data, navigation));
        dispatch(DaynamicFormAction(data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getUser = async () => {
    AsyncStorage.getItem(DB.USERID)
      .then((data) => {
        setEmpId(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const storeListData = useSelector(
    (state) => state?.storeListReducer?.storeList?.store
  );

  const merStoreListData = useSelector(
    (state) => state?.merstoreListReducer?.storeList?.store?.plannedStores
  );

  const merStoreListDataUnPlanned = useSelector(
    (state) => state?.merstoreListReducer?.storeList?.store?.unPlannedStores
  );

  const storeDetails = useSelector(
    (state) => state?.storeDetailsReducer?.storeDetails
  );

  // console.log(merStoreListData, "merStoreListData========");
  // console.log(merStoreListDataUnPlanned, "merStoreListDataUnPlanned========");

  const isLoading = useSelector((state) => state?.storeListReducer?.isLoading);
  console.log(isLoading, "isLoading****************-------");

  const closeModal = () => {
    setModalVisible(false);
    setIsYes("");
    // setIsValue("");
  };
  const closeModals = () => {
    setModal(false);
    setIsYes("");
    // setIsValue("");
  };

  const handleImageCaptured = (uri) => {
    console.log("Captured image URI:", uri);
    setSelfiImage(uri);
    // Set the captured image URI
    setModalSelfi(false); // Close the modal
  };

  const handleReportLocationIssue = async () => {
    try {
      const now = new Date();
      const dateStr = now.toLocaleDateString();
      const timeStr = now.toLocaleTimeString();
      const storeTitle = name || `Store #${storeId}`;
      const reportMessage =
        `[LOCATION ISSUE DISPUTE REPORT]\n` +
        `----------------------------------------\n` +
        `Store: ${storeTitle} (ID: ${storeId})\n` +
        `Current Location: ${currentLatitude}, ${currentLongitude}\n` +
        `Store Location: ${storelatitude}, ${storelongitude}\n` +
        `Distance Away: ${distanceKMtwo} km (${distance} meters)\n` +
        `Date: ${dateStr}\n` +
        `Time: ${timeStr}\n` +
        `Issue: Promoter is at the store but app reports out of range.\n` +
        `----------------------------------------\n` +
        `Please verify and approve attendance.`;

      await Share.share({
        title: "Location Mismatch Report",
        message: reportMessage,
      });
    } catch (error) {
      console.log("Error sharing location dispute report:", error);
      Alert.alert("Report", "Unable to open share sheet. Please try again.");
    }
  };

  const handleShareAndSubmit = async (isOther = false) => {
    try {
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      const timeStr = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      const storeTitle = name || storeDetails?.store_name || `Store #${storeId}`;
      const lat = latitude || currentLatitude || "";
      const lon = longitude || currentLongitude || "";
      const displayStoreCode =
        storeDetails &&
        String(storeDetails.id) === String(storeId) &&
        storeDetails.store_code
          ? storeDetails.store_code
          : storeDetails?.store_code || storeId;

      const firstName = userProfile?.first_name || "";
      const lastName = userProfile?.last_name || "";
      const username =
        userProfile?.user_name ||
        (userProfile?.email ? userProfile.email.split("@")[0] : "") ||
        (userProfile?.id ? String(userProfile.id) : "");
      const fullName = `${firstName} ${lastName}`.trim();
      const promoterDisplayText = fullName
        ? username
          ? `${fullName} (${username})`
          : fullName
        : username || "";

      const storeArea = storeDetails?.location || area || "";
      const storeCity = storeDetails?.city || city || "";
      const storeState = storeDetails?.state || "";
      const rawLocation = [storeArea, storeCity, storeState].filter(Boolean);
      const seenLoc = new Set();
      const cleanLoc = [];
      for (const loc of rawLocation) {
        const trimmed = String(loc).trim();
        const lower = trimmed.toLowerCase();
        if (trimmed && !seenLoc.has(lower)) {
          seenLoc.add(lower);
          const formatted =
            trimmed === trimmed.toLowerCase()
              ? trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
              : trimmed;
          cleanLoc.push(formatted);
        }
      }
      const locationText =
        cleanLoc.length > 0 ? cleanLoc.join(", ") : storeTitle;

      let capturedUri = null;
      if (proofCardRef && proofCardRef.current) {
        try {
          capturedUri = await captureRef(proofCardRef.current, {
            format: "png",
            quality: 1,
          });
        } catch (captureErr) {
          console.log("Proof card capture error:", captureErr);
        }
      }

      const summaryMessage =
        `VIEWLYTICS VISIT SUMMARY\n` +
        `----------------------------------------\n` +
        `* Visit in progress\n` +
        `Store: ${storeTitle} (${displayStoreCode})\n` +
        `Status: Store Open\n\n` +
        `CHECK-IN: ${timeStr} (${dateStr})\n` +
        `STATUS: In store\n` +
        `CHECK-OUT: -- : -- (Awaiting checkout)\n\n` +
        `Location: ${locationText}\n` +
        (lat && lon ? `GPS: ${Number(lat).toFixed(4)}, ${Number(lon).toFixed(4)}\n` : "") +
        `Promoter: ${promoterDisplayText}\n` +
        `----------------------------------------\n` +
        `GPS-verified * auto-generated`;

      let shareOptions = {
        title: "Visit Proof",
      };

      if (capturedUri) {
        shareOptions.url = capturedUri;
      } else if (selfiImage) {
        shareOptions.url = selfiImage;
      }

      if (
        capturedUri &&
        Platform.OS === "android" &&
        NativeShare &&
        NativeShare.shareImage
      ) {
        try {
          await NativeShare.shareImage({
            url: capturedUri,
            filePath: capturedUri,
            message: "",
            text: "",
            title: "Visit Proof",
            dialogTitle: "Share Store Check-In Proof",
          });
        } catch (nativeErr) {
          console.log("NativeShare error, fallback to Share.share:", nativeErr);
          await Share.share(shareOptions);
        }
      } else if (capturedUri || selfiImage) {
        await Share.share(shareOptions);
      } else {
        await Share.share({
          title: "Visit Proof",
          message: summaryMessage,
        });
      }
    } catch (e) {
      console.log("Share error:", e);
    }

    CheckInDetailsHandle();
    MapDetailsHandle();
    if (isOther) {
      setShowNewView(false);
    }
  };

  const isStoreSubmitDisabled = () => {
    if (isLoadings) return true;
    if (Profilerole === "merchandiser" && allowed === "ok") {
      if (isYes === "2") {
        return isYes === "" || selfiImage === "" || isValue === "";
      }
      return selfiImage === "" || isYes === "";
    }
    return selfiImage === "" || isValue === "";
  };

  const isOtherSubmitDisabled = () => {
    if (isLoadings) return true;
    if (Profilerole === "merchandiser" && allowed === "ok") {
      if (isYes === "2") {
        return detils === "" || isYes === "" || selfiImage === "" || isValue === "";
      }
      return detils === "" || selfiImage === "" || isYes === "";
    }
    return status === "0"
      ? detils === "" || selfiImage === "" || isValue === ""
      : selfiImage === "" || isValue === "";
  };

  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);

      ImagePicker.openCropper({
        path: data.uri,
        width: 300,
        height: 400,
      })
        .then((croppedImage) => {
          setImage1(croppedImage);
          setImage(croppedImage.path);
          setSelfiImage(croppedImage.path);
          setModalSelfi(true);
          {
            status == 0 ? setModalVisible(false) : setModalSelfi(true);
          }

          setIsCamera(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const [isCamera, setIsCamera] = useState(false);
  const takePhoto = () => {
    setIsCamera(!isCamera);
    setModalVisible(false);
  };
  const [image, setImage] = useState(null);
  console.log({ image });
  const [image1, setImage1] = useState(null);
  console.log({ image1 });
  const takeOtherImage = () => {
    setImage(null);
    setImage1(null);
    setIsCamera(true);
    setModalVisible(false);
    setShowOtherModal(true);
  };

  const CheckInDetailsHandle = () => {
    const formattedCheckInTime = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    AsyncStorage.setItem(DB.CHECK_IN_TIME, formattedCheckInTime);

    let imgObj = image1
      ? {
          name: "name",
          type: image1.mime,
          uri:
            Platform.OS === "android"
              ? selfiImage
              : selfiImage.replace("file://", ""),
        }
      : "";
    console.log({ imgObj });
    dispatch(
      CheckInAction(
        token,
        imgObj,
        navigation,
        id,
        currentLatitude,
        currentLongitude,
        name,
        detils,
        isYes,
        isValue,
        // currentAddress,
        ipAddresss
      )
    );
  };
  const MapDetailsHandle = () => {
    dispatch(
      CreateMapDetailsAction(
        token,
        storeId.toString(),
        currentLatitude.toString(),
        currentLongitude.toString(),
        batteryPercentage.toString(),
        uniqueId,
        speed.toString(),
        navigation
      )
    );
  };

  useEffect(() => {
    getToken();
    getUser();
  }, []);
  const [searchText, setSearchText] = useState("");
  const [filteredStoreList, setFilteredStoreList] = useState(storeListData);

  const [storeList, setStoreList] = useState(storeListData);

  useEffect(() => {
    setStoreData(storeListData);
    setStoreList(storeListData);
    setFilteredStoreList(storeListData);
  }, [storeListData, storeList]);

  const [merstoreList, setMerStoreList] = useState(merStoreListData);
  console.log(merstoreList, "merstoreList-------");
  const [merstoreListUnplanned, setMerStoreListUnplanned] = useState(
    merstoreListUnplanned
  );

  //short data
  const [searchTextMer, setSearchTextMer] = useState("");
  const filteredDataMer = searchTextMer
    ? merstoreListUnplanned?.filter((item) =>
        item.label.toLowerCase().includes(searchTextMer.toLowerCase())
      )
    : merstoreListUnplanned;

  const filteredDataMerPlann = searchTextMer
    ? merstoreList?.filter((item) =>
        item.label.toLowerCase().includes(searchTextMer.toLowerCase())
      )
    : merstoreList;
  // console.log(merstoreList, "merstoreList****======----");
  // console.log(merstoreListUnplanned, "merstoreListUnplanned****======----");

  const [filteredMerStoreList, setFilteredMerStoreList] =
    useState(merStoreListData);

  useEffect(() => {
    setMerStoreList(merStoreListData);
    setFilteredMerStoreList(storeListData);
    setMerStoreListUnplanned(merStoreListDataUnPlanned);
  }, [merStoreListData, merstoreList]);
  const verified = "1";
  const SoreVerifiedHandle = () => {
    dispatch(
      VerifiedStoreAction(token, verified, id, latitude, longitude, navigation)
    );
  };

  const [name, setName] = useState("");
  const [zone, setZone] = useState("");
  const [city, setCity] = useState("");
  const [area, setAerea] = useState("");

  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentLatitude, setcurrentLatitude] = useState("");
  const latitude = currentLatitude.toString();
  const [currentLongitude, setcurrentLongitude] = useState("");

  const longitude = currentLongitude.toString();
  Geolocation.getCurrentPosition((data) => {
    setcurrentLatitude(data.coords.latitude);
  });
  Geolocation.getCurrentPosition((data) => {
    setcurrentLongitude(data.coords.longitude);
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      (error) => {
        console.log(error.message);
      }
    );
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

  const mapRef = useRef();
  const isLoadings = useSelector((state) => state?.checkIn?.isLoading);
  const isLoadingss = useSelector(
    (state) => state?.verifedStoreReducer?.isLoading
  );

  ///distance

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c * 1000;

    return distance;
  };

  let currentLat = currentLatitude;
  let currentLon = currentLongitude;
  let storeLat = storelatitude;
  let storeLon = storelongitude;
  let distance = haversineDistance(currentLat, currentLon, storeLat, storeLon);

  let distanceKM = distance / 1000;
  let distanceKMtwo = distanceKM.toFixed();

  useEffect(() => {
    handleSearch();
  }, [searchText]);

  const handleSearch = () => {
    const filteredData = storeList?.filter((item) =>
      item.label.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredStoreList(filteredData);
  };
  const Profilerole = useSelector(
    (state) => state?.MyProfile?.myProfileData?.data?.userProfile?.role_name
  );
  const userProfile = useSelector(
    (state) => state?.MyProfile?.myProfileData?.data?.userProfile
  );
  // const allowed = "ok";
  const allowedStatus = useSelector(
    (state) => state?.dyanamicFromReducer?.allDetails?.data?.store_status
  );

  const [allowed, setAllowed] = useState(allowedStatus == 1 ? "ok" : "");
  console.log(allowed, "allowed****");
  useEffect(() => {
    setAllowed(allowedStatus == 1 ? "ok" : "");
  }, [allowedStatus]);
  const StoreType = [
    { label: "Planned", value: "0" },
    { label: "UnPlanned", value: "1" },
  ];
  const [meetingdata, setMeetingdata] = useState(StoreType);
  const [valueMeeting, setValueMeeting] = useState("");
  const [openMeeting, setOpenMeeting] = useState(false);

  const Distancess = useSelector(
    (state) => state?.distanceReducer?.distanceDetails[0]?.Distance
  );

  const isErrorVisible = useSelector((state) => state?.errorReducer?.isError);
  const isErrorVisibleMsg = useSelector((state) => state?.errorReducer?.msg);

  useEffect(() => {
    if (isErrorVisible == true) {
      closeModal();
    }
  }, [isErrorVisible]);
  const closeModalss = () => {
    dispatch(ErrorAction(false, ""));
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <Header
          header={"Check in Screen"}
          iconStyle={styles.headerIcon}
          image={Images.back}
          onPress={() => navigation.goBack()}
        />
        <ServerScreen
          title={isErrorVisibleMsg}
          modalVisible={isErrorVisible}
          closeModal={() => {
            closeModalss();
          }}
        />
        <View style={styles.maincontainer}>
          <View style={styles.mainView}>
            {isLoading ? (
              <View style={styles.searchmainView}>
                <ActivityIndicator color={"blue"} size={"large"} />
              </View>
            ) : (
              <View>
                {Profilerole == "merchandiser" ? (
                  <View style={{ height: "100%" }}>
                    <TextInput
                      style={styles.searchtextinput}
                      placeholder="Search"
                      onChangeText={(text) => setSearchTextMer(text)}
                      value={searchTextMer}
                    />
                    <View style={{ marginBottom: 15 }}>
                      {/* <View
                      style={{
                        borderColor: COLORS.white,
                        padding: 0,
                        top: 10,
                        width: "100%",
                        alignSelf: "center",
                      }}
                    ></View> */}
                      <DropDownPicker
                        listMode="SCROLLVIEW"
                        scrollViewProps={{
                          nestedScrollEnabled: true,
                        }}
                        dropDownContainerStyle={{
                          borderColor: COLORS.white,
                          position: "relative",
                          top: 0,
                        }}
                        open={openMeeting}
                        value={valueMeeting}
                        items={meetingdata}
                        setOpen={setOpenMeeting}
                        setValue={setValueMeeting}
                        setItems={setMeetingdata}
                        style={{
                          borderColor: COLORS.white,
                          padding: 0,
                          top: 10,
                          width: "100%",
                          alignSelf: "center",
                        }}
                        placeholder="All"
                        placeholderStyle={[
                          styles.idText,
                          {
                            right: 0,
                          },
                        ]}
                        textStyle={[
                          styles.idTextInput,
                          {
                            marginLeft: 0,
                            right: 0,
                          },
                        ]}
                      />
                    </View>
                    <View>
                      <View>
                        <FlatList
                          // data={filteredDataMer}
                          data={
                            valueMeeting == "0"
                              ? filteredDataMerPlann
                              : filteredDataMer
                          }
                          contentContainerStyle={{ paddingBottom: 300 }}
                          showsVerticalScrollIndicator={false}
                          ListEmptyComponent={
                            <View style={styles.NoDataView}>
                              <Image
                                source={Images.relocation}
                                style={styles.noStoreicon}
                              />
                              <Text style={styles.nostoreText}>
                                No Store Assign !!!
                              </Text>
                              <View style={styles.msgView}>
                                <Text style={styles.msgText}>
                                  There is no store assigned to this account
                                  please contact your manager.
                                </Text>
                              </View>
                            </View>
                          }
                          keyExtractor={(item) => item?.value.toString()}
                          renderItem={({ item }) => {
                            return (
                              <View>
                                <TouchableOpacity
                                  style={styles.maintable}
                                  disabled={num == "1" ? true : false}
                                  onPress={() => {
                                    setId(item.value);
                                    setName(item.label);
                                    setZone(item.zone);
                                    setCity(item.city);
                                    setAerea(item.state);
                                    setStoreLatitude(item.lat);
                                    setStoreLongitude(item.long);
                                    setSelectedIMage({ uri: item.image });
                                    setNum("1");
                                    dispatch(StoreDetails(token, item.value));
                                    item.verified == "0"
                                      ? setModal(true)
                                      : setShowNewView(true);
                                  }}
                                >
                                  <View style={styles.listView}>
                                    <View style={styles.imageView}>
                                      <Image
                                        resizeMode="contain"
                                        source={{ uri: item.image }}
                                        style={styles.imageStyle}
                                      />
                                    </View>
                                    <View style={styles.textView}>
                                      <Text style={styles.tabletext}>
                                        {item.label}
                                      </Text>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            );
                          }}
                        />
                        {showNewView && (
                          <View style={styles.fristNewModalView}>
                            <Text style={styles.storename}>
                              Please Select Your Type Of CheckIn
                            </Text>
                            <View
                              style={{
                                flexDirection: "row",
                                margin: 20,
                              }}
                            >
                              <View
                                style={{
                                  width: 100,
                                }}
                              >
                                <Image
                                  source={selectedImage}
                                  style={styles.modalimg}
                                  resizeMode="cover"
                                />
                              </View>
                              <Text
                                style={[
                                  styles.storename,
                                  { marginLeft: 10, fontWeight: "800" },
                                ]}
                              >
                                {name}
                              </Text>
                            </View>

                            <View style={styles.threeButton}>
                              <TouchableOpacity
                                onPress={() => {
                                  setModalVisible(true);
                                  setStatus("1");
                                }}
                                style={[
                                  styles.CheckinView,
                                  { backgroundColor: "green" },
                                ]}
                              >
                                <Text style={styles.ViewText}>
                                  Store CheckIn
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={[
                                  styles.CheckinView,
                                  { backgroundColor: "#82CD47" },
                                ]}
                                onPress={() => {
                                  setShowOtherModal(true);
                                  setStatus("0");
                                  setDetails("");
                                  setImage1("");
                                }}
                              >
                                <Text style={styles.ViewText}>
                                  Other CheckIn
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={[
                                  styles.CheckinView,
                                  { backgroundColor: "red" },
                                ]}
                                onPress={() => {
                                  setShowNewView(false);
                                  setNum("");
                                  setDetails("");
                                }}
                              >
                                <Text style={styles.ViewText}>Cancel</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                ) : (
                  <View>
                    {storeList?.length > 0 ? (
                      <View style={{ height: "100%" }}>
                        <FlatList
                          data={filteredStoreList}
                          contentContainerStyle={{ paddingBottom: 300 }}
                          ListHeaderComponent={
                            <TextInput
                              style={styles.searchtextinput}
                              placeholder="Search"
                              onChangeText={(text) => setSearchText(text)}
                              value={searchText}
                            />
                          }
                          showsVerticalScrollIndicator={false}
                          keyExtractor={(item) => item?.value.toString()}
                          renderItem={({ item }) => {
                            return (
                              <View>
                                <TouchableOpacity
                                  style={styles.maintable}
                                  disabled={num == "1" ? true : false}
                                  onPress={() => {
                                    setId(item.value);
                                    setName(item.label);
                                    setZone(item.zone);
                                    setCity(item.city);
                                    setAerea(item.state);
                                    setStoreLatitude(item.lat);
                                    setStoreLongitude(item.long);
                                    setSelectedIMage({ uri: item.image });
                                    setNum("1");
                                    dispatch(StoreDetails(token, item.value));

                                    item.verified == "0"
                                      ? setModal(true)
                                      : setShowNewView(true);
                                  }}
                                >
                                  <View style={styles.listView}>
                                    <View style={styles.imageView}>
                                      <Image
                                        resizeMode="contain"
                                        source={{ uri: item.image }}
                                        style={styles.imageStyle}
                                      />
                                    </View>
                                    <View style={styles.textView}>
                                      <Text style={styles.tabletext}>
                                        {item.label}
                                      </Text>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            );
                          }}
                        />

                        {showNewView && (
                          <View style={styles.viewModal}>
                            <Text style={styles.storename}>
                              Please Select Your Type Of CheckIn
                            </Text>
                            <View
                              style={{
                                flexDirection: "row",
                                margin: 20,
                              }}
                            >
                              <View
                                style={{
                                  width: 100,
                                }}
                              >
                                <Image
                                  source={selectedImage}
                                  style={styles.modalimg}
                                  resizeMode="cover"
                                />
                              </View>
                              <Text
                                style={[
                                  styles.storename,
                                  { marginLeft: 10, fontWeight: "800" },
                                ]}
                              >
                                {name}
                              </Text>
                            </View>

                            <View style={styles.threeButton}>
                              <TouchableOpacity
                                onPress={() => {
                                  setStatus("1");
                                  setModalVisible(true);
                                }}
                                style={[
                                  styles.CheckinView,
                                  { backgroundColor: "green" },
                                ]}
                              >
                                <Text style={styles.ViewText}>
                                  Store CheckIn
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={[
                                  styles.CheckinView,
                                  { backgroundColor: "#82CD47" },
                                ]}
                                onPress={() => {
                                  setShowOtherModal(true);
                                  setStatus("0");
                                  setDetails("");
                                  setImage1("");
                                }}
                              >
                                <Text style={styles.ViewText}>
                                  Other CheckIn
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={[
                                  styles.CheckinView,
                                  { backgroundColor: "red" },
                                ]}
                                onPress={() => {
                                  setShowNewView(false);
                                  setNum("");
                                  setDetails("");
                                }}
                              >
                                <Text style={styles.ViewText}>Cancel</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        )}
                      </View>
                    ) : (
                      <View>
                        <View style={styles.NoDataView}>
                          <Image
                            source={Images.relocation}
                            style={styles.noStoreicon}
                          />
                          <Text style={styles.nostoreText}>
                            No Store Assign !!!
                          </Text>
                          <View style={styles.msgView}>
                            <Text style={styles.msgText}>
                              There is no store assigned to this account please
                              contact your manager.
                            </Text>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                )}
              </View>
            )}

            <Modal
              animationType="slide"
              transparent={true}
              visible={isCamera}
              onRequestClose={() => {
                setIsCamera(!isCamera);
              }}
            >
              <View style={styles.ModalBackTouch}>
                <View style={styles.modalbackground}>
                  <RNCamera
                    ref={(ref) => setCamera(ref)}
                    style={{ flex: 1 }}
                    type={RNCamera.Constants.Type.front}
                  >
                    <View style={styles.cheinimgView}>
                      <TouchableOpacity
                        onPress={takePicture}
                        style={styles.checkinimg}
                      >
                        <Image
                          source={Images.buttoncapchar}
                          style={styles.capcharimg}
                        />
                      </TouchableOpacity>
                    </View>
                  </RNCamera>
                </View>
              </View>
            </Modal>
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
                onPress={() => {
                  setImage(null);
                }}
              >
                <View
                  style={{
                    width: "95%",
                    maxHeight: "92%",
                    backgroundColor: "#FFFFFF",
                    borderRadius: 24,
                    overflow: "hidden",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.25,
                    shadowRadius: 12,
                    elevation: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      paddingTop: 10,
                      paddingRight: 12,
                      paddingBottom: 4,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        closeModal();
                        setImage(null);
                      }}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: "#F1F5F9",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={Images.cross}
                        style={{ width: 14, height: 14, tintColor: "#475569" }}
                      />
                    </TouchableOpacity>
                  </View>

                  <ScrollView
                    contentContainerStyle={{
                      alignItems: "center",
                      paddingHorizontal: 8,
                      paddingBottom: 20,
                    }}
                    showsVerticalScrollIndicator={false}
                  >
                    <VisitProofCard
                      ref={proofCardRef}
                      storeTitle={name || storeDetails?.store_name || "Store"}
                      storeCode={
                        storeDetails &&
                        String(storeDetails.id) === String(storeId) &&
                        storeDetails.store_code
                          ? storeDetails.store_code
                          : storeDetails?.store_code || storeId
                      }
                      area={storeDetails?.location || area || ""}
                      city={storeDetails?.city || city || ""}
                      state={storeDetails?.state || ""}
                      firstName={userProfile?.first_name || ""}
                      lastName={userProfile?.last_name || ""}
                      username={
                        userProfile?.user_name ||
                        (userProfile?.email ? userProfile.email.split("@")[0] : "") ||
                        (userProfile?.id ? String(userProfile.id) : "")
                      }
                      promoterName={
                        userProfile
                          ? `${userProfile.first_name || ""} ${userProfile.last_name || ""}`.trim()
                          : ""
                      }
                      coordsText={
                        (latitude || currentLatitude) && (longitude || currentLongitude)
                          ? `${Number(latitude || currentLatitude).toFixed(4)}, ${Number(
                              longitude || currentLongitude
                            ).toFixed(4)}`
                          : ""
                      }
                      imageUrl={selfiImage}
                      date={new Date().toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                      time={new Date().toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                      onPhotoPress={() => takePhoto()}
                    />

                    {selfiImage !== "" ? (
                      <TouchableOpacity
                        onPress={() => takePhoto()}
                        style={{
                          marginTop: 10,
                          marginBottom: 6,
                          paddingVertical: 6,
                          paddingHorizontal: 16,
                          backgroundColor: "#F1F5F9",
                          borderRadius: 8,
                          borderWidth: 1,
                          borderColor: "#CBD5E1",
                          alignSelf: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#334155",
                            fontSize: 12,
                            fontWeight: "700",
                          }}
                        >
                          Retake Photo
                        </Text>
                      </TouchableOpacity>
                    ) : null}

                    <View
                      style={[
                        styles.buttonViews,
                        { width: "100%", alignItems: "center", marginTop: 4 },
                      ]}
                    >
                      {Profilerole == "merchandiser" && allowed == "ok" ? (
                        <>
                          <Text
                            style={{
                              color: COLORS.black,
                              fontWeight: "600",
                              marginBottom: 4,
                            }}
                          >
                            Store Status
                          </Text>
                          <YesNo
                            isYes={isYes}
                            onYesClick={() => handleYesClick("1")}
                            onNoClick={() => handleNoClick("2")}
                          />
                          {isYes == "2" ? (
                            <View style={{ alignItems: "center" }}>
                              <Text
                                style={{
                                  color: "black",
                                  paddingTop: 10,
                                  fontWeight: "600",
                                  marginBottom: 4,
                                }}
                              >
                                Merchandising Status
                              </Text>
                              <OpenClose
                                isYes={isValue}
                                onYesClick={() => handleYClick("1")}
                                onNoClick={() => handleNClick("2")}
                              />
                            </View>
                          ) : (
                            <View></View>
                          )}
                        </>
                      ) : (
                        <View style={{ alignItems: "center" }}>
                          <Text
                            style={{
                              color: "black",
                              paddingTop: 6,
                              fontWeight: "600",
                              marginBottom: 4,
                            }}
                          >
                            Merchandising Status
                          </Text>
                          <OpenClose
                            isYes={isValue}
                            onYesClick={() => handleYClick("1")}
                            onNoClick={() => handleNClick("2")}
                          />
                        </View>
                      )}

                      {distance >= Distancess ? (
                        <View style={{ alignItems: "center", width: "100%", paddingHorizontal: 12, marginTop: 8 }}>
                          <Text style={[styles.locationNote, { color: "#D32F2F", fontSize: 12 }]}>
                            Notice: Location is outside store perimeter ({distanceKMtwo} km away).
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </ScrollView>

                  {/* Fixed Bottom Action Row */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      backgroundColor: "#FFFFFF",
                      borderTopWidth: 1,
                      borderTopColor: "#F1F5F9",
                    }}
                  >
                    <TouchableOpacity
                      disabled={isStoreSubmitDisabled()}
                      style={[
                        isStoreSubmitDisabled()
                          ? styles.grayButton
                          : styles.button,
                        { marginHorizontal: 6, width: 110, marginTop: 0 },
                      ]}
                      onPress={() => {
                        CheckInDetailsHandle();
                        MapDetailsHandle();
                      }}
                    >
                      {isLoadings ? (
                        <ActivityIndicator
                          color={COLORS.white}
                          style={styles.submmitbutton}
                        />
                      ) : (
                        <Text style={styles.submmitbutton}>Submit</Text>
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity
                      disabled={isStoreSubmitDisabled()}
                      style={[
                        isStoreSubmitDisabled()
                          ? styles.grayButton
                          : styles.button,
                        {
                          marginHorizontal: 6,
                          width: 140,
                          marginTop: 0,
                          backgroundColor: isStoreSubmitDisabled()
                            ? COLORS.gray
                            : "#2E7D32",
                        },
                      ]}
                      onPress={() => handleShareAndSubmit(false)}
                    >
                      {isLoadings ? (
                        <ActivityIndicator
                          color={COLORS.white}
                          style={styles.submmitbutton}
                        />
                      ) : (
                        <Text style={styles.submmitbutton}>
                          Submit & Share
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modal}
              onRequestClose={() => {
                setModal(modal);
              }}
            >
              <View style={styles.ModalBackTouchs}>
                <View style={styles.modalViews}>
                  <TouchableOpacity
                    style={styles.crossButton}
                    onPress={() => {
                      closeModals();
                    }}
                  >
                    <Image source={Images.cross} style={styles.croissIcon} />
                  </TouchableOpacity>
                  <View style={styles.mapView}>
                    {currentLocation && (
                      <MapView
                        ref={mapRef}
                        style={StyleSheet.absoluteFill}
                        zoomEnabled={true}
                        showsUserLocation={true}
                        initialRegion={{
                          latitude: currentLocation.latitude,
                          longitude: currentLocation.longitude,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                        }}
                      >
                        <Marker coordinate={currentLocation}></Marker>
                      </MapView>
                    )}
                  </View>
                  <View style={styles.container}>
                    <MapView
                      style={styles.map}
                      initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                    />
                  </View>
                  <View style={styles.summarymodal}>
                    <View style={styles.imgsconte}>
                      <View style={styles.imgConteiner}>
                        <Image
                          source={selectedImage}
                          style={styles.modalimg}
                          resizeMode="cover"
                        />
                      </View>
                      <View style={styles.cardTextView}>
                        <View style={styles.ModalContainer}>
                          <Text style={styles.listTexttwo}>{name}</Text>
                        </View>
                        <View style={styles.ModalContainer}>
                          <Text style={styles.listTexttwo}>{city}</Text>
                        </View>
                        <View style={styles.ModalContainer}>
                          <Text style={styles.listTexttwo}>{zone}</Text>
                        </View>
                        <View style={styles.ModalContainer}>
                          <Text style={styles.listTexttwo}>{area}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.NoteText}>
                    *This Store Is Not Verifed Are you Sure You Verified Store
                  </Text>
                  <View style={styles.buttonView}>
                    <TouchableOpacity
                      style={styles.TouchButton}
                      // disabled={isLoadingss == true ? true : false}
                      onPress={() => {
                        SoreVerifiedHandle();
                      }}
                    >
                      {isLoadingss ? (
                        <ActivityIndicator
                          color={COLORS.white}
                          style={[
                            styles.submmitbutton,
                            { width: 100, alignItems: "center" },
                          ]}
                        />
                      ) : (
                        <Text
                          style={[
                            styles.submmitbutton,
                            {
                              width: 100,
                              alignSelf: "center",
                              textAlign: "center",
                            },
                          ]}
                        >
                          Verified
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <Modal
              animationType="slide"
              transparent={true}
              visible={showOtherModal}
              onRequestClose={() => {
                setShowOtherModal(false);
              }}
            >
              <View style={styles.ModalBackTouchs}>
                <View style={[styles.modalViews, { paddingVertical: 30 }]}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowOtherModal(false);
                      setImage(null);
                    }}
                    style={{ position: "absolute", right: 10, top: 10 }}
                  >
                    <Image
                      source={Images.cross}
                      style={{ width: 25, height: 25 }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <View>
                      <TouchableOpacity
                        style={styles.capcharbutton}
                        onPress={() => takeOtherImage()}
                      >
                        {selfiImage == "" ? (
                          <Image
                            source={Images.capchar}
                            style={styles.Modalimages}
                          />
                        ) : (
                          <Image
                            resizeMode="contain"
                            source={{ uri: selfiImage }}
                            style={[
                              styles.Modalimages,
                              { alignSelf: "center" },
                            ]}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                    <View style={styles.textInputViewss}>
                      <TextInput
                        placeholder="Purpose"
                        placeholderTextColor={"black"}
                        onChangeText={(detils) => setDetails(detils)}
                        style={styles.input}
                      />
                    </View>

                    {Profilerole == "merchandiser" && allowed == "ok" ? (
                      <>
                        <Text style={{ color: COLORS.black }}>
                          Store Status
                        </Text>
                        <YesNo
                          isYes={isYes}
                          onYesClick={() => handleYesClick("1")}
                          onNoClick={() => handleNoClick("2")}
                        />
                        {isYes == "2" ? (
                          <View>
                            <Text style={{ color: "black", paddingTop: 10 }}>
                              Merchandising Status
                            </Text>
                            <OpenClose
                              isYes={isValue}
                              onYesClick={() => handleYClick("1")}
                              onNoClick={() => handleNClick("2")}
                            />
                          </View>
                        ) : (
                          <View></View>
                        )}
                      </>
                    ) : (
                      <View>
                        <Text style={{ color: "black", paddingTop: 10 }}>
                          Merchandising Status
                        </Text>
                        <OpenClose
                          isYes={isValue}
                          onYesClick={() => handleYClick("1")}
                          onNoClick={() => handleNClick("2")}
                        />
                      </View>
                    )}
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                      }}
                    >
                      <TouchableOpacity
                        disabled={isOtherSubmitDisabled()}
                        style={[
                          isOtherSubmitDisabled()
                            ? styles.grayButton
                            : styles.button,
                          { marginHorizontal: 6, width: 110 },
                        ]}
                        onPress={() => {
                          CheckInDetailsHandle();
                          MapDetailsHandle();
                          setShowNewView(false);
                        }}
                      >
                        {isLoadings ? (
                          <ActivityIndicator
                            color={COLORS.white}
                            style={styles.submmitbutton}
                          />
                        ) : (
                          <Text style={styles.submmitbutton}>Submit</Text>
                        )}
                      </TouchableOpacity>

                      <TouchableOpacity
                        disabled={isOtherSubmitDisabled()}
                        style={[
                          isOtherSubmitDisabled()
                            ? styles.grayButton
                            : styles.button,
                          {
                            marginHorizontal: 6,
                            width: 140,
                            backgroundColor: isOtherSubmitDisabled()
                              ? COLORS.gray
                              : "#2E7D32",
                          },
                        ]}
                        onPress={() => handleShareAndSubmit(true)}
                      >
                        {isLoadings ? (
                          <ActivityIndicator
                            color={COLORS.white}
                            style={styles.submmitbutton}
                          />
                        ) : (
                          <Text style={styles.submmitbutton}>
                            Submit & Share
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
      {selfiImage !== "" && modalSelfi && (
        <ImageWithText
          title={name}
          storeId={
            storeDetails &&
            String(storeDetails.id) === String(storeId) &&
            storeDetails.store_code
              ? storeDetails.store_code
              : storeDetails?.store_code || storeId
          }
          city={city}
          area={area}
          userName={
            userProfile
              ? `${userProfile.first_name || ""} ${userProfile.last_name || ""}`.trim() +
                (userProfile.id ? ` (${userProfile.id})` : "")
              : ""
          }
          lat={latitude || currentLatitude}
          lon={longitude || currentLongitude}
          date={new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
          time={new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
          imageUrl={selfiImage}
          onClose={(uri) => {
            handleImageCaptured(uri);
            {
              status == "1" ? setModalVisible(true) : null;
            }
          }}
        />
      )}
    </>
  );
};

export default CheckInScreen;
