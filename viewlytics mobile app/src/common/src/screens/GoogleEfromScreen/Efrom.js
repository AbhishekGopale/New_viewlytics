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
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { DB } from "../../database";
import { styles } from "./EfromStyle";

import WebView from "react-native-webview";
import { COLORS } from "../../colors/colors";
const EFrom = ({ route }) => {
  const navigation = useNavigation();

  //   const [token, setToken] = useState("");
  const { selectedItem } = route.params;
  console.log(selectedItem, "selectedItem-------");
  //   const getToken = async () => {
  //     AsyncStorage.getItem(DB.TOKEN)
  //       .then((data) => {
  //         setToken(data);
  //         dispatch(GoogleEFormAction(data));
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   };

  //   useEffect(() => {
  //     getToken();
  //   }, []);

  //   const GoogleFormData = useSelector((state) => state?.GoogleEForm?.allform);

  //   let googleFormLink = `${GoogleFormData}/edit`;

  //   console.log(GoogleFormData, "GoogleFormData===", googleFormLink);

  return (
    <View style={styles.container}>
      <View>
        <Header
          header={"Google Form"}
          iconStyle={styles.headerIcon}
          image={Images.back}
          onPress={() => navigation.goBack()}
        />
        <View>
          <WebView
            // source={{
            //   uri: "https://docs.google.com/forms/d/e/1FAIpQLSe9bqvjexnPNip6OpeicTWnIAncm2ifUCfU8-QWaiUhW5m0IA/viewform?usp=sf_link",
            // }}
            //   source={{ uri: GoogleFormData }}
            source={{ uri: selectedItem?.url }}
            style={styles.Webview}
            scalesPageToFit={true}
          />
        </View>
      </View>
    </View>
  );
};

export default EFrom;
