import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useNavigation } from "@react-navigation/native";
import { Images } from "../../assets/images/map";
import DropDownPicker from "react-native-dropdown-picker";
import { COLORS } from "../../colors/colors";
import { styles } from "../MerchandisingAssetTracking/CreateAssestStyle";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { getStoreId } from "../../utilities/utilities";
import { StoreDetails } from "../../redux/actions/storeDetailsAction";
import { TrackingAssestAction } from "../../redux/actions/trakingAssetAction";
import { AssestCategoryAction } from "../../redux/actions/assetTrackingDataAction";
import { AssestListAction } from "../../redux/actions/assestListAction";
import ToastMessage from "../../components/ToastMessages/ToastMessages";
import Geolocation from "@react-native-community/geolocation";
import ServerScreen from "../ServerScreen/ServerScreen";
import { ErrorAction } from "../../redux/actions/errorAction";
import ImageWithText from "../../components/ImageWithText/ImageWithText";
import data from "../SalesHealth/data";
import RNFS from "react-native-fs";

const CreateAssestOffline = ({ route }) => {
  const { selectedItem } = route.params;
  const category = selectedItem.id;

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
  const [storedata, setStoreData] = useState({});

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
        // dispatch(AssestCategoryAction(token, data, navigation));
        // dispatch(AssestListAction(token, data, navigation));
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const [createData, setCreateData] = useState([]);
  console.log(createData, "createData------");
  const getData = async (token) => {
    try {
      const data = await AsyncStorage.getItem(DB.ASSET_CREATE_DATA_ARRAY);
      if (data) {
        const parsedData = JSON.parse(data);
        setCreateData(parsedData);
      } else {
        console.log("Data not found in AsyncStorage");
      }
    } catch (error) {
      console.log("Error while getting data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const [assestList, setAssestList] = useState();

  console.log(assestList, "categoryData========-------");

  const getAssetstList = async () => {
    AsyncStorage.getItem(DB.ASSETLIST_DATA)

      .then((data) => {
        let newCategoryData = JSON.parse(data);

        setAssestList(newCategoryData);
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
        getAssetstList();
        getStoredetails();
      })
      .catch((e) => {
        console.log(e);
      });
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
  }, []);
  const categoryDatalisisData = useSelector(
    (state) => state?.assetTrackingDataReducer?.allDetails
  );

  const AssestListData = useSelector(
    (state) => state?.assestListReducer?.allAsset?.data
  );

  const [pic, setPic] = useState(null);
  const [imagetwo, setImagetwo] = useState(null);
  const [imagethree, setImagethree] = useState(null);
  const [imagefour, setImagefour] = useState(null);
  const [imagefive, setImagefive] = useState(null);
  const [image3, setImage3] = useState(null);
  const [catImg1, setCatImg1] = useState(null);
  const [catImg2, setCatImg2] = useState(null);
  const [catImg3, setCatImg3] = useState(null);
  const [catImg4, setCatImg4] = useState(null);

  const [image4, setImage4] = useState(null);
  const [image5, setImage5] = useState(null);
  const [image6, setImage6] = useState(null);
  const [image7, setImage7] = useState(null);
  //   const [image8, setImage8] = useState(null);

  /// GeoTaggingModal
  const [fieldValue, setFieldValue] = useState({});
  const [imageForm, setImageForm] = useState({
    imageOne: null,
    imageTwo: null,
    imageThree: null,
    imageFour: null,
    imageFive: null,
    imageSix: null,
    imageSeven: null,
    imageEight: null,
    imageNine: null,
  });
  const [modalImage, setModalImage] = useState("");
  const [images, setImages] = useState([]);
  console.log(images, "images-------");

  console.log(modalImage, "modalImage++++++++++");

  useEffect(() => {
    if (modalImage !== "") {
      setImages((prevImages) => [...prevImages, modalImage]);
      // setModalImage("");
    }
  }, [modalImage]);

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
        setImgg1(url);
        break;
      case "imageSeven":
        setImgg2(url);
        break;
      case "imageEight":
        setImgg3(url);
        break;
      case "imageNine":
        setImgg4(url);
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

  // const tackPhoto = () => {
  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 400,
  //     cropping: false,
  //   }).then(async (image) => {
  //     setImage3(image);
  //     setImage1(image.path);
  //     await handleInputChange("imageOne", image.path, "imageOne");
  //     await setImageUri("imageOne", image.path);
  //   });
  // };
  const takePhoto = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: false,
      });
      setImage1(image.path);
      await setImageUri("imageOne", image.path);
      setImage3(image);
      await handleInputChange("imageOne", image.path, "imageOne");
    } catch (error) {
      console.log("Error taking photo:", error);
    }
  };

  // const tackPic = () => {
  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 400,
  //     cropping: false,
  //   }).then(async (image) => {
  //     setImage4(image);

  //     setPic(image.path);
  //     await handleInputChange("imageTwo", image.path, "imageTwo");
  //     await setImageUri("imageTwo", image.path);
  //   });
  // };
  // const tackPhotoTwo = () => {
  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 400,
  //     cropping: false,
  //   }).then(async (image) => {
  //     setImage5(image);

  //     setImagetwo(image.path);
  //     await handleInputChange("imageThree", image.path, "imageThree");
  //     await setImageUri("imageThree", image.path);
  //   });
  // };
  // const tackPhotoThree = () => {
  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 400,
  //     cropping: false,
  //   }).then(async (image) => {
  //     setImage6(image);

  //     setImagethree(image.path);
  //     await handleInputChange("imageFour", image.path, "imageFour");
  //     await setImageUri("imageFour", image.path);
  //   });
  // };
  // const tackPhotoFour = () => {
  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 400,
  //     cropping: false,
  //   }).then(async (image) => {
  //     setImage7(image);

  //     setImagefour(image.path);
  //     await handleInputChange("imageFive", image.path, "imageFive");
  //     await setImageUri("imageFive", image.path);
  //   });
  // };
  const CatImageOne = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
    }).then(async (image) => {
      setCatImg1(image);
      setImgg1(image.path);
      await handleInputChange("imageSix", image.path, "imageSix");
      await setImageUri("imageSix", image.path);
    });
  };
  const CatImageTwo = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
    }).then(async (image) => {
      setCatImg2(image);
      setImgg2(image.path);
      await handleInputChange("imageSeven", image.path, "imageSeven");
      await setImageUri("imageSeven", image.path);
    });
  };
  const CatImageThree = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
    }).then(async (image) => {
      setCatImg3(image);
      setImgg3(image.path);
      await handleInputChange("imageEight", image.path, "imageEight");
      await setImageUri("imageEight", image.path);
    });
  };
  const CatImageFour = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
    }).then(async (image) => {
      setCatImg4(image);
      setImgg4(image.path);
      await handleInputChange("imageNine", image.path, "imageNine");
      await setImageUri("imageNine", image.path);
    });
  };
  const AssetTrackingError = useSelector(
    (state) => state?.assetTrackingDataReducer?.error
  );

  const PaidAssest = [
    { label: "Paid Asset", value: "0" },
    { label: "UnPaid Asset", value: "1" },
    { label: "N/A", value: "2" },
  ];

  const unPaidAssest = [
    { label: "Assest 1", value: "1" },
    { label: "Assest 2", value: "2" },
    { label: "UnPaid Assest 3", value: "3" },
    { label: "Assest 4", value: "4" },
    { label: "Assest 5", value: "5" },
    { label: "UnPaid Assest 6", value: "6" },
  ];

  const ProjectName = [
    { label: "Colgate", value: "1" },
    { label: "Dabar", value: "2" },
    { label: "Patanjali", value: "3" },
  ];
  useEffect(() => {}, [categoryDatalisisData]);

  const [meetingdata, setMeetingdata] = useState(PaidAssest);
  const [valueMeeting, setValueMeeting] = useState("");
  console.log(valueMeeting, "valueMeeting");
  const [openMeeting, setOpenMeeting] = useState(false);

  const [assets, setAssests] = useState(unPaidAssest);
  const [valueAssets, setValueAssets] = useState("");
  console.log(valueAssets, "valueAssets");
  const [openAssests, setOpenAssets] = useState(false);

  const [project, setProject] = useState(ProjectName);
  const [valueProject, setValueProject] = useState("");
  const [openProject, setOpenProject] = useState(false);

  const navigation = useNavigation();

  const [selectedValue, setSelectedValue] = useState("");
  console.log(selectedValue, "selectedValue");
  const [option, setOption] = useState("");

  const handleSelect = (value) => {
    setSelectedValue(value);
    setOption(value);
  };
  const [image1, setImage1] = useState("");
  console.log(image1, "image1---======");

  const [catImgg1, setImgg1] = useState(null);
  const [catImgg2, setImgg2] = useState(null);
  const [catImgg3, setImgg3] = useState(null);
  const [catImgg4, setImgg4] = useState(null);
  const [image, setImage] = useState(null);
  const [detils, setDetails] = useState("");

  const [urlcat, setUrlCat] = useState("");
  const [urlcattwo, setUrlCatTwo] = useState("");
  const [urlcatthree, setUrlCatThree] = useState("");
  const [urlcatfour, setUrlCatFour] = useState("");

  console.log({ urlcat });
  const saveData = async () => {
    try {
      const catname = selectedItem?.category_name;

      function convertUriToBase64(uri) {
        return new Promise((resolve, reject) => {
          RNFS.readFile(uri, "base64")
            .then((base64String) => {
              resolve(base64String);
            })
            .catch((error) => {
              reject(`Error converting image to base64: ${error}`);
            });
        });
      }

      async function createImageObjects(images) {
        if (images.length === 0) {
          return [];
        }

        try {
          const imgObj = await Promise.all(
            images.map(async (uri) => {
              try {
                const base64 = await convertUriToBase64(uri);
                return `data:image/jpeg;base64,${base64}`;
              } catch (error) {
                console.error("Error converting uri to base64: ", error);
                return null;
              }
            })
          );

          // const imgObj = await Promise.all(
          //   images.map(async (uri) => {
          //     try {
          //       const base64 = await convertUriToBase64(uri);
          //       return
          //         base64: `data:image/jpeg;base64,${base64}`;

          //     } catch (error) {
          //       console.error("Error converting uri to base64: ", error);
          //       return null;
          //     }
          //   })
          // );

          // Filter out null entries (failed conversions)
          return imgObj.filter((obj) => obj !== null);
        } catch (error) {
          console.error("Error creating image objects: ", error);
          return []; // Return empty array on error
        }
      }

      const imgObj = await createImageObjects(images)
        .then((imgObj) => {
          console.log(imgObj); // Directly logging imgObj array
          return imgObj;
        })
        .catch((error) => {
          console.error("Error creating image objects: ", error);
        });
      console.log({ imgObj });

      const catimgObj = catImgg1
        ? await new Promise((resolve, reject) => {
            RNFS.readFile(catImgg1, "base64")
              .then((base64String) => {
                const imageDataUrl = "data:image/jpeg;base64," + base64String;
                setUrlCat(imageDataUrl);
                resolve(imageDataUrl);
              })
              .catch((error) => {
                reject(`Error converting image to base64: ${error}`);
              });
          })
        : "";

      const catimgObjTwo = catImgg2
        ? await new Promise((resolve, reject) => {
            RNFS.readFile(catImgg2, "base64")
              .then((base64String) => {
                const imageDataUrl = "data:image/jpeg;base64," + base64String;
                setUrlCatTwo(imageDataUrl);
                resolve(imageDataUrl);
              })
              .catch((error) => {
                reject(`Error converting image to base64: ${error}`);
              });
          })
        : "";

      const catimgObjThree = catImgg3
        ? await new Promise((resolve, reject) => {
            RNFS.readFile(catImgg3, "base64")
              .then((base64String) => {
                const imageDataUrl = "data:image/jpeg;base64," + base64String;
                setUrlCatThree(imageDataUrl);
                resolve(imageDataUrl);
              })
              .catch((error) => {
                reject(`Error converting image to base64: ${error}`);
              });
          })
        : "";

      const catimgObjFour = catImgg4
        ? await new Promise((resolve, reject) => {
            RNFS.readFile(catImgg4, "base64")
              .then((base64String) => {
                const imageDataUrl = "data:image/jpeg;base64," + base64String;
                setUrlCatFour(imageDataUrl);
                resolve(imageDataUrl);
              })
              .catch((error) => {
                reject(`Error converting image to base64: ${error}`);
              });
          })
        : "";
      console.log({ catimgObj });
      console.log({ catimgObjFour });
      // console.log(catimgObj, "catimgObj=======================");
      // console.log(catimgObjFour, "catimgObjFour=======================");
      // console.log(catimgObjThree, "catimgObjThree=======================");
      // console.log(catimgObjTwo, "catimgObjTwo=======================");
      // console.log(valueMeeting, "valueMeeting=======================");
      // console.log(valueAssets, "valueAssets=======================");
      // console.log(selectedValue, "selectedValue=======================");
      // console.log(detils, "detils=======================");
      // console.log(
      //   selectedItem?.category_name,
      //   "category======================="
      // );

      let dataArray = [
        {
          catname: catname,
          category: category,
          imgObj: imgObj,
          catimgObj: catimgObj,
          catimgObjFour: catimgObjFour,
          catimgObjThree: catimgObjThree,
          catimgObjTwo: catimgObjTwo,
          valueMeeting: valueMeeting,
          valueAssets: valueAssets,
          selectedValue: selectedValue,
          detils: detils,
        },
      ];

      let finalarray = [...dataArray, ...createData];
      console.log(finalarray, "finalarray***");
      let uniqueFinalArray = finalarray.filter(
        (item, index, self) =>
          index === self.findIndex((obj) => obj.catname === item.catname)
      );
      console.log(uniqueFinalArray, "uniqueFinalArray--------");

      // await AsyncStorage.setItem(
      //   DB.MERCHANDISING_CATEGORY,
      //   JSON.stringify(selectedItem?.category_name)
      // );
      await AsyncStorage.setItem(
        DB.MERCHANDISING_ASSEST_TYPE,
        JSON.stringify(valueMeeting)
      );
      await AsyncStorage.setItem(
        DB.ASSET_CREATE_DATA_ARRAY,
        JSON.stringify(uniqueFinalArray)
      );

      // await AsyncStorage.setItem(
      //   DB.MERCHANDISING_ASSEST_LIST,
      //   JSON.stringify(valueAssets)
      // );
      // await AsyncStorage.setItem(
      //   DB.MERCHANDISING_ASSEST_IMPLEMENTED,
      //   JSON.stringify(selectedValue)
      // );
      // await AsyncStorage.setItem(
      //   DB.MERCHANDISING_IMPLEMENTED_REMARK,
      //   JSON.stringify(detils)
      // );
      // await AsyncStorage.setItem(
      //   DB.MERCHANDISING_CATIMG_ONE,
      //   JSON.stringify(catimgObj)
      // );
      // await AsyncStorage.setItem(
      //   DB.MERCHANDISING_CATIMG_TWO,
      //   JSON.stringify(catimgObjTwo)
      // );
      // await AsyncStorage.setItem(
      //   DB.MERCHANDISING_CATIMG_THREE,
      //   JSON.stringify(catimgObjThree)
      // );
      // await AsyncStorage.setItem(
      //   DB.MERCHANDISING_CATIMG_FOUR,
      //   JSON.stringify(catimgObjFour)
      // );
      // await AsyncStorage.setItem(
      //   DB.MERCHANDISING_IMPLEMENTED_IMAGES,
      //   JSON.stringify(imgObj)
      // );
      Alert.alert(
        "Success",
        "Merchandising Asset data submitted successfully",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error while saving data:", error);
      // Handle error, maybe show an error message to the user
    }
  };

  const isLoadings = useSelector(
    (state) => state?.trakingAssetReducer?.isLoading
  );

  const MerchandisingError = useSelector(
    (state) => state?.trakingAssetReducer?.error
  );
  // const isErrorVisible = useSelector((state) => state?.errorReducer?.isError);
  // const isErrorVisibleMsg = useSelector((state) => state?.errorReducer?.msg);
  // useEffect(() => {
  //   console.log("isErrorInEffect", isErrorVisible);
  // }, [isErrorVisible]);

  // const closeModalss = () => {
  //   dispatch(ErrorAction(false, ""));
  // };
  const handleRemoveImage = (indexToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };
  const handleRemoveAllImages = () => {
    setImages([]);
  };

  return (
    <View>
      <Header
        header={"Merchandising Offline"}
        iconStyle={styles.headerIcon}
        image={Images.back}
        onPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.mainView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.PaddingView}>
          <View style={styles.catView}>
            <Text style={styles.catName}>
              Category Name : {selectedItem.category_name}
            </Text>
          </View>
          <View style={[styles.catView, { marginTop: 10 }]}>
            <Text style={styles.catName}>Category Image</Text>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 10,
                justifyContent: "space-between",
                paddingVertical: 10,
              }}
            >
              <TouchableOpacity
                style={styles.capcharbutton}
                onPress={() => CatImageOne()}
              >
                {catImgg1 == null ? (
                  <Image source={Images.camera} style={styles.Modalimages} />
                ) : (
                  <Image
                    source={{ uri: catImgg1 }}
                    style={styles.Modalimages}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.capcharbutton}
                onPress={() => CatImageTwo()}
              >
                {catImgg2 == null ? (
                  <Image source={Images.camera} style={styles.Modalimages} />
                ) : (
                  <Image
                    source={{ uri: catImgg2 }}
                    style={styles.Modalimages}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 10,
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={styles.capcharbutton}
                onPress={() => CatImageThree()}
              >
                {catImgg3 == null ? (
                  <Image source={Images.camera} style={styles.Modalimages} />
                ) : (
                  <Image
                    source={{ uri: catImgg3 }}
                    style={styles.Modalimages}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.capcharbutton}
                onPress={() => CatImageFour()}
              >
                {catImgg4 == null ? (
                  <Image source={Images.camera} style={styles.Modalimages} />
                ) : (
                  <Image
                    source={{ uri: catImgg4 }}
                    style={styles.Modalimages}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.PaddingView}>
            <View style={{ padding: 10 }}>
              <DropDownPicker
                listMode="SCROLLVIEW"
                scrollViewProps={{
                  nestedScrollEnabled: true,
                }}
                dropDownContainerStyle={{
                  borderColor: COLORS.white,
                  position: "relative",
                  top: 0,
                }}
                open={openMeeting}
                value={valueMeeting}
                items={meetingdata}
                setOpen={setOpenMeeting}
                setValue={setValueMeeting}
                setItems={setMeetingdata}
                style={{
                  borderColor: COLORS.white,
                  padding: 0,
                  top: 10,
                  width: "100%",
                  alignSelf: "center",
                }}
                placeholder="Asset Type"
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
            </View>
            {valueMeeting == "2" ? (
              <View>
                <View style={styles.buttonView}>
                  <TouchableOpacity
                    disabled={catImgg1 == null || isLoadings ? true : false}
                    style={catImgg1 == null ? styles.subbutton : styles.button}
                    onPress={() => {
                      // setImage([])
                      saveData();
                    }}
                  >
                    {isLoadings ? (
                      <ActivityIndicator
                        color={COLORS.white}
                        style={styles.submmitbutton}
                      />
                    ) : (
                      <Text style={styles.butotonText}>Submit</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                {valueMeeting == "Paid Asset" ? (
                  <View style={{ justifyContent: "center" }}>
                    <View style={styles.PaddingView}>
                      <View style={{ padding: 10 }}>
                        {assestList && assestList.length > 0 && (
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
                            open={openAssests}
                            value={valueAssets}
                            items={assestList}
                            setOpen={setOpenAssets}
                            setValue={setValueAssets}
                            setItems={setAssests}
                            style={{
                              borderColor: COLORS.white,
                              padding: 0,
                              top: 10,
                              width: "100%",
                              alignSelf: "center",
                            }}
                            placeholder="Asset List"
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
                    </View>
                    {valueAssets !== "" ? (
                      <View style={styles.viewRedio}>
                        <Text style={styles.DecText}>Asset is Implemented</Text>
                        <View style={styles.radiobuttonconteiner}>
                          <TouchableOpacity
                            disabled={selectedValue == "1" ? true : false}
                            onPress={() => {
                              handleSelect("0");
                              setOption("1");
                              handleRemoveAllImages();
                            }}
                            style={{ width: 100 }}
                          >
                            <View style={styles.radiobuttonmainconteiner}>
                              {selectedValue === "1" ? (
                                <View style={styles.radiobuttonView}></View>
                              ) : (
                                <View style={styles.radiobuttonsubView}></View>
                              )}
                              <Text style={styles.radiobuttonText}>YES</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            disabled={selectedValue == "0" ? true : false}
                            onPress={() => {
                              handleSelect("1");
                              setOption("0");
                              handleRemoveAllImages();
                            }}
                            style={{ width: 100 }}
                          >
                            <View style={styles.radiobuttonmainconteiner}>
                              {selectedValue === "0" ? (
                                <View
                                  style={[
                                    styles.radiobuttonView,
                                    { backgroundColor: "red" },
                                  ]}
                                ></View>
                              ) : (
                                <View style={styles.radiobuttonsubView}></View>
                              )}
                              <Text style={styles.radiobuttonText}>NO</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : null}
                    {selectedValue == "0" ? (
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          style={styles.capcharbutton}
                          onPress={() => takePhoto()}
                        >
                          {image == null ? (
                            <Image
                              source={Images.camera}
                              style={styles.Modalimages}
                            />
                          ) : (
                            <Image
                              source={{ uri: image }}
                              style={styles.Modalimages}
                            />
                          )}
                        </TouchableOpacity>
                        <View style={styles.buttonView}>
                          <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                              saveData();
                              setButtonDisabled(true);
                            }}
                          >
                            <Text style={styles.butotonText}>Submit</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      <View>
                        <View style={styles.textView}>
                          <TextInput
                            placeholder="REASON...."
                            placeholderTextColor={COLORS.gray}
                            style={styles.textinputText}
                            onChangeText={(detils) => setDetails(detils)}
                            multiline={true}
                          />
                        </View>
                        <View style={styles.buttonView}>
                          <TouchableOpacity
                            disabled={isLoadings}
                            style={styles.button}
                            onPress={() => {
                              saveData();
                            }}
                          >
                            {isLoadings ? (
                              <ActivityIndicator
                                color={COLORS.white}
                                style={styles.submmitbutton}
                              />
                            ) : (
                              <Text style={styles.butotonText}>Submit</Text>
                            )}
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                ) : (
                  <View style={{ justifyContent: "center" }}>
                    <View style={styles.PaddingView}>
                      <View style={{ padding: 10 }}>
                        {assestList && assestList.length > 0 && (
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
                            open={openAssests}
                            value={valueAssets}
                            items={assestList}
                            setOpen={setOpenAssets}
                            setValue={setValueAssets}
                            setItems={setAssests}
                            onChangeValue={() => {}}
                            style={{
                              borderColor: COLORS.white,
                              padding: 0,
                              top: 10,
                              width: "100%",
                              alignSelf: "center",
                            }}
                            placeholder="Asset List"
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
                    </View>
                    {valueAssets !== "" ? (
                      <View style={styles.viewRedio}>
                        <Text style={styles.DecText}>Asset is Implemented</Text>
                        <View style={styles.radiobuttonconteiner}>
                          <TouchableOpacity
                            disabled={selectedValue == "1" ? true : false}
                            onPress={() => {
                              handleSelect("1"), handleRemoveAllImages();
                            }}
                            style={{ width: 100 }}
                          >
                            <View style={styles.radiobuttonmainconteiner}>
                              {selectedValue === "1" ? (
                                <View style={styles.radiobuttonView}></View>
                              ) : (
                                <View style={styles.radiobuttonsubView}></View>
                              )}
                              <Text style={styles.radiobuttonText}>YES</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            disabled={selectedValue == "0" ? true : false}
                            onPress={() => {
                              handleSelect("0"), handleRemoveAllImages();
                            }}
                            style={{ width: 100 }}
                          >
                            <View style={styles.radiobuttonmainconteiner}>
                              {selectedValue === "0" ? (
                                <View
                                  style={[
                                    styles.radiobuttonView,
                                    { backgroundColor: "red" },
                                  ]}
                                ></View>
                              ) : (
                                <View style={styles.radiobuttonsubView}></View>
                              )}
                              <Text style={styles.radiobuttonText}>NO</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : null}
                    {selectedValue == "1" ? (
                      <View style={styles.yesView}>
                        <>
                          {/* <TouchableOpacity
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
                          </TouchableOpacity> */}
                          <TouchableOpacity
                            // style={[styles.captureButton]}
                            style={
                              images?.length >= 10
                                ? styles.captureButton
                                : styles.captureDisable
                            }
                            onPress={() => takePhoto()}
                            disabled={images?.length >= 10 ? true : false}
                          >
                            <Image
                              source={Images.capcharIcon}
                              style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.white,
                              }}
                            />
                          </TouchableOpacity>
                          <View style={styles.container}>
                            <View
                              style={{
                                flexDirection: "row",
                                flexWrap: "wrap",
                                justifyContent: "center",
                              }}
                            >
                              {images?.map((imagePath, index) => {
                                return (
                                  <View>
                                    <TouchableOpacity
                                      style={{
                                        position: "absolute",
                                        top: 10,
                                        zIndex: 1,
                                        right: 10,
                                        borderRadius: 20,
                                        backgroundColor: COLORS.black,
                                      }}
                                      onPress={() => handleRemoveImage(index)}
                                    >
                                      <Image
                                        source={Images.cross}
                                        style={{
                                          width: 30,
                                          height: 30,
                                          tintColor: COLORS.white,
                                        }}
                                      />
                                    </TouchableOpacity>
                                    <View style={{ margin: 20 }}>
                                      <Image
                                        key={index}
                                        source={{ uri: imagePath }}
                                        style={styles.Modalimages}
                                      />
                                    </View>
                                  </View>
                                );
                              })}
                            </View>
                          </View>

                          {/* <View style={{ flexDirection: "row", padding: 20 }}>
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
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              marginHorizontal: 10,
                              justifyContent: "space-between",
                            }}
                          >
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
                          </View> */}
                          {/* <View style={{ flexDirection: "row", padding: 20 }}>
                     
                      </View> */}
                        </>
                        <View style={styles.buttonView}>
                          <TouchableOpacity
                            disabled={
                              images.length < 0 ||
                              valueMeeting == "" ||
                              valueAssets == "" ||
                              isLoadings
                                ? true
                                : false
                            }
                            style={
                              images.length < 0 ||
                              valueMeeting == "" ||
                              valueAssets == ""
                                ? styles.grayButton
                                : styles.button
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
                    ) : (
                      <View></View>
                    )}
                    {selectedValue == "0" ? (
                      <View style={styles.buttonView}>
                        <View
                          style={{
                            height: 50,
                            borderWidth: 1,
                            marginVertical: 10,
                          }}
                        >
                          <TextInput
                            placeholder="REASON.... "
                            multiline
                            onChangeText={(detils) => setDetails(detils)}
                            placeholderTextColor={COLORS.gray}
                          />
                        </View>

                        <TouchableOpacity
                          // style={[styles.button, { marginTop: 10 }]}
                          style={
                            valueMeeting == "" || valueAssets == ""
                              ? styles.subbutton
                              : styles.button
                          }
                          disabled={
                            valueMeeting == "" ||
                            valueAssets == "" ||
                            isLoadings
                              ? true
                              : false
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
                    ) : (
                      <View></View>
                    )}
                  </View>
                )}
              </View>
            )}
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
    </View>
  );
};

export default CreateAssestOffline;
