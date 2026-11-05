import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Header from "../../components/Header/Header";
import { styles } from "./ApproveAttendanceScreenStyle";
import { Images } from "../../assets/images/map";
import { useNavigation } from "@react-navigation/native";
import TotalAttedance from "../../components/Tl/TotalAttedance";
import Present from "../../components/Tl/PresentPromoter";
import Weekoff from "../../components/Tl/WeekOff";
import Absent from "../../components/Tl/Absent";
import PramoterLeave from "../../components/Tl/PramoterLeave";
const ApproveAttendanceScreen = ({ route }) => {
  const navigation = useNavigation();
  const [selectedButton, setSelectedButton] = useState(0);

  const handleButtonPress = (index) => {
    setSelectedButton(index);
  };
  return (
    <View>
      <Header
        header={"Attedance"}
        iconStyle={styles.headerIcon}
        image={Images.back}
        onPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 0 ? styles.activeButton : null,
            ]}
            onPress={() => handleButtonPress(0)}
          >
            <View style={styles.containerOne}>
              <View>
                <Image style={styles.iconstyle} source={Images.total} />
                <Text style={styles.numbertext}>Total</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 1 ? styles.activeButton : null,
            ]}
            onPress={() => handleButtonPress(1)}
          >
            <View style={styles.containerOne}>
              <View>
                <Image style={styles.iconstyle} source={Images.present} />
                <Text style={styles.numbertext}>Present</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 2 ? styles.activeButton : null,
            ]}
            onPress={() => handleButtonPress(2)}
          >
            <View style={styles.containerOne}>
              <View>
                <Image style={styles.iconstyle} source={Images.weekoff} />
                <Text style={styles.numbertext}>Week Off</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 3 ? styles.activeButton : null,
            ]}
            onPress={() => handleButtonPress(3)}
          >
            <View style={styles.containerOne}>
              <View>
                <Image style={styles.iconstyle} source={Images.leave} />
                <Text style={styles.numbertext}>Leave</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 4 ? styles.activeButton : null,
            ]}
            onPress={() => handleButtonPress(4)}
          >
            <View style={styles.containerOne}>
              <View>
                <Image style={styles.iconstyle} source={Images.absence} />
                <Text style={styles.numbertext}>Absent</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentContainer}>
        {selectedButton === 0 && <TotalAttedance />}
        {selectedButton === 1 && <Present />}
        {selectedButton === 2 && <Weekoff />}
        {selectedButton === 3 && <PramoterLeave />}
        {selectedButton === 4 && <Absent />}
      </View>
    </View>
  );
};

export default ApproveAttendanceScreen;
