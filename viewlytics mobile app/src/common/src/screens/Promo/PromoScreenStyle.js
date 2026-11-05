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

  /// store card
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

  ////
  FlatlistView: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",

    alignSelf: "center",
  },
  mainView: {
    width: "95%",
    paddingTop: 20,
    //  padding: 10,
    alignSelf: "center",
    alignItems: "center",
  },
  SubView: {
    width: "100%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  container: {
    width: "100%",
  },
  imgStyle: {
    width: 120,
    height: 80,
  },
  imgtextView: {
    flexDirection: "row",
    padding: 10,
    top: -30,
  },
  chainText: {
    paddingHorizontal: 20,
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
    alignSelf: "center",
    color: COLORS.black,
    fontFamily: FontsFamily.Bold,
  },
  skutext: {
    paddingHorizontal: 20,
    paddingTop: 20,

    fontWeight: "500",
    // fontSize: 1,
    textAlign: "center",
    alignSelf: "center",
    color: COLORS.black,
    fontFamily: FontsFamily.ExtraBold,
  },
  skuno: {
    // paddingHorizontal: 20,
    // fontWeight: "700",
    fontSize: 12,
    textAlign: "center",
    alignSelf: "center",
    color: COLORS.black,
    marginVertical: 5,
    fontFamily: FontsFamily.Bold,
  },
  chainTexttwo: {
    fontFamily: FontsFamily.Light,
    fontWeight: "700",
    color: COLORS.black,
    paddingHorizontal: 10,
    color: COLORS.red,
    top: -5,
  },
  chainTextone: {
    fontFamily: FontsFamily.Light,
    fontWeight: "700",
    color: COLORS.black,
    paddingHorizontal: 10,
    color: COLORS.green,
    top: -5,
  },
  chainTexPromo: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.white,

    textAlign: "center",
  },
  decText: {
    //fontWeight: "400",
    // textAlign: "center",
    color: "black",
    fontFamily: FontsFamily.Regular,
  },
  ViewStyle: {
    flexDirection: "row",
  },
  triimg: {
    width: 65,
    height: 65,
    alignSelf: "flex-end",
    position: "absolute",
  },
  PromoView: {
    width: "15%",
    alignSelf: "flex-end",
    transform: [{ rotate: "45deg" }],
    top: 6,
    left: 7,
  },
  promoDecView: {
    width: "80%",
    padding: 5,
    alignSelf: "center",
    top: -20,
  },
  statusView: {
    flexDirection: "row",
    justifyContent: "space-between",
    top: -10,
  },
  TriView: {
    alignItems: "flex-end",
  },
  ModalBackTouch: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  modalView:
    height <= 700
      ? {
          // marginTop: 100,
          //  height: "55%",
          width: "100%",
          alignSelf: "center",
          backgroundColor: "white",
          padding: 20,
          alignItems: "center",
          position: "absolute",
          bottom: 0,
        }
      : {
          // marginTop: 100,
          // height: "50%",
          width: "100%",
          alignSelf: "center",
          backgroundColor: "white",
          padding: 20,
          alignItems: "center",
          position: "absolute",
          bottom: 0,
          // borderTopLeftRadius:20,
          //borderTopRightRadius:20
        },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    width: "20%",
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "gray",
    // marginVertical:5
  },
  selectedButton: {
    backgroundColor: "green",
  },
  selectedButtonNO: {
    backgroundColor: COLORS.red,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: FontsFamily.Heavy,
  },

  textDecstyle: {
    textAlign: "center",
    color: COLORS.black,
    fontWeight: "700",
  },
  DecView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  submitButton: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  yesNObuttonView: {
    flexDirection: "row",
    paddingTop: 10,
  },
  Modalimages: {
    width: 100,
    height: 100,
  },
  textinputview:
    height <= 700
      ? {
          borderWidth: 1,
          width: width - 40,
          borderRadius: 2,
          borderColor: COLORS.gray,
        }
      : {
          borderWidth: 1,
          width: width - 40,
          borderRadius: 2,
          borderColor: COLORS.gray,
        },
  textinput: {
    height: 50,
    color: "black",
    width: "100%",
    alignSelf: "center",
    height: 60,
    alignItems: "center",
    fontSize: 14,
    color: COLORS.black,
    paddingTop: 0,
    backgroundColor: COLORS.white,
  },
  mainmodalView: {
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    color: COLORS.white,
    fontFamily: FontsFamily.Heavy,
  },
  capcharbutton: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontFamily: FontsFamily.Heavy,
    fontSize: 20,
    marginLeft: 50,
    color: COLORS.black,
  },
  imagestyle: {
    width: 100,
    height: 80,
  },
  buttonone: {
    paddingHorizontal: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: 10,
    width: "40%",
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  grayButtontwoooo: {
    paddingHorizontal: 15,
    backgroundColor: COLORS.gray,
    borderRadius: 20,
    paddingVertical: 10,
    width: "40%",
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  buttonText: {
    fontFamily: FontsFamily.Bold,
    fontSize: 18,
    color: COLORS.white,
    textAlign: "center",
  },
  butotonText: {
    fontSize: 18,
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "700",
  },
  buttons: {
    paddingHorizontal: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 8,
    width: 100,
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "flex-end",
    marginVertical: 5,
  },
  grayButtons: {
    paddingHorizontal: 15,
    backgroundColor: COLORS.gray,
    borderRadius: 5,
    paddingVertical: 8,
    width: 100,
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "flex-end",
    marginVertical: 5,
  },
  buttonText: {
    fontFamily: FontsFamily.Bold,
    fontSize: 18,
    color: COLORS.white,
    textAlign: "center",
  },
  imgconteinerss: {
    //   borderWidth: 0.5,
  },
  touchCross: {
    justifyContent: "center",
    alignSelf: "flex-end",
    width: 40,
    height: 35,
  },
  crossIcon: { width: 25, height: 25, alignSelf: "center" },
  NoDataText: {
    alignSelf: "center",
    color: COLORS.black,
    paddingVertical: 50,
    fontFamily: FontsFamily.ExtraBold,
  },
  NoDataView: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
