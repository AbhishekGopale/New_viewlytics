import { StyleSheet } from "react-native";
import { COLORS } from "../../colors/colors";

export const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 15,
  },
  subView: {
    backgroundColor: COLORS.white,
    height: "40%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 200,
    width: 250,
  },
});
