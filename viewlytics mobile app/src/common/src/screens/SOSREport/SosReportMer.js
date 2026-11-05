import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useNavigation } from "@react-navigation/native";
import { Images } from "../../assets/images/map";
import { styles } from "./SosReportMerStyle";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { getStoreId } from "../../utilities/utilities";
import { StoreDetails } from "../../redux/actions/storeDetailsAction";
import { MERDATA } from "./Data";
import { SosDataAction } from "../../redux/actions/sosReportDataAction";
import moment from "moment";
const SosReportMer = () => {
  const navigation = useNavigation();
  const currentDate = moment();
  const formattedDate = currentDate.format("YYYY-MM-DD");
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [storeId, setStoreId] = useState("");

  const getStoreId = async (token) => {
    AsyncStorage.getItem(DB.STORE_ID)
      .then((data) => {
        setStoreId(data);
        dispatch(StoreDetails(token, data));
        // dispatch(CategoryDataAction(token, navigation, data));
        dispatch(SosDataAction(token, formattedDate, data.toString()));
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

  const SOSData = useSelector(
    (state) => state?.sosReportDataReducer?.SosReportData
  );

  useEffect(() => {
    getToken();
  }, []);
  useEffect(() => {
    setData(SOSData);
  }, [SOSData]);
  const [data, setData] = useState(SOSData);
  const onPressMenu = (item, index) => {
    let tempArr = SOSData;
    tempArr.forEach((element) => {
      if (element.id === tempArr[index].id) {
        element.isSelected = !tempArr[index].isSelected;
      } else {
        element.isSelected = false;
      }
    });
    setData(JSON.parse(JSON.stringify(tempArr)));
  };

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

  return (
    <View>
      <Header
        header={"SOS ReportMER"}
        iconStyle={styles.headerIcon}
        image={Images.back}
        onPress={() => navigation.goBack()}
      />

      <View>
        <StoreDetailCard />
        {SOSData && SOSData.length > 0 && (
          <FlatList
            ListFooterComponent={
              <View style={styles.StornameView}>
                <View style={styles.buttonView}>
                  <TouchableOpacity
                    style={styles.butttontouch}
                    onPress={() => navigation.goBack()}
                  >
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 200 }}
            numColumns={1}
            scrollEnabled={true}
            data={data}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.FlatView}>
                  <View style={styles.textView}>
                    <TouchableOpacity
                      onPress={() => {
                        onPressMenu(item, index);
                      }}
                    >
                      <View style={styles.TablemainView}>
                        <View style={styles.mainVie}>
                          <View>
                            <Image
                              resizeMode="contain"
                              source={{ uri: item.category_image }}
                              style={styles.imagStyle}
                            />
                          </View>
                          <Text style={styles.titleText}>
                            {item.category_name}
                          </Text>
                        </View>
                        <View style={styles.iconView}>
                          {item.isSelected == true ? (
                            <Image source={Images.close} style={styles.icon} />
                          ) : (
                            <Image source={Images.Dwon} style={styles.icon} />
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>

                    {item.isSelected ? (
                      <View style={styles.DetailTextview}>
                        <View
                          style={[
                            styles.tableMainView,
                            { borderTopLeftRadius: 5 },
                          ]}
                        >
                          <View style={styles.tablesubView}>
                            <Text style={styles.tableText}>Brand Facing</Text>
                          </View>
                          <View style={styles.valueView}>
                            <Text style={styles.tableText}>
                              {item?.brand_facing}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableMainView}>
                          <View style={styles.tablesubView}>
                            <Text style={styles.tableText}>
                              Compation Facing
                            </Text>
                          </View>
                          <View style={styles.valueView}>
                            <Text style={styles.tableText}>
                              {item?.compation_facing}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={[
                            styles.tableMainView,
                            { borderTopRightRadius: 5 },
                          ]}
                        >
                          <View style={styles.tablesubView}>
                            <Text style={styles.tableText}>SOS(%)</Text>
                          </View>
                          <View
                            style={[
                              styles.valueView,
                              { borderBottomRightRadius: 5 },
                            ]}
                          >
                            <Text style={styles.tableText}>
                              {item?.sos_per} %
                            </Text>
                          </View>
                        </View>
                      </View>
                    ) : null}
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

export default SosReportMer;
