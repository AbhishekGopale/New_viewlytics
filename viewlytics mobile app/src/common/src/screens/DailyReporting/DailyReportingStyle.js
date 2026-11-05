import { StyleSheet, Dimensions } from "react-native";
import { FontsFamily } from "../../assets/fonts/fonts";
const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");
import { COLORS } from "../../colors/colors";
export const styles = StyleSheet.create({
  headerIcon: {
    height: 20,
    width: 15,
  },
  FlatlistView: {
    //width:"0%",
    //  justifyContent: "center",

    alignSelf: "center",
    //alignItems:"center",
    padding: 8,

    //backgroundColor: COLORS.white,
  },
  mainContainer: {
    justifyContent: "center",
    alignContent: "center",
  },
  subFlatView: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: width / 2.3,
    height: 160,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },

  itemView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  imgsStyle: {
    width: 60,
    height: 60,
    alignSelf: "center",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  FlatText: {
    alignSelf: "center",
    marginTop: 20,
    fontSize: 15.7,
    fontFamily: FontsFamily.NotoSansExtraBold,
    fontWeight: "500",
    textAlign: "center",
    color: COLORS.black,
    textTransform: "capitalize",
  },
  FlatMainConatiner: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  TouchableOpacityView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  loader: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: "50%",
  },
  doneimgView: {
    width: 30,
    height: 30,
    position: "absolute",
    top: 10,
    right: 0,
  },
  doneimg: {
    width: 20,
    height: 20,
    alignSelf: "flex-end",
    marginRight: 10,
    marginBottom: 10,
  },
});
