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
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { styles } from "../ShopperEngagement/ShopperEngagementScreenStyle";
import RNFS from "react-native-fs";
import Geolocation from "@react-native-community/geolocation";
import ImageResizer from "react-native-image-resizer";

import ImageWithText from "../../components/ImageWithText/ImageWithText";
const ShopperEngagementOffline = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [storeId, setStoreId] = useState("");

  const [storedata, setStoreData] = useState({});
  const [currentLatitude, setcurrentLatitude] = useState("");
  const [currentLongitude, setcurrentLongitude] = useState("");
  Geolocation.getCurrentPosition((data) => {
    setcurrentLatitude(data.coords.latitude);
  });
  Geolocation.getCurrentPosition((data) => {
    setcurrentLongitude(data.coords.longitude);
  });

  const getStoredetails = async () => {
    AsyncStorage.getItem(DB.STORE_DETAILS)
      .then((data) => {
        let newData = JSON.parse(data);
        setStoreData(newData);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
        getStoredetails();
      })
      .catch((e) => {});
  };
  const isLoading = useSelector(
    (state) => state?.storeDetailsReducer?.isLoading
  );
  const storeDetails = useSelector(
    (state) => state?.storeDetailsReducer?.storeDetails
  );
  const isLoadings = useSelector(
    (state) => state?.shopperEngagementReducer?.isLoading
  );
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
                  source={{ uri: storedata?.Image }}
                  style={styles.ShopImg}
                />
              </View>
              <View style={styles.StoreView}>
                <View>
                  <Text style={[styles.StorenameTexttwo]}>
                    {storedata?.store_name}
                  </Text>
                  <Text style={styles.LocationText}>
                    Store Code :{storedata?.store_code}
                  </Text>
                </View>
                <Text style={styles.LocationText}>
                  Zone :{storedata?.zone_name}
                </Text>
                <Text style={styles.TlText}>TL Name : {storedata?.tl}</Text>
              </View>
            </View>
            <View style={styles.addresstext}>
              <View style={styles.addView}>
                <Text style={styles.AddText}>Address : </Text>
              </View>
              <View style={styles.AdressView}>
                <Text style={styles.AddTexttwo}>{storedata?.location}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  console.log(keyValuePairs);
  const [filePath, setFilePath] = useState({});
  const [image1, setImage1] = useState(null);
  const [pic, setPic] = useState(null);
  const [imagetwo, setImagetwo] = useState(null);
  const [imagethree, setImagethree] = useState(null);
  const [imagefour, setImagefour] = useState(null);
  const [imagefive, setImagefive] = useState(null);
  const [image3, setImage3] = useState(null);
  console.log(image3);
  const [image4, setImage4] = useState(null);
  console.log(image4);

  const [image5, setImage5] = useState(null);
  console.log(image5);
  const [image6, setImage6] = useState(null);
  console.log(image6);

  const [image7, setImage7] = useState(null);
  console.log(image7);

  const [image8, setImage8] = useState(null);
  console.log(image8);
  const [urlSenp, setUrlSenp] = useState("");
  const [urlSenptwo, setUrlSenpTwo] = useState("");
  const [urlSenpthree, setUrlSenpThree] = useState("");
  const [urlSenpfour, setUrlSenpFour] = useState("");
  const [urlSenpfive, setUrlSenpFive] = useState("");
  const [urlSenpsix, setUrlSenpSix] = useState("");

  console.log(urlSenp, "urlSenp");
  console.log(urlSenpsix, "urlSenpsix");
  console.log(urlSenptwo, "urlSenptwo");
  console.log(urlSenpthree, "urlSenpthree");
  console.log(urlSenpfour, "urlSenpfour");
  console.log(urlSenpfive, "urlSenpfive");

  const nonNullImages = [];

  const pushNonNullImage = (imgObj) => {
    if (imgObj !== null) {
      nonNullImages.push(imgObj);
    }
  };

  let imgObj1 = image1
    ? {
        uri:
          Platform.OS === "android"
            ? RNFS.readFile(image1, "base64")
                .then((base64String) => {
                  setUrlSenp("data:image/jpeg;base64," + base64String);
                  resolve(base64String);
                })
                .catch((error) => {
                  reject(`Error converting image to base64: ${error}`);
                })
            : RNFS.readFile(image1, "base64")
                .then((base64String) => {
                  setUrlSenp("data:image/jpeg;base64," + base64String);
                  resolve(base64String);
                })
                .catch((error) => {
                  reject(`Error converting image to base64: ${error}`);
                }),
      }
    : "";

  let imgObj2 = pic
    ? {
        uri:
          Platform.OS === "android"
            ? RNFS.readFile(pic, "base64")
                .then((base64String) => {
                  setUrlSenpTwo("data:image/jpeg;base64," + base64String);
                  resolve(base64String);
                })
                .catch((error) => {
                  reject(`Error converting image to base64: ${error}`);
                })
            : RNFS.readFile(pic, "base64")
                .then((base64String) => {
                  setUrlSenpTwo("data:image/jpeg;base64," + base64String);
                  resolve(base64String);
                })
                .catch((error) => {
                  reject(`Error converting image to base64: ${error}`);
                }),
      }
    : "";

  let imgObj3 = imagetwo
    ? {
        uri:
          Platform.OS === "android"
            ? RNFS.readFile(imagetwo, "base64")
                .then((base64String) => {
                  setUrlSenpThree("data:image/jpeg;base64," + base64String);
                  resolve(base64String);
                })
                .catch((error) => {
                  reject(`Error converting image to base64: ${error}`);
                })
            : RNFS.readFile(imagetwo, "base64")
                .then((base64String) => {
                  setUrlSenpThree("data:image/jpeg;base64," + base64String);
                  resolve(base64String);
                })
                .catch((error) => {
                  reject(`Error converting image to base64: ${error}`);
                }),
      }
    : "";

  let imgObj4 = imagethree
    ? {
        uri:
          Platform.OS === "android"
            ? RNFS.readFile(imagethree, "base64")
                .then((base64String) => {
                  setUrlSenpFour("data:image/jpeg;base64," + base64String);
                  resolve(base64String);
                })
                .catch((error) => {
                  reject(`Error converting image to base64: ${error}`);
                })
            : RNFS.readFile(imagethree, "base64")
                .then((base64String) => {
                  setUrlSenpFour("data:image/jpeg;base64," + base64String);
                  resolve(base64String);
                })
                .catch((error) => {
                  reject(`Error converting image to base64: ${error}`);
                }),
      }
    : "";

  let imgObj5 = imagefour
    ? {
        uri:
          Platform.OS === "android"
            ? RNFS.readFile(imagefour, "base64")
                .then((base64String) => {
                  setUrlSenpFive("data:image/jpeg;base64," + base64String);
                  resolve(base64String);
                })
                .catch((error) => {
                  reject(`Error converting image to base64: ${error}`);
                })
            : RNFS.readFile(imagefour, "base64")
                .then((base64String) => {
                  setUrlSenpFive("data:image/jpeg;base64," + base64String);
                  resolve(base64String);
                })
                .catch((error) => {
                  reject(`Error converting image to base64: ${error}`);
                }),
      }
    : "";

  let imgObj6 = imagefive
    ? {
        uri:
          Platform.OS === "android"
            ? RNFS.readFile(imagefive, "base64")
                .then((base64String) => {
                  setUrlSenpSix("data:image/jpeg;base64," + base64String);
                  resolve(base64String);
                })
                .catch((error) => {
                  reject(`Error converting image to base64: ${error}`);
                })
            : RNFS.readFile(imagefive, "base64")
                .then((base64String) => {
                  setUrlSenpSix("data:image/jpeg;base64," + base64String);
                  resolve(base64String);
                })
                .catch((error) => {
                  reject(`Error converting image to base64: ${error}`);
                }),
      }
    : "";

  console.log(imgObj1, "imgObj1");
  pushNonNullImage(imgObj1 !== "" ? imgObj1 : "");
  pushNonNullImage(imgObj2 !== "" ? imgObj2 : "");
  pushNonNullImage(imgObj3 !== "" ? imgObj3 : "");
  pushNonNullImage(imgObj4 !== "" ? imgObj4 : "");
  pushNonNullImage(imgObj5 !== "" ? imgObj5 : "");
  pushNonNullImage(imgObj6 !== "" ? imgObj6 : "");

  console.log(nonNullImages, "nonNullImages");

  const keyValuePairs = [];

  const storeIddd = storeId;
  const storeName = storedata?.store_name;

  const keyValueObject = {
    storeId: storeIddd,
    storeName: storeName,
  };

  keyValuePairs.push(keyValueObject);
  const imgArray = [...nonNullImages];
  console.log(imgArray, "imgArray======-----");
  console.log(keyValueObject, "keyValueObject======-----");

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
        Math.min(compression, 100),
        0,
        null
      );
      // RNFS.readFile(resizedImage.uri, "base64")
      //   .then((base64String) => {
      //     resolve(base64String);
      //   })
      //   .catch((error) => {
      //     reject(`Error converting image to base64: ${error}`);
      //   });

      setModalImage(image.path);
      setImage3(image);
      setImage1(resizedImage.uri);

      await handleInputChange("imageOne", image.path, "imageOne");
      await setImageUri("imageOne", image.path);
      // await setFieldValue(getFieldValue(1));
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
      // const newWidth = Math.round((image.width * compression) / 100);
      // const newHeight = Math.round((image.height * compression) / 100);
      const resizedImage = await ImageResizer.createResizedImage(
        image.path,
        newWidth,
        newHeight,
        "JPEG",
        Math.min(compression, 100), // Ensure compression is between 0 and 100
        0,
        null
      );
      // RNFS.readFile(resizedImage.uri, "base64")
      //   .then((base64String) => {
      //     resolve(base64String);
      //   })
      //   .catch((error) => {
      //     reject(`Error converting image to base64: ${error}`);
      //   });

      setImage4(image);
      setPic(resizedImage.uri);
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
      // RNFS.readFile(resizedImage.uri, "base64")
      //   .then((base64String) => {
      //     resolve(base64String);
      //   })
      //   .catch((error) => {
      //     reject(`Error converting image to base64: ${error}`);
      //   });
      setImage5(image);
      setImagetwo(resizedImage.uri);
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
      // RNFS.readFile(resizedImage.uri, "base64")
      //   .then((base64String) => {
      //     resolve(base64String);
      //   })
      //   .catch((error) => {
      //     reject(`Error converting image to base64: ${error}`);
      //   });

      setImage6(image);
      setImagethree(resizedImage.uri);
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
      // RNFS.readFile(resizedImage.uri, "base64")
      //   .then((base64String) => {
      //     resolve(base64String);
      //   })
      //   .catch((error) => {
      //     reject(`Error converting image to base64: ${error}`);
      //   });
      setImage7(image);
      setImagefour(resizedImage.uri);
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
      // RNFS.readFile(resizedImage.uri, "base64")
      //   .then((base64String) => {
      //     resolve(base64String);
      //   })
      //   .catch((error) => {
      //     reject(`Error converting image to base64: ${error}`);
      //   });
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

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(
        DB.SHOPPER_ENGEGMENTDATA,
        JSON.stringify([...nonNullImages])
      );
      await AsyncStorage.setItem(DB.BASE_ONE_IMAGE, urlSenp);
      await AsyncStorage.setItem(DB.BASE_TWO_IMAGE, urlSenptwo);
      await AsyncStorage.setItem(DB.BASE_THREE_IMAGE, urlSenpthree);
      await AsyncStorage.setItem(DB.BASE_FOUR_IMAGE, urlSenpfour);
      await AsyncStorage.setItem(DB.BASE_FIVE_IMAGE, urlSenpfive);
      await AsyncStorage.setItem(DB.BASE_SIX_IMAGE, urlSenpsix);

      console.log("Data saved successfully!");
      Alert.alert(
        "Success",
        "Shopper engagement data submitted successfully",
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

  const ShopperEngagemantError = useSelector(
    (state) => state?.shopperEngagemnetReducer?.error
  );

  return (
    <View style={styles.maincontainer}>
      <Header
        header={"Shopper engagement Offline"}
        iconStyle={styles.headerIcon}
        image={Images.back}
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
                          source={Images.capchar}
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
                          source={Images.capchar}
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
                          source={Images.capchar}
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
                          source={Images.capchar}
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
                          source={Images.capchar}
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
                          source={Images.capchar}
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
                disabled={
                  nonNullImages.length == "0" || isLoadings ? true : false

                  // image1 == null ||
                  // pic == null ||
                  // imagetwo == null ||
                  // imagethree == null ||
                  // imagefour == null ||
                  // imagefive == null ||
                  // ? true
                  // : false
                }
                style={
                  nonNullImages.length == "0"
                    ? styles.grayButton
                    : styles.button
                  //styles.button
                  // image1 == null ||
                  // pic == null ||
                  // imagetwo == null ||
                  // imagethree == null ||
                  // imagefour == null ||
                  // imagefive == null
                  //   ? styles.grayButton
                  //   : styles.button
                }
                onPress={() => {
                  saveData();
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
              title={storedata?.store_name}
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

export default ShopperEngagementOffline;
