import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../colors/colors";
const { width } = Dimensions.get("screen");
export const styles = StyleSheet.create({
  headerIcon: {
    height: 20,
    width: 15,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
   // padding: 10,
  //  backgroundColor:COLORS.white
  //  backgroundColor: COLORS.white,
  },
  buttonContainer: {
    flexDirection: "row",
   // borderWidth:0.5,
  
  },
  button: {
    padding: 10,
    backgroundColor: "#eaeaea",
    width: width / 5,
   // borderWidth: 0.2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activeButton: {
    backgroundColor: COLORS.white,
  },
  // activeButtonone: {
  //   backgroundColor: "#4CAF50",
  // },
  // activeButtonTwo: {
  //   backgroundColor:  "#128ee2",
  // },
  // activeButtonThree: {
  //   backgroundColor: "#ffa500",
  // },
  // activeButtonFour: {
  //   backgroundColor: "#4CAF50",
  // },
  // activeButtonFour: {
  //   backgroundColor: "red",
  // },
  contentContainer: {
    alignItems: "center",
  },
  numbertext: {
    fontSize: 12,
    color: COLORS.black,
    textAlign:"center",
    marginTop:5
  },
  iconstyle: {
    width: 20,
    height: 20,
    tintColor: COLORS.black,
    alignSelf: "center",
  },
  containerOne: {
    //flexDirection: "row",
    justifyContent:"center",
    alignItems: "center",
    // alignSelf:"center"
  },
  numbertextone: {
    fontSize: 10,
    alignSelf: "center",
    color: COLORS.black,
  },
});
