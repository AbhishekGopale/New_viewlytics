import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { styles } from "./CreatFildVisitStyle";
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import { useNavigation } from "@react-navigation/native";
import ImagePicker from "react-native-image-crop-picker";
import { COLORS } from "../../colors/colors";
import { DB } from "../../database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { FildVisitPostAction } from "../../redux/actions/fildVisitAction";
import Geolocation from "@react-native-community/geolocation";
import ImageResizer from "react-native-image-resizer";
import { ErrorAction } from "../../redux/actions/errorAction";
import ServerScreen from "../ServerScreen/ServerScreen";
import ImageWithText from "../../components/ImageWithText/ImageWithText";

const CreateFieldScreen = ({ route }) => {
  const [currentLatitude, setcurrentLatitude] = useState("");
  const [currentLongitude, setcurrentLongitude] = useState("");
  Geolocation.getCurrentPosition((data) => {
    setcurrentLatitude(data.coords.latitude);
  });
  Geolocation.getCurrentPosition((data) => {
    setcurrentLongitude(data.coords.longitude);
  });

  const { selectedItem, storeDetails } = route.params;
  let value = selectedItem.value;
  const storename = storeDetails?.store_name;
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [storeId, setStoreId] = useState("");
  const [storeName, setStoreNAme] = useState("");

  const getStoreId = async (token) => {
    AsyncStorage.getItem(DB.STORE_ID)
      .then((data) => {
        setStoreId(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getToken = async () => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        setToken(data);
        getStoreId(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getToken();
  }, []);

  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

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
  console.log("imageFormData", imageForm.imageOne, fieldValue);

  const getFieldValue = (num, url) => {
    return {
      field: num,
      value: url,
    };
  };

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

  const [detils, setDetails] = useState("");
  const [status, setStatus] = useState("");
  var date = moment().format("YYYY-MM-DD");
  const itemId = selectedItem.value;

  const [image1, setImage1] = useState("");
  const [pic, setPic] = useState("");
  const [imagetwo, setImagetwo] = useState("");
  const [imagethree, setImagethree] = useState("");
  const [imagefour, setImagefour] = useState("");
  const [imagefive, setImagefive] = useState("");
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
  const tackPhoto = () => {
    const targetSizeInKB = 10; // Set your target size in kilobytes

    ImagePicker.openCamera({
      width: 0,
      height: 0,
      cropping: false,
    }).then(async (image) => {
      // Calculate the compression quality based on the target size
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

      setImage3(image);
      setImage1(image.path);
      await handleInputChange("imageOne", image.path, "imageOne");
      await setImageUri("imageOne", image.path);
    });
  };

  const tackPic = () => {
    const targetSizeInKB = 10; // Set your target size in kilobytes

    ImagePicker.openCamera({
      width: 0,
      height: 0,
      cropping: false,
    }).then(async (image) => {
      // Calculate the compression quality based on the target size
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

      setImage4(image);

      setPic(image.path);
      await handleInputChange("imageTwo", image.path, "imageTwo");
      await setImageUri("imageTwo", image.path);
    });
  };

  const tackPhotoTwo = () => {
    const targetSizeInKB = 10; // Set your target size in kilobytes

    ImagePicker.openCamera({
      width: 0,
      height: 0,
      cropping: false,
    }).then(async (image) => {
      // Calculate the compression quality based on the target size
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

      setImage5(image);
      setImagetwo(image.path);
      await handleInputChange("imageThree", image.path, "imageThree");
      await setImageUri("imageThree", image.path);
    });
  };

  const tackPhotoThree = () => {
    const targetSizeInKB = 10; // Set your target size in kilobytes

    ImagePicker.openCamera({
      width: 0,
      height: 0,
      cropping: false,
    }).then(async (image) => {
      // Calculate the compression quality based on the target size
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

      setImage6(image);

      setImagethree(image.path);
      await handleInputChange("imageFour", image.path, "imageFour");
      await setImageUri("imageFour", image.path);
    });
  };

  const tackPhotoFour = () => {
    const targetSizeInKB = 10; // Set your target size in kilobytes

    ImagePicker.openCamera({
      width: 0,
      height: 0,
      cropping: false,
    }).then(async (image) => {
      // Calculate the compression quality based on the target size
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

      setImage7(image);

      setImagefour(image.path);
      await handleInputChange("imageFive", image.path, "imageFive");
      await setImageUri("imageFive", image.path);
    });
  };

  const tackPhotoFive = () => {
    const targetSizeInKB = 10; // Set your target size in kilobytes

    ImagePicker.openCamera({
      width: 0,
      height: 0,
      cropping: false,
    }).then(async (image) => {
      // Calculate the compression quality based on the target size
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

      setImage8(image);

      setImagefive(image.path);
      await handleInputChange("imageSix", image.path, "imageSix");
      await setImageUri("imageSix", image.path);
    });
  };

  const FildVisitDetailsHandle = () => {
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
    const ArrayImg = [];
    if (imgObj !== " ") {
      ArrayImg.push(imgObj);
    }
    if (imgObj2 !== "") {
      ArrayImg.push(imgObj2);
    }
    if (imgObj3 !== "") {
      ArrayImg.push(imgObj3);
    }
    if (imgObj4 !== "") {
      ArrayImg.push(imgObj4);
    }
    if (imgObj5 !== "") {
      ArrayImg.push(imgObj5);
    }
    if (imgObj6 !== "") {
      ArrayImg.push(imgObj6);
    }
    let text = "";
    let textwo = "";
    dispatch(
      FildVisitPostAction(
        token,
        value,
        ArrayImg,
        textwo,
        text,
        itemId,
        status,
        detils,
        storeId,
        date,
        navigation,
        currentLatitude,
        currentLongitude,
        storename
      )
    );
  };
  const isLoading = useSelector((state) => state?.fildVisit?.isLoading);
  const isErrorVisible = useSelector((state) => state?.errorReducer?.isError);
  const isErrorVisibleMsg = useSelector((state) => state?.errorReducer?.msg);
  useEffect(() => {
    console.log("isErrorInEffect", isErrorVisible);
  }, [isErrorVisible]);

  const closeModalss = () => {
    dispatch(ErrorAction(false, ""));
  };
  return (
    <>
      <View
        style={{
          backgroundColor: COLORS.white,
          flex: 1,
        }}
      >
        <Header
          header={""}
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
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",

            backgroundColor: COLORS.white,
          }}
        >
          <View style={styles.qustionView}>
            <Text style={styles.qustionText}>{selectedItem.label}</Text>
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              style={[
                styles.button,
                selectedOption === "Yes" && styles.selectedButton,
              ]}
              onPress={() => {
                handleOptionSelect("Yes");
                setStatus("0");
                setImage1("");
                setPic("");
                setImagetwo("");
                setImagethree("");
                setImagefour("");
                setImagefive("");
                setImage3(null);
                setImage4(null);
                setImage5(null);
                setImage6(null);
                setImage7(null);
                setImage8(null);
              }}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedOption === "Yes" && { color: "white" },
                ]}
              >
                Yes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                selectedOption === "No" && styles.selectedButton,
              ]}
              onPress={() => {
                handleOptionSelect("No");
                setStatus("1");
                setImage1("");
                setPic("");
                setImagetwo("");
                setImagethree("");
                setImagefour("");
                setImagefive("");
                setImage3(null);
                setImage4(null);
                setImage5(null);
                setImage6(null);
                setImage7(null);
                setImage8(null);
              }}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedOption === "No" && { color: COLORS.white },
                ]}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
          {selectedOption === "Yes" ? (
            <View>
              <View style={{ flexDirection: "row", marginVertical: 20 }}>
                <TouchableOpacity
                  style={styles.capcharbutton}
                  onPress={() => tackPhoto()}
                >
                  {image1 == "" ? (
                    <Image source={Images.camera} style={styles.Modalimages} />
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
                  {pic == "" ? (
                    <Image source={Images.camera} style={styles.Modalimages} />
                  ) : (
                    <Image source={{ uri: pic }} style={styles.Modalimages} />
                  )}
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", marginVertical: 20 }}>
                <TouchableOpacity
                  style={styles.capcharbutton}
                  onPress={() => tackPhotoTwo()}
                >
                  {imagetwo == "" ? (
                    <Image source={Images.camera} style={styles.Modalimages} />
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
                  {imagethree == "" ? (
                    <Image source={Images.camera} style={styles.Modalimages} />
                  ) : (
                    <Image
                      source={{ uri: imagethree }}
                      style={styles.Modalimages}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", marginVertical: 20 }}>
                <TouchableOpacity
                  style={styles.capcharbutton}
                  onPress={() => tackPhotoFour()}
                >
                  {imagefour == "" ? (
                    <Image source={Images.camera} style={styles.Modalimages} />
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
                  {imagefive == "" ? (
                    <Image source={Images.camera} style={styles.Modalimages} />
                  ) : (
                    <Image
                      source={{ uri: imagefive }}
                      style={styles.Modalimages}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                disabled={nonNullImages.length == 0 || isLoading ? true : false}
                style={
                  nonNullImages.length == 0
                    ? styles.grayButton
                    : styles.buttonDone
                }
                onPress={() => {
                  FildVisitDetailsHandle();
                }}
              >
                {isLoading ? (
                  <ActivityIndicator
                    color={COLORS.white}
                    style={[styles.buttonTextss]}
                  />
                ) : (
                  <Text style={[styles.buttonTextss, { color: COLORS.white }]}>
                    Upload
                  </Text>
                )}
              </TouchableOpacity>
              {fieldValue?.value !== "" && modalVisible && (
                <ImageWithText
                  title={storename}
                  lat={currentLatitude}
                  lon={currentLongitude}
                  imageUrl={fieldValue?.value}
                  date={new Date().toLocaleDateString()}
                  time={new Date().toLocaleTimeString()}
                  onClose={(uri) => {
                    handleImageCaptured(uri);
                  }}
                  heightI={200}
                  widthI={200}
                />
              )}
            </View>
          ) : null}
          {selectedOption === "No" ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={{ flexDirection: "row", marginVertical: 10 }}>
                  <TouchableOpacity
                    style={styles.capcharbutton}
                    onPress={() => tackPhoto()}
                  >
                    {image1 == "" ? (
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
                    {pic == "" ? (
                      <Image
                        source={Images.camera}
                        style={styles.Modalimages}
                      />
                    ) : (
                      <Image source={{ uri: pic }} style={styles.Modalimages} />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", marginVertical: 10 }}>
                  <TouchableOpacity
                    style={styles.capcharbutton}
                    onPress={() => tackPhotoTwo()}
                  >
                    {imagetwo == "" ? (
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
                    {imagethree == "" ? (
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
                <View style={{ flexDirection: "row", marginVertical: 10 }}>
                  <TouchableOpacity
                    style={styles.capcharbutton}
                    onPress={() => tackPhotoFour()}
                  >
                    {imagefour == "" ? (
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
                    {imagefive == "" ? (
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
              <View style={styles.textinputview}>
                <TextInput
                  multiline
                  style={styles.textinput}
                  placeholderTextColor={COLORS.gray}
                  placeholder="Note......"
                  onChangeText={(detils) => setDetails(detils)}
                />
              </View>
              <TouchableOpacity
                disabled={
                  nonNullImages.length == 0 || detils == "" || isLoading
                    ? true
                    : false
                }
                style={
                  nonNullImages.length == 0 || detils == ""
                    ? styles.grayButton
                    : styles.buttonDone
                }
                onPress={() => {
                  FildVisitDetailsHandle();
                }}
              >
                {isLoading ? (
                  <ActivityIndicator
                    color={COLORS.white}
                    style={[styles.buttonTextss]}
                  />
                ) : (
                  <Text style={[styles.buttonTextss, { color: COLORS.white }]}>
                    Upload
                  </Text>
                )}
              </TouchableOpacity>
              <View style={{ paddingTop: 150 }}></View>
              {fieldValue?.value !== "" && modalVisible && (
                <ImageWithText
                  title={storename}
                  lat={currentLatitude}
                  lon={currentLongitude}
                  imageUrl={fieldValue?.value}
                  date={new Date().toLocaleDateString()}
                  time={new Date().toLocaleTimeString()}
                  onClose={(uri) => {
                    handleImageCaptured(uri);
                  }}
                  heightI={200}
                  widthI={200}
                />
              )}
            </ScrollView>
          ) : null}
        </View>
      </View>
    </>
  );
};

export default CreateFieldScreen;
