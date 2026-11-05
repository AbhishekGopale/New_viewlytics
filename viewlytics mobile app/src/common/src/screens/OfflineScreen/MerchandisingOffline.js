import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  Button,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useNavigation } from "@react-navigation/native";
import { Images } from "../../assets/images/map";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { StoreDetails } from "../../redux/actions/storeDetailsAction";
import { AssestCategoryAction } from "../../redux/actions/assetTrackingDataAction";
import { AssestListAction } from "../../redux/actions/assestListAction";
import ToastMessage from "../../components/ToastMessages/ToastMessages";
import { styles } from "../MerchandisingAssetTracking/MerchandisingAssetTrackingStyle";

const MerchandisingAssetOffline = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [token, setToken] = useState("");
  const [storeId, setStoreId] = useState("");
  const [storedata, setStoreData] = useState({});
  const [categoryData, setCategoryData] = useState();

  console.log(categoryData, "categoryData========-------");

  const getCategoryDetails = async () => {
    AsyncStorage.getItem(DB.ASSET_CATEGORY_LIST)
      .then((data) => {
        let newCategoryData = JSON.parse(data);
        setCategoryData(newCategoryData);
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
        dispatch(StoreDetails(token, data));
        dispatch(AssestCategoryAction(token, data, navigation));
        dispatch(AssestListAction(token, data, navigation));
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
        getStoredetails();
        getCategoryDetails();
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
  useEffect(() => {
    getToken();
  }, []);
  const categoryDatalisisData = useSelector(
    (state) => state?.assetTrackingDataReducer?.allDetails
  );

  const isLoadingCategoryData = useSelector(
    (state) => state?.assetTrackingDataReducer?.isLoading
  );

  const MerchandisingError = useSelector(
    (state) => state?.trakingAssetReducer?.error
  );
  return (
    <View>
      {/* {MerchandisingError?.length > 0 ? (
        <ToastMessage
          msg={MerchandisingError}
          isVisible={MerchandisingError}
          isError={MerchandisingError}
        />
      ) : null} */}
      <Header
        header={"Merchandising Asset Offline"}
        iconStyle={styles.headerIcon}
        image={Images.back}
        onPress={() => navigation.goBack()}
      />

      <View>
        {isLoading && isLoadingCategoryData ? (
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
        )}
      </View>
      <FlatList
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: 300 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        data={categoryData}
        renderItem={({ item }) => {
          return (
            <View>
              <View>
                <TouchableOpacity
                  style={styles.FlatListView}
                  onPress={() => {
                    navigation.navigate("CreateAssestOffline", {
                      selectedItem: item,
                    });
                    AsyncStorage.setItem(
                      DB.STORE_NAME,
                      JSON.stringify(storedata?.store_name)
                    );
                  }}
                >
                  <Text style={styles.catName}>{item.category_name}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default MerchandisingAssetOffline;
