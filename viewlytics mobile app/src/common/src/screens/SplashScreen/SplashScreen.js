import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Images } from "../../assets/images/map";
import { styles } from "./SplashScreenStyle";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("LoginScreen");
    }, 2500);
  }, []);
  return (
    <View style={styles.MainContainer}>
      <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
          <Image
            resizeMode="contain"
            source={Images.splashScreen}
            style={styles.image}
          />
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;
