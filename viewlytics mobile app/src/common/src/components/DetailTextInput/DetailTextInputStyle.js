import { Platform, StyleSheet } from "react-native";
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
  //  marginTop: 10,
  },
  title: {
    fontFamily: FontsFamily.RobotoMedium,
    fontSize: 20,
    color: COLORS.primary,
    marginBottom: Platform.OS == "android" ? 0 : 10,
  },
  value: {
    fontFamily: FontsFamily.Regular,
    fontSize: 18,
    color: COLORS.black,
    marginTop: 10,
  },
  input: {
    padding: 0,
    fontFamily: FontsFamily.Bold,
    fontSize: 18,
    color: COLORS.black,
    paddingLeft: 5,
  },
  eye:{
    width:20,
    height:20,
    tintColor:"black"
  },
  container:{
    flexDirection:"row",justifyContent:"space-between"
  },
  touchView:{
    marginRight:20,marginTop:5
  },
  imgStyle:{
    width:32,height:18,tintColor:"black"
  }
});
