import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./PromoScreenStyle";
import { Images } from "../../assets/images/map";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from "react-redux";
import { PromoListAction } from "../../redux/actions/promoListAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { PromoUpadteAction } from "../../redux/actions/promoUpdateAction";
import { FontsFamily } from "../../assets/fonts/fonts";
import { StoreDetails } from "../../redux/actions/storeDetailsAction";
import ToastMessage from "../../components/ToastMessages/ToastMessages";
import { COLORS } from "../../colors/colors";
import Geolocation from "@react-native-community/geolocation";
import ImageResizer from "react-native-image-resizer";
import ServerScreen from "../ServerScreen/ServerScreen";
import { ErrorAction } from "../../redux/actions/errorAction";
import ImageWithText from "../../components/ImageWithText/ImageWithText";

const PromoScreen = () => {
  const dispatch = useDispatch();
  const handleImageCaptured = (uri) => {
    console.log("Captured image URI:", uri);
    setModalImage(uri); // Set the captured image URI
    setModalVisibles(false); // Close the modal
  };
  const [modalVisibles, setModalVisibles] = useState(false);
  const [token, setToken] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedImage, setSelectedIMage] = useState(null);
  const [selectedDec, setSelectedDec] = useState(null);
  const [selectedID, setSelectedId] = useState("");
  const [status, setStatus] = useState("");
  const [storeId, setStoreId] = useState("");
  const [detils, setDetails] = useState("");
  const [skuno, setSkuNo] = useState("");
  const [currentLatitude, setcurrentLatitude] = useState("");
  const [currentLongitude, setcurrentLongitude] = useState("");
  Geolocation.getCurrentPosition((data) => {
    setcurrentLatitude(data.coords.latitude);
  });
  Geolocation.getCurrentPosition((data) => {
    setcurrentLongitude(data.coords.longitude);
  });
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
  const getStoreId = async (token) => {
    AsyncStorage.getItem(DB.STORE_ID)
      .then((data) => {
        setStoreId(data);
        dispatch(StoreDetails(token, data));
        dispatch(PromoListAction(token, data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const isLoadings = useSelector(
    (state) => state?.storeDetailsReducer?.isLoading
  );
  const isLoadingss = useSelector(
    (state) => state?.promoUpdateReducer?.isLoading
  );

  const storeDetails = useSelector(
    (state) => state?.storeDetailsReducer?.storeDetails
  );
  const storename = storeDetails?.store_name;
  const isLoading = useSelector((state) => state?.PromoList?.isLoading);
  useEffect(() => {
    getToken();
  }, []);

  const PromoList = useSelector(
    (state) => state?.promoListReducer?.promoList?.data?.promo
  );

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalHeight, setModalHeight] = useState();
  const increaseModalHeight = () => {
    setModalHeight();
  };

  const resetModalHeight = () => {
    setModalHeight();
  };
  const closeModal = () => {
    setModalVisible(false);
    setSelectedOption("");
    setModalImage("");
    setDetails("");
  };
  const [selectedOption, setSelectedOption] = useState();

  const handleRadioChange = (option) => {
    setSelectedOption(option);
  };
  const [modalImage, setModalImage] = useState("");
  console.log(modalImage, "modalImage");
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
      // setModalVisible(false);
    });
  };

  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);

  const PromoUpdateHandle = () => {
    let imgObj = {
      name: "name",
      type: image1.mime,
      uri:
        Platform.OS === "android"
          ? modalImage
          : modalImage.replace("file://", ""),
    };

    dispatch(
      PromoUpadteAction(
        token,
        status,
        detils,
        imgObj,
        navigation,
        selectedID,
        currentLatitude,
        currentLongitude,
        storename,
        storeId
      )
    );
  };

  const StoreDetailCard = () => {
    return isLoadings ? (
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

  const isErrorVisible = useSelector((state) => state?.errorReducer?.isError);
  const isErrorVisibleMsg = useSelector((state) => state?.errorReducer?.msg);
  useEffect(() => {
    console.log("isErrorInEffect", isErrorVisible);
  }, [isErrorVisible]);

  const closeModalss = () => {
    dispatch(ErrorAction(false, ""));
  };
  return (
    <View>
      <Header
        header={"Promo"}
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

      <View style={styles.FlatMainConatiner}>
        <StoreDetailCard />
        {isLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator size={"large"} color={COLORS.primary} />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: Platform.OS == "android" ? 500 : 300,
            }}
            scrollEnabled={true}
            ListEmptyComponent={
              <View style={styles.NoDataView}>
                <Text style={styles.NoDataText}>No promo available!!</Text>
              </View>
            }
            data={PromoList}
            renderItem={({ item }) => {
              return (
                <View style={styles.FlatlistView}>
                  <View style={styles.container}>
                    <View style={styles.mainView}>
                      <TouchableOpacity
                        style={styles.SubView}
                        onPress={() => {
                          setModalVisible(true);
                          setSelectedItem(item.project_name);
                          setSelectedId(item.id);

                          setSelectedIMage({ uri: item.promo_image });
                          setSelectedDec(item.promo_des);
                          setSkuNo(item.sku_no);
                        }}
                      >
                        <View style={styles.TriView}>
                          <Image
                            style={styles.triimg}
                            source={Images.triangle}
                          />
                        </View>
                        <View style={styles.PromoView}>
                          <Text style={[styles.chainTexPromo]}>
                            {item.promo_type == "0"
                              ? "Pack Promo"
                              : item.promo_type == "1"
                              ? "Scan Promo"
                              : ""}
                          </Text>
                        </View>

                        <View style={styles.imgtextView}>
                          <View
                            style={[styles.imgconteinerss, { borderWidth: 0 }]}
                          >
                            <Image
                              resizeMode="contain"
                              source={{ uri: item.promo_image }}
                              style={styles.imgStyle}
                            />
                          </View>
                          <View>
                            <Text style={styles.chainText}>
                              {item.chain_name}
                            </Text>
                            <Text style={styles.skutext}>
                              {item.project_name}
                            </Text>

                            <Text style={styles.skuno}>{item.sku_no}</Text>
                          </View>
                        </View>

                        <View style={styles.promoDecView}>
                          <Text numberOfLines={2} style={styles.decText}>
                            NOTE: {item.promo_des}
                          </Text>
                        </View>
                        <View style={styles.statusView}>
                          <Text style={styles.chainTextone}>
                            {item.status == "0"
                              ? "Expire"
                              : item.status == "1"
                              ? "Active"
                              : ""}
                          </Text>
                          <Text style={styles.chainTexttwo}>
                            Expire In {item.end_date}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                  >
                    <View style={styles.ModalBackTouch}>
                      <View style={[styles.modalView, { height: modalHeight }]}>
                        <TouchableOpacity
                          onPress={() => {
                            resetModalHeight();
                            closeModal();
                          }}
                          style={styles.touchCross}
                        >
                          <Image
                            source={Images.cross}
                            style={styles.crossIcon}
                          />
                        </TouchableOpacity>
                        <View style={styles.DecView}>
                          <View style={styles.imgconteinerss}>
                            <Image
                              resizeMode="contain"
                              source={selectedImage}
                              style={styles.imagestyle}
                            />
                          </View>
                          <View>
                            <Text style={styles.modalText}>{selectedItem}</Text>
                            <Text style={styles.skuno}>{skuno}</Text>
                          </View>
                        </View>
                        <Text style={styles.textDecstyle}>{selectedDec}</Text>
                        <View style={styles.yesNObuttonView}>
                          <TouchableOpacity
                            onPress={() => {
                              increaseModalHeight(), handleRadioChange("yes");
                              setStatus("1");
                            }}
                            style={[
                              styles.button,
                              selectedOption === "yes" && styles.selectedButton,
                            ]}
                          >
                            <Text style={styles.buttonText}>Yes</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              increaseModalHeight(), handleRadioChange("no");
                              setStatus("0");
                            }}
                            style={[
                              styles.button,
                              selectedOption === "no" &&
                                styles.selectedButtonNO,
                            ]}
                          >
                            <Text style={styles.buttonText}>No</Text>
                          </TouchableOpacity>
                        </View>
                        {selectedOption === "yes" && (
                          <View style={styles.mainmodalView}>
                            <TouchableOpacity
                              style={styles.capcharbutton}
                              onPress={() => tackPhoto()}
                            >
                              {modalImage == "" ? (
                                <Image
                                  source={Images.camera}
                                  style={styles.Modalimages}
                                />
                              ) : (
                                <Image
                                  source={
                                    modalImage !== ""
                                      ? { uri: modalImage }
                                      : { uri: modalImage }
                                  }
                                  style={styles.Modalimages}
                                />
                              )}
                            </TouchableOpacity>
                            <View style={styles.textinputview}>
                              <TextInput
                                multiline
                                style={styles.textinput}
                                placeholder="Short brief of the discussion"
                                onChangeText={(detils) => setDetails(detils)}
                              />
                            </View>

                            <TouchableOpacity
                              disabled={
                                detils == "" || modalImage == "" || isLoadingss
                                  ? true
                                  : false
                              }
                              style={
                                detils.length > 0 && modalImage !== ""
                                  ? styles.buttons
                                  : styles.grayButtons
                              }
                              onPress={() => {
                                PromoUpdateHandle();
                                closeModal();
                              }}
                            >
                              {isLoadingss ? (
                                <ActivityIndicator
                                  color={COLORS.white}
                                  style={styles.submitText}
                                />
                              ) : (
                                <Text style={styles.submitText}>Submit</Text>
                              )}
                            </TouchableOpacity>
                          </View>
                        )}
                        {selectedOption === "no" && (
                          <View style={styles.view}>
                            <View style={styles.mainmodalView}>
                              <TouchableOpacity
                                style={styles.capcharbutton}
                                onPress={() => tackPhoto()}
                              >
                                {modalImage == "" ? (
                                  <Image
                                    source={Images.camera}
                                    style={styles.Modalimages}
                                  />
                                ) : (
                                  <Image
                                    source={
                                      modalImage !== ""
                                        ? { uri: modalImage }
                                        : { uri: modalImage }
                                    }
                                    style={styles.Modalimages}
                                  />
                                )}
                              </TouchableOpacity>
                              <View style={styles.textinputview}>
                                <TextInput
                                  multiline
                                  style={styles.textinput}
                                  placeholder="Short brief of the discussion"
                                  placeholderTextColor={COLORS.black}
                                  onChangeText={(detils) => setDetails(detils)}
                                />
                              </View>

                              <TouchableOpacity
                                disabled={
                                  detils == "" ||
                                  modalImage == "" ||
                                  isLoadingss
                                    ? true
                                    : false
                                }
                                style={
                                  detils.length > 0 && modalImage !== ""
                                    ? styles.buttons
                                    : styles.grayButtons
                                }
                                onPress={() => {
                                  PromoUpdateHandle();
                                  closeModal();
                                }}
                              >
                                {isLoadingss ? (
                                  <ActivityIndicator
                                    color={COLORS.white}
                                    style={styles.submitText}
                                  />
                                ) : (
                                  <Text style={styles.submitText}>Submit</Text>
                                )}
                              </TouchableOpacity>
                            </View>
                          </View>
                        )}
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
                  </Modal>
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

export default PromoScreen;
