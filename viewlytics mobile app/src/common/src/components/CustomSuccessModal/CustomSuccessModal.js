// CustomModal.js

import React from "react";
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Images } from "../../assets/images/map";

const CustomSuccessModal = ({ visible, closeModal, type }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={Images.deletIcon} style={styles.image} />
          <Text style={styles.title}>Thank you!</Text>
          <Text style={styles.subTitle}>Payment Successfull</Text>

          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    color: "black",
    fontWeight: "400",
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    fontWeight: "bold",
    color: "black",
  },
  subTitle: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: "700",
    color: "black",
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#3498db",
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomSuccessModal;
