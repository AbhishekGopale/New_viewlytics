import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LineChart, BarChart } from "react-native-chart-kit";
import { GetDashboardDetails } from "../../redux/actions/dashboardDetailsAction";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./TlDashboardStyle";
import { useNavigation } from "@react-navigation/native";
import { Images } from "../../assets/images/map";
import { COLORS } from "../../colors/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { TlAttandanceAction } from "../../redux/actions/tlAttandanceDetailsAction";
import GroupedBarGraph from "../GroupGraph/GroupGraph";
import { RemainingFormAction } from "../../redux/actions/remainingFromCountAction";

const TlDashboard = () => {
  const DATA = [
    {
      id: 1,
      title: "Total",
      img: require("../../assets/images/total.png"),
      height: 25,
      width: 25,
      num: "20",
      subTitle: "totalUserCont",
    },
    {
      id: 2,
      title: "Present",
      img: require("../../assets/images/present.png"),
      height: 25,
      width: 25,
      num: "06",
      subTitle: "presentCount",
    },
    {
      id: 3,
      title: "Week Off",
      img: require("../../assets/images/weekoff.png"),
      height: 25,
      width: 25,
      num: "07",
      subTitle: "weekOffCount",
    },
    {
      id: 4,
      title: "Absent",
      img: require("../../assets/images/absence.png"),
      height: 25,
      width: 25,
      num: "06",
      subTitle: "absentCount",
    },
    {
      id: 5,
      title: "Leave",
      img: require("../../assets/images/leave.png"),
      height: 25,
      width: 25,
      num: "08",
      subTitle: "leaveCount",
    },
  ];

  // useEffect(() => {
  //   handleAttendance();
  // }, [TlDashboardDetailsData]);

  const leftValues = [0, 30, 20, 10]; // Example left side values
  const bottomValues = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]; // Example bottom side values
  const barColors = ["#5D9C59", "#FF6464"]; // Example bar colors

  const dispatch = useDispatch();
  const [token, setToken] = useState("");

  const getToken = async () => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        setToken(data);
        dispatch(RemainingFormAction(data));
        dispatch(TlAttandanceAction(data, navigation));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getToken();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [hidden, setHidden] = useState(false);

  const navigation = useNavigation();
  const closeModal = () => {
    setModalVisible(false);
  };
  const Target = useSelector(
    (state) => state?.GetDashboardDetails?.dashboardDetails?.Target
  );
  const Achieved = useSelector(
    (state) => state?.GetDashboardDetails?.dashboardDetails?.Achieved
  );

  const Legend = useSelector(
    (state) => state?.GetDashboardDetails?.dashboardDetails?.Legend
  );

  const AttendanceSummery = useSelector(
    (state) => state?.GetDashboardDetails?.dashboardDetails?.AttendanceSummery
  );

  const AttendanceData = useSelector(
    (state) => state?.promoterTlDashbordReducer?.attendance
  );

  //new Api dashbord Api call
  const TLDashbord = useSelector(
    (state) => state?.promoterTlDashbordReducer?.DahbordDetails?.data
  );

  const TLAttendance = useSelector(
    (state) =>
      state?.promoterTlDashbordReducer?.DahbordDetails?.data?.attendance
  );

  const TLTarget = useSelector(
    (state) => state?.promoterTlDashbordReducer?.DahbordDetails?.data?.target
  );

  const TLArchived = useSelector(
    (state) => state?.promoterTlDashbordReducer?.DahbordDetails?.data?.achieved
  );

  const TargetArchived = useSelector(
    (state) => state?.promoterTlDashbordReducer?.achieved
  );

  // console.log("TargetArchived--------", TargetArchived);
  // useEffect(() => {
  //   handleAttendance();
  // }, [TlDashboardDetailsData]);

  const [valuesArray, setValuesArray] = useState([]);
  const handleAttendance = () => {
    const updatedValuesArray = [];

    DATA?.forEach((element) => {
      for (const key in TlDashboardDetailsData) {
        if (TlDashboardDetailsData.hasOwnProperty(key)) {
          const value = TlDashboardDetailsData[key];
          if (element.subTitle === key) {
            updatedValuesArray.push({ ...element, val: value });
          }
        }
      }
    });

    // Now, assign the updatedValuesArray to valuesArray
    setValuesArray(updatedValuesArray);
  };
  const targetData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: Target,
        color: (opacity = 2) => `gray`,
        strokeWidth: 1,
      },
      {
        data: Achieved,
        color: (opacity = 2) => `red`,
        strokeWidth: 1,
      },
    ],
    legend: Legend,
  };

  const AttendanceDetails = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: AttendanceData,
        color: (opacity = 2) => `gray`,
        strokeWidth: 1,
      },
    ],
  };

  const TlDashboardDetailsData = useSelector(
    (state) => state?.tlAttandanceDetailsReducer?.allDetails?.data
  );

  const isLoading = useSelector(
    (state) => state?.tlAttandanceDetailsReduce?.isLoading
  );

  return (
    <View>
      {isLoading ? (
        <View
          style={{
            marginTop: 25,
          }}
        >
          <ActivityIndicator color={"blue"} size={"large"} />
        </View>
      ) : (
        <View style={styles.GraphMainView}>
          <View style={styles.GraphView}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={[styles.textConteiner, { paddingLeft: 30 }]}>
                <View
                  style={[
                    styles.HeaderTextView,
                    { backgroundColor: "#5D9C59" },
                  ]}
                ></View>
                <Text style={styles.graphText}>Target</Text>
              </View>
              <View style={styles.textConteiner}>
                <View style={styles.HeaderTextView}></View>
                <Text style={styles.graphText}>Achievement</Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                //height: Dimensions.get("screen").height / 3.2,
              }}
            >
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <GroupedBarGraph
                  data={TargetArchived}
                  leftValues={leftValues}
                  bottomValues={bottomValues}
                  barColors={barColors}
                />
              </ScrollView>
              {!modalVisible && (
                <View style={styles.AttandncebuutonView}>
                  <TouchableOpacity
                    style={styles.AttButtonStyle}
                    onPress={() => {
                      handleAttendance();
                      setModalVisible(true);
                      setHidden(true);
                    }}
                  >
                    <Text style={styles.AttendanceText}>Attendance</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          <View style={styles.SummaryView}>
            {/* {AttendanceSummery.map((element) => {
              return ( */}
            <>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View
                  style={[
                    styles.numberContainer,
                    { backgroundColor: "green", marginLeft: 15 },
                  ]}
                >
                  <Text style={styles.number}>{TLDashbord?.presentCount}</Text>
                </View>
                <Text style={styles.textStyle}>Present</Text>
                <View
                  style={[
                    styles.numberContainer,
                    { backgroundColor: "#128ee2" },
                  ]}
                >
                  <Text style={styles.number}>{TLDashbord?.weekoffCount}</Text>
                </View>
                <Text style={styles.textStyle}>Week off</Text>
                <View
                  style={[styles.numberContainer, { backgroundColor: "red" }]}
                >
                  <Text style={styles.number}>{TLDashbord?.absentCount}</Text>
                </View>
                <Text style={styles.textStyle}>Absent</Text>
                <View
                  style={[
                    styles.numberContainer,
                    { backgroundColor: "#ffa500" },
                  ]}
                >
                  <Text style={styles.number}>{TLDashbord?.leaveCount}</Text>
                </View>
                <Text style={styles.textStyle}>Leave</Text>
              </ScrollView>
            </>
            {/* );
            })} */}
          </View>

          <View style={styles.GraphView}>
            <Text style={styles.graphText}>Attendance</Text>
            <View
              style={{
                width: "100%",
                height: Dimensions.get("screen").height / 3.4,
              }}
            >
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {AttendanceData && (
                  <BarChart
                    data={AttendanceDetails}
                    width={Dimensions.get("screen").width * 2.1}
                    height={Dimensions.get("screen").height / 3.4}
                    showValuesOnTopOfBars={true}
                    fromZero={true}
                    segments={4}
                    chartConfig={{
                      backgroundColor: "#fff",
                      backgroundGradientFrom: "#fff",
                      backgroundGradientTo: "#fff",
                      barPercentage: 1.2,
                      height: 1000,
                      fillShadowGradient: `#5D9C59`,
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
                )}
              </ScrollView>
            </View>
          </View>

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.ModalBackTouch}>
              <View style={styles.ModalView}>
                <TouchableOpacity
                  onPress={() => {
                    closeModal();
                  }}
                  style={styles.crossIcn}
                >
                  <Image source={Images.cross} style={styles.crossIcon} />
                </TouchableOpacity>
                <View style={styles.attendancebuttonView}>
                  <Text style={styles.attText}>Attendance</Text>
                </View>

                <View style={styles.flatview}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={valuesArray}
                    ListFooterComponent={
                      <TouchableOpacity
                        style={styles.arrowbuttonView}
                        onPress={() => {
                          closeModal(),
                            navigation.navigate("ApproveAttendanceScreen");
                        }}
                      >
                        <Image source={Images.rightone} style={styles.arrow} />
                      </TouchableOpacity>
                    }
                    renderItem={({ item }) => (
                      <View style={styles.FlatlistView}>
                        <View style={styles.touchbutton}>
                          <View style={styles.imgtextView}>
                            <Image
                              style={{
                                width: item.width,
                                height: item.width,
                                tintColor: COLORS.primary,
                              }}
                              source={item.img}
                            />
                            <Text style={styles.numtext}>{item.val}</Text>
                          </View>

                          <Text style={styles.tittletext}>{item.title}</Text>
                        </View>
                      </View>
                    )}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

export default TlDashboard;
