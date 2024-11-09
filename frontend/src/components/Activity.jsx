import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import { Audio } from "expo-av";

const catData = [
  { image: require("../../assets/cat1.png"), name: "Nekon" },
  { image: require("../../assets/cat2.png"), name: "Ace" },
  { image: require("../../assets/cat3.png"), name: "Tama" },
  { image: require("../../assets/cat4.png"), name: "Sora" },
  { image: require("../../assets/cat5.png"), name: "Mint" },
];

const Activity = () => {
  const [currentCatIndex, setCurrentCatIndex] = useState(0);
  const points = useSelector((state) => state.point.points);

  const handleNextCat = () => {
    setCurrentCatIndex((prevIndex) => (prevIndex + 1) % catData.length);
  };

  // 音声再生の関数
  const playSound = async (uri) => {
    if (uri) {
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri },
          { shouldPlay: true }
        );
        // 再生後にリソースを解放する
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            sound.unloadAsync();
          }
        });
      } catch (error) {
        console.error("Playback error:", error);
        Alert.alert("Playback Error", "Could not play the sound.");
      }
    } else {
      Alert.alert("Error", "No recorded sound available for this point.");
    }
  };

  // 各ポイントのアイテム表示
  const renderPoint = ({ item }) => (
    <TouchableOpacity onPress={() => playSound(item.recordedURI)}>
      <View style={styles.pointContainer}>
        <Text style={styles.pointTitle}>{item.title}</Text>
        <Text style={styles.pointDescription}>Tap to play</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* 画像 */}
        <Image source={catData[currentCatIndex].image} style={styles.image} />

        <View style={{ height: 32 }} />

        {/* 矢印ボタン */}
        <TouchableOpacity onPress={handleNextCat}>
          <Text style={styles.buttonText}>Next Cat ➡️</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />

        {/* プロファイル */}
        <Text style={styles.profileText}>Profile</Text>
        <Text style={styles.profileText}>
          Name {catData[currentCatIndex].name}
        </Text>

        <View style={{ height: 32 }} />

        <Text style={styles.activityText}>Activity</Text>
        <Text style={styles.activityText}>Number of sounds collected 2</Text>
        <Text style={styles.activityText}>The Day I started 11/09</Text>

        <View style={{ height: 32 }} />

        {/* Points一覧 */}
        <Text style={styles.pointsHeader}>Sounds List:</Text>
        <FlatList
          data={points}
          keyExtractor={(item) => item.recordedURI}
          renderItem={renderPoint}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Hiragino Mincho ProN",
    color: "#287aa1",
    textDecorationLine: "underline",
  },
  profileText: {
    fontSize: 12,
    fontFamily: "Hiragino Mincho ProN",
    color: "#287aa1",
    margin: 12,
  },
  activityText: {
    fontSize: 12,
    fontFamily: "Hiragino Mincho ProN",
    color: "#287aa1",
    margin: 12,
  },
  pointsHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#287aa1",
    marginVertical: 16,
  },
  pointContainer: {
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  pointTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  pointDescription: {
    fontSize: 12,
    color: "#666",
  },
});

export default Activity;
