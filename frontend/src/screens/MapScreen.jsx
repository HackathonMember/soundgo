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
import { useSelector } from "react-redux";
import { Audio } from "expo-av";

const pin1Image = require("../../assets/pin1.png");
const pin2Image = require("../../assets/pin2.png");

const testPoints = [
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
];

const MapScreen = ({ navigation }) => {
  const points = useSelector((state) => state.point.points);

  const handleLogout = () => {
    Alert.alert("Logout Confirmation", "ログアウトしますか？", [
      {
        text: "キャンセル",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => navigation.navigate("Login"),
      },
    ]);
  };

  // 録音ファイルを再生
  const playSound = async (recordedURI) => {
    if (recordedURI) {
      try {
        console.log("再生を開始します");
        const { sound } = await Audio.Sound.createAsync(
          { uri: recordedURI },
          { shouldPlay: true }
        );
        sound.playAsync(); // 再生を開始
      } catch (error) {
        console.error("再生エラー:", error);
        Alert.alert("再生エラー", error.message);
      }
    } else {
      Alert.alert("エラー", "再生する録音ファイルが存在しません。");
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.785834,
          longitude: -122.406417,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {testPoints.map((point) => (
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
              style={{ width: 30, height: 40 }}
            />
          </Marker>
        ))}
        {points.map((point) => (
          <Marker
            key={point.recordedURI}
            coordinate={{
              latitude: point.latitude,
              longitude: point.longitude,
            }}
            title={point.title}
            description={"追加されました"}
            onPress={() => playSound(point.recordedURI)} // クリック時に音声を再生
          >
            <Image source={pin2Image} style={{ width: 30, height: 40 }} />
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <FontAwesome name="sign-out" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <FontAwesome name="user" size={40} color="white" />
      </TouchableOpacity>

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
