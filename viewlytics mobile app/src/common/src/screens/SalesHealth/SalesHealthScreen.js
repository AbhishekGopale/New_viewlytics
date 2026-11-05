import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./SalesHealthScreenStyle";
import { BarChart } from "react-native-chart-kit";
import data from "./data";
import datas from "./DataTwo";
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { SalesHelthAction } from "../../redux/actions/salesHealthAction";
import { useDispatch, useSelector } from "react-redux";

const SalesHealthScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [selecttedTab, setSelecttedTeb] = useState(0);
  const { height } = Dimensions.get("screen");
  const { width } = Dimensions.get("screen");
  const [token, setToken] = useState("");

  const getToken = async () => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        dispatch(SalesHelthAction(data));
        setToken(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getToken();
  }, []);

  const SalesHelth = useSelector(
    (state) => state?.salesHealthReducer?.SalesHealthData?.data
  );
  const SalesTarget = useSelector((state) => state?.salesHealthReducer?.Target);
  const SalesAchieved = useSelector(
    (state) => state?.salesHealthReducer?.Achieved
  );
  const Achieved = [];
  for (let i = 0; i < SalesAchieved.length; i++) {
    if (SalesAchieved[i] < 0) {
      Achieved.push(0);
    } else {
      Achieved.push(SalesAchieved[i]);
    }
  }
  const isLoading = useSelector(
    (state) => state?.salesHealthReducer?.isLoading
  );
  const Target = {
    labels: ["Weekly", "Monthly", "Quarterly"],
    datasets: [
      {
        data: SalesTarget,
        color: (opacity = 2) => `gray`,
        strokeWidth: 1,
      },
    ],
    legend: ["Target"],
  };

  const achieved = {
    labels: ["Weekly", "Monthly", "Quarterly"],
    datasets: [
      {
        data: Achieved,
        color: (opacity = 2) => `gray`,
        strokeWidth: 1,
      },
    ],
    legend: ["Target"],
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        header={"Sales Health"}
        iconStyle={styles.headerIcon}
        image={Images.back}
        onPress={() => navigation.goBack()}
      />
      {isLoading ? (
        <View
          style={{
            marginTop: 25,
          }}
        >
          <ActivityIndicator color={"blue"} size={"large"} />
        </View>
      ) : (
        <View>
          {selecttedTab == 0 ? (
            <View style={styles.graphView}>
              <View style={{ paddingHorizontal: 100 }}>
                <BarChart
                  data={Target}
                  width={Dimensions.get("screen").width}
                  height={300}
                  showValuesOnTopOfBars={true}
                  fromZero={true}
                  segments={4}
                  chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    barPercentage: 1.5,
                    height: 1000,
                    fillShadowGradient: `rgba(0,73,167, 1)`,
                    fillShadowGradientOpacity: 1,
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(0, 0, 0, 1)`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,

                    propsForBackgroundLines: {
                      strokeWidth: 0,
                      stroke: "#e3e3e3",
                      strokeDasharray: "0",
                    },
                  }}
                />
              </View>
            </View>
          ) : (
            <View style={styles.graphView}>
              <View style={{ paddingHorizontal: 50 }}>
                <BarChart
                  data={achieved}
                  width={Dimensions.get("screen").width}
                  height={
                    height <= 700 ? 175 : Platform.OS === "ios" ? 300 : 300
                  }
                  showValuesOnTopOfBars={true}
                  fromZero={true}
                  segments={4}
                  //maxValue={100}
                  chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    barPercentage: 1.5,
                    height: 1000,
                    fillShadowGradient: `rgba(0,73,167, 1)`,
                    fillShadowGradientOpacity: 1,
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 0, 0, 1)`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,

                    propsForBackgroundLines: {
                      strokeWidth: 0,
                      stroke: "#e3e3e3",
                      strokeDasharray: "0",
                    },
                  }}
                />
              </View>
            </View>
          )}
          <View style={styles.mainView}>
            <View style={styles.ButtonMainView}>
              <TouchableOpacity
                onPress={() => {
                  setSelecttedTeb(0);
                }}
                style={[
                  styles.touchButton,
                  { backgroundColor: selecttedTab == 0 ? "#0057A7" : "white" },
                ]}
              >
                <Text
                  style={[
                    styles.butttonText,
                    { color: selecttedTab == 1 ? "black" : "white" },
                  ]}
                >
                  Target
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelecttedTeb(1);
                }}
                style={[
                  styles.touchButton,
                  { backgroundColor: selecttedTab == 1 ? "#0057A7" : "white" },
                ]}
              >
                <Text
                  style={[
                    styles.butttonText,
                    { color: selecttedTab == 1 ? "white" : "black" },
                  ]}
                >
                  Achievement
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default SalesHealthScreen;
