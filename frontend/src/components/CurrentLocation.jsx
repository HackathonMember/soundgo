import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import fetchYahoo from "../api/fetchYahoo";

const CurrentLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    setLoading(true);
    setErrorMsg(null);
    setLocation(null);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("位置情報のアクセスが許可されていません。");
        Alert.alert("許可が必要", "位置情報のアクセスが許可されていません。");
        setLoading(false);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;

      const res = await fetchYahoo({ latitude, longitude });
      console.log(res);

      setLocation({ latitude, longitude });
    } catch (error) {
      console.error("位置情報取得エラー:", error);
      setErrorMsg("位置情報の取得中にエラーが発生しました。");
      Alert.alert("エラー", "位置情報の取得中にエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>現在地の取得</Text>

      <Button title="現在地を取得" onPress={getLocation} />

      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}

      {location && (
        <View style={styles.locationContainer}>
          <Text style={styles.label}>緯度: {location.latitude}</Text>
          <Text style={styles.label}>経度: {location.longitude}</Text>
        </View>
      )}

      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
    </ScrollView>
  );
};

export default CurrentLocation;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "stretch",
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  loader: {
    marginVertical: 20,
  },
  locationContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
  },
  error: {
    marginTop: 20,
    color: "red",
    textAlign: "center",
  },
});
