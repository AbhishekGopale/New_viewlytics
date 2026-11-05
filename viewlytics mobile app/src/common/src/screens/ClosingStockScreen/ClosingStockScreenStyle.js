import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../colors/colors";
import { FontsFamily } from "../../assets/fonts/fonts";
const { height } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  headerIcon: {
    width: 15,
    height: 20,
  },
  icon: {
    width: 15,
    height: 15,
    // tintColor: COLORS.white,
    alignSelf: "center",
    marginRight: 20,
  },
  flatmainView: {
    alignContent: "center",
    alignSelf: "center",
    width: "100%",
    // paddingTop:10
  },
  FlatView: {
    width: "100%",
    padding: 10,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  textView: {
    width: "100%",
    backgroundColor: "white",
    padding: 10,

    borderRadius: 6,
    // borderTopLeftRadius: 6,
    // borderTopRightRadius: 6,
  },
  titleText: {
    fontWeight: "700",
    // color: "white",
    alignSelf: "center",
    marginLeft: 20,
    // fontSize: 18,
    fontFamily: FontsFamily.RobotoRegular,
    color: COLORS.black,
  },
  DetailTextview: {
    //  flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignSelf: "center",
    // backgroundColor: COLORS.white,
    // borderBottomLeftRadius:5,
    // borderBottomRightRadius:5,
    paddingVertical: 20,
    // borderRadius: 6,
  },
  butttontouch: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.gray,
    alignSelf: "flex-end",
    //   borderRadius: 30,
    width: "30%",
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.white,
    padding: 10,
    fontWeight: "700",
  },
  buttonView: {
    width: "100%",
    paddingVertical: 30,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    //  position: "absolute",
    //Top: 0,
  },
  StornameView: {
    padding: 10,
    width: "100%",
    //backgroundColor:COLORS.primary
  },
  StorenameText: {
    fontWeight: "700",
    color: COLORS.black,
    alignSelf: "flex-end",
    fontSize: 20,
    //  fontFamily: FontsFamily.ExtraBold,
  },
  StoreView: {
    width: "100%",

    backgroundColor: COLORS.gray,
    flexDirection: "row",
    padding: 10,
    // borderRadius:10
  },
  RemarkText: {
    fontWeight: "700",
  },
  TextinputView: {
    borderWidth: 0.5,
    width: "100%",
    height: 80,
    borderColor: COLORS.white,
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  Textinput: {
    padding: 15,
    color: COLORS.black,
  },
  InputText: {
    width: 40,
    borderWidth: 1,
  },
  StorenameTexttwo: {
    fontWeight: "700",
    color: COLORS.black,
    alignSelf: "flex-end",
    fontSize: 18,
  },
  mapView: {
    width: "100%",
    // backgroundColor:'red',
    // justifyContent:"center",
    // alignItems:"center",alignSelf:'center'
  },
  dataText:
    height <= 700
      ? {
          color: COLORS.black,
          fontSize: 10,
          marginLeft: 10,
        }
      : {
          color: COLORS.black,
          fontSize: 12,
          // marginLeft: 10,
        },

  VeritcalLine: {
    width: "100%",
    borderWidth: 0.4,
    borderColor: "black",
  },
  EleView: {
    alignItems: "flex-end",
    width: "100%",
  },
  dataTextinput: {
    //paddingBottom: 0,
    // padding:10,
    alignSelf: "center",
    fontSize: 14,
    color: COLORS.black,
  },
  maincontainer: {
    flex: 1,
  },
  remarkView: {
    width: "100%",
    //   backgroundColor: COLORS.white,
    flexDirection: "row",
    padding: 10,
    // padding:10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  imagStyle: {
    width: 80,
    height: 50,
  },
  iconView: {
    justifyContent: "center",
  },
  mainVie: {
    flexDirection: "row",
  },
  ShopImg: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  StoreView: {
    alignSelf: "center",
    marginLeft: 50,
  },
  imgView: {
    backgroundColor: "white",
    padding: 15,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: "700",
    padding: 10,
    color: COLORS.black,
    fontFamily: FontsFamily.ExtraBold,
  },
  TextinputTW: {
    justifyContent: "center",
    alignSelf: "flex-end",
    paddingVertical: 15,
    borderLeftWidth: 0.5,
    width: "20%",
    alignItems: "center",
    //   borderTopWidth: 0,
  },
  TableView: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 0.5,
    alignItems: "center",
    //width: "50%",
  },
  headerTextone: {
    padding: 2,
    fontWeight: "700",
    alignSelf: "center",
    color: "black",
    textAlign: "center",
  },
  headerViewtwo: {
    borderLeftWidth: 0.5,
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerView: {
    //borderWidth: 0.5,
    width: "55%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTexttwo: {
    paddingVertical: 20,
    fontWeight: "700",
    color: "black",
    marginLeft: 10,
  },
  mainBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 0.5,
    width: "100%",
    borderTopEndRadius: 5,
    borderTopLeftRadius: 5,
  },
  LocationText: {
    color: COLORS.black,
  },
  TablemainView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  opnText: {
    //paddingBottom: 0,
    padding: Platform.OS === "ios" ? 0 : 15,
    alignSelf: "center",
    fontSize: 14,
    color: COLORS.black,
  },
  oenView: {
    justifyContent: "center",
    alignSelf: "flex-end",
    padding: 10,
    borderLeftWidth: 0.5,
    width: "25%",
    alignItems: "center",
  },
  eleView: {
    width: "55%",
    justifyContent: "center",
    alignItems: "center",
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
  button: {
    paddingHorizontal: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 8,
    width: "30%",
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  grayButton: {
    paddingHorizontal: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 8,
    width: "30%",
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
