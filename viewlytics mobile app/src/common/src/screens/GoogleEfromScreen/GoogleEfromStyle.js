import { StyleSheet, Dimensions } from "react-native";
import { FontsFamily } from "../../assets/fonts/fonts";
import { COLORS } from "../../colors/colors";
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
  },
  StornameView: {
    padding: 10,
    width: "100%",
  },
  addView: {
    width: "20%",
  },
  AdressView: {
    width: "80%",
  },
  imgView: {
    flexDirection: "row",
  },
  ShopImg: {
    width: 80,
    height: 90,
    borderRadius: 5,
  },
  StoreView: {
    width: "60%",
  },
  StorenameTexttwo: {
    fontWeight: "700",
    color: COLORS.black,

    fontSize: 16,
  },
  LocationText: {
    color: COLORS.black,
    fontFamily: FontsFamily.RobotoMedium,
    marginTop: 5,
    fontSize: 12,
  },
  AddTexttwo: {
    fontSize: 11,
    color: COLORS.black,
    fontFamily: FontsFamily.Light,
    fontWeight: "bold",
    marginTop: 2,
    textAlign: "center",
  },
  imgConteiner: {
    width: "40%",
  },
  AddText: {
    fontSize: 13,
    color: COLORS.black,
    textAlign: "center",
    fontFamily: FontsFamily.Heavy,
    fontWeight: "bold",
  },
  addresstext: {
    flexDirection: "row",
    backgroundColor: COLORS.bg,
    padding: 5,
    marginTop: 5,
  },
  TlText: {
    paddingTop: 5,
    fontFamily: FontsFamily.ExtraBold,
    color: COLORS.black,
    color: COLORS.black,
    fontFamily: FontsFamily.RobotoMedium,

    fontSize: 12,
  },
  maiconteinet: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
  mainView: {
    width: "95%",
    backgroundColor: "white",
    padding: 15,
    paddingVertical: 20,
    alignSelf: "center",
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },
  butonText: {
    flexDirection: "row",
    width: "100%",
  },
  textView: {
    width: "95%",
  },
  textStyle: {
    fontSize: 16,
    color: COLORS.black,
    fontFamily: FontsFamily.Bold,
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
});
