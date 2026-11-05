import {
  View,
  Text,
  BackHandler,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./OfflineDashboardStyle";
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import { DB } from "../../database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DATA, { MERCHANTDATA, TLDATAOFFLINE } from "./DATA";
import { FontsFamily } from "../../assets/fonts/fonts";
import { COLORS } from "../../colors/colors";

const OfflineDashboard = () => {
  const navigation = useNavigation();
  const [roll, setRoall] = useState("");
  const [report, setReport] = useState("");
  console.log(report, "report");
  const getUserRoll = async () => {
    AsyncStorage.getItem(DB.USER_ROLL)
      .then((data) => {
        setRoall(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const DaynamicReport = async () => {
    AsyncStorage.getItem(DB.DAYNAMIC_FORMS_PRAMOTER_MER)
      .then((data) => {
        const ReportData = JSON.parse(data);
        setReport(ReportData);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUserRoll();
    DaynamicReport();
  }, []);

  let filteredDataMer = MERCHANTDATA.filter((item) =>
    report?.includes(item.title)
  );

  let filteredDataPramoter = DATA.filter((item) =>
    report?.includes(item.title)
  );

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        BackHandler.exitApp();
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  return (
    <>
      <View>
        <Header
          header={"Offline Screen"}
          iconStyle={styles.headerIcon}
          image={Images.back}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.FlatMainConatiner}>
        {roll === "tl" ? (
          <View>
            <FlatList
              scrollEnabled={false}
              contentContainerStyle={{ paddingBottom: 300 }}
              ListEmptyComponent={
                <View
                  style={{
                    justifyContent: "center",
                    marginTop: "50%",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.black,
                      fontSize: 20,
                      alignSelf: "center",
                      fontFamily: FontsFamily.NotoSansBold,
                    }}
                  >
                    No Data Found!
                  </Text>
                </View>
              }
              // showsVerticalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              numColumns={3}
              keyExtractor={(item) => item.id}
              data={TLDATAOFFLINE}
              renderItem={({ item }) => {
                return (
                  <View>
                    <View style={styles.FlatlistView}>
                      <View style={styles.DashbordView}>
                        <TouchableOpacity
                          style={styles.touchbutton}
                          onPress={() => {
                            navigation.navigate(item.scrrenoffline);
                          }}
                        >
                          <Image style={styles.imgs} source={item.img} />
                        </TouchableOpacity>
                        <View>
                          <Text style={styles.text}>{item.title}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
            ListEmptyComponent={
              <View
                style={{
                  justifyContent: "center",
                  marginTop: "50%",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 20,
                    alignSelf: "center",
                    fontFamily: FontsFamily.NotoSansBold,
                  }}
                >
                  No Data Found!
                </Text>
              </View>
            }
            numColumns={2}
            scrollEnabled={true}
            data={roll == "promoter" ? filteredDataPramoter : filteredDataMer}
            //  data={DATA}
            renderItem={({ item }) => (
              <View style={styles.FlatlistViews}>
                <TouchableOpacity
                  style={styles.TouchableOpacityView}
                  disabled={item.title === "DSR" ? true : false}
                  onPress={() => navigation.navigate(item.scrrenoffline)}
                >
                  <View style={styles.subFlatView}>
                    <Image style={styles.imgsStyle} source={item.imgs} />

                    <Text style={styles.FlatText}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </>
  );
};

export default OfflineDashboard;
