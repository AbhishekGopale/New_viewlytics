import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Images } from "../../assets/images/map";
import DropDownPicker from "react-native-dropdown-picker";
import { COLORS } from "../../colors/colors";
import ImagePicker from "react-native-image-crop-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { CompationAnalysisAction } from "../../redux/actions/competitionAnalysisAction";
import { useDispatch, useSelector } from "react-redux";
import { CompetitionDataAction } from "../../redux/actions/competitionanalysisPostAction";
import { styles } from "../CompetitionAnalysis/CompetitionAnalysisStyle";
import ImageResizer from "react-native-image-resizer";
import ImageWithText from "../../components/ImageWithText/ImageWithText";
import Geolocation from "@react-native-community/geolocation";
import RNFS from "react-native-fs";

const MarketInteligiance = () => {
  const handleImageCaptured = (uri) => {
    console.log("Captured image URI:", uri);
    setModalImage(uri); // Set the captured image URI
    setModalVisibles(false); // Close the modal
  };
  const handleImageCapturedtwo = (uri) => {
    console.log("Captured image URIjedeejdejdej:", uri);
    setModalImageTwo(uri); // Set the captured image URI
    setModalVisible(false); // Close the modal
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibles, setModalVisibles] = useState(false);
  const [modalImage, setModalImage] = useState("");
  console.log(modalImage, "modalImage==----");

  const [modalImageTwo, setModalImageTwo] = useState("");
  console.log(modalImageTwo, "modalImageTwo==----");
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [storeId, setStoreId] = useState("");

  const [storedata, setStoreData] = useState({});
  const [ineligianceData, setIneligianceData] = useState([]);
  const [currentLatitude, setcurrentLatitude] = useState("");
  const [currentLongitude, setcurrentLongitude] = useState("");
  const [urlSenpTwo, setUrlSenpTwo] = useState("");
  const [urlSenp, setUrlSenp] = useState("");

  Geolocation.getCurrentPosition((data) => {
    setcurrentLatitude(data.coords.latitude);
  });
  Geolocation.getCurrentPosition((data) => {
    setcurrentLongitude(data.coords.longitude);
  });
  useFocusEffect(
    React.useCallback(() => {
      marketinteligance();

      return () => {
        // Cleanup function
        // Perform cleanup tasks here if needed
        console.log("Cleanup tasks performed");
        // Example cleanup task:
        // Clear any timers, subscriptions, or other resources
      };
    }, [])
  );

  useEffect(() => {
    getToken();
    dispatch(CompationAnalysisAction(token, navigation));
  }, []);

  const marketinteligance = async () => {
    AsyncStorage.getItem(DB.INELIGINCE_DATA)
      .then((data) => {
        let newData = JSON.parse(data);
        setIneligianceData(newData);
        console.log(data, "ineligianceData====-------");
      })
      .catch((e) => {});
  };

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

  const CompationAnaylisisData = useSelector(
    (state) => state?.competitionAnalysisReducer?.allDetails?.data
  );

  // useEffect(() => {
  //   setActivation(ineligianceData);
  // }, [ineligianceData]);

  const [activationdata, setActivation] = useState([]);
  const [valueActivation, setValueActivation] = useState([]);
  const [openActivation, setOpenActivation] = useState(false);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [detils, setDetails] = useState("");

  const navigation = useNavigation();

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

      setImage1(image);
      setImage(image.path);
      setModalImage(image.path);
      setModalVisibles(true);
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

      setImage2(image);
      setPic(image.path);
      setModalImageTwo(image.path);
      setModalVisible(true);
    });
  };
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  console.log(image1);
  const [image2, setImage2] = useState(null);
  console.log(image2);
  const [pic, setPic] = useState(null);
  const nonNullImages = [];
  if (image1 && image1.mime && modalImage) {
    const imgObj = {
      uri:
        Platform.OS === "android"
          ? RNFS.readFile(modalImage, "base64")
              .then((base64String) => {
                console.log(base64String, "base64String");
                setUrlSenpTwo("data:image/jpeg;base64," + base64String);
                resolve(base64String);
              })
              .catch((error) => {
                reject(`Error converting image to base64: ${error}`);
              })
          : RNFS.readFile(modalImage, "base64")
              .then((base64String) => {
                console.log(base64String, "base64String");

                setUrlSenpTwo("data:image/jpeg;base64," + base64String);
                resolve(base64String);
              })
              .catch((error) => {
                reject(`Error converting image to base64: ${error}`);
              }),
    };
    AsyncStorage.setItem(DB.INTELIGNCE_IMAGE_ONE, JSON.stringify(imgObj));

    pushNonNullImage(imgObj);
  }

  if (image2 && image2.mime && modalImageTwo) {
    const imgObj2 = {
      name: "name",
      type: image2.mime,
      uri:
        Platform.OS === "android"
          ? RNFS.readFile(modalImageTwo, "base64")
              .then((base64String) => {
                console.log(base64String, "base64String");
                setUrlSenp("data:image/jpeg;base64," + base64String);
                resolve(base64String);
              })
              .catch((error) => {
                reject(`Error converting image to base64: ${error}`);
              })
          : RNFS.readFile(modalImageTwo, "base64")
              .then((base64String) => {
                console.log(base64String, "base64String");

                setUrlSenp("data:image/jpeg;base64," + base64String);
                resolve(base64String);
              })
              .catch((error) => {
                reject(`Error converting image to base64: ${error}`);
              }),
    };
    AsyncStorage.setItem(DB.INTELIGNCE_IMAGE_TWO, JSON.stringify(imgObj2));
    pushNonNullImage(imgObj2);
  }
  function pushNonNullImage(image) {
    if (image && image.uri) {
      nonNullImages.push(image);
    }
  }

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(
        DB.INTELIGNCE_IMAGE,
        JSON.stringify([...nonNullImages])
      );
      await AsyncStorage.setItem(DB.INTELIGNCE_BASE_IMAGE_ONE, urlSenp);
      await AsyncStorage.setItem(DB.INTELIGNCE_BASE_IMAGE_TWO, urlSenpTwo);
      AsyncStorage.setItem(DB.INTELIGNCE_BRAND_NAME, JSON.stringify(name));
      AsyncStorage.setItem(DB.INTELIGNCE_CATEGORY_NAME, JSON.stringify(brand));
      AsyncStorage.setItem(DB.COMPETION_DISCRIPTION, JSON.stringify(detils));

      AsyncStorage.setItem(
        DB.INTELIGNCE_VALUE_DROPDOWN,
        JSON.stringify(valueActivation)
      );

      console.log("Data saved successfully!");
      Alert.alert(
        "Success",
        "Marketing Intelligence data submitted successfully!",
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

  const CompatitionDetailsHandle = () => {
    // let imgObj = {
    //   name: "name",
    //   type: image1.mime,
    //   uri:
    //     Platform.OS === "android"
    //       ? modalImage
    //       : modalImage.replace("file://", ""),
    // };
    // let imgObj2 = {
    //   name: "name",
    //   type: image2.mime,
    //   uri:
    //     Platform.OS === "android"
    //       ? modalImageTwo
    //       : modalImageTwo.path.replace("file://", ""),
    // };

    dispatch(
      CompetitionDataAction(
        valueActivation,
        name,
        brand,
        token,
        detils,
        // image,
        // pic,
        imgObj,
        imgObj2,
        navigation,
        storeId
      )
    );
  };
  const CompatitionAnalysisError = useSelector(
    (state) => state?.competitionAnalysisReducer?.error
  );
  const isLoadings = useSelector(
    (state) => state?.competitionanalysisPostReducer?.isLoading
  );

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Header
          header={"Marketing intelligence Offline"}
          iconStyle={styles.headerIcon}
          image={Images.back}
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {isLoading ? (
            <View>
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
                      <Text style={styles.TlText}>
                        TL Name : {storedata?.tl}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.addresstext}>
                    <View style={styles.addView}>
                      <Text style={styles.AddText}>Address : </Text>
                    </View>
                    <View style={styles.AdressView}>
                      <Text style={styles.AddTexttwo}>
                        {storedata?.location}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
        <View style={styles.mainView}>
          <View style={styles.PaddingView}>
            <View>
              <Text style={styles.textinputheader}>Types Of Activation</Text>
            </View>
            <View style={styles.dropView}>
              {ineligianceData && ineligianceData.length > 0 && (
                <DropDownPicker
                  listMode="SCROLLVIEW"
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}
                  dropDownContainerStyle={{
                    borderColor: COLORS.white,
                    position: "relative",
                    top: 0,
                    width: "100%",
                    alignSelf: "center",
                  }}
                  open={openActivation}
                  value={valueActivation}
                  items={ineligianceData}
                  setOpen={setOpenActivation}
                  setValue={setValueActivation}
                  setItems={setActivation}
                  style={{
                    borderColor: COLORS.white,
                    padding: 0,
                    top: 10,
                    width: "100%",
                    alignSelf: "center",
                  }}
                  placeholder="Choose type"
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
              )}
            </View>

            <View>
              <Text style={styles.textinputheader}>Category Name</Text>
              <View style={styles.TextView}>
                <TextInput
                  multiline
                  placeholder="Write Category..."
                  placeholderTextColor={COLORS.gray}
                  onChangeText={(name) => setName(name)}
                  style={styles.Textinput}
                />
              </View>
            </View>

            <View>
              <Text style={styles.textinputheader}>Competition Brand Name</Text>
              <View style={styles.TextView}>
                <TextInput
                  multiline
                  placeholder="Write Compation Brand Name..."
                  placeholderTextColor={COLORS.gray}
                  style={styles.Textinput}
                  onChangeText={(brand) => setBrand(brand)}
                />
              </View>
            </View>
            <View>
              <Text style={styles.textinputheader}>
                Full Details Competition Brand{" "}
              </Text>
              <View style={styles.TextViewone}>
                <TextInput
                  //  style={{  paddingBottom: Platform.OS === 'ios' ? 0 : 50,  }}
                  scrollEnabled={true}
                  multiline
                  placeholder="Write Something..."
                  placeholderTextColor={COLORS.gray}
                  style={styles.Textinputone}
                  onChangeText={(detils) => setDetails(detils)}
                />
              </View>
            </View>

            <View style={styles.mainViewimg}>
              <View>
                <TouchableOpacity
                  style={styles.capcharbutton}
                  onPress={() => tackPhoto()}
                >
                  {modalImage == "" ? (
                    <Image source={Images.camera} style={styles.Modalimages} />
                  ) : (
                    <Image
                      source={{ uri: modalImage }}
                      style={styles.Modalimages}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.capcharbutton}
                  onPress={() => tackPic()}
                >
                  {modalImageTwo == "" ? (
                    <Image source={Images.camera} style={styles.Modalimages} />
                  ) : (
                    <Image
                      source={{ uri: modalImageTwo }}
                      style={styles.Modalimages}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.buttonView}>
              <TouchableOpacity
                disabled={
                  valueActivation !== null &&
                  name.length > 0 &&
                  brand.length > 0 &&
                  detils.length > 0 &&
                  image !== null &&
                  pic !== null
                    ? false
                    : true
                }
                style={
                  valueActivation !== null &&
                  name.length > 0 &&
                  brand.length > 0 &&
                  detils.length > 0 &&
                  image !== null &&
                  pic !== null
                    ? styles.button
                    : styles.grayButton
                }
                onPress={() => {
                  saveData();
                  // navigation.goBack();
                }}
              >
                {isLoadings ? (
                  <ActivityIndicator
                    color={COLORS.white}
                    style={[styles.butotonText]}
                  />
                ) : (
                  <Text style={styles.butotonText}>submit</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          {modalImage !== "" && modalVisibles && (
            <ImageWithText
              title={storedata?.store_name}
              lat={currentLatitude}
              lon={currentLongitude}
              date={new Date().toLocaleDateString()}
              time={new Date().toLocaleTimeString()}
              imageUrl={modalImage}
              onClose={(uri) => {
                handleImageCaptured(uri);
              }}
            />
          )}
          {modalImageTwo !== "" && modalVisible && (
            <ImageWithText
              title={storedata?.store_name}
              lat={currentLatitude}
              lon={currentLongitude}
              date={new Date().toLocaleDateString()}
              time={new Date().toLocaleTimeString()}
              imageUrl={modalImageTwo}
              onClose={(uri) => {
                handleImageCapturedtwo(uri);
              }}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};
export default MarketInteligiance;
