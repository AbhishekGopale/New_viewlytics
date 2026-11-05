import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import DetailComponent from "../../components/DetailComponent/DetailComponent";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./ResetPasswordStyle";
import DetailTextInput from "../../components/DetailTextInput/DetailTextInput";
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom";
import { changePassword } from "../../redux/actions/changePasswordAction";
import { useDispatch, useSelector } from "react-redux";
import { DB } from "../../database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../colors/colors";
import ToastMessage from "../../components/ToastMessages/ToastMessages";

const ResetPassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const resetPassword = useSelector(
    (state) => state?.ChangePassword?.changePasswordStatus?.changePassword
  );
  const ErrorMsg = useSelector((state) => state?.ChangePassword?.error);

  const isLoading = useSelector((state) => state?.ChangePassword?.isLoading);
  const getToken = async () => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        setToken(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getToken();
  }, []);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassErr, setOldPassErr] = useState("");
  const [confirmPassErr, setConfirmPassErr] = useState("");
  const [newPassErr, setNewPassErr] = useState("");
  const [passwordMismatchError, setPasswordMismatchError] = useState("");

  const logout = async () => {
    await AsyncStorage.removeItem(DB.ISLOGIN);
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginRouter" }],
    });
  };

  const handleChangePassword = (
    oldPass,
    newPass,
    confirmPass,
    navigation,
    token
  ) => {
    let isOldPasswordValid = false;
    let isNewPasswordValid = false;
    let isConfirmPasswordValid = false;

    if (!oldPass) {
      isOldPasswordValid = false;
      setOldPassErr("Please enter password.");
    } else {
      isOldPasswordValid = true;
    }

    if (!newPass) {
      isNewPasswordValid = false;
      setNewPassErr("Please enter password.");
    } else {
      isNewPasswordValid = true;
    }

    if (!confirmPass) {
      isConfirmPasswordValid = false;
      setConfirmPassErr("Please enter password.");
    } else {
      isConfirmPasswordValid = true;
    }

    if (isOldPasswordValid && isNewPasswordValid && isConfirmPasswordValid) {
      dispatch(
        changePassword(oldPass, newPass, confirmPass, navigation, token)
      );
    }
    if (isNewPasswordValid && isConfirmPasswordValid) {
      if (newPass !== confirmPass) {
        setPasswordMismatchError(
          "New password and confirm password do not match."
        );
      } else {
        setPasswordMismatchError("");
        dispatch(
          changePassword(oldPass, newPass, confirmPass, navigation, token)
        );
      }
    }
  };

  return (
    <View style={styles.mainView}>
      {ErrorMsg == false ? (
        <ToastMessage msg={"sucess"} isVisible={ErrorMsg} isError={ErrorMsg} />
      ) : null}
      <Header
        iconStyle={styles.headerIcon}
        image={Images.back}
        header={"Reset Password"}
        onPress={() => navigation.goBack()}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "30%",
        }}
      >
        <Image
          source={Images.resetpassword}
          style={{ width: 150, height: 150, alignSelf: "center" }}
        />
      </View>
      <ScrollView style={[styles.mainView]} scrollEnabled={false}>
        <View style={styles.mTop} />
        <DetailTextInput
          onChangeText={(value) => setOldPassword(value)}
          title={"Old Password"}
        />
        <View>
          <DetailTextInput
            onChangeText={(value) => setNewPassword(value)}
            title={"New Password"}
          />
        </View>
        <DetailTextInput
          onChangeText={(value) => setConfirmPassword(value)}
          title={"Confirm Password"}
        />
        {passwordMismatchError ? (
          <Text style={styles.errorTexts}>{passwordMismatchError}</Text>
        ) : null}
      </ScrollView>

      <View style={styles.buttonView}>
        <TouchableOpacity
          disabled={
            oldPassword.length > 0 &&
            newPassword.length > 0 &&
            confirmPassword.length > 0
              ? false
              : true
          }
          onPress={() => {
            handleChangePassword(
              oldPassword,
              newPassword,
              confirmPassword,
              navigation,
              token
            );
          }}
          style={
            oldPassword.length > 0 &&
            newPassword.length > 0 &&
            confirmPassword.length > 0
              ? styles.button
              : styles.buttonGray
          }
        >
          <Text style={styles.buttonText}>Upadate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPassword;
