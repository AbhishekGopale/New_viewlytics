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

import { styles } from "./MerchandisingAssetTrackingStyle";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { StoreDetails } from "../../redux/actions/storeDetailsAction";
import { AssestCategoryAction } from "../../redux/actions/assetTrackingDataAction";
import { AssestListAction } from "../../redux/actions/assestListAction";
import ToastMessage from "../../components/ToastMessages/ToastMessages";

const MerchandisingAssetTracking = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [token, setToken] = useState("");
  const [storeId, setStoreId] = useState("");

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

  const isLoadingCategoryData = useSelector(
    (state) => state?.assetTrackingDataReducer?.isLoading
  );

  const MerchandisingError = useSelector(
    (state) => state?.trakingAssetReducer?.error
  );
  return (
    <View>
      {MerchandisingError?.length > 0 ? (
        <ToastMessage
          msg={MerchandisingError}
          isVisible={MerchandisingError}
          isError={MerchandisingError}
        />
      ) : null}
      <Header
        header={"Merchandising Asset Tracking"}
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
      <FlatList
        contentContainerStyle={{ paddingBottom: 300 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        data={categoryDatalisisData}
        renderItem={({ item }) => {
          return (
            <View>
              <View>
                <TouchableOpacity
                  style={styles.FlatListView}
                  onPress={() => {
                    navigation.navigate("CreateAssest", {
                      selectedItem: item,
                      storeDetails: storeDetails,
                    });
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

export default MerchandisingAssetTracking;
