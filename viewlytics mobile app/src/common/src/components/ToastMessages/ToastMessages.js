import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import Toast from "react-native-toast-message";

const ToastMessage = (props) => {
  const isVisible = props.isVisible;
  const msg = props.msg;
  useEffect(() => {
    isVisible
      ? Toast.show({
          type: props.isError ? "error" : "success",
          position: "top",
          text1: msg,
          visibilityTime: 2000,
          autoHide: true,
          onShow: () => {},
          onHide: () => {},
        })
      : null;
  }, [isVisible]);

  return (
    <SafeAreaView
      style={{
        zIndex: 9999,
      }}
    >
      <Toast
        ref={(ref) => {
          Toast.setRef(ref);
        }}
      />
    </SafeAreaView>
  );
};

export default ToastMessage;
