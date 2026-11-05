import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { FontsFamily } from "../../assets/fonts/fonts";
import { COLORS } from "../../colors/colors";
import { Images } from "../../assets/images/map";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SwipeItem = (props) => {
  const [time, setTime] = useState();

  const timeCalculate = () => {
    let today = new Date();
    let createdDate = props.time;
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

  useEffect(() => {
    timeCalculate();
  }, []);

  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity onPress={props.handleDelete} activeOpacity={0.6}>
        <View style={styles.deleteBox}>
          <Image source={Images.delete} style={styles.deleteIcon} />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Swipeable renderRightActions={leftSwipe}>
      <View style={styles.cardMainView}>
        <View style={styles.cardSubView}>
          <View style={styles.detailsView}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.description}>{props.description}</Text>
          </View>
          <View style={styles.timeView}>
            <Text style={styles.time}>{time}</Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default SwipeItem;

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: SCREEN_WIDTH,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 16,
  },
  deleteBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "85%",
    // alignSelf: "center",
    marginTop: 5,
  },
  cardMainView: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    width: "100%",
  },
  detailsView: {
    width: "80%",
  },
  title: {
    fontFamily: FontsFamily.ExtraBold,
    fontSize: 18,
    color: COLORS.black,
  },
  description: {
    fontFamily: FontsFamily.Bold,
    fontSize: 14,
    color: COLORS.black,
    marginTop: 10,
  },
  deleteIcon: {
    height: 25,
    width: 25,
    alignSelf: "center",
    tintColor: COLORS.white,
  },
  time: {
    fontFamily: FontsFamily.ExtraBold,
    fontSize: 10,
    color: COLORS.black,
  },
  cardSubView: {
    width: "100%",
    flexDirection: "row",
    padding: 15,
    backgroundColor: COLORS.grayWhite,
    borderRadius: 5,
  },
});
