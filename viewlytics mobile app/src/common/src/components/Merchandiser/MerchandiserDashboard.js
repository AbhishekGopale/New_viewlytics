import { View, Text, Dimensions, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { LineChart, BarChart } from "react-native-chart-kit";
import { GetDashboardDetails } from "../../redux/actions/dashboardDetailsAction";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./MerchandiserDashboardStyle";
import DATA from "./Data";
import { COLORS } from "../../colors/colors";

const MerchandiserDashboard = () => {
  const Target = useSelector(
    (state) => state?.GetDashboardDetails?.dashboardDetails?.Target
  );
  const Achieved = useSelector(
    (state) => state?.GetDashboardDetails?.dashboardDetails
  );

  const Legend = useSelector(
    (state) => state?.GetDashboardDetails?.dashboardDetails?.Legend
  );

  const AttendanceSummery = useSelector(
    (state) => state?.GetDashboardDetails?.dashboardDetails?.AttendanceSummery
  );

  const MerDashbord = useSelector(
    (state) => state?.merDashbordReducer?.MerDahbordDetails?.data
  );

  const MerPJP = useSelector((state) => state?.merDashbordReducer?.pjp);

  const AttendanceDatas = useSelector(
    (state) => state?.merDashbordReducer?.attendance
  );
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
        data: AttendanceDatas,
        color: (opacity = 2) => `gray`,
        strokeWidth: 1,
      },
    ],
  };
  return (
    <View>
      <View style={styles.GraphMainView}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.mainView}>
            <View style={styles.hedereTExtView}>
              <Text style={styles.headertext}>Merchandiser PJP Coverange</Text>
            </View>
            {MerPJP && MerPJP.length > 0 ? (
              <View style={styles.box}>
                <View style={styles.boxView}>
                  <Text style={styles.txt}>Date</Text>
                  <View style={styles.verticalLine} />
                  <Text style={styles.txt}>PJP</Text>
                  <View style={styles.verticalLine} />
                  <Text style={styles.txt}>Visited</Text>
                  <View style={styles.verticalLine} />
                  <Text style={styles.txt}>Planned</Text>
                  <View style={styles.verticalLine} />
                  <Text style={styles.txt}>UnPlanned</Text>
                  <View style={styles.verticalLine} />
                  <Text style={styles.txt}>Compliance</Text>
                </View>
                <View style={styles.verticalLines} />
                <FlatList
                  scrollEnabled={false}
                  data={MerPJP}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    return (
                      <View>
                        <View style={styles.boxView}>
                          {/* <View style={styles.verticalLine} /> */}
                          <Text
                            style={[
                              styles.txt,
                              {
                                fontWeight: "400",
                                fontSize: 10,
                                paddingTop: 15,
                                paddingBottom: 15,
                              },
                            ]}
                          >
                            {item.date}
                          </Text>
                          <View style={styles.verticalLine} />
                          <Text
                            style={[
                              styles.txt,
                              {
                                fontWeight: "400",
                              },
                            ]}
                          >
                            {item.pjp}
                          </Text>
                          <View style={styles.verticalLine} />
                          <Text
                            style={[
                              styles.txt,
                              {
                                fontWeight: "400",
                              },
                            ]}
                          >
                            {item.visited}
                          </Text>
                          <View style={styles.verticalLine} />
                          <Text
                            style={[
                              styles.txt,
                              {
                                fontWeight: "400",
                              },
                            ]}
                          >
                            {item.planned}
                          </Text>
                          <View style={styles.verticalLine} />
                          <Text
                            style={[
                              styles.txt,
                              {
                                fontWeight: "400",
                              },
                            ]}
                          >
                            {item.unplanned}
                          </Text>
                          <View style={styles.verticalLine} />
                          <Text
                            style={[
                              styles.txt,
                              {
                                fontWeight: "400",
                              },
                            ]}
                          >
                            {item.comliance == null ? 0 : item.comliance}
                          </Text>
                        </View>
                        <View style={styles.verticalLines} />
                      </View>
                    );
                  }}
                />
              </View>
            ) : (
              <View
                style={[
                  styles.NoDataView,
                  { height: Dimensions.get("screen").height / 4.4 },
                ]}
              >
                <Text style={styles.noText}>No Data Found!!!</Text>
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.SummaryView}>
          {AttendanceSummery.map((element) => {
            return (
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
                    <Text style={styles.number}>
                      {MerDashbord?.presentCount}
                    </Text>
                  </View>
                  <Text style={styles.textStyle}>Present</Text>
                  <View
                    style={[
                      styles.numberContainer,
                      { backgroundColor: "#128ee2" },
                    ]}
                  >
                    <Text style={styles.number}>
                      {MerDashbord?.weekoffCount}
                    </Text>
                  </View>
                  <Text style={styles.textStyle}>Week off</Text>
                  <View
                    style={[styles.numberContainer, { backgroundColor: "red" }]}
                  >
                    <Text style={styles.number}>
                      {MerDashbord?.absentCount}
                    </Text>
                  </View>
                  <Text style={styles.textStyle}>Absent</Text>
                  <View
                    style={[
                      styles.numberContainer,
                      { backgroundColor: "#ffa500" },
                    ]}
                  >
                    <Text style={styles.number}>{MerDashbord?.leaveCount}</Text>
                  </View>
                  <Text style={styles.textStyle}>Leave</Text>
                </ScrollView>
              </>
            );
          })}
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
              {AttendanceDatas && (
                <BarChart
                  data={AttendanceDetails}
                  width={Dimensions.get("screen").width * 2.1}
                  // height={
                  //   height <= 700 ? 175 : Platform.OS === "ios" ? 220 : 210
                  // }
                  height={Dimensions.get("screen").height / 3.4}
                  showValuesOnTopOfBars={true}
                  fromZero={true}
                  segments={4}
                  //  maxValue={100}
                  chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    barPercentage: 1.2,
                    height: 1000,
                    fillShadowGradient: `#61CB72`,
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
      </View>
    </View>
  );
};

export default MerchandiserDashboard;
