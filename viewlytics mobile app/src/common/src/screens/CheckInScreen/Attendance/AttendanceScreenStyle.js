import { StyleSheet } from "react-native";
import { COLORS } from "../../colors/colors";

export const styles = StyleSheet.create({
  headerIcon: {
    height: 20,
    width: 15,
  },
  Datetext: {
    // fontSize:80
    color: COLORS.black,
  },
  tiitleText: {
    fontSize: 30,
    color: "red",
  },
  dataView: {
    flexDirection: "row",
    //justifyContent:"center",
    alignContent: "space-between",
    paddingTop: 20,
  },
  dateView: {
    padding: 30,
  },
  datasView: {
    padding: 40,
    backgroundColor: "white",
    width: "60%",
  },
  EventStyle: {
    color: COLORS.black,
  },
});
