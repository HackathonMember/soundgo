import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";

const pin1Image = require("../../assets/pin1.png");
const pin2Image = require("../../assets/pin2.png");

import { logout } from "../api/user/logout";

const points = [
  {
    id: 1,
    title: "ポイント1",
    description: "説明1",
    latitude: 35.6609219,
    longitude: 139.6666027,
  },
  {
    id: 2,
    title: "ポイント2",
    description: "説明2",
    latitude: 35.6905,
    longitude: 139.6995,
  },
  // 追加のポイント
];

const MapScreen = ({ navigation }) => {
  const handleLogout = () => {
      Alert.alert("Logout Confirmation", "Are you sure you want to log out?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            await logout();
            navigation.navigate("Login");
          },
        },
      ]);
    };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 35.689456880143, // 中心の緯度
          longitude: 139.6917294692, // 中心の経度
          latitudeDelta: 0.0922, // ズームレベル
          longitudeDelta: 0.0421,
        }}
      >
        {points.map((point) => (
          <Marker
            key={point.id}
            coordinate={{
              latitude: point.latitude,
              longitude: point.longitude,
            }}
            title={point.title}
            description={point.description}
            >
              <Image
                source={point.id % 2 === 1 ? pin1Image : pin2Image}
                style={{ width: 30, height: 40 }} // サイズを指定
              />
            </Marker>
        ))}
      </MapView>

      {/* 左上のログアウトボタン */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <FontAwesome name="sign-out" size={24} color="white" />
      </TouchableOpacity>

      {/* 左下のプロフィールアイコン */}
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <FontAwesome name="user" size={40} color="white" />
      </TouchableOpacity>

      {/* 右下の録音アイコン */}
      <TouchableOpacity
        style={styles.recordButton}
        onPress={() => navigation.navigate("Record")}
      >
        <FontAwesome name="microphone" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  logoutButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  profileButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "#1e90ff",
    padding: 12,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  recordButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#ff6347",
    padding: 12,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
