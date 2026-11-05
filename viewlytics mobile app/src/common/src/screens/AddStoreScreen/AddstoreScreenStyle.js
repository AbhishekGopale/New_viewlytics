import { StyleSheet, Dimensions } from "react-native";
import { FontsFamily } from "../../assets/fonts/fonts";
const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");
import { COLORS } from "../../colors/colors";
export const Styles = StyleSheet.create({
  headerIcon: {
    height: 20,
    width: 15,
  },
  TochableStyle: {
    // backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  imgStyle: {
    height: 20,
    width: 20,
    tintColor: "white",
    marginRight: 10,
  },
  mainTabView: {
    flexDirection: "row",

    width: "100%",
    backgroundColor: COLORS.primary,
    justifyContent: "space-between",
  },
  SubView: {
    width: width / 3,
  },
  textStyle: {
    color: COLORS.white,
    fontWeight: "700",
  },
  userStyle: {
    height: 16,
    width: 14,
    // marginTop: 10,
    tintColor: "black",
  },
  calendar: {
    height: 25,
    width: 32,
    marginRight: 5,
  },
  horizontalLine: {
    borderWidth: 0.6,
    borderColor: COLORS.gray,
    // marginTop: 10,
    // marginBottom: 5,
    width: "100%",
    alignSelf: "center",
  },
  idTextInput: {
    padding: 0,
    alignSelf: "center",
    marginLeft: 15,

    fontSize: 18,
    color: COLORS.black,
    width: "60%",
  },
  idText: {
    fontSize: 18,
    color: COLORS.gray,
    fontWeight: "700",
  },
  DropMainView: {
    backgroundColor: "white",
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
  },
  DropView: {
    justifyContent: "center",
    padding: 20,
  },
  dropSubView: {
    flexDirection: "row",
    justifyContent: "center",
    //alignItems: "center",
    alignContent: "center",
  },
  Dropimg: {
    width: 25,
    height: 25,
    alignSelf: "center",
    marginTop: 20,
    marginLeft: 10,
  },
  AddstoreView: {
    // backgroundColor: COLORS.white,
    height: "100%",
    paddingBottom: 250,
  },
  idTextInput: {
    padding: 0,
    alignSelf: "center",
    //marginLeft: 15,
    //fontFamily: FontsFamily.Bold,
    fontSize: 18,
    color: COLORS.black,
    width: "60%",
  },
  idTextInputtw: {
    marginTop: 20,
    alignSelf: "center",
    fontSize: 18,
    color: COLORS.black,
    width: "60%",
  },
  mainsearchView: {
    flexDirection: "row",
    padding: 10,
    // backgroundColor: COLORS.primary,
  },
  textInputView: {
    width: "80%",
    height: 50,
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  SearchButton: {
    width: "20%",
    height: 50,
    justifyContent: "center",
    backgroundColor: COLORS.white,
    // padding:10
  },
  searchIcon: {
    width: 25,
    height: 25,
    alignSelf: "center",
    tintColor: COLORS.black,
  },
  placeHolderText: {
    marginLeft: 20,
  },
  scrollView: {
    paddingBottom: 1000,
  },
  buttonView: {
    justifyContent: "space-between",
    alignContent: "space-between",

    position: "absolute",
    bottom: 10,
  },
  TouchButton: {
    backgroundColor: COLORS.primary,
    width: 100,
    borderRadius: 10,
  },
  TextStyle: {
    padding: 10,
    fontWeight: "700",
    color: "white",
    fontSize: 16,
    alignSelf: "center",
  },
  TextView: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: COLORS.white,
    marginVertical: 10,
  },
  listText: {
    fontFamily: FontsFamily.Heavy,
    fontSize: 16,
    color: COLORS.black,
  },
  listTexttwo: {
    fontFamily: FontsFamily.ExtraBold,
    color: COLORS.black,
  },
  FltConteiner: {
    flexDirection: "row",
  },
  textView: {
    width: width / 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: "80%",
    height: "60%",
  },
  listView: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: COLORS.white,
    justifyContent: "space-between",
    borderRadius: 5,
  },
  maintable: {
    // flexDirection: "row",
    paddingVertical: 1.5,
    //justifyContent:"center",
  },
  imageView: {
    width: width / 3.5,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    //borderWidth: 0.3,
    // borderRadius: 5,
  },
  maincontainer: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  mainView: {
    // padding: 5,
    justifyContent: "center",
    alignSelf: "center",
    // marginTop: 15,
    marginBottom: 50,
    width: "100%",
  },
  maintable: {
    // flexDirection: "row",
    paddingVertical: 2,
    //justifyContent:"center",
  },
  tabletext: {
    fontFamily: FontsFamily.Heavy,
    color: COLORS.black,
    textAlign: "center",
  },
  ModalBackTouch: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    //   marginTop: 100,
    // height: height,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "white",

    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  ModalContainer: {
    flexDirection: "row",
    // paddingVertical: 5,
    backgroundColor: COLORS.white,
    marginVertical: 0,
  },
  container: {},
  map: {
    width: "50%",
    borderRadius: 10,
  },
  verifiedText: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: COLORS.white,
    //marginVertical: 10,
  },
  NoteText: {
    fontFamily: FontsFamily.Bold,
    color: COLORS.red,
    paddingVertical: 15,
    textAlign: "center",
  },
  crossView: {
    width: 30,
    height: 30,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    position: "absolute",
    top: 15,
    right: 10,
  },
  iconCross: {
    width: 25,
    height: 25,
  },
  mapView: {
    height: "30%",
    width: "95%",
  },
  imgModal: {
    width: "95%",
    height: 45,
    resizeMode: "contain",
    alignSelf: "center",
  },
  imgConteiner: {
    width: "30%",
    height: 50,
    alignSelf: "center",
    borderWidth: 0.3,
    justifyContent: "center",
    marginRight: 10,
    borderRadius: 5,
  },
  TextConteiner: {
    width: "60%",
    marginTop: 20,
  },
  imgtextView: {
    padding: 0,
    flexDirection: "row",
  },
  detailModl: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  submmitbutton: {
    color: COLORS.white,
    alignSelf: "center",
    padding: 10,
    fontWeight: "700",
  },
});
