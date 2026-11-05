import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Modal,
  Alert,
  Linking,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Styles } from "./AddstoreScreenStyle";
import { Images } from "../../assets/images/map";
import Header from "../../components/Header/Header";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { useDispatch, useSelector } from "react-redux";
import { DB } from "../../database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VerifiedStoreAction } from "../../redux/actions/verifedStoreAction";
import { StoreListAction } from "../../redux/actions/storeListAction";
import { COLORS } from "../../colors/colors";

const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");

const AddStoreScreen = ({ route }) => {
  const selectedItem = route.params?.selectedItem;
  const navigation = useNavigation();
  const [id, setId] = useState();
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const region = {
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setInitialRegion(region);
      },
      (error) => {
        console.log("Error getting location: ", error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);
  // map,battry

  const mapRef = useRef();

  const [empId, setEmpId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentLatitude, setcurrentLatitude] = useState("");
  const [currentLongitude, setcurrentLongitude] = useState("");
  Geolocation.getCurrentPosition((data) => {
    setcurrentLatitude(data.coords.latitude);
  });
  Geolocation.getCurrentPosition((data) => {
    setcurrentLongitude(data.coords.longitude);
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      (error) => {
        console.log(error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const dispatch = useDispatch();
  const [token, setToken] = useState("");

  const getToken = async () => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        setToken(data);
        dispatch(StoreListAction(data, navigation));
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getUser = async () => {
    AsyncStorage.getItem(DB.USERID)
      .then((data) => {
        setEmpId(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const storeList = useSelector(
    (state) => state?.storeListReducer?.notVerifiedStore
  );

  const [storeData, setStoreData] = useState([]);

  const isLoading = useSelector((state) => state?.storeListReducer?.isLoading);
  const isLoadings = useSelector(
    (state) => state?.verifedStoreReducer?.isLoading
  );

  useEffect(() => {
    getToken();
    getUser();
  }, []);
  useEffect(() => {
    setStoreData(storeList);
  }, [storeList]);
  const verified = "1";
  const SoreVerifiedHandle = () => {
    dispatch(
      VerifiedStoreAction(
        token,
        verified,
        id,
        currentLatitude,
        currentLongitude,
        navigation
      )
    );
  };
  const [name, setName] = useState("");
  const [zone, setZone] = useState("");
  const [city, setCity] = useState("");
  const [area, setAerea] = useState("");
  const [selectedImage, setSelectedIMage] = useState(null);

  const handleVerifyStore = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setModalVisible(true);
      },
      (error) => {
        Alert.alert(
          "Location Services",
          "Location services are disabled. Please enable them to check-in.",
          [
            {
              text: "Open Settings",
              onPress: () => {
                Linking.openSettings();
              },
            },
            {
              text: "Cancel",
              onPress: () => {},
              style: "cancel",
            },
          ]
        );
      }
    );
  };

  return (
    <View>
      <Header
        header={"Add Store"}
        iconStyle={Styles.headerIcon}
        image={Images.back}
        onPress={() => navigation.goBack()}
      />
      {selectedItem === null || selectedItem === undefined ? (
        <View>
          {isLoading ? (
            <View>
              <ActivityIndicator color={"blue"} size={"large"} />
            </View>
          ) : (
            <View style={Styles.maincontainer}>
              <View style={Styles.mainView}>
                {storeData?.length > 0 ? (
                  <FlatList
                    data={storeData}
                    contentContainerStyle={{ paddingBottom: 200 }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <View>
                        <TouchableOpacity
                          style={Styles.maintable}
                          // onPress={() => {
                          //   handleVerifyStore();
                          // }}
                          onPress={() => {
                            handleVerifyStore();
                            setName(item.label);
                            setZone(item.zone);
                            setCity(item.city);
                            setAerea(item.state);
                            setId(item.value);
                            setSelectedIMage({ uri: item.image });
                          }}
                        >
                          <View style={Styles.listView}>
                            <View style={Styles.imageView}>
                              <Image
                                resizeMode="cover"
                                source={{ uri: item.image }}
                                style={Styles.imageStyle}
                              />
                            </View>
                            <View style={Styles.textView}>
                              <Text style={Styles.tabletext}>{item.label}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                ) : (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      height: "90%",
                    }}
                  >
                    <Text style={{ color: COLORS.black, fontSize: 20 }}>
                      No New Store Assign!!!
                    </Text>
                  </View>
                )}
              </View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={Styles.ModalBackTouch}>
                  <View style={Styles.modalView}>
                    <TouchableOpacity
                      style={Styles.crossView}
                      onPress={() => {
                        closeModal();
                      }}
                    >
                      <Image source={Images.cross} style={Styles.iconCross} />
                    </TouchableOpacity>

                    <View style={Styles.mapView}>
                      {currentLocation && (
                        <MapView
                          ref={mapRef}
                          style={StyleSheet.absoluteFill}
                          zoomEnabled={true}
                          showsUserLocation={true}
                          initialRegion={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                          }}
                        >
                          <Marker coordinate={currentLocation}></Marker>
                        </MapView>
                      )}
                    </View>
                    <View style={Styles.container}>
                      <MapView
                        style={Styles.map}
                        initialRegion={{
                          latitude: 37.78825,
                          longitude: -122.4324,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                        }}
                      />
                    </View>
                    <View style={Styles.detailModl}>
                      <View style={Styles.imgtextView}>
                        <View style={Styles.imgConteiner}>
                          <Image
                            source={selectedImage}
                            style={Styles.imgModal}
                            resizeMode="cover"
                          />
                        </View>
                        <View style={Styles.TextConteiner}>
                          <View style={Styles.ModalContainer}>
                            <Text style={Styles.listTexttwo}>{name}</Text>
                          </View>
                          <View style={Styles.ModalContainer}>
                            <Text style={Styles.listTexttwo}>{city}</Text>
                          </View>
                          <View style={Styles.ModalContainer}>
                            <Text style={Styles.listTexttwo}>{zone}</Text>
                          </View>
                          <View style={Styles.ModalContainer}>
                            <Text style={Styles.listTexttwo}>{area}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <Text style={Styles.NoteText}>
                      *This Store Is Not Verifed Are you Sure You Verified Store
                    </Text>
                    <View style={Styles.buttonView}>
                      <TouchableOpacity
                        style={[Styles.TouchButton, { marginLeft: 20 }]}
                        onPress={() => {
                          SoreVerifiedHandle();
                        }}
                      >
                        {isLoadings ? (
                          <ActivityIndicator
                            color={COLORS.white}
                            style={Styles.submmitbutton}
                          />
                        ) : (
                          <Text style={Styles.submmitbutton}>Verified</Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          )}
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default AddStoreScreen;
