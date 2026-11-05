import {
  View,
  Text,
  ActivityIndicator,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "./GoogleEfromStyle";
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { GoogleEFormAction } from "../../redux/actions/googleFormAction";
import { StoreDetails } from "../../redux/actions/storeDetailsAction";
import DATA from "./Data";

const GoogleEFrom = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [token, setToken] = useState("");
  const [storeId, setStoreId] = useState("");

  const getToken = async () => {
    try {
      const data = await AsyncStorage.getItem(DB.TOKEN);
      if (data !== null) {
        setToken(data);
        getStoreId(data);
        dispatch(GoogleEFormAction(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getStoreId = async (token) => {
    try {
      const data = await AsyncStorage.getItem(DB.STORE_ID);
      if (data !== null) {
        setStoreId(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const apihandle = () => {
    dispatch(GoogleEFormAction(token));
    dispatch(StoreDetails(token, storeId));
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token !== "" && storeId !== "") {
      apihandle();
    }
  }, [token, storeId]);

  const isLoadings = useSelector(
    (state) => state?.storeDetailsReducer?.isLoading
  );

  const storeDetails = useSelector(
    (state) => state?.storeDetailsReducer?.storeDetails
  );
  const GoogleFormData = useSelector((state) => state?.GoogleEForm?.allform);
  console.log(GoogleFormData, "GoogleFormData");

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
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.mainView}
      onPress={() => {
        navigation.navigate("EFrom", { selectedItem: item });
      }}
    >
      <View style={styles.butonText}>
        <View style={styles.textView}>
          <Text style={styles.textStyle}>{item.title}</Text>
        </View>
        <Image source={Images.rightArrow} style={styles.arrowIcon} />
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View>
        <Header
          header={"On Request Report"}
          iconStyle={styles.headerIcon}
          image={Images.back}
          onPress={() => navigation.goBack()}
        />
        <StoreDetailCard />
        <View style={{ justifyContent: "center" }}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={GoogleFormData}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 550 }}
            renderItem={renderItem}
          />
        </View>
      </View>
    </View>
  );
};

export default GoogleEFrom;
