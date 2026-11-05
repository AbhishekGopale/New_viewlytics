import { StyleSheet, Platform, Dimensions } from "react-native";
import { COLORS } from "../../colors/colors";
const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  ysenobutton: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 10,
    width: 200,
    alignSelf: "center",
  },
  YesnoText: {
    color: COLORS.white,
    fontSize: 10,
  },
  answer: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonyes: {
    padding: 10,
    // borderWidth: 0.5,
    marginVertical: 5,
    //marginHorizontal: 10,
    backgroundColor: COLORS.primary,
    minWidth: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  button: {
    padding: 4,
    // borderWidth: 0.5,
    marginVertical: 5,
    backgroundColor: COLORS.primary,
    marginHorizontal: 10,
    borderRadius: 5,

    minWidth: 100,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  modalView:
    height <= 700
      ? {
          marginTop: 200,
          height: "45%",
          width: "90%",
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
          marginTop: 100,
          width: "90%",
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
  textinput: {
    width: "80%",
    height: 50,
    color: "black",
    width: "100%",
    alignSelf: "center",
    height: 80,
    alignItems: "center",
    fontSize: 14,
    color: COLORS.black,
    padding: 5,
    backgroundColor: COLORS.white,
  },
  submmitbutton: {
    color: COLORS.white,
    alignSelf: "center",
    //  justifyContent: "center",
    padding: 10,
    fontWeight: "700",
  },
  TouchSubmmit: {
    // borderWidth: 1,
    width: 100,
    // height:30,
    //alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    //position: "absolute",
    // left: 60,
    //top: 5,
    alignSelf: "flex-end",
    margin: 2,
    marginTop: 20,
  },
  textbutton: {
    color: COLORS.white,
    fontWeight: "700",
  },
  modalImage: {
    height: 100,
    width: 100,
  },
  capcharbutton: {
    width: 100,
    height: 100,
    // backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    //marginBottom: 0,
    //position:"absolute",
    //top:0,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
  },
  buttonView: {
    padding: 0,
  },
  Modalimages: {
    width: 100,
    height: 100,
  },
  fildvisittext: {
    fontWeight: "700",
    color: COLORS.black,
    alignSelf: "flex-start",
    //padding:20
  },
  Profileimg: {
    width: 20,
    height: 20,
    marginTop: 2,
  },
  lastTextinput: {
    width: "100%",
    color: "black",

    alignSelf: "center",

    alignItems: "center",
    fontSize: 14,
    padding: 5,
    backgroundColor: COLORS.white,
  },
  textinputview:
    height <= 700
      ? {
          borderWidth: 1,
          width: "80%",
          marginLeft: 10,
          borderRadius: 2,
          borderColor: COLORS.gray,
        }
      : {
          borderWidth: 1,
          width: "95%",
          marginLeft: 10,
          borderRadius: 2,
          borderColor: COLORS.gray,
        },
  textimgView: {
    flexDirection: "row",
    alignSelf: "flex-start",
    paddingTop: 20,
  },
  modal: {
    marginTop: 100,
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
  },
  textinputviewone: {
    borderWidth: 1,
    width: "95%",
    borderRadius: 2,
    borderColor: COLORS.gray,
  },
  ModalBackTouch: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  textModal: {
    alignSelf: "flex-start",
    fontSize: 15,
    fontWeight: "700",
    color: "back",
  },
  mainviewtwo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
