import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from "react-native";
import { FontsFamily } from "../../assets/fonts/fonts";
import { COLORS } from "../../colors/colors";

const windowWidth = Dimensions.get("window").width;

const ImageWithText = ({
  title,
  storeId,
  city,
  area,
  userName,
  lat,
  lon,
  imageUrl,
  onClose,
  date,
  time,
}) => {
  const now = new Date();
  const displayDate =
    date ||
    now.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  const displayTime =
    time ||
    now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const formattedLat =
    lat !== undefined && lat !== null && lat !== ""
      ? typeof lat === "number"
        ? lat.toFixed(4)
        : !isNaN(parseFloat(lat))
        ? parseFloat(lat).toFixed(4)
        : lat
      : "";
  const formattedLon =
    lon !== undefined && lon !== null && lon !== ""
      ? typeof lon === "number"
        ? lon.toFixed(4)
        : !isNaN(parseFloat(lon))
        ? parseFloat(lon).toFixed(4)
        : lon
      : "";
  const coordsText =
    formattedLat && formattedLon ? `${formattedLat}, ${formattedLon}` : "";

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="fade"
      onRequestClose={() => onClose(imageUrl)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Selfie Preview</Text>
          </View>

          {/* Photo Preview */}
          <View style={styles.photoContainer}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.photo}
              resizeMode="cover"
            />
          </View>

          {/* Info Details */}
          <View style={styles.infoSection}>
            <Text numberOfLines={1} style={styles.storeText}>
              Store: <Text style={styles.storeNameText}>{title || "Store"}</Text>
            </Text>
            <Text style={styles.timeText}>
              {displayDate} • {displayTime}
            </Text>
            {coordsText ? (
              <Text style={styles.coordsText}>GPS: {coordsText}</Text>
            ) : null}
          </View>

          {/* Single Action Button: Done */}
          <TouchableOpacity
            onPress={() => onClose(imageUrl)}
            style={styles.doneButton}
            activeOpacity={0.8}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: Math.min(windowWidth * 0.88, 340),
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    alignItems: "center",
    paddingBottom: 18,
  },
  header: {
    width: "100%",
    backgroundColor: "#0D3B75",
    paddingVertical: 14,
    alignItems: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  photoContainer: {
    width: 240,
    height: 240,
    borderRadius: 14,
    overflow: "hidden",
    marginTop: 16,
    backgroundColor: "#E2E8F0",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  infoSection: {
    width: "100%",
    paddingHorizontal: 24,
    marginTop: 14,
    alignItems: "center",
  },
  storeText: {
    color: "#475569",
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },
  storeNameText: {
    color: "#0F172A",
    fontWeight: "700",
  },
  timeText: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  coordsText: {
    color: "#64748B",
    fontSize: 11,
    marginTop: 3,
    textAlign: "center",
    fontFamily: FontsFamily.Regular,
  },
  doneButton: {
    backgroundColor: "#2E7D32",
    width: 220,
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    elevation: 2,
  },
  doneButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default ImageWithText;
