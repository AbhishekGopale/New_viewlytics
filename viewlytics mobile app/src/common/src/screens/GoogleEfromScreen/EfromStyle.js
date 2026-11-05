import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");
export const styles = StyleSheet.create({
  headerIcon: {
    height: 20,
    width: 15,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor:"red"
  },
  Webview: {
    // marginTop: 20,
    Height: height,
    width: width,
    flex: 1,
    marginBottom: 100,
  },
});
