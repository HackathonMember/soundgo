import React from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";

const points = [
  {
    id: 1,
    title: "ポイント1",
    description: "説明1",
    latitude: 37.78825,
    longitude: -122.4324,
  },
  {
    id: 2,
    title: "ポイント2",
    description: "説明2",
    latitude: 37.75825,
    longitude: -122.4624,
  },
  // 追加のポイント
];

const MapScreen = ({ navigation }) => {
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
          />
        ))}
      </MapView>

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
