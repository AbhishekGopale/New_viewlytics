import { StyleSheet } from "react-native";
import { COLORS } from "../../colors/colors";
import { FontsFamily } from "../../assets/fonts/fonts";
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
    // justifyContent:"flex-start",
    // color: "white",
    alignSelf: "center",
    // marginLeft: 20,
    fontSize: 18,
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
    backgroundColor: COLORS.primary,
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
    padding: 10,
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
    color: "black",
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
  dataText: {
    //paddingBottom: 0,

    color: COLORS.black,
    // paddingTop: Platform.OS === 'ios' ? 10 :25,
    fontSize: 14,
    marginLeft: 10,
    textAlign: "center",
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
    paddingBottom: 0,
    // padding:10,
    alignSelf: "center",
    fontSize: 14,
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
    paddingVertical: 20,
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
    alignSelf: "flex-end",
    padding: 10,
    borderLeftWidth: 0.5,
    width: "25%",
    //   borderTopWidth: 0,
  },
  TableView: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 0.5,
    alignItems: "center",
    // width: "100%",
  },
  headerTextone: {
    padding: 5,
    fontWeight: "700",
    alignSelf: "center",
    color: "black",
  },
  headerViewtwo: {
    borderLeftWidth: 0.5,
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerView: {
    //borderWidth: 0.5,
    // width: "20%",
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
    // width: "100%",
    borderTopEndRadius: 5,
    borderTopLeftRadius: 5,
  },
  LocationText: {
    color: COLORS.black,
  },
  TablemainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 0,
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
  Modalimages: {
    width: 60,
    height: 60,
    marginHorizontal: 15,
  },
  qustionview: {
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 5,
  },
  subView: {
    backgroundColor: "white",
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: FontsFamily.Heavy,
    color: COLORS.black,
  },
  imgcontein: {
    flexDirection: "row",
    padding: 20,
  },
  buttonView: {
    // alignContent: "flex-end",
    alignContent: "flex-end",
    paddingTop: 30,
  },
  TouchstyleButton: {
    width: 100,
    backgroundColor: COLORS.primary,
    // height: 50,
    padding: 13,
    alignSelf: "flex-end",
    borderRadius: 10,
    marginLeft: 20,
  },
  butotonText: {
    fontSize: 18,
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "700",
  },
  button: {
    paddingHorizontal: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 10,
    width: 100,
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "flex-end",
    marginRight: 10,
  },
  grayButton: {
    paddingHorizontal: 15,
    backgroundColor: COLORS.gray,
    borderRadius: 5,
    paddingVertical: 10,
    width: 100,
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "flex-end",
    marginRight: 10,
  },
  buttonText: {
    fontFamily: FontsFamily.Bold,
    fontSize: 18,
    color: COLORS.white,
    textAlign: "center",
  },
});
