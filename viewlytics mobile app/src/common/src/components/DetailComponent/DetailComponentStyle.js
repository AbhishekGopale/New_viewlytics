import { StyleSheet } from "react-native";
import { COLORS } from "../../colors/colors";
import { FontsFamily } from "../../assets/fonts/fonts";

export const styles = StyleSheet.create({
  cardStyle: {
    padding: 15,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginTop: 10,
  },
  title: {
    fontFamily: FontsFamily.Bold,
    fontSize: 18,
    color: COLORS.primary,
  },
  value: {
    fontFamily: FontsFamily.Regular,
    fontSize: 16,
    color: COLORS.black,
    marginTop: 10,
  },
});
