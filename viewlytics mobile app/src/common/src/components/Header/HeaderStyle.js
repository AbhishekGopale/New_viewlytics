import React from "react";
import { StyleSheet } from "react-native";
import { COLORS } from "../../colors/colors";
import { FontsFamily } from "../../assets/fonts/fonts";

export const styles = StyleSheet.create({
  mainView: {
    height: 60,
    backgroundColor: COLORS.primary,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  title: {
    fontFamily: FontsFamily.Bold,
    color: COLORS.white,
    fontSize: 20,
    textTransform: "capitalize",
  },
  clearAll: {
    position: "absolute",
    backgroundColor: COLORS.white,
    paddingVertical: 7.5,
    paddingHorizontal: 40,
    left: 25,
    top: 45,
    borderWidth: 1,
  },
  clearText: {
    fontFamily: FontsFamily.ExtraBold,
    fontSize: 18,
    color: COLORS.black,
  },
  button: {
    width: "15%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    right: 15,
  },
});
