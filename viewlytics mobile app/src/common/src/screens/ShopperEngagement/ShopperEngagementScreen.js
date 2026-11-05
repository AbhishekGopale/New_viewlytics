import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./ShopperEngagementScreenStyle";
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { getStoreId } from "../../utilities/utilities";
import { StoreDetails } from "../../redux/actions/storeDetailsAction";
import ImagePicker from "react-native-image-crop-picker";
import { ShopperEngagementAction } from "../../redux/actions/shopperEngagementAction";
import ToastMessage from "../../components/ToastMessages/ToastMessages";
import { COLORS } from "../../colors/colors";
import Geolocation from "@react-native-community/geolocation";
import ImageResizer from "react-native-image-resizer";
import ServerScreen from "../ServerScreen/ServerScreen";
import { ErrorAction } from "../../redux/actions/errorAction";
import ImageWithText from "../../components/ImageWithText/ImageWithText";

const OpeningStockScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [storeId, setStoreId] = useState("");
  const [currentLatitude, setcurrentLatitude] = useState("");
  const [currentLongitude, setcurrentLongitude] = useState("");
  Geolocation.getCurrentPosition((data) => {
    setcurrentLatitude(data.coords.latitude);
  });
  Geolocation.getCurrentPosition((data) => {
    setcurrentLongitude(data.coords.longitude);
  });

  const getStoreId = async (token) => {
    AsyncStorage.getItem(DB.STORE_ID)
      .then((data) => {
        setStoreId(data);
        dispatch(StoreDetails(token, data));
      })
      .catch((e) => {});
  };

  const getToken = async () => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        setToken(data);
        getStoreId(data);
      })
      .catch((e) => {});
  };
  const isLoading = useSelector(
    (state) => state?.storeDetailsReducer?.isLoading
  );
  const storeDetails = useSelector(
    (state) => state?.storeDetailsReducer?.storeDetails
  );
  const storename = storeDetails?.store_name;
  const isLoadings = useSelector(
    (state) => state?.shopperEngagementReducer?.isLoading
  );
  console.log(isLoadings, "isLoadings----");
  useEffect(() => {
    getToken();
  }, []);

  /// GeoTaggingModal
  const [fieldValue, setFieldValue] = useState({});
  const [imageForm, setImageForm] = useState({
    imageOne: null,
    imageTwo: null,
    imageThree: null,
    imageFour: null,
    imageFive: null,
    imageSix: null,
  });
  const [modalImage, setModalImage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleInputChange = async (name, value, num) => {
    console.log("1111111111111111", value, name);
    setImageForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    const fieldValue = getFieldValue(num, value);
    await setFieldValue(fieldValue);
    if (modalVisible) {
      setModalVisible(false);
    } else {
      await setModalVisible(true);
    }
  };
  console.log("imageFormData", imageForm, fieldValue);

  const getFieldValue = (num, url) => {
    return {
      field: num,
      value: url,
    };
  };
  // const setImageUri = (num, url) => {
  //   console.log("fieldURIVALUES=======>", url);

  //   // Define an object mapping image fields to state setter functions
  //   const imageFieldSetters = {
  //     imageOne: setImage1,
  //     imageTwo: setPic,
  //     imageThree: setImagetwo,
  //     imageFour: setImagethree,
  //     imageFive: setImagefour,
  //     imageSix: setImagefive,
  //   };

  //   // Check if the num exists in imageFieldSetters, if so, call the corresponding setter function
  //   if (num in imageFieldSetters) {
  //     imageFieldSetters[num](url);
  //   } else {
  //     console.error("Invalid image field:", num);
  //   }
  // };

  const setImageUri = (num, url) => {
    console.log("fieldURIVALUES=======>", url);
    switch (num) {
      case "imageOne":
        setImage1(url);
        break;

      case "imageTwo":
        setPic(url);
        break;

      case "imageThree":
        setImagetwo(url);
        break;

      case "imageFour":
        setImagethree(url);
        break;

      case "imageFive":
        setImagefour(url);
        break;

      case "imageSix":
        setImagefive(url);
        break;

      default:
        break;
    }
  };

  const handleImageCaptured = (uri) => {
    console.log("ImageForm====>", imageForm);
    console.log("fieldValue", fieldValue);
    console.log("Captured image URI:", fieldValue?.field, uri);
    setImageUri(fieldValue?.field, uri);
    handleInputChange(fieldValue?.field, uri, fieldValue?.field);
    setModalImage(uri); // Set the captured image URI
    // Close the modal
  };
  ///GeoTaggingModal

  const StoreDetailCard = () => {
    return isLoading ? (
      <View
        style={{
          marginTop: 25,
        }}
      >
        <ActivityIndicator color={"blue"} size={"large"} />
      </View>
    ) : (
      <View>
        <View style={styles.StornameView}>
          <View style={styles.maiconteinet}>
            <View style={styles.imgView}>
              <View style={styles.imgConteiner}>
                <Image
                  resizeMode="contain"
                  source={{ uri: storeDetails?.Image }}
                  style={styles.ShopImg}
                />
              </View>
              <View style={styles.StoreView}>
                <View>
                  <Text style={[styles.StorenameTexttwo]}>
                    {storeDetails?.store_name}
                  </Text>
                  <Text style={styles.LocationText}>
                    Store Code :{storeDetails?.store_code}
                  </Text>
                </View>
                <Text style={styles.LocationText}>
                  Zone :{storeDetails?.zone_name}
                </Text>
                <Text style={styles.TlText}>TL Name : {storeDetails?.tl}</Text>
              </View>
            </View>
            <View style={styles.addresstext}>
              <View style={styles.addView}>
                <Text style={styles.AddText}>Address : </Text>
              </View>
              <View style={styles.AdressView}>
                <Text style={styles.AddTexttwo}>{storeDetails?.location}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const [filePath, setFilePath] = useState({});
  const [image1, setImage1] = useState(null);
  const [pic, setPic] = useState(null);
  const [imagetwo, setImagetwo] = useState(null);
  const [imagethree, setImagethree] = useState(null);
  const [imagefour, setImagefour] = useState(null);
  const [imagefive, setImagefive] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [image5, setImage5] = useState(null);
  const [image6, setImage6] = useState(null);
  const [image7, setImage7] = useState(null);
  const [image8, setImage8] = useState(null);

  const nonNullImages = [];

  const pushNonNullImage = (image) => {
    if (image !== null) {
      nonNullImages.push(image);
    }
  };

  pushNonNullImage(image3);
  pushNonNullImage(image4);
  pushNonNullImage(image5);
  pushNonNullImage(image6);
  pushNonNullImage(image7);
  pushNonNullImage(image8);

  console.log(nonNullImages.length, "nonNullImages======------");

  let imageField = "";

  const tackPhoto = () => {
    const targetSizeInKB = 10;

    ImagePicker.openCamera({
      width: 0,
      height: 0,
      cropping: false,
    }).then(async (image) => {
      const compression = 100 - (targetSizeInKB / (image.size / 1024)) * 100;
      const newWidth = 300;
      const newHeight = 400;
      const resizedImage = await ImageResizer.createResizedImage(
        image.path,
        newWidth,
        newHeight,
        "JPEG",
        Math.min(compression, 100), // Ensure compression is between 0 and 100
        0,
        null
      );
      setModalImage(image.path);
      setImage3(image);
      setImage1(resizedImage.uri);

      await handleInputChange("imageOne", image.path, "imageOne");
      await setImageUri("imageOne", image.path);
      // await setFieldValue(getFieldValue(1));
    });
  };

  // const tackPhotoss = () => {
  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 400,
  //     cropping: false,
  //   }).then((image) => {
  //     setImage3(image);
  //     setImage1(image.path);
  //   });
  // };

  const tackPic = () => {
    const targetSizeInKB = 10; // Set your target size in kilobytes

    ImagePicker.openCamera({
      width: 0,
      height: 0,
      cropping: false,
    }).then(async (image) => {
      const compression = 100 - (targetSizeInKB / (image.size / 1024)) * 100;
      const newWidth = 300;
      const newHeight = 400;
      // const newWidth = Math.round((image.width * compression) / 100);
      // const newHeight = Math.round((image.height * compression) / 100);
      const resizedImage = await ImageResizer.createResizedImage(
        image.path,
        newWidth,
        newHeight,
        "JPEG",
        Math.min(compression, 100),
        0,
        null
      );

      setImage4(image);
      setPic(resizedImage.uri);
      await handleInputChange("imageTwo", image.path, "imageTwo");
      await setImageUri("imageTwo", image.path);
    });
  };

  const tackPhotoTwo = () => {
    const targetSizeInKB = 10;
    ImagePicker.openCamera({
      width: 0,
      height: 0,
      cropping: false,
    }).then(async (image) => {
      const compression = 100 - (targetSizeInKB / (image.size / 1024)) * 100;
      const newWidth = 300;
      const newHeight = 400;

      const resizedImage = await ImageResizer.createResizedImage(
        image.path,
        newWidth,
        newHeight,
        "JPEG",
        Math.min(compression, 100),
        0,
        null
      );

      setImage5(image);
      setImagetwo(resizedImage.uri);
      await handleInputChange("imageThree", image.path, "imageThree");
      await setImageUri("imageThree", image.path);
    });
  };

  const tackPhotoThree = () => {
    const targetSizeInKB = 10;

    ImagePicker.openCamera({
      width: 0,
      height: 0,
      cropping: false,
    }).then(async (image) => {
      const compression = 100 - (targetSizeInKB / (image.size / 1024)) * 100;
      const newWidth = 300;
      const newHeight = 400;

      const resizedImage = await ImageResizer.createResizedImage(
        image.path,
        newWidth,
        newHeight,
        "JPEG",
        Math.min(compression, 100),
        0,
        null
      );

      setImage6(image);
      setImagethree(resizedImage.uri);
      await handleInputChange("imageFour", image.path, "imageFour");
      await setImageUri("imageFour", image.path);
    });
  };

  const tackPhotoFour = () => {
    const targetSizeInKB = 10;

    ImagePicker.openCamera({
      width: 0,
      height: 0,
      cropping: false,
    }).then(async (image) => {
      const compression = 100 - (targetSizeInKB / (image.size / 1024)) * 100;
      const newWidth = 300;
      const newHeight = 400;

      const resizedImage = await ImageResizer.createResizedImage(
        image.path,
        newWidth,
        newHeight,
        "JPEG",
        Math.min(compression, 100),
        0,
        null
      );

      setImage7(image);
      setImagefour(resizedImage.uri);
      await handleInputChange("imageFive", image.path, "imageFive");
      await setImageUri("imageFive", image.path);
    });
  };

  const tackPhotoFive = () => {
    const targetSizeInKB = 10;

    ImagePicker.openCamera({
      width: 0,
      height: 0,
      cropping: false,
    }).then(async (image) => {
      const compression = 100 - (targetSizeInKB / (image.size / 1024)) * 100;
      const newWidth = 300;
      const newHeight = 400;

      const resizedImage = await ImageResizer.createResizedImage(
        image.path,
        newWidth,
        newHeight,
        "JPEG",
        Math.min(compression, 100),
        0,
        null
      );

      setImage8(image);
      setImagefive(resizedImage.uri);
      await handleInputChange("imageSix", image.path, "imageSix");
      await setImageUri("imageSix", image.path);
    });
  };

  const ShopperEngagementHandle = () => {
    let imgObj = image1
      ? {
          name: "name1",
          type: "image/png",
          uri:
            Platform.OS === "android" ? image1 : image1.replace("file://", ""),
        }
      : "";
    let imgObj2 = pic
      ? {
          name: "name2",
          type: "image/png",

          uri: Platform.OS === "android" ? pic : pic.replace("file://", ""),
        }
      : "";
    let imgObj3 = imagetwo
      ? {
          name: "name3",
          type: "image/png",

          uri:
            Platform.OS === "android"
              ? imagetwo
              : imagetwo.replace("file://", ""),
        }
      : "";
    let imgObj4 = imagethree
      ? {
          name: "name4",
          type: "image/png",

          uri:
            Platform.OS === "android"
              ? imagethree
              : imagethree.replace("file://", ""),
        }
      : "";
    let imgObj5 = imagefour
      ? {
          name: "name5",
          type: "image/png",

          uri:
            Platform.OS === "android"
              ? imagefour
              : imagefour.replace("file://", ""),
        }
      : "";
    let imgObj6 = imagefive
      ? {
          name: "name6",
          type: "image/png",
          uri:
            Platform.OS === "android"
              ? imagefive
              : imagefive.replace("file://", ""),
        }
      : "";
    console.log(
      "dispached logs",
      token,
      storeId,
      imgObj,
      imgObj2,
      imgObj3,
      imgObj4,
      imgObj5,
      imgObj6,
      navigation,
      currentLatitude,
      currentLongitude,
      storename
    );

    dispatch(
      ShopperEngagementAction(
        token,
        storeId,
        imgObj,
        imgObj2,
        imgObj3,
        imgObj4,
        imgObj5,
        imgObj6,
        navigation,
        currentLatitude,
        currentLongitude,
        storename
      )
    );
  };

  const isErrorVisible = useSelector((state) => state?.errorReducer?.isError);
  const isErrorVisibleMsg = useSelector((state) => state?.errorReducer?.msg);
  useEffect(() => {
    console.log("isErrorInEffect", isErrorVisible);
  }, [isErrorVisible]);

  const closeModalss = () => {
    dispatch(ErrorAction(false, ""));
  };

  return (
    <View style={styles.maincontainer}>
      <Header
        header={"Shopper engagement"}
        iconStyle={styles.headerIcon}
        image={Images.back}
        onPress={() => navigation.goBack()}
      />
      <ServerScreen
        title={isErrorVisibleMsg}
        // subtitle="Your Subtitle"
        // message="Your Message"
        modalVisible={isErrorVisible}
        closeModal={() => {
          closeModalss();
        }}
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
        <ScrollView
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View style={styles.flatmainView}>
              <StoreDetailCard />

              <View style={styles.qustionview}>
                <View style={styles.subView}>
                  <Text style={styles.text}>Customer Approaching Pictures</Text>
                  <View style={{ flexDirection: "row", padding: 20 }}>
                    <TouchableOpacity
                      style={styles.capcharbutton}
                      onPress={() => tackPhoto()}
                    >
                      {image1 == null ? (
                        <Image
                          source={Images.camera}
                          style={styles.Modalimages}
                        />
                      ) : (
                        <Image
                          source={{ uri: image1 }}
                          style={styles.Modalimages}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.capcharbutton}
                      onPress={() => tackPic()}
                    >
                      {pic == null ? (
                        <Image
                          source={Images.camera}
                          style={styles.Modalimages}
                        />
                      ) : (
                        <Image
                          source={{ uri: pic }}
                          style={styles.Modalimages}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.qustionview}>
                <View style={styles.subView}>
                  <Text style={styles.text}>Any Sampling Pictures</Text>
                  <View style={{ flexDirection: "row", padding: 20 }}>
                    <TouchableOpacity
                      style={styles.capcharbutton}
                      onPress={() => tackPhotoTwo()}
                    >
                      {imagetwo == null ? (
                        <Image
                          source={Images.camera}
                          style={styles.Modalimages}
                        />
                      ) : (
                        <Image
                          source={{ uri: imagetwo }}
                          style={styles.Modalimages}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.capcharbutton}
                      onPress={() => tackPhotoThree()}
                    >
                      {imagethree == null ? (
                        <Image
                          source={Images.camera}
                          style={styles.Modalimages}
                        />
                      ) : (
                        <Image
                          source={{ uri: imagethree }}
                          style={styles.Modalimages}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.qustionview}>
                <View style={styles.subView}>
                  <Text style={styles.text}>Any Other Activity Pictures</Text>
                  <View style={styles.imgcontein}>
                    <TouchableOpacity
                      style={styles.capcharbutton}
                      onPress={() => tackPhotoFour()}
                    >
                      {imagefour == null ? (
                        <Image
                          source={Images.camera}
                          style={styles.Modalimages}
                        />
                      ) : (
                        <Image
                          source={{ uri: imagefour }}
                          style={styles.Modalimages}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.capcharbutton}
                      onPress={() => tackPhotoFive()}
                    >
                      {imagefive == null ? (
                        <Image
                          source={Images.camera}
                          style={styles.Modalimages}
                        />
                      ) : (
                        <Image
                          source={{ uri: imagefive }}
                          style={styles.Modalimages}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.buttonView}>
              <TouchableOpacity
                disabled={nonNullImages.length == "0" || isLoadings}
                style={
                  nonNullImages.length == "0"
                    ? styles.grayButton
                    : styles.button
                }
                onPress={() => {
                  ShopperEngagementHandle();
                }}
              >
                {isLoadings ? (
                  <ActivityIndicator
                    color={COLORS.white}
                    style={[styles.butotonText]}
                  />
                ) : (
                  <Text style={styles.butotonText}>Submit</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          {fieldValue?.value !== "" && modalVisible && (
            <ImageWithText
              title={storename}
              lat={currentLatitude}
              lon={currentLongitude}
              date={new Date().toLocaleDateString()}
              time={new Date().toLocaleTimeString()}
              imageUrl={fieldValue?.value}
              onClose={(uri) => {
                handleImageCaptured(uri);
              }}
              heightI={200}
              widthI={200}
            />
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default OpeningStockScreen;
