import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  ScrollView,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { styles } from "./SupportScreenStyle";
import { Images } from "../../assets/images/map";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { useDispatch, useSelector } from "react-redux";
import { SupportDetailsAction } from "../../redux/actions/supportDetailsAction";
import ToastMessage from "../../components/ToastMessages/ToastMessages";
import { COLORS } from "../../colors/colors";
import { ErrorAction } from "../../redux/actions/errorAction";
import ServerScreen from "../ServerScreen/ServerScreen";

const SupportScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState("");
  const [tokan, setToken] = useState("");
  const [setid, setEmpID] = useState("");

  const SupportMessageSuccess = useSelector(
    (state) => state?.SupportDetails?.SupportDetailsData.message
  );

  const closeModal = () => {
    setModalVisible(false);
  };
  const supportDetailsHandle = () => {
    dispatch(SupportDetailsAction(value, tokan, navigation));
  };

  const getToken = async () => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        setToken(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getUser = async () => {
    AsyncStorage.getItem(DB.USERID)
      .then((data) => {
        setEmpID(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser();
    getToken();
  }, []);
  const isErrorVisible = useSelector((state) => state?.errorReducer?.isError);
  const isErrorVisibleMsg = useSelector((state) => state?.errorReducer?.msg);
  useEffect(() => {
    console.log("isErrorInEffect", isErrorVisible);
  }, [isErrorVisible]);

  const closeModalss = () => {
    dispatch(ErrorAction(false, ""));
  };
  return (
    <View>
      {SupportMessageSuccess ? (
        <ToastMessage
          msg={SupportMessageSuccess}
          isVisible={SupportMessageSuccess}
          isError={SupportMessageSuccess}
        />
      ) : null}

      <Header
        header={"Support"}
        iconStyle={styles.headerIcon}
        image={Images.back}
        onPress={() => navigation.goBack()}
      />
      <ServerScreen
        title={isErrorVisibleMsg}
        modalVisible={isErrorVisible}
        closeModal={() => {
          closeModalss();
        }}
      />

      <View style={styles.maincontainer}>
        <View style={styles.mainView}>
          <View style={styles.imgView}>
            <Image source={Images.imgGroup} style={styles.groupimg} />
            <Image source={Images.Watsaap} style={styles.watssp} />
            <Image source={Images.support} style={styles.support} />
          </View>
        </View>
        <View style={[styles.emailView, { paddingTop: 50 }]}>
          <TouchableOpacity
            style={styles.gmailGroup}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <View style={styles.iconbackground}>
              <Image source={Images.gmail} style={styles.emailIcon} />
            </View>
            <Text style={styles.emailText}>Email </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.emailView}>
          <TouchableOpacity
            style={styles.TouchGroup}
            onPress={() => {
              Linking.openURL("whatsapp://send?text=hello&phone=7838217180");
            }}
          >
            <View style={styles.iconbackground}>
              <Image source={Images.whatsapp} style={styles.watsspicon} />
            </View>

            <Text style={styles.emailText}>Whatsapp</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.ModalBackTouch}
          onPress={() => {
            closeModal();
          }}
        >
          <View style={styles.ModalView}>
            <View style={styles.Modalheader}>
              <Text style={styles.modalText}>Update Your Query</Text>

              <TouchableOpacity
                disabled={value.length > 0 ? false : true}
                style={value.length > 0 ? styles.button : styles.grayButton}
                onPress={() => {
                  setModalVisible(false);
                  supportDetailsHandle();
                }}
              >
                <View style={styles.ArrowView}>
                  <Image source={Images.rightArr} style={styles.rightArrow} />
                </View>
              </TouchableOpacity>
            </View>
            <ScrollView>
              <TextInput
                multiline
                onChangeText={(value) => setValue(value)}
                placeholderTextColor={COLORS.gray}
                placeholder="Please Enter Your massage"
                style={styles.Textinput}
              />
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default SupportScreen;
