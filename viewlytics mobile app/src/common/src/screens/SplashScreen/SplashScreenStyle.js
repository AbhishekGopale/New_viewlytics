import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../colors/colors";
const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");
export const styles = StyleSheet.create({
  image: { width: "100%", height: "100%", resizeMode: "contain" },
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    backgroundColor: COLORS.primary,
  },

  SplashScreen_RootView: {
    justifyContent: "center",
    flex: 1,
    margin: 10,
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  SplashScreen_ChildView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    flex: 1,
  },
});
