import React from "react";
import { StyleSheet } from "react-native";
import { COLORS } from "../../colors/colors";
import { FontsFamily } from "../../assets/fonts/fonts";

export const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: COLORS.white,
    zIndex: 1,
  },
  headerIcon: {
    height: 25,
    width: 5,
  },
  headerView: {
    zIndex: 9999,
  },

  horizontalLine: {
    width: "100%",
    height: 2,
    backgroundColor: COLORS.black,
  },

  timeView: {
    width: "20%",
    alignItems: "center",
  },
  deleteBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 80,
  },
  loader: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: "50%",
  },
  NoStoreView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  nostoreText: {
    alignSelf: "center",
    color: COLORS.black,
    fontSize: 20,
    fontFamily: FontsFamily.Bold,
  },
});
