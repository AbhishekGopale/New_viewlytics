import { View, Text, Dimensions, ScrollView } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";
import GroupedBarGraph from "../GroupGraph/GroupGraph";
import { styles } from "./PrmotorDashboardStyle";

const PrmotorDashboard = () => {
  const leftValues = [0, 30, 20, 10];
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
  ];
  const barColors = ["#5D9C59", "#FF6464"];

  const Target = useSelector(
    (state) => state?.GetDashboardDetails?.dashboardDetails?.Target
  );
  const Achieved = useSelector(
    (state) => state?.GetDashboardDetails?.dashboardDetails?.Achieved
  );

  const TargetArchived = useSelector(
    (state) => state?.promoterTlDashbordReducer?.achieved
  );
  // console.log({ TargetArchived });
  const Legend = useSelector(
    (state) => state?.GetDashboardDetails?.dashboardDetails?.Legend
  );

  const AttendanceSummery = useSelector(
    (state) => state?.GetDashboardDetails?.dashboardDetails?.AttendanceSummery
  );
  const FromRemaining = useSelector(
    (state) => state?.remainingFromCountReducer?.allDetails?.allStore?.count
  );

  ///new dashbord Api
  const PromoterTLDashbord = useSelector(
    (state) => state?.promoterTlDashbordReducer?.DahbordDetails?.data
  );

  const AttendanceData = useSelector(
    (state) => state?.promoterTlDashbordReducer?.attendance
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
        data: Achieved,
        color: (opacity = 2) => `gray`,
        strokeWidth: 1,
      },
      {
        data: Target,
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
  return (
    <View>
      <View style={styles.GraphMainView}>
        <View style={styles.GraphView}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={[styles.textConteiner, { paddingLeft: 40 }]}>
              <View
                style={[styles.HeaderTextView, { backgroundColor: "#61CB72" }]}
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
              // height: Dimensions.get("screen").height / 3.2,
            }}
          >
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
            >
              <GroupedBarGraph
                data={TargetArchived}
                leftValues={leftValues}
                bottomValues={bottomValues}
                barColors={barColors}
              />
            </ScrollView>
          </View>
        </View>
        <View style={styles.SummaryView}>
          {AttendanceSummery &&
            AttendanceSummery?.map((element) => {
              return (
                <>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    <View
                      style={[
                        styles.numberContainer,
                        { backgroundColor: "#008000", marginLeft: 15 },
                      ]}
                    >
                      <Text style={styles.number}>
                        {PromoterTLDashbord?.presentCount}
                      </Text>
                    </View>
                    <Text style={styles.textStyle}>Present</Text>
                    <View
                      style={[
                        styles.numberContainer,
                        { backgroundColor: "#0000ff" },
                      ]}
                    >
                      <Text style={styles.number}>
                        {PromoterTLDashbord?.weekoffCount}
                      </Text>
                    </View>
                    <Text style={styles.textStyle}>Week off</Text>
                    <View
                      style={[
                        styles.numberContainer,
                        { backgroundColor: "#ff0000" },
                      ]}
                    >
                      <Text style={styles.number}>
                        {PromoterTLDashbord?.absentCount}
                      </Text>
                    </View>
                    <Text style={styles.textStyle}>Absent</Text>
                    <View
                      style={[
                        styles.numberContainer,
                        { backgroundColor: "#ffa500" },
                      ]}
                    >
                      <Text style={styles.number}>
                        {PromoterTLDashbord?.leaveCount}
                      </Text>
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
              keyExtractor={(item) => item.id}
            >
              {AttendanceData && (
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
                    barPercentage: 1.1,
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

export default PrmotorDashboard;
