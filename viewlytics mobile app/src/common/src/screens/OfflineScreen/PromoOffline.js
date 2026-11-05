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
import { styles } from "../Promo/PromoScreenStyle";
import Geolocation from "@react-native-community/geolocation";
import ImageResizer from "react-native-image-resizer";
import RNFS from "react-native-fs";

import ImageWithText from "../../components/ImageWithText/ImageWithText";
const PromoOffline = () => {
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

  const [storedata, setStoreData] = useState({});
  const [promoData, setPromoData] = useState();
  const [UrlImg, setUrlImg] = useState("");
  console.log(UrlImg, "UrlImg");

  console.log(promoData, "setPromoData-------=======");
  const getPromoDetails = async () => {
    AsyncStorage.getItem(DB.PROMO_DATA)
      .then((data) => {
        let newData = JSON.parse(data);

        setPromoData(newData);
      })
      .catch((e) => {
        console.log(e);
      });
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
        // dispatch(StoreDetails(token, data));
        // dispatch(PromoListAction(token, navigation, data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const [promoDataOffline, setPromoOffline] = useState();
  console.log(promoDataOffline, "=====promoDataOffline===----");
  const getOfflineData = async (token) => {
    AsyncStorage.getItem(DB.PROMO_OFFLINE_DATA)
      .then((data) => {
        setPromoOffline(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
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
        dispatch(PromoListAction(data));
        getStoreId(data);
        getStoredetails();
        getPromoDetails();
        getOfflineData();
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
  const isLoading = useSelector((state) => state?.PromoList?.isLoading);
  useEffect(() => {
    getToken();
    dispatch(PromoListAction(token, navigation, storeId));
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
    setImage(null);
    getOfflineData();
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

  const PromoUpdateHandle = async () => {
    const imgObj = modalImage
      ? await new Promise((resolve, reject) => {
          RNFS.readFile(modalImage, "base64")
            .then((base64String) => {
              const imageDataUrl = "data:image/jpeg;base64," + base64String;
              setUrlImg(imageDataUrl);
              resolve(imageDataUrl);
            })
            .catch((error) => {
              console.error(`Error converting image to base64: ${error}`);
              reject(new Error(`Error converting image to base64: ${error}`));
            });
        })
      : "";

    dispatch(
      PromoUpadteAction(token, status, detils, imgObj, navigation, selectedID)
    );
  };
  const PromoUpdateHandlessss = async () => {
    console.log("In Button promoData", promoData);
    let dataArray = promoDataOffline ? JSON.parse(promoDataOffline) : [];

    if (status && detils && modalImage && selectedID) {
      dataArray = dataArray.filter((item) => item.selectedID !== selectedID);

      // let imgObj = {
      //   name: "name",
      //   type: image1.mime,
      //   uri:v
      //     Platform.OS === "android"
      //       ? modalImage
      //       : modalImage.replace("file://", ""),
      // };

      const imgObj = modalImage
        ? await new Promise((resolve, reject) => {
            RNFS.readFile(modalImage, "base64")
              .then((base64String) => {
                const imageDataUrl = "data:image/jpeg;base64," + base64String;
                setUrlImg(imageDataUrl);
                resolve(imageDataUrl);
              })
              .catch((error) => {
                console.error(`Error converting image to base64: ${error}`);
                reject(new Error(`Error converting image to base64: ${error}`));
              });
          })
        : "";

      let newDataObject = {
        promo_status: status,
        promo_remark: detils,
        image: imgObj,
        selectedID: selectedID,
        store_id: storeId,
      };
      dataArray.push(newDataObject);

      console.log("dataArray", dataArray, newDataObject);

      AsyncStorage.setItem(
        DB.PROMO_OFFLINE_DATA,
        JSON.stringify(dataArray),

        () => {
          alert("Promo data submitted successfully");
          closeModal();
        }
      );
    }

    console.log(dataArray, "PromodataArray=====");

    return dataArray;
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

  return (
    <View>
      <Header
        header={"Promo Offline"}
        iconStyle={styles.headerIcon}
        image={Images.back}
        onPress={() => navigation.goBack()}
      />

      <View style={styles.FlatMainConatiner}>
        <StoreDetailCard />

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
          data={promoData}
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
                        <Image style={styles.triimg} source={Images.triangle} />
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
                            resizeMode="cover"
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
                        <Image source={Images.cross} style={styles.crossIcon} />
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
                            selectedOption === "no" && styles.selectedButtonNO,
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
                            {image == null ? (
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
                              detils.length > 0 && image !== null ? false : true
                            }
                            style={
                              detils.length > 0 && image !== null
                                ? styles.buttons
                                : styles.grayButtons
                            }
                            onPress={() => {
                              PromoUpdateHandlessss();
                            }}
                          >
                            <Text style={styles.submitText}>Submit</Text>
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
                              {image == null ? (
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
                                detils.length > 0 && image !== null
                                  ? false
                                  : true
                              }
                              style={
                                detils.length > 0 && image !== null
                                  ? styles.buttons
                                  : styles.grayButtons
                              }
                              onPress={() => {
                                PromoUpdateHandlessss();
                              }}
                            >
                              <Text style={styles.submitText}>Submit</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
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
                </Modal>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default PromoOffline;
