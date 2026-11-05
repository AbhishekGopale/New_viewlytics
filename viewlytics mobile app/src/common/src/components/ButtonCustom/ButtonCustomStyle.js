import { Platform, StyleSheet } from "react-native";
import { COLORS } from "../../colors/colors";
import { FontsFamily } from "../../assets/fonts/fonts";
export const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: COLORS.white,
    width: "100%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: COLORS.gray,
    fontFamily: FontsFamily.Bold,
    fontSize: 17,
  },
});
