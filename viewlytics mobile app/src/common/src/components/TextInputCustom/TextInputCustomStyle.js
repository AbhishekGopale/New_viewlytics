import { Platform, StyleSheet } from "react-native";
import { COLORS } from "../../colors/colors";
import { FontsFamily } from "../../assets/fonts/fonts";
export const styles = StyleSheet.create({
  name: {
    color: COLORS.white,
    fontFamily: FontsFamily.Regular,
    fontSize: 20,
  },
  subView: {
    flexDirection: "row",
    marginTop: Platform.OS == "ios" ? 5 : 2,
  },
  horizontalLine: {
    borderWidth: 0.6,
    borderColor: COLORS.white,
    marginTop: 8,
  },
  eye: {
    height: 12,
    width: 21,
    alignSelf: "flex-end",
    // top: 20,
    marginTop: Platform.OS == "android" ? 20 : 12,
    tintColor:COLORS.white
  },
  textInput: {
    padding: 0,
    marginLeft: 15,
    width: "80%",
    color: COLORS.white,
    marginTop: 10,
  },
});
