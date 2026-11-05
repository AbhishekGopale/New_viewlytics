import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Alert,
  Platform,
  ActivityIndicator,
  NativeModules,
  Share,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocation from "@react-native-community/geolocation";
import DeviceInfo from "react-native-device-info";
import ImagePicker from "react-native-image-crop-picker";
import { captureRef } from "react-native-view-shot";
import { Images } from "../../assets/images/map";
import { DB } from "../../database";
import { CheckOutAction } from "../../redux/actions/checkOutAction";
import VisitProofCard from "../../components/VisitProofCard/VisitProofCard";
import { styles } from "./TodayActivityScreenStyle";

const { NativeShare } = NativeModules;

const ACTIVITY_OPTIONS = [
  "Store",
  "Tea Break",
  "Lunch Break",
  "Meeting",
  "Market Visit",
];

const TodayActivityScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // Mode and Dropdown State
  const [activeMode, setActiveMode] = useState("Store");
  const [selectedType, setSelectedType] = useState("");
  const [showError, setShowError] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  // Check-Out Submit Modal State (Image 2)
  const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [checkoutPhoto, setCheckoutPhoto] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const checkoutProofCardRef = useRef(null);

  // Store & Promoter Info
  const [storeName, setStoreName] = useState("Store");
  const [storeCode, setStoreCode] = useState("");
  const [storeLocation, setStoreLocation] = useState("");
  const [storeCity, setStoreCity] = useState("");
  const [storeState, setStoreState] = useState("");
  const [checkInTimeString, setCheckInTimeString] = useState("");
  const [userCheckInId, setUserCheckInId] = useState("");
  const [token, setToken] = useState("");
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [ipAddress, setIpAddress] = useState("");

  const userProfile = useSelector(
    (state) => state?.MyProfile?.myProfileData?.data?.userProfile
  );

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      // Load saved mode
      const savedMode = await AsyncStorage.getItem("@active_activity_mode");
      if (savedMode) {
        setActiveMode(savedMode);
      }

      // Load store details
      const storedName = await AsyncStorage.getItem(DB.STORE_NAME);
      const storedDetailsStr = await AsyncStorage.getItem(DB.STORE_DETAILS);
      const storedId = await AsyncStorage.getItem(DB.STORE_ID);
      const storedCheckInTime = await AsyncStorage.getItem(DB.CHECK_IN_TIME);
      const storedCheckInId = await AsyncStorage.getItem(DB.USER_CHECK_IN_ID);
      const storedToken = await AsyncStorage.getItem(DB.TOKEN);

      if (storedCheckInTime) {
        setCheckInTimeString(storedCheckInTime);
      }
      if (storedCheckInId) {
        setUserCheckInId(storedCheckInId);
      }
      if (storedToken) {
        setToken(storedToken);
      }

      if (storedDetailsStr) {
        try {
          const parsed = JSON.parse(storedDetailsStr);
          setStoreName(parsed.store_name || storedName || "Store");
          setStoreCode(parsed.store_code || storedId || "");
          setStoreLocation(parsed.location || "");
          setStoreCity(parsed.city || "");
          setStoreState(parsed.state || "");
        } catch (pe) {
          setStoreName(storedName || "Store");
          setStoreCode(storedId || "");
        }
      } else {
        setStoreName(storedName || "Store");
        setStoreCode(storedId || "");
      }
    } catch (e) {
      console.log("Error loading TodayActivity data:", e);
    }

    // Fetch IP and Location
    try {
      const ip = await DeviceInfo.getIpAddress();
      setIpAddress(ip);
    } catch (ie) {
      console.log("Error getting IP address:", ie);
    }

    Geolocation.getCurrentPosition(
      (pos) => {
        if (pos && pos.coords) {
          setCurrentLatitude(pos.coords.latitude);
          setCurrentLongitude(pos.coords.longitude);
        }
      },
      (err) => {
        console.log("Location error in TodayActivityScreen:", err);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const handleSwitchMode = async () => {
    if (!selectedType) {
      setShowError(true);
      return;
    }
    setShowError(false);
    setActiveMode(selectedType);
    try {
      await AsyncStorage.setItem("@active_activity_mode", selectedType);
    } catch (e) {
      console.log("Error saving active activity mode:", e);
    }
    Alert.alert("Status Updated", `You are now marked on ${selectedType}.`);
  };

  const openCheckoutSubmitModal = () => {
    // Refresh position before opening checkout modal
    Geolocation.getCurrentPosition(
      (pos) => {
        if (pos && pos.coords) {
          setCurrentLatitude(pos.coords.latitude);
          setCurrentLongitude(pos.coords.longitude);
        }
      },
      (err) => console.log("Position error:", err),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
    );
    setCheckoutPhoto(null);
    setCheckoutModalVisible(true);
  };

  const takeCheckoutPhoto = () => {
    ImagePicker.openCamera({
      width: 600,
      height: 800,
      cropping: true,
      compressImageQuality: 0.8,
    })
      .then((img) => {
        if (img && img.path) {
          setCheckoutPhoto(img.path);
        }
      })
      .catch((err) => {
        console.log("Checkout camera capture error:", err);
      });
  };

  const processCheckout = async (shouldShare = false) => {
    if (!checkoutPhoto) {
      Alert.alert(
        "Photo Required",
        "Please capture a check-out photo before submitting."
      );
      return;
    }

    setSubmitting(true);

    if (shouldShare && checkoutProofCardRef.current) {
      try {
        const capturedUri = await captureRef(checkoutProofCardRef.current, {
          format: "png",
          quality: 1,
        });

        if (
          capturedUri &&
          Platform.OS === "android" &&
          NativeShare &&
          NativeShare.shareImage
        ) {
          await NativeShare.shareImage({
            filePath: capturedUri,
            title: "Visit Check-Out Proof",
            dialogTitle: "Share Store Check-Out Proof",
          });
        } else if (capturedUri) {
          await Share.share({
            title: "Visit Check-Out Proof",
            url: capturedUri,
          });
        }
      } catch (shareErr) {
        console.log("Error sharing check-out proof card:", shareErr);
      }
    }

    try {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const formattedTime = `${hours}:${minutes}:${seconds}`;

      const resolvedCheckInId =
        userCheckInId || (await AsyncStorage.getItem(DB.USER_CHECK_IN_ID));
      const resolvedToken = token || (await AsyncStorage.getItem(DB.TOKEN));

      await dispatch(
        CheckOutAction(
          resolvedCheckInId,
          resolvedToken,
          formattedTime,
          currentLatitude || 0,
          currentLongitude || 0,
          ipAddress || ""
        )
      );

      // Clean active mode upon check-out
      await AsyncStorage.removeItem("@active_activity_mode");

      setCheckoutModalVisible(false);
      setCheckoutPhoto(null);

      Alert.alert("Success", "Check-out completed successfully.", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("HomeScreen");
          },
        },
      ]);
    } catch (submitErr) {
      console.log("Check-out submit error:", submitErr);
      Alert.alert(
        "Error",
        "Check-out failed. Please verify your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const displayNow = new Date();
  const displayDateStr = displayNow.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const displayTimeStr = displayNow.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <View style={styles.container}>
      {/* 1. Header Bar with Back Button (Image 1) */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image source={Images.back} style={styles.backIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* 2. Top Card: Today Activity & Green Clock Icon (Image 1) */}
        <View style={styles.topCard}>
          <Text style={styles.topCardText}>Today Activity</Text>
          <Image source={Images.TimerGroup} style={styles.timerIcon} />
        </View>

        {/* 3. Dropdown Picker Card: Please Select your Type (Image 1) */}
        <TouchableOpacity
          style={styles.dropdownCard}
          onPress={() => setIsPickerOpen(true)}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.dropdownText,
              selectedType ? styles.dropdownTextSelected : {},
            ]}
          >
            {selectedType || "Please Select your Type"}
          </Text>
          <Image source={Images.down} style={styles.downIcon} />
        </TouchableOpacity>

        {/* Error Validation: Please select your type first (Image 1) */}
        {showError ? (
          <Text style={styles.errorText}>Please select your type first</Text>
        ) : null}

        {/* 4. Center Green Text: You Are On Store (Image 1) */}
        <View style={styles.centerContainer}>
          <Text style={styles.centerStatusText}>You Are On {activeMode}</Text>
        </View>

        {/* 5. Bottom Action Buttons: Switch Mode & Check Out (Image 1) */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.switchModeButton}
            onPress={handleSwitchMode}
            activeOpacity={0.85}
          >
            <Text style={styles.switchModeText}>Switch Mode</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkOutButton}
            onPress={openCheckoutSubmitModal}
            activeOpacity={0.85}
          >
            <Text style={styles.checkOutText}>Check Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Dropdown Options Modal */}
      <Modal
        visible={isPickerOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsPickerOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setIsPickerOpen(false)}
        >
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerTitle}>Select Activity Type</Text>
            {ACTIVITY_OPTIONS.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.pickerItem}
                onPress={() => {
                  setSelectedType(item);
                  setShowError(false);
                  setIsPickerOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.pickerItemText,
                    selectedType === item ? styles.pickerItemTextActive : {},
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Check-Out Submit Modal (Image 2) */}
      <Modal
        visible={checkoutModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          if (!submitting) setCheckoutModalVisible(false);
        }}
      >
        <View style={styles.checkoutModalBackdrop}>
          <View style={styles.checkoutModalSheet}>
            <View style={styles.checkoutHeaderRow}>
              <Text style={styles.checkoutHeaderTitle}>
                Store Check-Out Proof
              </Text>
              <TouchableOpacity
                onPress={() => setCheckoutModalVisible(false)}
                disabled={submitting}
                style={styles.closeBtn}
              >
                <Image source={Images.close} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>

            <ScrollView
              contentContainerStyle={styles.cardScrollContent}
              showsVerticalScrollIndicator={false}
            >
              <VisitProofCard
                ref={checkoutProofCardRef}
                isCheckOut={true}
                storeTitle={storeName || "Store"}
                storeCode={storeCode || ""}
                area={storeLocation || ""}
                city={storeCity || ""}
                state={storeState || ""}
                coordsText={
                  currentLatitude && currentLongitude
                    ? `${Number(currentLatitude).toFixed(4)}, ${Number(currentLongitude).toFixed(4)}`
                    : ""
                }
                firstName={userProfile?.first_name || ""}
                lastName={userProfile?.last_name || ""}
                username={
                  userProfile?.user_name ||
                  (userProfile?.email ? userProfile.email.split("@")[0] : "") ||
                  (userProfile?.id ? String(userProfile.id) : "")
                }
                promoterName={userProfile?.name || ""}
                checkInTime={checkInTimeString || ""}
                checkOutTime={displayTimeStr}
                date={displayDateStr}
                time={displayTimeStr}
                imageUrl={checkoutPhoto}
                onPhotoPress={takeCheckoutPhoto}
              />

              <View style={styles.photoPromptRow}>
                {checkoutPhoto ? (
                  <TouchableOpacity
                    style={styles.retakeButton}
                    onPress={takeCheckoutPhoto}
                    disabled={submitting}
                  >
                    <Image source={Images.capchar} style={styles.cameraIcon} />
                    <Text style={styles.retakeText}>Retake Photo</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.capturePromptBtn}
                    onPress={takeCheckoutPhoto}
                    disabled={submitting}
                  >
                    <Image source={Images.capchar} style={styles.cameraIcon} />
                    <Text style={styles.capturePromptText}>
                      Tap to Capture Checkout Photo
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>

            <View style={styles.modalActionsRow}>
              <TouchableOpacity
                style={[styles.submitBtn, submitting && { opacity: 0.6 }]}
                onPress={() => processCheckout(false)}
                disabled={submitting}
                activeOpacity={0.85}
              >
                {submitting ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitBtnText}>Submit</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.submitShareBtn, submitting && { opacity: 0.6 }]}
                onPress={() => processCheckout(true)}
                disabled={submitting}
                activeOpacity={0.85}
              >
                {submitting ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitShareBtnText}>Submit & Share</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TodayActivityScreen;
