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
    alignSelf: "center",
    marginRight: 20,
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
  },
  titleText: {
    fontWeight: "700",
    // color: "white",
    alignSelf: "center",
    marginLeft: 20,
    fontSize: 18,
    fontFamily: FontsFamily.RobotoRegular,
    color: COLORS.black,
  },
  DetailTextview: {
    justifyContent: "space-between",
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    paddingVertical: 20,
  },
  butttontouch: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    alignSelf: "flex-end",
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
  },
  StornameView: {
    padding: 10,
    width: "100%",
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
  },

  StorenameTexttwo: {
    fontWeight: "700",
    color: COLORS.black,
    alignSelf: "flex-end",
    fontSize: 18,
  },

  maincontainer: {
    flex: 1,
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
    fontFamily: FontsFamily.Heavy,
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
  tableMainView: {
    width: "33.33%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
  },
  tablesubView: {
    //borderWidth: 0.5,
    width: "60%",
    // borderRightWidth: 0.5,
    borderBottomWidth: 0,

    height: 70,
  },
  tableText: {
    textAlign: "center",
    paddingVertical: 10,
    fontWeight: "700",
    color: "black",
    alignSelf: "center",
  },
  valueView: {
    borderTopWidth: 0.5,
    width: "100%",
    // borderRightWidth: 0,
  },

  FlatView: {
    width: "100%",
    padding: 10,
    //flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
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
  },
});
