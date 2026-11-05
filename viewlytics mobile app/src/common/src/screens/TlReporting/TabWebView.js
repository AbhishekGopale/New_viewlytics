import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import { useNavigation } from "@react-navigation/native";
const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");
import { styles } from "./TabWebViewStyle";
import WebView from "react-native-webview";
const TabWebView = ({ route }) => {
  const navigation = useNavigation();
  const { selectedItem } = route.params;
  console.log(selectedItem, "selectedItem-------");

  return (
    <View style={styles.container}>
      <View>
        <Header
          header={selectedItem?.table_name}
          iconStyle={styles.headerIcon}
          image={Images.back}
          onPress={() => navigation.goBack()}
        />
        <View>
          <WebView
            // source={{
            //   uri: "https://viewlytics.in/form/df3cae67-45dc-4299-b664-eb9a80b87db5",
            // }}
            source={{ uri: selectedItem?.link }}
            style={styles.Webview}
            scalesPageToFit={true}
          />
        </View>
      </View>
    </View>
  );
};

export default TabWebView;
