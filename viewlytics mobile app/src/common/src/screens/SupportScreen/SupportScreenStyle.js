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
  QuiryIcon: {
    width: 25,
    height: 25,
  },
  maincontainer: {
    height: height,
    backgroundColor: COLORS.white,
    width: width,
  },
  mainView:
    height <= 700
      ? {
          backgroundColor: "white",
          height: height / 1.8,
          width: width,
          borderBottomRightRadius: 170,
          borderBottomLeftRadius: 170,
          alignSelf: "center",
        }
      : {
          backgroundColor: "white",
          height: Platform.OS === "ios" ? height / 2.2 : height / 2.1,
          width: width,
          borderBottomRightRadius: 170,
          borderBottomLeftRadius: 170,
          alignSelf: "center",
        },
  quiryView: {
    justifyContent: "center",
    alignContent: "center",
    padding: 50,
  },
  quiryTouch: {
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#f2f7fb",
    width: "70%",
    borderRadius: 30,
  },
  textStyle: {
    color: COLORS.primary,
    fontWeight: "700",
    alignSelf: "center",
    paddingLeft: 10,
    fontSize: 20,
  },
  emailView: {
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
  },
  emailIcon: {
    width: 30,
    height: 30,
    alignSelf: "center",
    backgroundColor: COLORS.white,
    marginLeft: 10,
  },
  emailText: {
    fontWeight: "700",
    fontSize: 20,
    color: COLORS.white,
    alignSelf: "center",
    marginLeft: 20,
    padding: 5,
    fontFamily: FontsFamily.Regular,
  },
  ModalView: {
    marginTop: 130,
    backgroundColor: "white",
    //borderRadius: 10,
    // height: "32%",

    width: "85%",
    alignSelf: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    fontWeight: "700",
    fontSize: 18,
    padding: 15,
    marginRight: 45,
    color: COLORS.black,
  },
  submmitText: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
  submmitButton: {
    width: "70%",
    backgroundColor: COLORS.primary,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 30,
  },
  imgView: {
    justifyContent: "center",
    alignItems: "center",
    padding: 180,
  },
  groupimg: {
    width: 180,
    height: 180,
    tintColor:"#F76553"
  },
  watssp: {
    width: 70,
    height: 70,
    position: "absolute",
    bottom: 125,
    right: 110,
  },
  rightArrow: {
    width: 15,
    height: 15,
    tintColor: COLORS.white,
    padding: 10,
  },
  TouchArrow: {
    width: 60,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  ArrowView: {
    backgroundColor: "#55CA62",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
  Modalheader: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "flex-end",
    backgroundColor: "#E9E9E9",
  },
  Textinput: {
    color: "black",
    width: "100%",
    alignSelf: "center",
    height: 200,
    alignItems: "center",
    fontSize: 20,
    padding: 20,
  },
  ModalBackTouch: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  watsspicon: {
    width: 30,
    height: 30,
    marginRight: 10,
    backgroundColor: COLORS.white,
  },
  TouchGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor:"#59CD65",
    borderWidth: 1,
    borderColor: "#59CD65",
    width: "75%",
  },
  gmailGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F76553",
    borderWidth: 1,
    borderColor: "#F76553",
    width: "75%",
  },
  support: {
    width: 55,
    height: 55,
    position: "absolute",

    tintColor: COLORS.white,
  },
  iconbackground: {
    backgroundColor: "white",
    padding: 15,
  },
  button: {

    justifyContent:"flex-end",
    alignItems:"center",
  alignSelf:'flex-end'
  },
  grayButton:{
  alignSelf:'flex-end'
  },
  buttonText: {
    fontFamily: FontsFamily.Bold,
    fontSize: 18,
    color: COLORS.white,
    textAlign: "center",
  },
});
