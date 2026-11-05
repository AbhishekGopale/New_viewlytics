import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import { Images } from "../../../assets/images/map";
import { useNavigation } from "@react-navigation/native";
import ImagePicker from "react-native-image-crop-picker";
import { COLORS } from "../../../colors/colors";
import { DB } from "../../../database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
// import { FildVisitPostAction } from "../../redux/actions/fildVisitAction";
import Geolocation from "@react-native-community/geolocation";
import { styles } from "../../FildVisitScreen/CreatFildVisitStyle";
import ImageResizer from "react-native-image-resizer";
// import { ErrorAction } from "../../redux/actions/errorAction";
import ImageWithText from "../../../components/ImageWithText/ImageWithText";

const SixqustionOffline = ({ route }) => {
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
  const [data, setData] = useState(null);
  console.log(data, "data-------------------");
  const getoldData = async (token) => {
    try {
      const storedDataString = await AsyncStorage.getItem(
        DB.FIELD_VISIT_CREATE_DATA
      );

      if (storedDataString) {
        const arrayobj = JSON.parse(storedDataString);
        console.log("Parsed Data:", arrayobj);
        setData(arrayobj);
      } else {
        console.log("No data found in AsyncStorage");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

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
        getoldData();
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

  const [detils, setDetails] = useState("");
  const [status, setStatus] = useState("");
  var date = moment().format("YYYY-MM-DD");
  const itemId = selectedItem.value;

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

  console.log(nonNullImages, "nonNullImages======------");
  const tackPhoto = () => {
    const targetSizeInKB = 10;

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

      let imgObj = {
        name: "name3",
        type: "image/png",
        uri:
          Platform.OS === "android"
            ? image.path
            : image.path.replace("file://", ""),
      };

      setImage3(imgObj);
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

      let imgObj = {
        name: "name4",
        type: "image/png",
        uri:
          Platform.OS === "android"
            ? image.path
            : image.path.replace("file://", ""),
      };
      setImage4(imgObj);

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

      let imgObj = {
        name: "name5",
        type: "image/png",
        uri:
          Platform.OS === "android"
            ? image.path
            : image.path.replace("file://", ""),
      };

      setImage5(imgObj);
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

      let imgObj = {
        name: "name6",
        type: "image/png",
        uri:
          Platform.OS === "android"
            ? image.path
            : image.path.replace("file://", ""),
      };

      setImage6(imgObj);

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
      let imgObj = {
        name: "name7",
        type: "image/png",
        uri:
          Platform.OS === "android"
            ? image.path
            : image.path.replace("file://", ""),
      };

      setImage7(imgObj);

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

      let imgObj = {
        name: "name8",
        type: "image/png",
        uri:
          Platform.OS === "android"
            ? image.path
            : image.path.replace("file://", ""),
      };

      setImage8(imgObj);

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
  const arrayobj = [
    ...(data || []),
    {
      value: itemId,
      fiveselectedOption: selectedOption,
      fiveimages: [...nonNullImages],
      courtesyVisibility: detils,
    },
  ];
  const saveData = async () => {
    try {
      await AsyncStorage.setItem(
        DB.FIELD_VISIT_CREATE_DATA,
        JSON.stringify(arrayobj)
      );
      console.log("Data saved successfully!");
      Alert.alert(
        "Success",
        "Field Visit data submitted successfully!",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error saving data:", error);
    }
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
          header={"offline"}
          iconStyle={styles.headerIcon}
          image={Images.back}
          onPress={() => navigation.goBack()}
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
                  saveData();
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
            </View>
          ) : null}
          {selectedOption === "No" ? (
            <View>
              <View
                style={{ justifyContent: "center", alignItems: "center" }}
              ></View>
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
                style={detils == "" ? styles.grayButton : styles.buttonDone}
                disabled={detils == "" || isLoading ? true : false}
                onPress={() => {
                  saveData();
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
            </View>
          ) : null}
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
      </View>
    </>
  );
};

export default SixqustionOffline;
