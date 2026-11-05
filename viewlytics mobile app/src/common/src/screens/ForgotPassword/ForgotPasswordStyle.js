import { StyleSheet } from "react-native";
import { FontsFamily } from "../../assets/fonts/fonts";
import { COLORS } from "../../colors/colors";

export const styles = StyleSheet.create({
  subView: {
    justifyContent: "center",
    alignItems: "center",
    //padding:20,
    // backgroundColor:"red"
  },
  title: {
    fontFamily: FontsFamily.Regular,
    fontSize: 25,
    color: COLORS.white,
   padding:30,
  
  },
  userStyle: {
    height: 16,
    width: 16,
    marginTop: 10,
    tintColor:COLORS.white
  },
  componentView: {
    padding: 100,


  },
  buttonView: {
    justifyContent: "center",
    alignItems: "center",
    // margin: 20,
    padding: 25,
    backgroundColor: COLORS.primary,
  },
  
 
});
