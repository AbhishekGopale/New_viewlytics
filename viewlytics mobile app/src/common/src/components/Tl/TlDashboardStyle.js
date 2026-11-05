import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../colors/colors";
import { FontsFamily } from "../../assets/fonts/fonts";

const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  navView: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
  },
  ButtonView: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  SummaryView:
    height <= 700
      ? {
          flexDirection: "row",
          justifyContent: "space-between",
          width: width,
          paddingVertical: 5,
          backgroundColor: "#E4E4E4",
        }
      : {
          flexDirection: "row",
          justifyContent: "space-between",
          width: width,
          paddingVertical: 10,
          backgroundColor: "#E4E4E4",
        },
  numberContainer:
    height <= 700
      ? {
          width: 30,
          height: 30,
          backgroundColor: COLORS.primary,
          borderRadius: 25,
          justifyContent: "center",

          alignSelf: "center",
          shadowColor: "#000",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }
      : {
          width: 45,
          height: 45,
          backgroundColor: COLORS.primary,
          borderRadius: 25,
          justifyContent: "center",

          alignSelf: "center",
          shadowColor: "#000",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        },
  number:
    height <= 700
      ? {
          color: COLORS.white,
          fontSize: 10,
          alignSelf: "center",
          fontWeight: "700",
        }
      : {
          color: COLORS.white,
          fontSize: 15,
          alignSelf: "center",
          fontWeight: "700",
        },
  textStyle: {
    fontSize: 15,
    alignSelf: "center",
    marginRight: 20,
    color: COLORS.black,
    fontWeight: "600",
    fontFamily: FontsFamily.ExtraBold,
    marginLeft: 5,
  },

  roundView: {
    width: 80,
    height: 80,
    borderRadius: 50,
    opacity: 0.04,
    borderWidth: 8,
    borderColor: COLORS.primary,
    justifyContent: "center",
  },
  roundViewone: {
    width: 70,
    height: 70,
    borderRadius: 50,
    opacity: 0.1,
    borderWidth: 10,
    borderColor: "black",
    alignSelf: "center",
  },
  ImgGroup: {
    width: 60,
    height: 60,
  },
  imgTextContainer: {
    flexDirection: "row",
    padding: 10,
  },
  textView: {
    justifyContent: "center",
  },
  timeText: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.black,
  },
  fonttext: {
    fontSize: 12,
    color: COLORS.lightGray,
  },
  GroupMainView: {
    flexDirection: "row",
    justifyContent: "center",
    // padding: 0,
  },

  FlatlistView: {
    justifyContent: "center",
    padding: 5,
    // height:"100%"
  },
  graphText: {
    fontWeight: "700",
    paddingRight: 10,
    fontSize: 16,
    // justifyContent:"flex-end",
    alignSelf: "flex-end",
    backgroundColor: COLORS.white,
    color: COLORS.black,
    fontFamily: FontsFamily.ExtraBold,
  },
  GraphView: {
    backgroundColor: COLORS.white,
    right: height <= 700 ? 12 : 8,
  },
  GraphMainView: {
    backgroundColor: COLORS.white,
    paddingBottom: 150,
  },
  loader: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: "50%",
  },

  AttandncebuutonView: {
    transform: [{ rotate: "90deg" }],
    // padding:5
  },
  AttButtonStyle: {
    backgroundColor: COLORS.gray,
    position: "absolute",
    bottom: 155,
  },
  AttendanceText: {
    padding: 10,
    fontWeight: "700",
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "600",
    fontFamily: FontsFamily.ExtraBold,
  },

  ModalView:
    height <= 700
      ? {
          marginTop: height / 3.5,
          marginLeft: 290,
          backgroundColor: COLORS.white,
          borderRadius: 10,
          height: height / 1.75,
          alignSelf: "center",
          width: width / 4,
        }
      : {
          marginTop: Platform.OS === "ios" ? height / 4 : height / 4.5,
          marginLeft: 290,
          backgroundColor: COLORS.white,
          borderRadius: 10,
          // height: Platform.OS === "ios" ? height / 2.2 : height / 2,
          alignSelf: "center",
          width: width / 4,
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
  },
  groupimg: {
    width: 160,
    height: 160,
  },
  watssp: {
    width: 90,
    height: 90,
    position: "absolute",
    bottom: -40,
    right: 100,
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
    backgroundColor: COLORS.primary,
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
  flatview: {
    // backgroundColor: "#AF6B58",
    borderRadius: 10,

    // height:"100%"
  },
  numtext: {
    fontSize: 20,
    alignSelf: "center",
    color: COLORS.black,
    marginLeft: 5,
  },
  tittletext: {
    fontWeight: "700",
    color: COLORS.black,
    marginTop: 5,
  },
  imgtextView: {
    flexDirection: "row",
  },
  touchbutton: {
    padding: 5,
  },
  arrow: {
    width: 30,
    height: 30,
    alignSelf: "center",
    tintColor: "white",
  },
  arrowbuttonView: {
    width: "100%",
    backgroundColor: COLORS.gray,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  attendancebuttonView: {
    backgroundColor: "black",
    position: "absolute",
    top: 25,
    right: 76,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "-90deg" }],
  },
  attText: {
    padding: 5,
    alignSelf: "center",
    color: "white",
    fontWeight: "500",
  },
  HeaderTextView: {
    width: 15,
    height: 15,
    borderRadius: 20,
    backgroundColor: "#FF6464",
  },
  textConteiner: {
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
  crossIcn: {
    width: "100%",
    height: 40,
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  crossIcon: {
    width: 30,
    height: 30,
    alignSelf: "flex-end",
    marginRight: 5,
  },
});
