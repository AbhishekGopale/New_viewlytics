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
          marginHorizontal: 5,
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
    marginRight: 10,
    fontWeight: "600",
    color: COLORS.black,
    fontFamily: FontsFamily.ExtraBold,
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
    padding: 0,
    // backgroundColor:"red"
  },
  menuview: {
    width: width,
    justifyContent: "center",
    alignContent: "center",
  },
  menutopView: {
    justifyContent: "center",
    alignItems: "center",
  },
  touchbutton: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 60,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    margin: 10,
  },
  imgView: {
    width: 60,
    height: 60,
    borderColor: COLORS.white,
    borderWidth: 1,
    borderRadius: 40,
    position: "absolute",
    top: -15,
    left: -15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  subimgView: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: "center",
  },
  notificationtextStyle: {
    alignSelf: "center",
    color: COLORS.white,
    //fontSize: 18,
    paddingTop: 80,
  },
  notificationView: {
    width: 28,
    height: 28,
    alignContent: "center",
    backgroundColor: COLORS.darkRed,
    borderRadius: 20,
    justifyContent: "center",
    position: "absolute",
    bottom: -8,
    right: -8,
  },
  notificationText: {
    alignSelf: "center",
    color: COLORS.white,
    fontWeight: "700",
  },
  FlatlistView: {
    justifyContent: "center",
    padding: Platform.OS === "ios" ? 10 : 6,
  },
  graphText: {
    fontWeight: "700",
    paddingLeft: 20,
    fontSize: 16,
    backgroundColor: "white",
    color: COLORS.black,
    alignSelf: "flex-end",
    backgroundColor: COLORS.white,
    color: COLORS.black,
    fontFamily: FontsFamily.ExtraBold,
    paddingVertical: 10,
  },
  GraphView: {
    backgroundColor: COLORS.white,
    right: 8,
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

  TouchStyle: {
    width: "100%",
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    padding: 10,
    borderRadius: 30,
  },
  textStyleone: {
    fontWeight: "700",
    fontSize: 15,
    // color: COLORS,
    alignSelf: "center",
  },
  maincontainer: {
    width: "100%",
    padding: 10,
  },
  mainContent: {
    flex: 1,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  loginBtn: {
    borderRadius: 5,
    padding: 10,
    // backgroundColor: APP_COLOR.YELLOW_COLOR,
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginLeft: 15,
  },
  loginTxt: {
    // color: APP_COLOR.WHITE_COLOR,
    fontSize: 13,
    fontWeight: "400",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "400",
    color: "red",
  },
  mainView: {
    // padding: 5,
    justifyContent: "center",
    alignSelf: "center",
    // marginTop: 15,
    marginBottom: 50,
    width: width,
  },

  box: {
    borderWidth: 0.5,
    marginTop: 25,
  },
  verticalLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#909090",
    backgroundColor: "black",
  },
  txt: {
    textAlign: "center",
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.black,
    width: "16%",
    paddingTop: 5,
    paddingBottom: 5,
    paddingTop: 15,
    paddingBottom: 15,
  },

  boxView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
  },
  verticalLines: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: "black",
  },
  img: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",

    width: 35,
    height: 35,
    tintColor: "black",
  },
  headerIcon: {
    width: 15,
    height: 20,
  },
  hedereTExtView: {
    backgroundColor: "#E4E4E4",
    justifyContent: "center",
    // alignItems: "center",
  },
  headertext: {
    padding: 5,

    paddingVertical: 20,
    color: COLORS.black,
    fontFamily: FontsFamily.Heavy,
    fontWeight: "700",
  },
  NoDataView: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    flex: 1,
  },
  noText: {
    alignSelf: "center",
    color: COLORS.black,
    fontSize: 18,
  },
});
