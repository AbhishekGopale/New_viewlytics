import React, { forwardRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontsFamily } from "../../assets/fonts/fonts";
import { Images } from "../../assets/images/map";

const windowWidth = Dimensions.get("window").width;
const cardWidth = Math.min(windowWidth * 0.94, 390);

const VisitProofCard = forwardRef(
  (
    {
      storeTitle = "Store",
      storeCode = "",
      state = "",
      city = "",
      area = "",
      firstName = "",
      lastName = "",
      username = "",
      promoterName = "",
      coordsText = "",
      imageUrl = null,
      date = "",
      time = "",
      onPhotoPress = null,
      isCheckOut = false,
      checkInTime = "",
      checkOutTime = "",
    },
    ref
  ) => {
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

    const storeIdText = storeCode ? `(${storeCode})` : "";

    // Build location string: Town/Area, City, State with deduplication
    const rawParts = [area, city, state].filter(Boolean);
    const seenLoc = new Set();
    const locationParts = [];
    for (const part of rawParts) {
      const trimmed = String(part).trim();
      const lower = trimmed.toLowerCase();
      if (trimmed && !seenLoc.has(lower)) {
        seenLoc.add(lower);
        const formatted =
          trimmed === trimmed.toLowerCase()
            ? trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
            : trimmed;
        locationParts.push(formatted);
      }
    }
    const locationText =
      locationParts.length > 0
        ? locationParts.join(", ")
        : city || area || state || storeTitle || "Store Location";

    // Build user text: First Name, Last Name, and Username
    const fullName = `${firstName} ${lastName}`.trim();
    const userDisplayText = fullName
      ? username
        ? `${fullName} (${username})`
        : fullName
      : promoterName || username || "Promoter";

    return (
      <View style={styles.card} ref={ref} collapsable={false}>
        {/* 1. Header Banner */}
        <View style={styles.headerBanner}>
          <View>
            <Text style={styles.headerBrand}>Viewlytics</Text>
            <Text style={styles.headerSub}>Route • {displayDate}</Text>
          </View>
          <View style={styles.statusPill}>
            <View
              style={[
                styles.greenDot,
                isCheckOut && { backgroundColor: "#0284C7" },
              ]}
            />
            <Text
              style={[
                styles.statusPillText,
                isCheckOut && { color: "#0369A1" },
              ]}
            >
              {isCheckOut ? "Visit Completed" : "Visit in progress"}
            </Text>
          </View>
        </View>

        {/* 2. Store Info Row */}
        <View style={styles.storeRow}>
          <View style={styles.storeIconBox}>
            <Image
              source={Images.storeIcon}
              style={styles.storeIcon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.storeTextBox}>
            <Text numberOfLines={1} style={styles.storeName}>
              {storeTitle} {storeIdText}
            </Text>
            <View style={styles.storeStatusRow}>
              <View
                style={[
                  styles.smallGreenDot,
                  isCheckOut && { backgroundColor: "#0284C7" },
                ]}
              />
              <Text
                style={[
                  styles.storeStatusText,
                  isCheckOut && { color: "#0284C7" },
                ]}
              >
                {isCheckOut ? "Store Checked Out" : "Store Open"}
              </Text>
            </View>
          </View>
        </View>

        {/* 3. Photo Container - Primary Visual Focus */}
        <TouchableOpacity
          activeOpacity={onPhotoPress ? 0.8 : 1}
          onPress={onPhotoPress ? onPhotoPress : undefined}
          disabled={!onPhotoPress}
          style={styles.photoContainer}
        >
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={styles.photo}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.photo, styles.placeholderPhoto]}>
              <Image
                source={Images.capchar}
                style={{
                  width: 44,
                  height: 44,
                  tintColor: "#94A3B8",
                  marginBottom: 6,
                }}
                resizeMode="contain"
              />
              <Text style={styles.placeholderText}>
                {isCheckOut
                  ? "Tap to Capture Checkout Photo"
                  : "Tap to Capture Store Photo"}
              </Text>
            </View>
          )}
          <View style={styles.photoPill}>
            <Text style={styles.photoPillText}>
              {imageUrl
                ? isCheckOut
                  ? "Checkout Photo"
                  : "Store Photo"
                : "Photo Required"}
            </Text>
          </View>
        </TouchableOpacity>

        {/* 4. Shift / Check-In Timeline */}
        <View style={styles.timelineCard}>
          <View style={styles.timelineCol}>
            <Text style={styles.checkInLabel}>CHECK-IN</Text>
            <Text style={styles.checkInTime}>
              {checkInTime || displayTime}
            </Text>
            <Text style={styles.checkInDate}>{displayDate}</Text>
          </View>

          <View
            style={[
              styles.inStorePill,
              isCheckOut && { backgroundColor: "#10B981" },
            ]}
          >
            <Text style={styles.inStoreText}>
              {isCheckOut ? "Completed" : "In store"}
            </Text>
          </View>

          <View style={[styles.timelineCol, { alignItems: "flex-end" }]}>
            <Text
              style={[
                styles.checkOutLabel,
                isCheckOut && { color: "#0284C7" },
              ]}
            >
              CHECK-OUT
            </Text>
            <Text
              style={[
                styles.checkOutTime,
                isCheckOut && { color: "#0F172A" },
              ]}
            >
              {isCheckOut ? checkOutTime || displayTime : "-- : --"}
            </Text>
            <Text
              style={[
                styles.checkOutStatus,
                isCheckOut && { color: "#059669", fontStyle: "normal" },
              ]}
            >
              {isCheckOut ? displayDate : "Awaiting checkout"}
            </Text>
          </View>
        </View>

        {/* 5. Location & User Info Section */}
        <View style={styles.metaSection}>
          {/* Location row with Town/Area, City, State and GPS coords */}
          <View style={styles.metaRow}>
            <View style={styles.metaLeft}>
              <Image
                source={Images.location}
                style={styles.metaIcon}
                resizeMode="contain"
              />
              <Text numberOfLines={1} style={styles.metaText}>
                {locationText}
              </Text>
            </View>
            {coordsText ? (
              <Text style={styles.coordsText}>{coordsText}</Text>
            ) : null}
          </View>

          {/* User row with First Name, Last Name, and Username */}
          <View style={[styles.metaRow, { marginTop: 8 }]}>
            <View style={styles.metaLeft}>
              <Image
                source={Images.usericon}
                style={styles.metaIcon}
                resizeMode="contain"
              />
              <Text numberOfLines={1} style={styles.promoterText}>
                {userDisplayText}
              </Text>
            </View>
          </View>
        </View>

        {/* 6. Footer Tagline */}
        <View style={styles.cardFooter}>
          <Text style={styles.footerText}>GPS-verified • auto-generated</Text>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  headerBanner: {
    backgroundColor: "#1E5AA8",
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerBrand: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  headerSub: {
    color: "#BFDBFE",
    fontSize: 12,
    marginTop: 2,
    fontWeight: "500",
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
    marginRight: 6,
  },
  statusPillText: {
    color: "#065F46",
    fontSize: 12,
    fontWeight: "700",
  },
  storeRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F8FAFC",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  storeIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  storeIcon: {
    width: 22,
    height: 22,
    tintColor: "#1E5AA8",
  },
  storeTextBox: {
    flex: 1,
  },
  storeName: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "800",
  },
  storeStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  smallGreenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10B981",
    marginRight: 5,
  },
  storeStatusText: {
    color: "#059669",
    fontSize: 12,
    fontWeight: "600",
  },
  photoContainer: {
    position: "relative",
    width: "100%",
    height: 280,
    backgroundColor: "#1E293B",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  placeholderPhoto: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#334155",
  },
  placeholderText: {
    color: "#94A3B8",
    fontSize: 14,
  },
  photoPill: {
    position: "absolute",
    bottom: 12,
    left: 12,
    backgroundColor: "rgba(15, 23, 42, 0.75)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  photoPillText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  timelineCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#F1F5F9",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  timelineCol: {
    flex: 1,
  },
  checkInLabel: {
    color: "#059669",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  checkInTime: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "800",
    marginTop: 2,
  },
  checkInDate: {
    color: "#64748B",
    fontSize: 10,
    marginTop: 1,
  },
  inStorePill: {
    backgroundColor: "#F59E0B",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    marginHorizontal: 4,
  },
  inStoreText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  checkOutLabel: {
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  checkOutTime: {
    color: "#94A3B8",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 2,
  },
  checkOutStatus: {
    color: "#94A3B8",
    fontSize: 10,
    fontStyle: "italic",
    marginTop: 1,
  },
  metaSection: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  metaIcon: {
    width: 15,
    height: 15,
    marginRight: 8,
    tintColor: "#64748B",
  },
  metaText: {
    color: "#1E293B",
    fontSize: 12,
    fontWeight: "700",
    flex: 1,
  },
  coordsText: {
    color: "#64748B",
    fontSize: 11,
    fontFamily: FontsFamily.Regular,
    marginLeft: 8,
  },
  promoterText: {
    color: "#0F172A",
    fontSize: 13,
    fontWeight: "700",
    flex: 1,
  },
  cardFooter: {
    backgroundColor: "#F8FAFC",
    paddingVertical: 8,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  footerText: {
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});

export default VisitProofCard;
