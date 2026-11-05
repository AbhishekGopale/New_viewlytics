import {
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { styles } from "./AuthViewComponentStyle";
import { Images } from "../../assets/images/map";

const AuthViewComponent = ({ children }) => {
  return (
    <View style={styles.mainView}>
      {Platform.OS == "android" ? (
        <>
          <View style={styles.subView}>
            <Image
              style={styles.logo}
              source={Images.logo}
              resizeMode="contain"
            />
          </View>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </>
      ) : (
        <KeyboardAvoidingView
          {...(Platform.OS === "ios"
            ? {
                behavior: "position",
                keyboardVerticalOffset: [50],
              }
            : {})}
        >
          <View
            style={[
              styles.subView,
              {
                // marginTop: 50,
              },
            ]}
          >
            <Image style={styles.logo} source={Images.logo} />
          </View>
          {children}
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

export default AuthViewComponent;
