import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "./LeavesStyle";
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { useDispatch, useSelector } from "react-redux";
import { GetAllLeavesAction } from "../../redux/actions/getAllLeavesAction";
import { COLORS } from "../../colors/colors";

const Leaves = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [token, setToken] = useState("");

  const [time, setTime] = useState();

  const isLoading = useSelector((state) => state?.GetAllLeaves?.isLoading);
  const leavesData = useSelector((state) => state?.GetAllLeaves?.allLeaves);
  console.log(leavesData, "leavesData========");
  const timeCalculate = (createdTime) => {
    let today = new Date();
    let createdDate = createdTime;
    var diffMs = today - new Date(createdDate);
    var diffYears = Math.floor(diffMs / 31536000000);
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffMonths = Math.floor(diffDays / 30);
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

    if (diffYears >= 2) {
      return setTime(`${diffYears} Years ago`);
    } else if (diffYears >= 1) {
      return setTime(`${diffYears} Year ago`);
    } else if (diffMonths >= 6) {
      return setTime(`${diffMonths} Months ago`);
    } else if (diffMonths >= 1) {
      return setTime(`${diffMonths} Month ago`);
    } else if (diffDays >= 2) {
      return setTime(`${diffDays} Days ago`);
    } else if (diffDays >= 1) {
      return setTime(`${diffDays} Day ago`);
    } else if (diffHrs >= 2) {
      return setTime(`${diffHrs} Hours ago`);
    } else if (diffHrs >= 1) {
      return setTime(`${diffHrs} Hour ago`);
    } else if (diffMins >= 2) {
      return setTime(`${diffMins} minutes ago`);
    } else if (diffMins >= 1) {
      return setTime(`${diffMins} minute ago`);
    } else {
      return "Just now";
    }
  };

  const getToken = async () => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        console.log(data, "AsyncData");
        setToken(data);
        dispatch(GetAllLeavesAction(data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getToken();
  }, []);

  const renderItem = ({ item }) => {
    console.log("item", item);
    timeCalculate(item.created_at);
    return (
      <>
        <View style={styles.cardConteiner}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CreateLeaves", {
                isCreateLeave: item.leave_status == "0" ? true : false,
                item: item,
                header: "Leave Details",
              });
            }}
            style={styles.cardMainView}
          >
            <View style={styles.detailsView}>
              <Text style={styles.title}>
                {item.leave_type == "0"
                  ? "Casual Leave"
                  : item.leave_type == "1"
                  ? "Sick Leave"
                  : item.leave_type == "2"
                  ? "Compensatory Leave"
                  : item.leave_type == "3"
                  ? "Other Leave"
                  : ""}
              </Text>
              <Text style={styles.description}>{item.reason}</Text>
            </View>
            <View style={styles.timeView}>
              <Text style={styles.datestyle}>{item.date}</Text>

              <Text style={styles.time}>{item.displayTime}</Text>
            </View>

            <View
              style={[
                styles.verticalLine,
                item.leave_status == "2"
                  ? { backgroundColor: "red" }
                  : item.leave_status == "0"
                  ? { backgroundColor: "yellow" }
                  : item.leave_status == "1"
                  ? { backgroundColor: "green" }
                  : {},
              ]}
            />
          </TouchableOpacity>
          {/* <View style={styles.horizontalLine} /> */}
        </View>
      </>
    );
  };

  const renderEmptyItem = ({ item }) => {
    return (
      <View style={styles.emptyMainView}>
        <Text style={styles.emptyText}>No Data Found</Text>
        <View style={styles.line} />
        <Text
          style={[
            styles.emptyText,
            {
              marginTop: 15,
              fontSize: 20,
            },
          ]}
        >
          Create Leave
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CreateLeaves", {
              isCreateLeave: true,
              header: "Create Leave",
            });
          }}
        >
          <View style={styles.touchView}>
            <Text
              style={{ color: COLORS.white, alignSelf: "center", padding: 10 }}
            >
              Create Leave
            </Text>
            <Image style={styles.addLeave} source={Images.addLeave} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return isLoading ? (
    <View style={styles.loader}>
      <ActivityIndicator size={"large"} color={COLORS.primary} />
    </View>
  ) : (
    <View style={styles.mainView}>
      <Header
        header={"Leaves"}
        iconStyle={styles.headerIcon}
        image={Images.appyLeave}
        onPress={() => {
          navigation.navigate("CreateLeaves", {
            isCreateLeave: true,
            header: "Create Leave",
          });
        }}
      />
      <View style={{ position: "absolute", left: 55, top: 16 }}>
        <Text style={{ color: COLORS.white, fontSize: 18 }}>Create Leave</Text>
      </View>

      <View style={styles.subView}>
        <FlatList
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          data={leavesData}
          contentContainerStyle={{ paddingBottom: 200 }}
          ListEmptyComponent={renderEmptyItem}
          showsVerticalScrollIndicator={false}
        />
        {/* {leavesData == null ? (
          <View></View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CreateLeaves", {
                isCreateLeave: true,
                header: "Create Leave",
              });
            }}
            style={styles.addLeaveButton}
          >
            <Text style={styles.leaveText}>Apply Leave</Text>
            <Image source={Images.addLeave} style={styles.image} />
          </TouchableOpacity>
        )} */}
      </View>
    </View>
  );
};

export default Leaves;
