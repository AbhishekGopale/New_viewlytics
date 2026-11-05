import React, { useEffect, useRef } from "react";
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Image,
  Animated,
  Text,
} from "react-native";
import { COLORS } from "../../colors/colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { AttendanceListAction } from "../../redux/actions/attendanceListAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";

const AddButton = ({ opened, toggleOpened }) => {
  const navigation = useNavigation();

  const animation = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const d = new Date();
  let month = (d.getMonth() + 1).toString().padStart(2, "0");
  let year = d.getFullYear().toString();

  const getToken = async (selectedYear, selectedMonth) => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        dispatch(AttendanceListAction(data, selectedYear, selectedMonth));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: opened ? 1 : 0,
      duration: 800,
      friction: 2,
      useNativeDriver: true,
    }).start();
  }, [opened, animation]);

  const opacity = {
    opacity: animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    }),
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.whiteView} />
        <TouchableWithoutFeedback
          style={styles.button}
          onPress={() => {
            getToken(year, month);
            navigation.navigate("Attendance");
          }}
        >
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 0],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -180],
                    }),
                  },
                ],
              },
            ]}
          >
            <Image
              source={require("../../assets/images/AddButtonone.png")}
              resizeMode="contain"
              style={styles.itemIcon}
            />
            <Text style={styles.LabelText}>Attendance</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={styles.button}
          onPress={() => {
            navigation.navigate("SalarySlip");
          }}
        >
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -120],
                    }),
                  },
                ],
              },
            ]}
          >
            <Image
              source={require("../../assets/images/AddButtonTwo.png")}
              resizeMode="contain"
              style={styles.itemIcon}
            />
            <Text style={styles.LabelText}>Salary Slip</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("Leaves");
            toggleOpened();
          }}
          style={styles.button}
        >
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 0],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -60],
                    }),
                  },
                ],
              },
            ]}
          >
            <Image
              source={require("../../assets/images/AddButtonThree.png")}
              resizeMode="contain"
              style={styles.itemIcon}
            />
            <Text style={styles.LabelText}>Leave</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={toggleOpened}
          style={styles.addButton}
        >
          <Animated.View
            style={[
              styles.addButtonInner,
              {
                transform: [
                  {
                    rotate: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "45deg"],
                    }),
                  },
                ],
              },
            ]}
          >
            <Image
              source={require("../../assets/images/Add.png")}
              resizeMode="contain"
              style={styles.addButtonIcon}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  box: {
    position: "relative",
    width: 70,
    height: 70,
    marginTop: -45,
    backgroundColor: "transparent",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: "center",
  },
  addButton: {
    shadowColor: COLORS.dark,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  addButtonInner: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 30,
    top: 20,
  },
  addButtonIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.white,
  },
  item: {
    position: "absolute",
    top: 5,
    left: -65,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#6D6D6D",
    width: 200,
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  itemIcon: {
    width: 30,
    height: 30,
    tintColor: COLORS.white,
  },
  LabelText: {
    fontSize: 20,
    marginLeft: 5,
    fontWeight: "700",
    color: COLORS.white,
  },
  whiteView: {
    overflow: "hidden",
    width: 70,
    height: 35,
    position: "absolute",
    top: 45,
    borderBottomRightRadius: 150,
    borderBottomLeftRadius: 150,
    backgroundColor: COLORS.white,
  },
  button: {},
});

export default AddButton;
