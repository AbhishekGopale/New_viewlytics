import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Images } from "../../assets/images/map";
import { styles } from "./AcceptRejectStyle";

const AcceptReject = ({ onApprove, onReject }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [reason, setReason] = useState("");

  const closeModal = () => {
    setModalVisible(false);
  };
  const handleReject = () => {
    if (reason.trim() === "") {
      alert("Please provide a reason for rejection.");
      return;
    }

    onReject(reason);
    closeModal();
  };
  return (
    <View>
      <View style={{ backgroundColor: "white", width: "100%" }}>
        <View style={styles.buttonMainView}>
          <TouchableOpacity style={styles.TouchButton} onPress={onApprove}>
            <Text style={styles.buttonText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.TouchButton, { backgroundColor: "#ff6242" }]}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={styles.buttonText}>Reject</Text>
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
        <TouchableOpacity style={styles.ModalBackTouch} onPress={closeModal}>
          <View style={styles.ModalView}>
            <View>
              <Text style={styles.HeaderText}>Reason For Leave Cancel</Text>
              <TextInput
                multiline
                style={styles.textinput}
                placeholder="Reason For Leave Cancel"
                value={reason}
                onChangeText={setReason}
              />
              <View style={styles.submitView}>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => {
                    handleReject();
                  }}
                >
                  <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default AcceptReject;
