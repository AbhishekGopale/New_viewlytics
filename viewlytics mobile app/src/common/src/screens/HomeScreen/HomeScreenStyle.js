import { StyleSheet, Dimensions, Platform } from "react-native";
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

  StartTouch: {
    width: width / 2,
    alignItems: "center",
    height: 42,
  },
  SummaryToch: {
    width: width / 2,
    alignItems: "center",
    height: 42,
  },
  subHeaderText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 15,
    padding: 12,
  },
  barStyle: {
    width: width / 2,
    borderWidth: 2,
    borderColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  emptyBarStyle: {
    width: width / 2,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  SelectButtonView: {
    backgroundColor: COLORS.primary,
  },
  // Summary Css
  SummaryView:
    height <= 700
      ? {
          flexDirection: "row",
          justifyContent: "space-between",
          width: width,
          padding: 5,
          backgroundColor: "#E4E4E4",
        }
      : {
          flexDirection: "row",
          justifyContent: "space-between",
          width: width,
          padding: 10,
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
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,
        }
      : {
          width: 45,
          height: 45,
          backgroundColor: COLORS.primary,
          borderRadius: 25,
          justifyContent: "center",

          alignSelf: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,
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
    marginRight: 2,
  },
  linechart: {},
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
    width: 110,
    height: 110,
  },
  imgTextContainer: {
    padding: 8,
  },
  textView: {
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    fontSize: 15,
    //  fontWeight: "700",
    color: COLORS.black,
  },
  fonttext: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: "700",
    //  fontFamily:FontsFamily.Heavy
  },
  GroupMainView: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
    alignSelf: "center",
    width: "100%",
  },

  menutopView:
    height <= 700
      ? {
          justifyContent: "center",
          alignItems: "center",
          padding: 0,
          //width: "100%",
        }
      : {
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 30,
          // width: "100%",
          padding: 5,
        },
  touchbutton: {
    // borderTopRightRadius: 60,
    // borderBottomRightRadius: 10,
    // borderBottomLeftRadius: 10,
  },
  imgView: {
    width: 80,
    height: 80,
  },

  notificationtextStyle: {
    alignSelf: "center",
    color: COLORS.black,
    fontSize: 12,
    // paddingTop: 80,
  },
  notificationView: {
    width: 30,
    height: 30,
    alignContent: "center",
    backgroundColor: COLORS.darkRed,
    borderRadius: 20,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: 10,
  },
  notificationText: {
    alignSelf: "center",
    color: COLORS.white,
    fontWeight: "700",
  },
  FlatlistView: {
    justifyContent: "center",
    paddingVertical: 5,
    alignItems: "center",
    alignSelf: "center",
  },
  graphText: {
    fontWeight: "700",
    paddingLeft: 20,
    fontSize: 16,
    backgroundColor: "white",
    color: COLORS.black,
  },
  GraphView: {
    backgroundColor: COLORS.white,
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
  onText: {
    fontFamily: FontsFamily.ExtraBold,
    alignSelf: "center",
    fontSize: 15,
    color: COLORS.primary,
    bottom: 1,
  },
  modalView:
    height <= 700
      ? {
          marginTop: 200,
          //  height: "45%",
          width: "95%",
          alignSelf: "center",
          backgroundColor: "white",
          borderRadius: 20,
          padding: 35,
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
        }
      : {
          marginTop: Platform.OS === "ios" ? height / 2.6 : 200,
          //  height: "30%",

          width: "92%",
          alignSelf: "center",
          backgroundColor: "white",
          borderRadius: 20,
          padding: 35,
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
  ModalBackTouch: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  subModalview: {
    justifyContent: "space-evenly",
    //marginTop:40,
  },
  textstyle: {
    fontWeight: "600",
    alignSelf: "center",
    padding: 5,
    color: COLORS.black,
    fontFamily: FontsFamily.Bold,
    textAlign: "center",
  },
  nametext: {
    fontWeight: "600",
    alignSelf: "center",
    padding: 5,
    color: COLORS.black,
    fontFamily: FontsFamily.Heavy,
  },
  textstyleone: {
    fontWeight: "600",
    alignSelf: "center",
    padding: 5,
    color: COLORS.black,
    //fontFamily: FontsFamily.Bold,
  },
  modalbuttonView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalTouchble: {
    width: "50%",
    alignItems: "center",
    // padding: 9,
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },
  idoLogo: {
    width: 50,
    height: 50,
    alignSelf: "center",
    // marginTop: 10,
    marginBottom: 10,
  },
  logoBackground: {
    height: 100,
    width: 100,
    justifyContent: "center",
    borderRadius: 60,
    position: "absolute",
    top: -45,
    backgroundColor: "white",
    padding: 0,
  },
  text: {
    fontSize: 15,
    marginTop: 0,
    fontWeight: "700",
    color: "black",
    fontFamily: FontsFamily.ExtraBold,
    textAlign: "center",
  },
  imgs: {
    width: 100,
    height: 100,
  },
  DashbordView: {
    width: width / 3.5,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  NoteText: {
    color: "red",
    paddingVertical: 5,
    marginLeft: 4,
  },
  checkBox: {
    flexDirection: "row",
  },
  buttonSelected: {
    backgroundColor: "#50C878",
  },
  SelectButtonsss: {
    width: 40,
    height: 30,
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
