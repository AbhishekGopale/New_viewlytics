import React from "react";
import {
  View,
  Text,
  Image,
  Modal,
  Button,
  TouchableOpacity,
} from "react-native";
import { Images } from "../../assets/images/map";
import { COLORS } from "../../colors/colors";
import styles from "./ServerStyle";

const ServerScreen = ({
  title,
  // subtitle,
  // message,
  modalVisible,
  closeModal,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalConteiner}>
        <View style={styles.modalview}>
          <TouchableOpacity
            style={styles.crossButtonView}
            onPress={() => {
              closeModal();
            }}
          >
            <Image source={Images.cross} style={styles.crossimg} />
          </TouchableOpacity>
          <View style={styles.imgView}>
            <Image
              resizeMode="contain"
              source={Images.satelight}
              style={styles.imgStyle}
            />
            <Text style={[styles.textStyle, { color: "red" }]}>Ooops!</Text>
            <Text style={[styles.textStyletwo, { color: "red" }]}>
              Internal server error
            </Text>
            <Text style={styles.msgtextStyle}>
              We're sorry, but we're having trouble fulfilling
              {"\n"}
              your request at the moment
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ServerScreen;
