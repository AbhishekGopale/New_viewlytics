import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import { styles } from "./MyProfileStyle";
import DetailComponent from "../../components/DetailComponent/DetailComponent";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../../colors/colors";
import ImagePicker from "react-native-image-crop-picker";
import { ProfileUpdateAction } from "../../redux/actions/profileUpdateAction";
import { MyProfileDetilsAction } from "../../redux/actions/myProfileAction";
import ToastMessage from "../../components/ToastMessages/ToastMessages";

import DeviceInfo from "react-native-device-info";
import ImageWithText from "../../components/ImageWithText/ImageWithText";
import Geolocation from "@react-native-community/geolocation";

const MyProfile = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        // Handle the error here, provide feedback to the user, retry, etc.
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 }
    );
  };

  const handleImageCaptured = (uri) => {
    console.log("Captured image URI:", uri);
    setProfileImage(uri); // Set the captured image URI
    setModalVisible(false); // Close the modal
  };
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const version = DeviceInfo.getVersion();
  const [imageCap, setImageCap] = useState(null);
  const getToken = async () => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        setToken(data);
        dispatch(MyProfileDetilsAction(data));
      })
      .catch((e) => {});
  };

  useEffect(() => {
    getToken();
  }, []);

  const ProfileDetils = useSelector(
    (state) => state?.MyProfile?.myProfileData?.data?.userProfile?.last_name
  );
  const Profilename = useSelector(
    (state) => state?.MyProfile?.myProfileData?.data?.userProfile?.first_name
  );
  const Profilemobaile = useSelector(
    (state) => state?.MyProfile?.myProfileData?.data?.userProfile?.mobile_no
  );
  const Profileemail = useSelector(
    (state) => state?.MyProfile?.myProfileData?.data?.userProfile?.email
  );
  const Profilerole = useSelector((state) =>
    state?.MyProfile?.myProfileData?.data?.userProfile?.role_name.toUpperCase()
  );

  const reporting_manager = useSelector(
    (state) =>
      state?.MyProfile?.myProfileData?.data?.userProfile?.reporting_manager
  );
  const Profileimgss = useSelector(
    (state) => state?.MyProfile?.myProfileData?.data?.userProfile?.profile_image
  );
  const isLoading = useSelector((state) => state?.MyProfile?.isLoading);

  const Updatesucesss = useSelector(
    (state) => state?.profileUpdateReducer?.ProfileImageData?.message
  );

  const [profileImage, setProfileImage] = useState("");
  const tackPhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
    })
      .then((image) => {
        setImage1(image);
        setImage(image.path);
        setProfileImage(image.path);
        setModalVisible(true);
      })
      .catch((err) => {});
  };

  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");

  const ProfileUpdateHandle = () => {
    console.log("image1=============>", image1, profileImage);
    let imgObj = {
      name: "name",
      type: image1.mime,
      uri:
        Platform.OS === "android"
          ? profileImage
          : profileImage.replace("file://", ""),
    };

    dispatch(ProfileUpdateAction(token, imgObj, navigation));
  };
  const isLoadings = useSelector(
    (state) => state?.profileUpdateReducer?.isLoading
  );
  return (
    <View>
      {Updatesucesss?.length > 0 ? (
        <ToastMessage
          msg={Updatesucesss}
          isVisible={Updatesucesss}
          isError={Updatesucesss}
        />
      ) : null}
      <Header
        iconStyle={styles.headerIcon}
        image={Images.back}
        header={"My Profile"}
        onPress={() => navigation.goBack()}
      />
      {isLoading ? (
        <View
          style={{
            marginTop: 25,
          }}
        >
          <ActivityIndicator color={"blue"} size={"large"} />
        </View>
      ) : (
        <View style={styles.mainView}>
          {/* {isLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator size={"large"} color={COLORS.primary} />
          </View>
        ) : ( */}
          <ScrollView
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            //  scrollEnabled={false}
          >
            <View style={styles.mainViewtwo}>
              <View style={styles.imagecontainer}>
                <Image
                  source={
                    profileImage !== ""
                      ? { uri: profileImage }
                      : { uri: Profileimgss }
                  }
                  style={styles.imageStyle}
                />
                <TouchableOpacity
                  style={styles.TouchStyle}
                  onPress={() => {
                    tackPhoto();
                  }}
                >
                  <Image source={Images.editImage} style={styles.IcoStyle} />
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={profileImage == "" ? true : false}
                  style={profileImage == "" ? styles.grayButton : styles.button}
                  onPress={() => {
                    ProfileUpdateHandle();
                  }}
                >
                  {isLoadings ? (
                    <ActivityIndicator
                      color={COLORS.white}
                      style={styles.textstyle}
                    />
                  ) : (
                    <Text style={styles.textstyle}>Save Profile</Text>
                  )}
                </TouchableOpacity>
                <View style={styles.topTaxt}>
                  <Text style={styles.NameText}>
                    {Profilename} {ProfileDetils}
                  </Text>
                  <Text style={styles.subtitle}>{Profilerole}</Text>
                </View>
              </View>
            </View>
            <View>
              <View style={styles.bottomContainer}>
                <DetailComponent
                  title={"Reporting Manager"}
                  value={reporting_manager}
                />
                <DetailComponent title={"Email"} value={Profileemail} />
                <DetailComponent
                  title={"Phone"}
                  value={`+91 ${Profilemobaile}`}
                />
              </View>
            </View>
            <Text style={[styles.virsionText]}>app version {version}</Text>
            {profileImage !== "" && modalVisible && (
              <ImageWithText
                title="Store 1"
                lat={latitude}
                lon={longitude}
                imageUrl={profileImage}
                onClose={(uri) => {
                  handleImageCaptured(uri);
                }}
              />
            )}
          </ScrollView>
          {/* )} */}
        </View>
      )}
    </View>
  );
};

export default MyProfile;
