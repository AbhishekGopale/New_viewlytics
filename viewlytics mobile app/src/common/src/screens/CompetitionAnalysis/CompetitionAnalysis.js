import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import { styles } from "./CompetitionAnalysisStyle";
import DropDownPicker from "react-native-dropdown-picker";
import { COLORS } from "../../colors/colors";
import ImagePicker from "react-native-image-crop-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { CompationAnalysisAction } from "../../redux/actions/competitionAnalysisAction";
import { useDispatch, useSelector } from "react-redux";
import { StoreDetails } from "../../redux/actions/storeDetailsAction";
import ToastMessage from "../../components/ToastMessages/ToastMessages";
import Geolocation from "@react-native-community/geolocation";
import { useNavigation } from "@react-navigation/native";
import { CompetitionDataAction } from "../../redux/actions/competitionanalysisPostAction";
import { MarketIntelligenceAction } from "../../redux/actions/marketintelligenceAction";
import { CategoryDataAction } from "../../redux/actions/categoryListAction";
import ImageResizer from "react-native-image-resizer";
import ServerScreen from "../ServerScreen/ServerScreen";
import { ErrorAction } from "../../redux/actions/errorAction";
import ImageWithText from "../../components/ImageWithText/ImageWithText";

MarketIntelligenceAction;
const CompetitionAnalysis = () => {
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
  const navigation = useNavigation();

  const [currentLatitude, setcurrentLatitude] = useState("");
  const [currentLongitude, setcurrentLongitude] = useState("");
  Geolocation.getCurrentPosition((data) => {
    setcurrentLatitude(data.coords.latitude);
  });
  Geolocation.getCurrentPosition((data) => {
    setcurrentLongitude(data.coords.longitude);
  });

  const [token, setToken] = useState("");
  const [storeId, setStoreId] = useState("");
  const getStoreId = async (token) => {
    AsyncStorage.getItem(DB.STORE_ID)
      .then((data) => {
        setStoreId(data);
        dispatch(StoreDetails(token, data));
        dispatch(CategoryDataAction(token, navigation, data));
      })
      .catch((e) => {});
  };

  const getToken = async () => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        dispatch(CompationAnalysisAction(data));
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
  useEffect(() => {
    getToken();
    dispatch(CompationAnalysisAction(token));
  }, []);

  const CompationAnaylisisData = useSelector(
    (state) => state?.competitionAnalysisReducer?.allDetails?.data
  );

  useEffect(() => {
    setActivation(CompationAnaylisisData);
  }, [CompationAnaylisisData]);

  const [activationdata, setActivation] = useState([]);
  const [valueActivation, setValueActivation] = useState([]);
  console.log(valueActivation.length, "valueActivation");
  const [openActivation, setOpenActivation] = useState(false);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [detils, setDetails] = useState("");

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
        Math.min(compression, 100),
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

      setImage2(image);
      setPic(image.path);
      setModalImageTwo(image.path);
      setModalVisible(true);
    });
  };

  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");

  const [pic, setPic] = useState("");
  const MarketIntelligenceHandle = () => {
    let imgObj = {
      name: "name",
      type: image1.mime,
      uri:
        Platform.OS === "android"
          ? modalImage
          : modalImage.replace("file://", ""),
    };
    let imgObj2 = {
      name: "name",
      type: image2.mime,
      uri:
        Platform.OS === "android"
          ? modalImageTwo
          : modalImageTwo.path.replace("file://", ""),
    };

    dispatch(
      MarketIntelligenceAction(
        valueActivation,
        name,
        brand,
        token,
        detils,
        imgObj,
        imgObj2,
        storeId,
        currentLatitude,
        currentLongitude,
        storename,
        navigation
      )
    );
  };

  const isLoadings = useSelector(
    (state) => state?.marketintelligenceReducer?.isLoading
  );
  console.log(isLoadings, "isLoadings__________");

  const isErrorVisible = useSelector((state) => state?.errorReducer?.isError);
  const isErrorVisibleMsg = useSelector((state) => state?.errorReducer?.msg);
  useEffect(() => {
    console.log("isErrorInEffect", isErrorVisible);
  }, [isErrorVisible]);

  const closeModalss = () => {
    dispatch(ErrorAction(false, ""));
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        header={"Market intelligence"}
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
                      <Text style={styles.TlText}>
                        TL Name : {storeDetails?.tl}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.addresstext}>
                    <View style={styles.addView}>
                      <Text style={styles.AddText}>Address : </Text>
                    </View>
                    <View style={styles.AdressView}>
                      <Text style={styles.AddTexttwo}>
                        {storeDetails?.location}
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
              {CompationAnaylisisData && CompationAnaylisisData.length > 0 && (
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
                  items={activationdata}
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
                  valueActivation.length == "0" ||
                  name == "" ||
                  brand == "" ||
                  detils == "" ||
                  image == "" ||
                  pic == "" ||
                  isLoadings
                    ? true
                    : false
                }
                style={
                  valueActivation.length == "0" ||
                  name == "" ||
                  brand == "" ||
                  detils == "" ||
                  image == "" ||
                  pic == ""
                    ? styles.grayButton
                    : styles.button
                }
                onPress={() => {
                  MarketIntelligenceHandle();
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
          {modalImage !== "" && modalVisibles && (
            <ImageWithText
              title={storename}
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
              title={storename}
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
export default CompetitionAnalysis;
