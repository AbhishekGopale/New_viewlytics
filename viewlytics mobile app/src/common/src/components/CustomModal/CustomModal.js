import { View, Text, Modal } from "react-native";
import React from "react";
import { styles } from "./CustomModalStyle";
const CustomModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity style={styles.ModalBackTouch} onPress={closeModal}>
          <View style={styles.modalView}>
            <View style={styles.logoBackground}>
              <Image source={Images.ido} style={styles.idoLogo} />
            </View>
            <View style={styles.subModalview}>
              <Text style={styles.textstyle}>Store ONE</Text>
              <Text style={styles.textstyle}>Check in {currentDate}</Text>
              <Text style={styles.textstyle}> Are you sure!!!</Text>
              <Text style={styles.textstyle}>Location {location}</Text>
            </View>

            <View style={styles.modalbuttonView}>
              <TouchableOpacity
                onPress={() => {
                  closeModal();
                }}
                style={[styles.modalTouchble, { borderLeftWidth: 0 }]}
              >
                <Text style={styles.textstyleone}>CANCLE</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalTouchble}
                onPress={() => {
                  navigation.navigate("CheckInScreen"), closeModal();
                }}
              >
                <Text style={styles.textstyleone}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CustomModal;
